import { defineStore } from 'pinia'

export const useProductStore = defineStore('user-product', {
  state: () => ({
    list: []
  }),
  actions:{
     loadProducts(){
      const product = localStorage.getItem('admin-products')
      if(product){
        this.list = JSON.parse(product)
        this.loaded = true
      }
    },
    filterProducts (searchText){
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})