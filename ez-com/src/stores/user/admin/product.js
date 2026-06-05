import { defineStore } from "pinia";
import { supabase } from '@/utils/supabase'

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('updated_at', { ascending: false })

        if (error) throw error

        if (data) {
          this.list = data.map(product => ({
            ...product,
            imageUrl: product.image_url,
            remainQuantiy: product.remain_quantity,
            updatedAt: product.updated_at
          }))
          this.loaded = true
        }
      } catch (error) {
        console.error('Error loading products:', error.message)
      }
    },
    getProducts(index) {
      return this.list[index]
    },
    async addProduct(productData) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              name: productData.name,
              image_url: productData.imageUrl,
              price: productData.price,
              quantity: productData.quantity,
              remain_quantity: productData.quantity,
              status: productData.status,
              updated_at: new Date().toISOString()
            }
          ])
          .select()

        if (error) throw error

        if (data) {
          this.list.push(data[0])
        }
      } catch (error) {
        console.error('Error adding product:', error.message)
      }
    },
    async updateProduct(index, productData) {
      try {
        const id = this.list[index].id
        const { data, error } = await supabase
          .from('products')
          .update({
            name: productData.name,
            image_url: productData.imageUrl,
            price: productData.price,
            quantity: productData.quantity,
            remain_quantity: productData.quantity,
            status: productData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()

        if (error) throw error

        if (data) {
          this.list[index] = data[0]
        }
      } catch (error) {
        console.error('Error updating product:', error.message)
      }
    },
    async removeProduct(index) {
      try {
        const id = this.list[index].id
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id)

        if (error) throw error

        this.list.splice(index, 1)
      } catch (error) {
        console.error('Error removing product:', error.message)
      }
    }
  }
});
