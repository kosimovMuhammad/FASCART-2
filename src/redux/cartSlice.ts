import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from './productSlice'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart-storage')
    return saved ? JSON.parse(saved) : []
  }
  return []
}

const initialState: CartState = {
  items: loadCartFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload
      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ ...product, quantity })
      }
      localStorage.setItem('cart-storage', JSON.stringify(state.items))
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart-storage', JSON.stringify(state.items))
    },
    updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
      const { id, quantity } = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        existingItem.quantity = Math.max(1, quantity) 
        localStorage.setItem('cart-storage', JSON.stringify(state.items))
      }
    },
    clearCart: (state) => {
      state.items = []
      localStorage.setItem('cart-storage', JSON.stringify([]))
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
