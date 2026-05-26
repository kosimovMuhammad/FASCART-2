import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Product } from './productSlice'

interface WishlistState {
  items: Product[]
}

const loadWishlistFromStorage = (): Product[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('wishlist-storage')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error("Error parsing wishlist storage", e)
      return []
    }
  }
  return []
}

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      // Истифода аз String() барои пешгирии хатогӣ байни рақам ва матн (masalan 28 ва "28")
      const exists = state.items.some((item) => String(item.id) === String(action.payload.id))
      if (!exists) {
        state.items.push(action.payload)
        localStorage.setItem('wishlist-storage', JSON.stringify(state.items))
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string | number>) => {
      // Истифода аз String() ҳангоми нест кардан
      state.items = state.items.filter((item) => String(item.id) !== String(action.payload))
      localStorage.setItem('wishlist-storage', JSON.stringify(state.items))
    },
    clearWishlist: (state) => {
      state.items = []
      localStorage.setItem('wishlist-storage', JSON.stringify([]))
    },
  },
})

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer