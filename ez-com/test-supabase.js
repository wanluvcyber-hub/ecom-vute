
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Manual .env parsing
const envPath = path.resolve(process.cwd(), '.env')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...value] = line.split('=')
  if (key && value) {
    env[key.trim()] = value.join('=').trim()
  }
})

const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  console.log('URL:', supabaseUrl)

  // 1. Test fetching products
  console.log('\n--- Checking Table: products ---')
  const { data: products, error: pError } = await supabase
    .from('products')
    .select('*')
    .limit(1)

  if (pError) {
    console.error('Error fetching products:', pError.message)
    if (pError.message.includes('relation "public.products" does not exist')) {
        console.log('❌ Table "products" does not exist.')
    }
  } else {
    console.log('✅ Connection to "products" table successful.')
    console.log('Sample Data:', products)
  }

  // 2. Test fetching orders
  console.log('\n--- Checking Table: orders ---')
  const { data: orders, error: oError } = await supabase
    .from('orders')
    .select('*')
    .limit(1)

  if (oError) {
    console.error('Error fetching orders:', oError.message)
    if (oError.message.includes('relation "public.orders" does not exist')) {
        console.log('❌ Table "orders" does not exist.')
    }
  } else {
    console.log('✅ Connection to "orders" table successful.')
    console.log('Sample Data:', orders)
  }

  // 3. Test fetching users
  console.log('\n--- Checking Table: users ---')
  const { data: users, error: uError } = await supabase
    .from('users')
    .select('*')
    .limit(1)

  if (uError) {
    console.error('Error fetching users:', uError.message)
    if (uError.message.includes('relation "public.users" does not exist')) {
        console.log('❌ Table "users" does not exist.')
    }
  } else {
    console.log('✅ Connection to "users" table successful.')
    console.log('Sample Data:', users)
  }
}

testConnection()
