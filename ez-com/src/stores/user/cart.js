import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    checkout:[]
  }),

  getters:{
    summaryQuantity(state){
      return state.items.reduce((acc,item) => acc + item.quantity,0)
    },
    summaryPrice(state){
      return state.items.reduce((acc,items)=>{
        return acc + (items.price * items.quantity)
      },0)
    }
  },
  
  // รวมทุกฟังก์ชัน (Methods) ไว้ใน actions ก้อนเดียวกัน
  actions: {
    loadCart(){
      const previousCart = localStorage.getItem('cart-data')
      if (previousCart){
        this.items = JSON.parse(previousCart)
      }
    },
    addToCart(ProductData) {

      const findProductIndex = this.items.findIndex(item=>{
        return item.name === ProductData.name
      })

      if (findProductIndex<0){
        ProductData.quantity = 1
        this.items.push(ProductData)
      }else{
        const currentItem = this.items[findProductIndex]
        this.updateQuantity(findProductIndex,currentItem.quantity+1)
      }
      localStorage.setItem('cart-data',JSON.stringify(this.items))
    },
    
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity;
      localStorage.setItem('cart-data',JSON.stringify(this.items))
    },
    
    removeItemCart(index) {
      this.items.splice(index, 1);
      localStorage.setItem('cart-data',JSON.stringify(this.items))
    },
     placeorder (checkoutData) {
      let checkout = {
        ...checkoutData,
        totalPrice: this.summaryPrice,
        paymentMethod: 'Credit Card',
        createdAt: (new Date()).toLocaleString(),
        orderNumber: `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`,
        products: this.items
      }
       localStorage.setItem('checkout-data', JSON.stringify(checkout))
    },
       loadCheckout () {
      let checkoutData = localStorage.getItem('checkout-data')
      if (checkoutData) {
        this.checkout = JSON.parse(checkoutData)
      }
  }
}
 // ปิดปีกกาของ actions ตรงนี้หลังจากใส่ครบทุกฟังก์ชันแล้ว
});