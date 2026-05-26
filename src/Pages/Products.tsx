
import { addToCart } from '@/redux/cartSlice'
import { fetchExploreProducts, getImageUrl, type Product } from '@/redux/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { addToWishlist } from '@/redux/wishlistSlice'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  ChevronUp,
  Eye,
  Heart,
  SlidersHorizontal,
  Star,
  X
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { cn } from "@/lib/utils";

const BRANDS = ['Samsung', 'Apple', 'Huawei', 'Poco', 'Lenovo']
const FEATURES = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
const CONDITIONS = ['Any', 'Refurbished', 'Brand new', 'Old Items']
const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
]

function enrichProduct(p: Product) {
  
  const n = typeof p.id === 'number' ? p.id : parseInt(String(p.id), 10) || 0
  return {
    ...p,
    brand: BRANDS[n % BRANDS.length],
    feature: FEATURES[n % FEATURES.length],
    condition: CONDITIONS[(n % (CONDITIONS.length - 1)) + 1],
  }
}

type EnrichedProduct = Product & {
  category?: string
  brand: string
  feature: string
  condition: string
}

type FilterSection = 'category' | 'brands' | 'features' | 'price' | 'condition' | 'ratings'

function SectionHeader({
  label, open, onToggle,
}: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn('flex', 'items-center', 'justify-between', 'w-full', 'font-semibold', 'text-sm', 'text-black', 'dark:text-white', 'mb-3', 'hover:text-[#DB4444]', 'transition-colors')}
    >
      {label}
      <motion.span animate={{ rotate: open ? 0 : 180 }} transition={{ duration: 0.2 }}>
        <ChevronUp className={cn('w-4', 'h-4')} />
      </motion.span>
    </button>
  )
}

function CollapseSection({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CustomCheckbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={cn('flex', 'items-center', 'gap-2.5', 'cursor-pointer', 'group', 'select-none')} onClick={onChange}>
      <div className={`
        w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 shrink-0
        ${checked
          ? 'bg-[#DB4444] border-[#DB4444] shadow-sm shadow-[#DB4444]/30'
          : 'border-gray-300 dark:border-zinc-600 group-hover:border-[#DB4444]'}
      `}>
        {checked && <Check className={cn('w-2.5', 'h-2.5', 'text-white')} strokeWidth={3} />}
      </div>
      <span className={`text-sm transition-colors ${checked ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white'}`}>
        {label}
      </span>
    </label>
  )
}

function RadioOption({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className={cn('flex', 'items-center', 'gap-2.5', 'cursor-pointer', 'group', 'select-none')} onClick={onChange}>
      <div className={`
        w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 shrink-0
        ${checked ? 'border-[#DB4444]' : 'border-gray-300 dark:border-zinc-600 group-hover:border-[#DB4444]'}
      `}>
        <motion.div
          animate={{ scale: checked ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className={cn('w-2', 'h-2', 'rounded-full', 'bg-[#DB4444]')}
        />
      </div>
      <span className={`text-sm transition-colors ${checked ? 'text-black dark:text-white font-medium' : 'text-gray-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white'}`}>
        {label}
      </span>
    </label>
  )
}

function StarRow({ rating, size = 'w-3.5 h-3.5' }: { rating: number; size?: string }) {
  return (
    <div className={cn('flex', 'items-center', 'gap-0.5')}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} ${i < rating ? 'text-[#FFAD33] fill-[#FFAD33]' : 'text-gray-300 dark:text-zinc-700'}`} />
      ))}
    </div>
  )
}

function ProductCard({
  product, onClick, onAddToCart, onAddToWishlist,
}: {
  product: EnrichedProduct
  onClick: () => void
  onAddToCart: (e: React.MouseEvent) => void
  onAddToWishlist: (e: React.MouseEvent) => void
}) {
  const { t } = useTranslation()
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28 }}
      className={cn('group', 'flex', 'flex-col', 'cursor-pointer')}
      onClick={onClick}
    >
      {}
      <div className={cn('relative', 'w-full', 'h-[160px]', 'sm:h-[220px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'transition-colors', 'duration-300')}>
        {product.discount && product.discount > 0 && (
          <div className={cn('absolute', 'top-3', 'left-3', 'bg-[#DB4444]', 'text-white', 'text-[10px]', 'px-2', 'py-0.5', 'rounded-sm', 'font-medium', 'z-10')}>
            -{product.discount}%
          </div>
        )}

        {}
        <div
          className={cn('absolute', 'top-3', 'right-3', 'flex', 'flex-col', 'gap-2', 'z-10', 'translate-x-10', 'opacity-0', 'group-hover:translate-x-0', 'group-hover:opacity-100', 'transition-all', 'duration-300')}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onAddToWishlist}
            className={cn('w-8', 'h-8', 'md:w-9', 'md:h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors')}
            aria-label="Add to wishlist"
          >
            <Heart className={cn('w-4', 'h-4')} />
          </button>
          <button
            onClick={onClick as any}
            className={cn('w-8', 'h-8', 'md:w-9', 'md:h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors')}
            aria-label="View product"
          >
            <Eye className={cn('w-4', 'h-4')} />
          </button>
        </div>

        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.3 }}
          src={getImageUrl(product.image)}
                  alt={product.productName}
          className={cn('max-w-[100px]', 'max-h-[100px]', 'sm:max-w-[145px]', 'sm:max-h-[145px]', 'object-contain')}
        />

        {}
        <button
          className={cn('absolute', 'bottom-0', 'left-0', 'right-0', 'h-10', 'bg-black', 'dark:bg-zinc-800', 'text-white', 'text-xs', 'font-semibold', 'opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'transform', 'translate-y-2', 'group-hover:translate-y-0', 'flex', 'items-center', 'justify-center', 'hover:bg-[#DB4444]')}
          onClick={onAddToCart}
        >
          {t('addToCart', 'Add To Cart')}
        </button>
      </div>

      {}
      <div className={cn('mt-3', 'flex', 'flex-col', 'gap-1')}>
        <h3 className={cn('font-medium', 'text-sm', 'text-black', 'dark:text-white', 'truncate', 'group-hover:text-[#DB4444]', 'transition-colors')}>
          {product.productName}
        </h3>
        <div className={cn('flex', 'items-center', 'gap-2')}>
          <span className={cn('text-[#DB4444]', 'font-semibold', 'text-sm')}>${product.price}</span>
          {product.oldPrice && (
            <span className={cn('text-gray-400', 'line-through', 'text-xs')}>${product.oldPrice}</span>
          )}
        </div>
        <div className={cn('flex', 'items-center', 'gap-1.5')}>
          <StarRow rating={product.rating} />
          <span className={cn('text-gray-400', 'dark:text-zinc-500', 'text-xs')}>({product.reviewsCount})</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Products() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const { exploreLoading, totalPages } = useAppSelector((s) => s.products)

  const [allProducts, setAllProducts] = useState<EnrichedProduct[]>([])
  const [loadedPage, setLoadedPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const initialCategory = searchParams.get('category')
  const [apiCategories, setApiCategories] = useState<{id: number | string, categoryName: string}[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number>(initialCategory || 'all')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Category/get-categories', {
          headers: { 'accept': '*/*' }
        })
        const result = await response.json()
        if (result.statusCode === 200 && result.data) {
          setApiCategories([{ id: 'all', categoryName: t('categories.allProducts', 'All products') }, ...result.data])
        }
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }
    fetchCategories()
  }, [t])

  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [appliedMin, setAppliedMin] = useState<number | null>(null)
  const [appliedMax, setAppliedMax] = useState<number | null>(null)
  const [selectedCondition, setSelectedCondition] = useState('Any')
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('popularity')
  const [openSections, setOpenSections] = useState<Record<FilterSection, boolean>>({
    category: true, brands: true, features: true, price: true, condition: true, ratings: true,
  })
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    setSelectedCategoryId(cat)
  }, [searchParams])

  useEffect(() => {
    setAllProducts([])
    setLoadedPage(1)
    const params: any = { pageNumber: 1, pageSize: 12 }
    if (selectedCategoryId !== 'all') {
      params.categoryId = selectedCategoryId
    }
    dispatch(fetchExploreProducts(params)).unwrap().then((payload) => {
      if (payload && payload.products) {
        setAllProducts(payload.products.map(enrichProduct))
      }
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dispatch, selectedCategoryId])

  const handleLoadMore = useCallback(() => {
    const nextPage = loadedPage + 1
    setLoadedPage(nextPage)
    setLoadingMore(true)
    const params: any = { pageNumber: nextPage, pageSize: 12 }
    if (selectedCategoryId !== 'all') {
      params.categoryId = selectedCategoryId
    }
    dispatch(fetchExploreProducts(params)).unwrap().then((payload) => {
      if (payload && payload.products) {
        const enriched = payload.products.map(enrichProduct)
        setAllProducts(prev => {
          const ids = new Set(prev.map(p => p.id))
          const newOnes = enriched.filter((p: any) => !ids.has(p.id))
          return [...prev, ...newOnes]
        })
      }
      setLoadingMore(false)
    }).catch(() => setLoadingMore(false))
  }, [dispatch, loadedPage, selectedCategoryId])

    const filtered = useMemo(() => {
    let arr = [...allProducts]
    
    if (selectedBrands.length > 0) arr = arr.filter(p => selectedBrands.includes(p.brand))
    if (selectedFeatures.length > 0) arr = arr.filter(p => selectedFeatures.includes(p.feature))
    if (appliedMin !== null) arr = arr.filter(p => p.price >= appliedMin)
    if (appliedMax !== null) arr = arr.filter(p => p.price <= appliedMax)
    if (selectedCondition !== 'Any') arr = arr.filter(p => p.condition === selectedCondition)
    if (selectedRating !== null) arr = arr.filter(p => Math.floor(p.rating) >= selectedRating)

    if (sortBy === 'price_asc') arr.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') arr.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating)

    return arr
  }, [allProducts, selectedBrands, selectedFeatures, appliedMin, appliedMax, selectedCondition, selectedRating, sortBy])

    const toggleSection = (s: FilterSection) =>
    setOpenSections(prev => ({ ...prev, [s]: !prev[s] }))

  const toggleBrand = (b: string) =>
    setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])

  const toggleFeature = (f: string) =>
    setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])

  const applyPrice = () => {
    setAppliedMin(minPrice ? Number(minPrice) : null)
    setAppliedMax(maxPrice ? Number(maxPrice) : null)
  }

  const handleCategorySelect = (id: string | number) => {
    setSelectedCategoryId(id)
    if (id === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', String(id))
    }
    setSearchParams(searchParams)
  }

  const clearAllFilters = () => {
    handleCategorySelect('all')
    setSelectedBrands([])
    setSelectedFeatures([])
    setMinPrice(''); setMaxPrice('')
    setAppliedMin(null); setAppliedMax(null)
    setSelectedCondition('Any')
    setSelectedRating(null)
  }

  const handleProductClick = useCallback((product: EnrichedProduct) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    navigate(`/product/${product.id}`)
  }, [navigate])

  const activeFilterCount = [
    selectedCategoryId !== 'all',
    selectedBrands.length > 0,
    selectedFeatures.length > 0,
    appliedMin !== null || appliedMax !== null,
    selectedCondition !== 'Any',
    selectedRating !== null,
  ].filter(Boolean).length

  const hasMore = loadedPage < (totalPages || 1)

    const sidebarContent = (
    <div className={cn('flex', 'flex-col', 'gap-0')}>

      {}
      <div className={cn('border-b', 'border-gray-100', 'dark:border-zinc-800', 'pb-5', 'mb-5')}>
        <SectionHeader
          label={t('products.category', 'Category')}
          open={openSections.category}
          onToggle={() => toggleSection('category')}
        />
        <CollapseSection open={openSections.category}>
          <div className={cn('flex', 'flex-col', 'gap-4', 'pt-3', 'pb-1')}>
            {apiCategories.slice(0, showAllCategories ? apiCategories.length : 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`text-left text-[15.5px] transition-colors ${
                  String(selectedCategoryId) === String(cat.id)
                    ? 'text-[#DB4444] font-medium'
                    : 'text-gray-700 dark:text-zinc-300 hover:text-[#DB4444] dark:hover:text-[#DB4444]'
                }`}
              >
                {cat.categoryName}
              </button>
            ))}
            {apiCategories.length > 5 && !showAllCategories && (
              <button
                onClick={() => setShowAllCategories(true)}
                className={cn('text-left', 'text-[15.5px]', 'text-[#DB4444]', 'hover:opacity-80', 'transition-opacity')}
              >
                See all
              </button>
            )}
          </div>
        </CollapseSection>
      </div>

      {}
      <div className={cn('border-b', 'border-gray-100', 'dark:border-zinc-800', 'pb-5', 'mb-5')}>
        <SectionHeader
          label={t('products.brands', 'Brands')}
          open={openSections.brands}
          onToggle={() => toggleSection('brands')}
        />
        <CollapseSection open={openSections.brands}>
          <div className={cn('flex', 'flex-col', 'gap-2.5', 'pt-1')}>
            {BRANDS.map(brand => (
              <CustomCheckbox
                key={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                label={brand}
              />
            ))}
          </div>
        </CollapseSection>
      </div>

      {}
      <div className={cn('border-b', 'border-gray-100', 'dark:border-zinc-800', 'pb-5', 'mb-5')}>
        <SectionHeader
          label={t('products.features', 'Features')}
          open={openSections.features}
          onToggle={() => toggleSection('features')}
        />
        <CollapseSection open={openSections.features}>
          <div className={cn('flex', 'flex-col', 'gap-2.5', 'pt-1')}>
            {FEATURES.map(feat => (
              <CustomCheckbox
                key={feat}
                checked={selectedFeatures.includes(feat)}
                onChange={() => toggleFeature(feat)}
                label={feat}
              />
            ))}
          </div>
        </CollapseSection>
      </div>

      {}
      <div className={cn('border-b', 'border-gray-100', 'dark:border-zinc-800', 'pb-5', 'mb-5')}>
        <SectionHeader
          label={t('products.priceRange', 'Price range')}
          open={openSections.price}
          onToggle={() => toggleSection('price')}
        />
        <CollapseSection open={openSections.price}>
          <div className="pt-1">
            {}
            <div className={cn('relative', 'h-1.5', 'bg-gray-200', 'dark:bg-zinc-700', 'rounded-full', 'my-5', 'mx-1')}>
              <div className={cn('absolute', 'left-[15%]', 'right-[20%]', 'h-full', 'bg-[#DB4444]', 'rounded-full')} />
              <div className={cn('absolute', 'left-[15%]', '-translate-x-1/2', 'top-1/2', '-translate-y-1/2', 'w-4', 'h-4', 'bg-white', 'dark:bg-zinc-900', 'border-2', 'border-[#DB4444]', 'rounded-full', 'shadow-md', 'cursor-grab')} />
              <div className={cn('absolute', 'right-[20%]', 'translate-x-1/2', 'top-1/2', '-translate-y-1/2', 'w-4', 'h-4', 'bg-white', 'dark:bg-zinc-900', 'border-2', 'border-[#DB4444]', 'rounded-full', 'shadow-md', 'cursor-grab')} />
            </div>

            <div className={cn('flex', 'items-center', 'gap-2', 'mt-4')}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
                className={cn('w-full', 'text-sm', 'border', 'border-gray-200', 'dark:border-zinc-700', 'rounded-sm', 'px-2.5', 'py-2', 'bg-transparent', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus:outline-none', 'focus:border-[#DB4444]', 'transition-colors')}
              />
              <span className={cn('text-gray-400', 'shrink-0')}>—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
                className={cn('w-full', 'text-sm', 'border', 'border-gray-200', 'dark:border-zinc-700', 'rounded-sm', 'px-2.5', 'py-2', 'bg-transparent', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus:outline-none', 'focus:border-[#DB4444]', 'transition-colors')}
              />
            </div>
            <button
              onClick={applyPrice}
              className={cn('mt-3', 'w-full', 'py-2', 'bg-[#DB4444]', 'text-white', 'text-sm', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-colors', 'font-medium')}
            >
              {t('products.apply', 'Apply')}
            </button>
          </div>
        </CollapseSection>
      </div>

      {}
      <div className={cn('border-b', 'border-gray-100', 'dark:border-zinc-800', 'pb-5', 'mb-5')}>
        <SectionHeader
          label={t('products.condition', 'Condition')}
          open={openSections.condition}
          onToggle={() => toggleSection('condition')}
        />
        <CollapseSection open={openSections.condition}>
          <div className={cn('flex', 'flex-col', 'gap-2.5', 'pt-1')}>
            {CONDITIONS.map(cond => (
              <RadioOption
                key={cond}
                checked={selectedCondition === cond}
                onChange={() => setSelectedCondition(cond)}
                label={cond}
              />
            ))}
          </div>
        </CollapseSection>
      </div>

      {}
      <div>
        <SectionHeader
          label={t('products.ratings', 'Ratings')}
          open={openSections.ratings}
          onToggle={() => toggleSection('ratings')}
        />
        <CollapseSection open={openSections.ratings}>
          <div className={cn('flex', 'flex-col', 'gap-2.5', 'pt-1')}>
            {[5, 4, 3, 2].map(r => (
              <label
                key={r}
                className={cn('flex', 'items-center', 'gap-2.5', 'cursor-pointer', 'group', 'select-none')}
                onClick={() => setSelectedRating(selectedRating === r ? null : r)}
              >
                <div className={`
                  w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 shrink-0
                  ${selectedRating === r
                    ? 'bg-[#DB4444] border-[#DB4444]'
                    : 'border-gray-300 dark:border-zinc-600 group-hover:border-[#DB4444]'}
                `}>
                  {selectedRating === r && <Check className={cn('w-2.5', 'h-2.5', 'text-white')} strokeWidth={3} />}
                </div>
                <div className={cn('flex', 'items-center', 'gap-1.5')}>
                  <StarRow rating={r} />
                  {r < 5 && <span className={cn('text-xs', 'text-gray-400', 'dark:text-zinc-500')}>& up</span>}
                </div>
              </label>
            ))}
          </div>
        </CollapseSection>
      </div>

      {}
      {activeFilterCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={clearAllFilters}
          className={cn('mt-6', 'w-full', 'py-2.5', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'text-sm', 'text-gray-600', 'dark:text-zinc-400', 'hover:border-[#DB4444]', 'hover:text-[#DB4444]', 'transition-colors', 'flex', 'items-center', 'justify-center', 'gap-2')}
        >
          <X className={cn('w-3.5', 'h-3.5')} />
          {t('products.clearFilters', 'Clear filters')}
          <span className={cn('bg-[#DB4444]', 'text-white', 'text-[10px]', 'font-bold', 'rounded-full', 'w-4', 'h-4', 'flex', 'items-center', 'justify-center')}>
            {activeFilterCount}
          </span>
        </motion.button>
      )}
    </div>
  )

    return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-8', 'md:py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'transition-colors', 'min-h-screen')}>

      {}
      <div className={cn('flex', 'items-center', 'gap-2', 'text-sm', 'text-gray-500', 'dark:text-zinc-400', 'mb-8')}>
        <Link to="/" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>
          {t('cart.home', 'Home')}
        </Link>
        <span>/</span>
        <span className={cn('text-black', 'dark:text-white', 'font-medium')}>
          {t('products.exploreProducts', 'Explore Our Products')}
        </span>
      </div>

      <div className={cn('flex', 'gap-8', 'lg:gap-12', 'items-start')}>

        {}
        <aside className={cn('hidden', 'lg:block', 'w-[220px]', 'shrink-0', 'sticky', 'top-6')}>
          {sidebarContent}
        </aside>

        {}
        <div className={cn('flex-1', 'min-w-0')}>

          {}
          <div className={cn('flex', 'items-center', 'justify-between', 'mb-6', 'gap-4', 'flex-wrap')}>
            <button
              onClick={() => setShowMobileFilter(true)}
              className={cn('lg:hidden', 'flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'text-sm', 'text-black', 'dark:text-white', 'hover:border-[#DB4444]', 'transition-colors')}
            >
              <SlidersHorizontal className={cn('w-4', 'h-4')} />
              {t('products.filters', 'Filters')}
              {activeFilterCount > 0 && (
                <span className={cn('bg-[#DB4444]', 'text-white', 'text-[10px]', 'font-bold', 'rounded-full', 'w-4', 'h-4', 'flex', 'items-center', 'justify-center')}>
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className={cn('ml-auto', 'flex', 'items-center', 'gap-3')}>
              <AnimatePresence>
                {filtered.length > 0 && (
                  <motion.span
                    key="count"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn('text-sm', 'text-gray-500', 'dark:text-zinc-400', 'hidden', 'sm:block')}
                  >
                    {filtered.length} {t('products.results', 'results')}
                  </motion.span>
                )}
              </AnimatePresence>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className={cn('text-sm', 'border', 'border-gray-200', 'dark:border-zinc-700', 'rounded-sm', 'px-3', 'py-2', 'bg-white', 'dark:bg-zinc-900', 'text-black', 'dark:text-white', 'focus:outline-none', 'focus:border-[#DB4444]', 'cursor-pointer', 'transition-colors')}
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {}
          {activeFilterCount > 0 && (
            <div className={cn('flex', 'flex-wrap', 'gap-2', 'mb-5')}>
              {selectedCategoryId !== 'all' && (
                <FilterChip label={apiCategories.find(c => String(c.id) === String(selectedCategoryId))?.categoryName || 'Category'} onRemove={() => handleCategorySelect('all')} />
              )}
              {selectedBrands.map(b => (
                <FilterChip key={b} label={b} onRemove={() => toggleBrand(b)} />
              ))}
              {selectedFeatures.map(f => (
                <FilterChip key={f} label={f} onRemove={() => toggleFeature(f)} />
              ))}
              {(appliedMin !== null || appliedMax !== null) && (
                <FilterChip
                  label={`$${appliedMin ?? 0} — $${appliedMax ?? '∞'}`}
                  onRemove={() => { setAppliedMin(null); setAppliedMax(null); setMinPrice(''); setMaxPrice('') }}
                />
              )}
              {selectedCondition !== 'Any' && (
                <FilterChip label={selectedCondition} onRemove={() => setSelectedCondition('Any')} />
              )}
              {selectedRating !== null && (
                <FilterChip label={`${selectedRating}★ & up`} onRemove={() => setSelectedRating(null)} />
              )}
            </div>
          )}

          {}
          {exploreLoading && allProducts.length === 0 ? (
            <div className={cn('grid', 'grid-cols-2', 'sm:grid-cols-3', 'gap-4', 'md:gap-6')}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={cn('w-full', 'h-64', 'bg-gray-100', 'dark:bg-zinc-900', 'rounded-sm', 'animate-pulse')} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className={cn('flex', 'flex-col', 'items-center', 'justify-center', 'py-24', 'text-center')}>
              <div className={cn('text-5xl', 'mb-4')}>🔍</div>
              <h3 className={cn('text-xl', 'font-semibold', 'text-black', 'dark:text-white', 'mb-2')}>
                {t('products.noResults', 'No products found')}
              </h3>
              <p className={cn('text-gray-500', 'dark:text-zinc-400', 'text-sm')}>
                {t('products.tryAdjusting', 'Try adjusting your filters')}
              </p>
              <button
                onClick={clearAllFilters}
                className={cn('mt-6', 'px-8', 'py-3', 'bg-[#DB4444]', 'text-white', 'rounded-sm', 'text-sm', 'font-medium', 'hover:bg-[#bd3535]', 'transition-colors', 'shadow-sm')}
              >
                {t('products.clearFilters', 'Clear all filters')}
              </button>
            </div>
          ) : (
            <motion.div layout className={cn('grid', 'grid-cols-2', 'sm:grid-cols-3', 'gap-4', 'md:gap-6')}>
              <AnimatePresence mode="popLayout">
                {filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    onAddToCart={(e) => { e.stopPropagation(); dispatch(addToCart({ product, quantity: 1 })) }}
                    onAddToWishlist={(e) => { e.stopPropagation(); dispatch(addToWishlist(product)) }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {}
          {filtered.length > 0 && (
            <div className={cn('flex', 'flex-col', 'items-center', 'mt-14', 'gap-3')}>
              {loadingMore && (
                <div className={cn('flex', 'gap-1.5', 'mb-2')}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2 }}
                      className={cn('w-2', 'h-2', 'rounded-full', 'bg-[#DB4444]')}
                    />
                  ))}
                </div>
              )}
              {hasMore ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className={cn('px-12', 'py-4', 'bg-[#DB4444]', 'text-white', 'font-semibold', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-all', 'duration-200', 'shadow-md', 'hover:shadow-xl', 'hover:shadow-[#DB4444]/20', 'disabled:opacity-60', 'disabled:cursor-not-allowed')}
                >
                  {loadingMore
                    ? t('products.loading', 'Loading...')
                    : t('products.moreProducts', 'More Products')}
                </motion.button>
              ) : allProducts.length > 0 ? (
                <p className={cn('text-sm', 'text-gray-400', 'dark:text-zinc-500')}>
                  {t('products.allLoaded', 'All products loaded')} ({allProducts.length} total)
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {}
      <AnimatePresence>
        {showMobileFilter && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={cn('fixed', 'inset-0', 'bg-black/50', 'backdrop-blur-sm', 'z-40', 'lg:hidden')}
              onClick={() => setShowMobileFilter(false)}
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className={cn('fixed', 'top-0', 'left-0', 'bottom-0', 'w-[300px]', 'z-50', 'bg-white', 'dark:bg-zinc-950', 'shadow-2xl', 'overflow-y-auto', 'lg:hidden')}
            >
              <div className={cn('sticky', 'top-0', 'bg-white', 'dark:bg-zinc-950', 'px-6', 'pt-6', 'pb-4', 'border-b', 'border-gray-100', 'dark:border-zinc-800', 'flex', 'items-center', 'justify-between')}>
                <h3 className={cn('text-base', 'font-semibold', 'text-black', 'dark:text-white', 'flex', 'items-center', 'gap-2')}>
                  <SlidersHorizontal className={cn('w-4', 'h-4')} />
                  {t('products.filters', 'Filters')}
                  {activeFilterCount > 0 && (
                    <span className={cn('bg-[#DB4444]', 'text-white', 'text-[10px]', 'font-bold', 'rounded-full', 'w-4', 'h-4', 'flex', 'items-center', 'justify-center')}>
                      {activeFilterCount}
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className={cn('p-1.5', 'rounded-sm', 'text-gray-500', 'hover:text-black', 'dark:hover:text-white', 'hover:bg-gray-100', 'dark:hover:bg-zinc-800', 'transition-colors')}
                >
                  <X className={cn('w-5', 'h-5')} />
                </button>
              </div>
              <div className="p-6">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className={cn('inline-flex', 'items-center', 'gap-1.5', 'px-3', 'py-1', 'bg-gray-100', 'dark:bg-zinc-800', 'text-sm', 'text-black', 'dark:text-white', 'rounded-full')}
    >
      {label}
      <button onClick={onRemove} className={cn('hover:text-[#DB4444]', 'transition-colors')}>
        <X className={cn('w-3', 'h-3')} />
      </button>
    </motion.span>
  )
}
