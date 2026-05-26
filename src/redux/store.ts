import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector,type TypedUseSelectorHook } from 'react-redux'
import appReducer from './appSlice'
import productReducer from './productSlice'
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import profileReducer from './profileSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    profile: profileReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector