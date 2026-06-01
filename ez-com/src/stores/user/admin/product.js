import { defineStore } from "pinia";

export const useAdminProductStore = defineStore("admin-product", {
  state: () => ({
    list: [],
    loaded:false
  }),
  actions:
  {
    loadProducts(){
      const product = localStorage.getItem('admin-products')
      if(product){
        this.list = JSON.parse(product)
        this.loaded = true
      }
    },
    getProducts(index){
      if (!this.loaded){
        this.loadProducts()
      }
        return this.list[index]
    },
    addProduct (productData){
        productData.remainQuantiy = productData.quantity
        productData.updatedAt = new Date().toISOString()
        this.list.push(productData)
        localStorage.setItem('admin-products',JSON.stringify(this.list))
    },
    // มีท่าที่สวยกว่านี้ การบ้าน
    updateProduct(index,productData){
        this.list[index].name = productData.name
        this.list[index].imageUrl = productData.imageUrl
        this.list[index].price = productData.price
        this.list[index].quantity = productData.quantity
        this.list[index].remainQuantiy = productData.quantity
        this.list[index].status = productData.state
        productData.updatedAt = new Date().toISOString()
        localStorage.setItem('admin-products',JSON.stringify(this.list))
        
    },
    removeProduct (index){
        this.list.splice(index,1)
        localStorage.setItem('admin-products',JSON.stringify(this.list))
    }
  }
});
