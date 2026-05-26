import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE = 'https://fastcard-1-o23z.onrender.com/api'
const BASE_ORIGIN = 'https://fastcard-1-o23z.onrender.com'

// 1. Папкаи доимии расмҳо
export const IMAGE_URL = `${BASE_ORIGIN}/images/`

// 2. Функсия барои пурра кардани суроғаи расм
export const getImageUrl = (imageName?: string | null): string => {
  if (!imageName) return ''
  if (/^(https?:|blob:|data:)/.test(imageName)) return imageName
  return `${IMAGE_URL}${imageName.replace(/^\//, '')}`
}

// 3. Интерфейси Product мувофиқи ҷавоби сервери шумо
export interface Product {
  id: string | number
  productName: string
  price: number
  oldPrice?: number
  discountPrice?: number | null
  hasDiscount?: boolean
  discount?: number
  image: string | null
  images: string[] | null
  rating: number
  reviewsCount?: number
}

interface ProductState {
  flashProducts: Product[]
  bestSellers: Product[]
  exploreProducts: Product[]
  flashLoading: boolean
  bestSellersLoading: boolean
  exploreLoading: boolean
  error: string | null
  totalPages: number
  currentPage: number
}

const initialState: ProductState = {
  flashProducts: [],
  bestSellers: [],
  exploreProducts: [],
  flashLoading: false,
  bestSellersLoading: false,
  exploreLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
}

export const fetchFlashProducts = createAsyncThunk(
  'products/fetchFlashProducts',
  async (filters: Record<string, any>, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams()
      if (filters.productName?.trim()) queryParams.append('ProductName', filters.productName)
      queryParams.append('PageNumber', String(filters.pageNumber || 1))
      queryParams.append('PageSize', String(filters.pageSize || 12))

      const response = await fetch(`${BASE}/Product/get-products?${queryParams.toString()}`)
      if (!response.ok) throw new Error('Network error')
      const json = await response.json()
      
      return json.data?.products || []
    } catch (error: any) {
      return rejectWithValue(error.message || 'Хатогӣ дар боркунии Flash Sales')
    }
  }
)

export const fetchBestSellers = createAsyncThunk(
  'products/fetchBestSellers',
  async (limit: number = 4, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('PageNumber', '1')
      queryParams.append('PageSize', String(limit))

      const response = await fetch(`${BASE}/Product/get-products?${queryParams.toString()}`)
      if (!response.ok) throw new Error('Network error')
      const json = await response.json()
      
      return json.data?.products || []
    } catch (error: any) {
      return rejectWithValue(error.message || 'Хатогӣ дар боркунии Best Sellers')
    }
  }
)

export const fetchExploreProducts = createAsyncThunk(
  'products/fetchExploreProducts',
  async (
    filters: {
      productName?: string
      minPrice?: number
      maxPrice?: number
      brandId?: string | number
      colorId?: string | number
      categoryId?: string | number
      subcategoryId?: string | number
      pageNumber?: number
      pageSize?: number
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams()
      
      if (filters.productName) queryParams.append('ProductName', String(filters.productName))
      if (filters.minPrice) queryParams.append('MinPrice', String(filters.minPrice))
      if (filters.maxPrice) queryParams.append('MaxPrice', String(filters.maxPrice))
      if (filters.brandId) queryParams.append('BrandId', String(filters.brandId))
      if (filters.colorId) queryParams.append('ColorId', String(filters.colorId))
      if (filters.categoryId) queryParams.append('CategoryId', String(filters.categoryId))
      if (filters.subcategoryId) queryParams.append('SubcategoryId', String(filters.subcategoryId))
      
      queryParams.append('PageNumber', String(filters.pageNumber || 1))
      queryParams.append('PageSize', String(filters.pageSize || 8))

      const response = await fetch(`${BASE}/Product/get-products?${queryParams.toString()}`)
      if (!response.ok) throw new Error('Network error')
      const json = await response.json()
      
      return json.data || { products: [], totalPages: 0, currentPage: 1 }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Хатогӣ дар боркунии маҳсулот')
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashProducts.pending, (state) => {
        state.flashLoading = true
        state.error = null
      })
      .addCase(fetchFlashProducts.fulfilled, (state, action) => {
        state.flashLoading = false
        state.flashProducts = action.payload
      })
      .addCase(fetchFlashProducts.rejected, (state, action) => {
        state.flashLoading = false
        state.error = action.payload as string
      })
      
      .addCase(fetchBestSellers.pending, (state) => {
        state.bestSellersLoading = true
        state.error = null
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.bestSellersLoading = false
        state.bestSellers = action.payload
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.bestSellersLoading = false
        state.error = action.payload as string
      })

      .addCase(fetchExploreProducts.pending, (state) => {
        state.exploreLoading = true
        state.error = null
      })
      .addCase(fetchExploreProducts.fulfilled, (state, action) => {
        state.exploreLoading = false
        state.exploreProducts = action.payload.products
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchExploreProducts.rejected, (state, action) => {
        state.exploreLoading = false
        state.error = action.payload as string
      })
  },
})

export default productSlice.reducer