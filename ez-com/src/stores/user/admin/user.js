import { defineStore } from "pinia";
import { supabase } from '@/utils/supabase'

export const useAdminUserStore = defineStore('admin-user', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    async loadUsers() {
      try {
        const { data, error } = await supabase
          .from('profiles') // Assuming a profiles table for user information
          .select('*')
          .order('updated_at', { ascending: false })

        if (error) throw error

        if (data) {
          this.list = data
          this.loaded = true
        }
      } catch (error) {
        console.error('Error loading users:', error.message)
      }
    },
    getUser(index) {
      return this.list[index]
    },
    async updateUser(index, userData) {
      try {
        const id = this.list[index].id
        const { data, error } = await supabase
          .from('profiles')
          .update({
            name: userData.name,
            role: userData.role,
            status: userData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()

        if (error) throw error

        if (data) {
          this.list[index] = data[0]
        }
      } catch (error) {
        console.error('Error updating user:', error.message)
      }
    },
    async removeUser(index) {
      try {
        const id = this.list[index].id
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', id)

        if (error) throw error

        this.list.splice(index, 1)
      } catch (error) {
        console.error('Error removing user:', error.message)
      }
    }
  }
});