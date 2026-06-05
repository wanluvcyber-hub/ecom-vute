import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useProductStore = defineStore('user-product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions:{
    async loadProducts(){
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')

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
    filterProducts (searchText){
      return this.list.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
    }
  }
})