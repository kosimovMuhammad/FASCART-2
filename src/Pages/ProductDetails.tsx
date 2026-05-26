"use client"

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Heart, Eye, Star, Truck, RefreshCcw, Minus, Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { addToWishlist } from '@/redux/wishlistSlice'
import { addToCart } from '@/redux/cartSlice'
import { fetchExploreProducts, getImageUrl, type Product } from '@/redux/productSlice'
import { motion, type Variants } from 'framer-motion'
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 17 }
  }
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function ProductDetails() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { exploreProducts, exploreLoading } = useAppSelector((state) => state.products)
  // Ислоҳ: Иҷозати қабули ҳамаи хосиятҳои иловагӣ ба монанди description
  const [product, setProduct] = useState<Product | any | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('blue')

  useEffect(() => {
    const stored = localStorage.getItem('selectedProduct')
    if (stored) {
      setProduct(JSON.parse(stored))
    }

    dispatch(fetchExploreProducts({ pageNumber: 1, pageSize: 4 }))
    
    window.scrollTo(0, 0);
  }, [id, dispatch])

  if (!product) {
    return (
      <div className={cn('min-h-[60vh]', 'flex', 'items-center', 'justify-center', 'dark:bg-zinc-950')}>
        <p className={cn('text-gray-500', 'dark:text-zinc-400')}>Loading product details...</p>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-[#FFAD33] fill-[#FFAD33]'
            : 'text-gray-300 dark:text-zinc-700'
        }`}
      />
    ))
  }

  const handleProductClick = (prod: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(prod))
    navigate(`/product/${prod.id}`)
  }

  const handleAddToCart = (prod: Product, qty: number = 1) => {
    dispatch(addToCart({ product: prod, quantity: qty }))
  }

  // ИСЛОҲОТ: Муайян кардани манбаи расми маҳсулоти асосӣ бо ҳифзи типҳо
  const mainImageSource = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);
  const mainImageUrl = mainImageSource ? getImageUrl(mainImageSource) : '/placeholder-product.png';

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-6', 'md:py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'transition-colors', 'duration-300', 'min-h-screen', 'select-none')}>
      
      <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-x-2', 'gap-y-1', 'text-xs', 'md:text-sm', 'text-gray-500', 'dark:text-zinc-400', 'mb-6', 'md:mb-10')}>
        <Link to="/" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>{t('productDetails.account', 'Account')}</Link>
        <span>/</span>
        <span className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors', 'cursor-pointer')}>{t('productDetails.gaming', 'Gaming')}</span>
        <span>/</span>
        <span className={cn('text-black', 'dark:text-white', 'font-medium', 'truncate', 'max-w-[200px]', 'sm:max-w-none')}>{product.productName}</span>
      </div>

      <div className={cn('flex', 'flex-col', 'lg:flex-row', 'gap-8', 'xl:gap-16', 'mb-16', 'md:mb-20')}>
        
        <div className={cn('flex', 'flex-col-reverse', 'md:flex-row', 'gap-4', 'md:gap-6', 'lg:w-3/5')}>
          
          {/* ТАСВИРҲОИ ХУРД (Thumbnails) */}
          <div className={cn('flex', 'md:flex-col', 'gap-3', 'overflow-x-auto', 'md:overflow-visible', 'pb-2', 'md:pb-0', 'no-scrollbar', 'shrink-0', 'snap-x')}>
            {[1, 2, 3, 4].map((idx) => (
              <div 
                key={idx} 
                className={cn('w-[85px]', 'h-[85px]', 'sm:w-[100px]', 'sm:h-[100px]', 'md:w-[130px]', 'md:h-[130px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'p-2.5', 'cursor-pointer', 'border-2', 'border-transparent', 'hover:border-gray-200', 'dark:hover:border-zinc-700', 'transition-all', 'shrink-0', 'snap-center')}
              >
                <img src={mainImageUrl} alt={`${product.productName} ${idx}`} className={cn('max-w-full', 'max-h-full', 'object-contain')} />
              </div>
            ))}
          </div>

          {/* ТАСВИРИ АСОСИИ КАЛОН */}
          <div className={cn('w-full', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'p-6', 'sm:p-10', 'min-h-[260px]', 'sm:min-h-[350px]', 'md:min-h-[500px]')}>
            <img src={mainImageUrl} alt={product.productName} className={cn('w-full', 'max-w-[280px]', 'sm:max-w-[380px]', 'md:max-w-[400px]', 'object-contain', 'drop-shadow-xl')} />
          </div>
        </div>

        {/* Қисми маълумоти маҳсулот */}
        <div className={cn('lg:w-2/5', 'flex', 'flex-col', 'pt-2')}>
          <h1 className={cn('text-xl', 'md:text-3xl', 'font-semibold', 'text-black', 'dark:text-white', 'mb-2', 'md:mb-3', 'tracking-wide')}>
            {product.productName}
          </h1>

          <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-x-3', 'gap-y-1', 'mb-4')}>
            <div className={cn('flex', 'items-center')}>{renderStars(product.rating || 5)}</div>
            <span className={cn('text-gray-400', 'dark:text-zinc-500', 'text-xs', 'md:text-sm', 'font-medium')}>
              ({product.reviewsCount || 0} {t('productDetails.reviews', 'Reviews')})
            </span>
            <span className={cn('text-gray-400', 'dark:text-zinc-500', 'hidden', 'sm:inline')}>|</span>
            <span className={cn('text-[#00FF66]', 'text-xs', 'md:text-sm', 'font-medium')}>{t('productDetails.inStock', 'In Stock')}</span>
          </div>

          <div className={cn('text-xl', 'md:text-2xl', 'font-medium', 'text-black', 'dark:text-white', 'mb-4', 'tracking-wide')}>
            ${product.price}
          </div>

          <p className={cn('text-xs', 'md:text-sm', 'text-gray-600', 'dark:text-zinc-300', 'leading-relaxed', 'mb-6')}>
            {product.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
          </p>

          <div className={cn('border-t', 'border-gray-200', 'dark:border-zinc-800', 'mb-6')} />

          <div className={cn('flex', 'items-center', 'gap-4', 'mb-5', 'md:mb-6')}>
            <span className={cn('text-black', 'dark:text-white', 'font-medium', 'text-base', 'md:text-lg')}>{t('productDetails.colours', 'Colours:')}</span>
            <div className={cn('flex', 'items-center', 'gap-3')}>
              <button 
                onClick={() => setSelectedColor('blue')}
                className={`w-5 h-5 rounded-full bg-[#A0BCE0] border-2 ring-offset-2 dark:ring-offset-zinc-950 transition-all ${selectedColor === 'blue' ? 'border-white ring-2 ring-black dark:ring-white dark:border-zinc-950' : 'border-transparent'}`}
              />
              <button 
                onClick={() => setSelectedColor('red')}
                className={`w-5 h-5 rounded-full bg-[#E07575] border-2 ring-offset-2 dark:ring-offset-zinc-950 transition-all ${selectedColor === 'red' ? 'border-white ring-2 ring-black dark:ring-white dark:border-zinc-950' : 'border-transparent'}`}
              />
            </div>
          </div>

          <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-4', 'mb-6', 'md:mb-8')}>
            <span className={cn('text-black', 'dark:text-white', 'font-medium', 'text-base', 'md:text-lg')}>{t('productDetails.size', 'Size:')}</span>
            <div className={cn('flex', 'items-center', 'gap-2', 'sm:gap-3')}>
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 rounded-sm text-xs font-medium border flex items-center justify-center transition-all ${
                    selectedSize === size 
                      ? 'bg-[#DB4444] text-white border-[#DB4444]' 
                      : 'bg-white dark:bg-zinc-900 text-black dark:text-white border-gray-300 dark:border-zinc-700 hover:border-[#DB4444] dark:hover:border-[#DB4444]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className={cn('grid', 'grid-cols-12', 'sm:flex', 'items-center', 'gap-2', 'md:gap-4', 'mb-8', 'md:mb-10', 'h-11')}>
            <div className={cn('col-span-4', 'sm:col-span-auto', 'flex', 'items-center', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'h-full', 'w-full', 'sm:w-auto')}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={cn('flex-1', 'sm:w-10', 'h-full', 'flex', 'items-center', 'justify-center', 'hover:bg-[#DB4444]', 'hover:text-white', 'dark:hover:bg-[#DB4444]', 'text-black', 'dark:text-white', 'transition-colors', 'rounded-l-sm')}
              >
                <Minus className={cn('w-3.5', 'h-3.5')} />
              </button>
              <div className={cn('flex-1', 'sm:w-14', 'h-full', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'text-sm', 'md:text-base', 'font-medium', 'border-x', 'border-gray-300', 'dark:border-zinc-700')}>
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className={cn('flex-1', 'sm:w-10', 'h-full', 'flex', 'items-center', 'justify-center', 'bg-[#DB4444]', 'text-white', 'hover:bg-[#bd3535]', 'transition-colors', 'rounded-r-sm')}
              >
                <Plus className={cn('w-3.5', 'h-3.5')} />
              </button>
            </div>

            <button 
              onClick={() => handleAddToCart(product, quantity)}
              className={cn('col-span-6', 'sm:col-span-auto', 'h-full', 'px-4', 'sm:px-8', 'bg-[#DB4444]', 'text-white', 'text-sm', 'md:text-base', 'font-medium', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-colors', 'flex-1', 'sm:flex-none')}
            >
              {t('productDetails.buyNow', 'Buy Now')}
            </button>

            <button 
              onClick={() => dispatch(addToWishlist(product))}
              className={cn('col-span-2', 'sm:col-span-auto', 'w-full', 'sm:w-11', 'h-full', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'hover:bg-gray-50', 'dark:hover:bg-zinc-800', 'transition-colors')}
            >
              <Heart className={cn('w-4', 'h-4', 'md:w-5', 'md:h-5')} />
            </button>
          </div>

          <div className={cn('border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'flex', 'flex-col')}>
            <div className={cn('flex', 'items-start', 'sm:items-center', 'gap-3', 'md:gap-4', 'p-4', 'border-b', 'border-gray-300', 'dark:border-zinc-700')}>
              <Truck className={cn('w-6', 'h-6', 'md:w-8', 'md:h-8', 'text-black', 'dark:text-white', 'shrink-0', 'mt-0.5', 'sm:mt-0')} strokeWidth={1.5} />
              <div>
                <h4 className={cn('text-sm', 'md:text-base', 'text-black', 'dark:text-white', 'font-medium', 'mb-0.5', 'md:mb-1')}>{t('productDetails.freeDelivery', 'Free Delivery')}</h4>
                <p className={cn('text-[11px]', 'md:text-xs', 'text-black', 'dark:text-zinc-400', 'underline', 'cursor-pointer')}>{t('productDetails.enterPostal', 'Enter your postal code for Delivery Availability')}</p>
              </div>
            </div>
            <div className={cn('flex', 'items-start', 'sm:items-center', 'gap-3', 'md:gap-4', 'p-4')}>
              <RefreshCcw className={cn('w-6', 'h-6', 'md:w-8', 'md:h-8', 'text-black', 'dark:text-white', 'shrink-0', 'mt-0.5', 'sm:mt-0')} strokeWidth={1.5} />
              <div>
                <h4 className={cn('text-sm', 'md:text-base', 'text-black', 'dark:text-white', 'font-medium', 'mb-0.5', 'md:mb-1')}>{t('productDetails.returnDelivery', 'Return Delivery')}</h4>
                <p className={cn('text-[11px]', 'md:text-xs', 'text-black', 'dark:text-zinc-400', 'font-medium')}>
                  {t('productDetails.returnDays', 'Free 30 Days Delivery Returns. Details')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeIn}
      >
        <div className={cn('flex', 'items-center', 'gap-3', 'md:gap-4', 'mb-6', 'md:mb-10')}>
          <div className={cn('w-4', 'h-8', 'md:w-5', 'md:h-10', 'bg-[#DB4444]', 'rounded-sm')} />
          <h2 className={cn('text-lg', 'md:text-xl', 'font-bold', 'tracking-wide', 'text-[#DB4444]')}>
            {t('productDetails.relatedItem', 'Related Item')}
          </h2>
        </div>

        {exploreLoading ? (
          <div className={cn('grid', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-4', 'md:gap-8')}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className={cn('w-full', 'h-[260px]', 'sm:h-[380px]', 'bg-gray-100', 'dark:bg-zinc-900', 'animate-pulse', 'rounded-sm')} />
            ))}
          </div>
        ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={containerVariants}
              className={cn('grid', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-x-4', 'md:gap-x-8', 'gap-y-8', 'md:gap-y-12')}
            >
              {exploreProducts.slice(0, 4).map((relatedProd: Product | any) => {
                // ИСЛОҲОТ: Озод ва бехатар гирифтани расм барои маҳсулоти монанд
                const relatedImageSource = relatedProd.image || (relatedProd.images && relatedProd.images.length > 0 ? relatedProd.images[0] : null);

                return (
                  <motion.div
                    key={relatedProd.id}
                    variants={cardVariants}
                    className={cn('group', 'flex', 'flex-col', 'justify-between', 'cursor-pointer')}
                    onClick={() => handleProductClick(relatedProd)}
                  >
                    <div className={cn('relative', 'w-full', 'h-[160px]', 'sm:h-[250px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'transition-colors', 'duration-300')}>
                      
                      {relatedProd.discount && relatedProd.discount > 0 && (
                        <div className={cn('absolute', 'top-2', 'left-2', 'md:top-3', 'md:left-3', 'bg-[#DB4444]', 'text-white', 'text-[10px]', 'md:text-xs', 'px-1.5', 'md:px-2.5', 'py-0.5', 'md:py-1', 'rounded-sm', 'font-medium', 'z-10')}>
                          -{relatedProd.discount}%
                        </div>
                      )}

                      <div className={cn('absolute', 'top-2', 'right-2', 'md:top-3', 'md:right-3', 'flex', 'flex-col', 'gap-1.5', 'md:gap-2', 'z-10', 'sm:translate-x-10', 'sm:opacity-0', 'group-hover:translate-x-0', 'group-hover:opacity-100', 'transition-all', 'duration-300')} onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => dispatch(addToWishlist(relatedProd))}
                          className={cn('w-7', 'h-7', 'md:w-9', 'md:h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors', 'duration-200')}
                        >
                          <Heart className={cn('w-3.5', 'h-3.5', 'md:w-4', 'md:h-4')} />
                        </button>
                        <button className={cn('w-7', 'h-7', 'md:w-9', 'md:h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors', 'duration-200')}>
                          <Eye className={cn('w-3.5', 'h-3.5', 'md:w-4', 'md:h-4')} />
                        </button>
                      </div>

                      <motion.img
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.3 }}
                        src={relatedImageSource ? getImageUrl(relatedImageSource) : '/placeholder-product.png'}
                        alt={relatedProd.productName}
                        className={cn('max-w-[110px]', 'max-h-[110px]', 'sm:max-w-[180px]', 'sm:max-h-[180px]', 'object-contain', 'transition-transform', 'duration-300')}
                      />

                      <button
                        className={cn('absolute', 'bottom-0', 'left-0', 'right-0', 'h-9', 'md:h-11', 'bg-black', 'dark:bg-zinc-800', 'text-white', 'text-xs', 'md:text-sm', 'font-semibold', 'sm:opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'transform', 'sm:translate-y-4', 'group-hover:translate-y-0', 'flex', 'items-center', 'justify-center', 'gap-2', 'active:bg-[#DB4444]', 'dark:active:bg-[#DB4444]')}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(relatedProd)
                        }}
                      >
                        {t('addToCart', 'Add To Cart')}
                      </button>
                    </div>

                    <div className={cn('mt-3', 'md:mt-4', 'flex', 'flex-col', 'gap-1', 'md:gap-1.5')}>
                      <h3 className={cn('font-medium', 'text-sm', 'md:text-base', 'text-black', 'dark:text-white', 'truncate', 'tracking-wide', 'group-hover:text-[#DB4444]', 'transition-colors')}>
                        {relatedProd.productName}
                      </h3>
                      <div className={cn('flex', 'items-center', 'gap-2', 'md:gap-3')}>
                        <span className={cn('text-[#DB4444]', 'font-semibold', 'text-sm', 'md:text-base')}>${relatedProd.price}</span>
                        {relatedProd.oldPrice && (
                          <span className={cn('text-gray-400', 'line-through', 'text-xs', 'md:text-sm', 'font-medium')}>${relatedProd.oldPrice}</span>
                        )}
                      </div>
                      <div className={cn('flex', 'items-center', 'gap-1', 'md:gap-2')}>
                        <div className={cn('flex', 'items-center', 'scale-90', 'md:scale-100', 'origin-left')}>{renderStars(relatedProd.rating || 5)}</div>
                        <span className={cn('text-gray-400', 'dark:text-zinc-500', 'text-[10px]', 'md:text-xs', 'font-semibold')}>
                          ({relatedProd.reviewsCount || 0})
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
        )}
      </motion.div>
    </div>
  )
}