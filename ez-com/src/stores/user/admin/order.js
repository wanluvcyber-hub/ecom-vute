import { defineStore } from "pinia";
import { supabase } from '@/utils/supabase'

export const useAdminOrderStore = defineStore("admin-order", {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        if (data) {
          this.list = data.map(order => ({
            no: order.order_number,
            customerName: order.customer_name || 'N/A',
            totalPrice: order.total_price,
            status: order.status,
            address: order.shipping_address,
            paymentMethod: order.payment_method,
            updatedAt: order.updated_at || order.created_at,
            products: order.products || [] // Assuming products might be stored as JSON or fetched separately
          }))
          this.loaded = true
        }
      } catch (error) {
        console.error('Error loading orders:', error.message)
      }
    },
    getOrder(index) {
      return this.list[index];
    },
  },
});
