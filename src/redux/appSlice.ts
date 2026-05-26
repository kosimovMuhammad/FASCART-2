import { createSlice, type  PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
  userId?: number;
  name: string;
  email: string;
}

interface AppState {
  darkMode: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  cartCount: number;
  wishlistCount: number;
}

const savedState = localStorage.getItem('fastcart_redux');
const initialState: AppState = savedState 
  ? JSON.parse(savedState) 
  : {
      darkMode: false,
      isAuthenticated: false,
      user: null,
      cartCount: 2,
      wishlistCount: 5,
    };

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
      localStorage.setItem('fastcart_redux', JSON.stringify(state));
    },
    login: (state, action: PayloadAction<AuthUser>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('fastcart_redux', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      
      localStorage.removeItem('fastcart_redux');
      localStorage.removeItem('token');
      localStorage.removeItem('fastcart_profile');
    },
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
      localStorage.setItem('fastcart_redux', JSON.stringify(state));
    },
    setWishlistCount: (state, action: PayloadAction<number>) => {
      state.wishlistCount = action.payload;
      localStorage.setItem('fastcart_redux', JSON.stringify(state));
    }
  }
});

export const { toggleDarkMode, login, logout, setCartCount, setWishlistCount } = appSlice.actions;
export default appSlice.reducer;