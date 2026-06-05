import { defineStore } from "pinia";
import { supabase } from '@/utils/supabase'

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
    async placeorder (checkoutData) {
      try {
        const orderNumber = `AA${(Math.floor(Math.random() * 900000) + 100000).toString()}`

        // 1. สร้าง Order ในตาราง orders
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([
            {
              order_number: orderNumber,
              customer_name: checkoutData.name,
              email: checkoutData.email,
              total_price: this.summaryPrice,
              payment_method: 'Credit Card',
              status: 'pending',
              shipping_address: checkoutData.address,
              note: checkoutData.note,
              products: this.items // เก็บข้อมูลสินค้าเป็น JSON ในตาราง orders
            }
          ])
          .select()
          .single()

        if (orderError) throw orderError

        // 2. เก็บข้อมูลลง localStorage ไว้โชว์หน้า Success
        let checkout = {
          ...checkoutData,
          totalPrice: this.summaryPrice,
          paymentMethod: 'Credit Card',
          createdAt: (new Date()).toLocaleString(),
          orderNumber: orderNumber,
          products: this.items
        }
        localStorage.setItem('checkout-data', JSON.stringify(checkout))

        // 3. เคลียร์ตะกร้าหลังสั่งซื้อสำเร็จ
        this.items = []
        localStorage.removeItem('cart-data')

        return true
      } catch (error) {
        console.error('Error placing order:', error.message)
        return false
      }
    },
    loadCheckout () {
      let checkoutData = localStorage.getItem('checkout-data')
      if (checkoutData) {
        this.checkout = JSON.parse(checkoutData)
      }
    },
    clearCart() {
      this.items = []
      localStorage.removeItem('cart-data')
    }
    }
    });