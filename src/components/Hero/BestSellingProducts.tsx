"use client"

import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Eye, Heart, Star } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchBestSellers, getImageUrl } from '@/redux/productSlice'
import { addToWishlist } from '@/redux/wishlistSlice'
import { addToCart } from '@/redux/cartSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { motion, type Variants } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/navigation'
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

export default function BestSellingProducts() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const swiperRef = useRef<any>(null)

  const { bestSellers, bestSellersLoading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchBestSellers(10))
  }, [dispatch])

  const handleProductClick = (product: any) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }))
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'select-none', 'transition-colors', 'duration-300', 'overflow-hidden')}
    >

      <motion.div variants={itemVariants} className={cn('flex', 'items-center', 'gap-4', 'mb-6')}>
        <div className={cn('w-5', 'h-10', 'bg-[#DB4444]', 'rounded-sm')} />
        <span className={cn('text-[#DB4444]', 'font-semibold', 'text-base')}>{t('thisMonth')}</span>
      </motion.div>

      <motion.div variants={itemVariants} className={cn('flex', 'items-center', 'justify-between', 'gap-6', 'mb-10')}>
        <h2 className={cn('text-3xl', 'md:text-4xl', 'font-bold', 'tracking-wide', 'text-black', 'dark:text-white')}>
          {t('bestSellingProducts')}
        </h2>

        <div className={cn('flex', 'items-center', 'gap-3', 'shrink-0')}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className={cn('bg-[#DB4444]', 'text-white', 'font-medium', 'text-sm', 'md:text-base', 'px-6', 'py-2.5', 'md:px-10', 'md:py-3.5', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-all', 'duration-200', 'shadow-sm', 'hover:shadow-md', 'hover:shadow-[#DB4444]/10')}
          >
            {t('viewAll')}
          </motion.button>
        </div>
      </motion.div>

      {error && (
        <div className={cn('text-center', 'text-red-500', 'py-4', 'font-medium')}>{error}</div>
      )}

      <motion.div variants={itemVariants}>
        {bestSellersLoading ? (
          <div className={cn('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-8')}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={cn('w-full', 'h-[360px]', 'bg-gray-100', 'dark:bg-zinc-900', 'rounded-md', 'animate-pulse')} />
            ))}
          </div>
        ) : !bestSellers || bestSellers.length === 0 ? (
          <div className={cn('w-full', 'h-48', 'flex', 'items-center', 'justify-center', 'border', 'border-dashed', 'border-gray-200', 'dark:border-zinc-800', 'rounded-xl')}>
            <p className={cn('text-gray-400', 'dark:text-zinc-500', 'text-lg', 'font-medium')}>No products found</p>
          </div>
        ) : (
          <div className="w-full">
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 25 },
                1024: { slidesPerView: 4, spaceBetween: 30 }
              }}
              className={cn('w-full', 'overflow-visible!', 'py-4')}
            >
              {bestSellers.map((product) => (
                <SwiperSlide key={product.id} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={cn('group', 'flex', 'flex-col', 'relative', 'bg-white', 'dark:bg-zinc-950', 'rounded-md', 'transition-all', 'duration-300', 'hover:shadow-xl', 'dark:hover:shadow-zinc-900/40', 'border', 'border-transparent', 'dark:border-transparent', 'hover:border-gray-100', 'dark:hover:border-zinc-900', 'p-2', 'h-full')}
                  >

                    <div className={cn('w-full', 'h-[250px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900/70', 'rounded-md', 'flex', 'items-center', 'justify-center', 'p-6', 'relative', 'overflow-hidden', 'border', 'border-transparent', 'dark:border-zinc-900', 'group-hover:border-gray-200', 'dark:group-hover:border-zinc-800', 'transition-all', 'duration-300')}>

                      {product.discount && (
                        <span className={cn('absolute', 'top-3', 'left-3', 'bg-[#DB4444]', 'text-white', 'text-xs', 'font-semibold', 'px-2.5', 'py-1', 'rounded-sm', 'z-10', 'shadow-sm')}>
                          -{product.discount}%
                        </span>
                      )}

                      <div className={cn('absolute', 'top-3', 'right-3', 'flex', 'flex-col', 'gap-2', 'z-10', 'translate-x-10', 'opacity-0', 'group-hover:translate-x-0', 'group-hover:opacity-100', 'transition-all', 'duration-300')}>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => dispatch(addToWishlist(product))} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-md', 'hover:bg-[#DB4444]', 'hover:text-white', 'dark:hover:bg-[#DB4444]', 'transition-colors', 'duration-200')}>
                          <Heart className={cn('w-4', 'h-4')} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => handleProductClick(product)} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-md', 'hover:bg-[#DB4444]', 'hover:text-white', 'dark:hover:bg-[#DB4444]', 'transition-colors', 'duration-200')}>
                          <Eye className={cn('w-4', 'h-4')} />
                        </motion.button>
                      </div>

                      <img
                        src={getImageUrl(product.image)}
                        alt={product.productName}
                      />

                      <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className={cn('absolute', 'bottom-0', 'left-0', 'right-0', 'h-11', 'bg-black', 'dark:bg-zinc-800', 'text-white', 'text-sm', 'font-semibold', 'opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'transform', 'translate-y-4', 'group-hover:translate-y-0', 'flex', 'items-center', 'justify-center', 'gap-2', 'active:bg-[#DB4444]', 'dark:active:bg-[#DB4444]')}>
                        {t('addToCart')}
                      </button>
                    </div>

                    <div className={cn('flex', 'flex-col', 'gap-2.5', 'pt-4', 'px-1', 'pb-2')}>
                      <h3 className={cn('text-base', 'font-semibold', 'text-black', 'dark:text-zinc-100', 'truncate', 'group-hover:text-[#DB4444]', 'transition-colors', 'duration-200')}>
                        {product.productName}
                      </h3>

                      <div className={cn('flex', 'items-center', 'gap-3')}>
                        <span className={cn('text-[#DB4444]', 'font-bold', 'text-lg')}>${product.price}</span>
                        {product.oldPrice && (
                          <span className={cn('text-gray-400', 'dark:text-zinc-500', 'line-through', 'text-sm', 'font-medium')}>${product.oldPrice}</span>
                        )}
                      </div>

                      <div className={cn('flex', 'items-center', 'gap-2')}>
                        <div className={cn('flex', 'items-center', 'text-[#FFAD33]')}>
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${index < Math.floor(product.rating || 5) ? 'fill-[#FFAD33] text-[#FFAD33]' : 'text-gray-200 dark:text-zinc-800'}`}
                            />
                          ))}
                        </div>
                        <span className={cn('text-xs', 'font-bold', 'text-gray-400', 'dark:text-zinc-500', 'tabular-nums')}>
                          ({product.reviewsCount || 0})
                        </span>
                      </div>
                    </div>

                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </motion.div>

    </motion.div>
  )
}