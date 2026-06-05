import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    role: 'user'
  }),
  actions: {
    async checkAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        this.user = session.user
        this.isLoggedIn = true
        await this.fetchProfile(session.user.id)
      }
    },
    async fetchProfile(userId) {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()
      
      if (data) {
        this.role = data.role
      }
    },
    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      
      this.user = data.user
      this.isLoggedIn = true
      await this.fetchProfile(data.user.id)
      return data
    },
    async register(email, password, name) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name
          }
        }
      })
      if (error) throw error

      if (data.user) {
        // Create profile in our users table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: email,
              display_name: name,
              role: 'user'
            }
          ])
        
        if (profileError) throw profileError

        this.user = data.user
        this.isLoggedIn = true
        this.role = 'user'
      }
      return data
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = null
      this.isLoggedIn = false
      this.role = 'user'
    }
  }
})
