"use client"

import { ArrowLeft, ArrowRight, Eye, Heart, Star } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchFlashProducts, getImageUrl } from '@/redux/productSlice'
import { addToWishlist } from '@/redux/wishlistSlice'
import { addToCart } from '@/redux/cartSlice'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/navigation'
import { cn } from "@/lib/utils";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
}

export default function FlashSales() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { flashProducts, flashLoading, error } = useAppSelector((state) => state.products)
  const swiperRef = useRef<any>(null)

  const [filters] = useState({
    productName: '',
    minPrice: '',
    maxPrice: '',
    brandId: '',
    colorId: '',
    categoryId: '',
    subcategoryId: '',
    pageNumber: 1,
    pageSize: 12
  })

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 3)
    targetDate.setHours(23, 59, 59, 999)

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(fetchFlashProducts(filters))
  }, [filters, dispatch])

  const formatNumber = (num: number) => String(num).padStart(2, '0')

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

      { }
      <motion.div variants={itemVariants} className={cn('flex', 'items-center', 'gap-4', 'mb-6')}>
        <div className={cn('w-5', 'h-10', 'bg-[#DB4444]', 'rounded-sm')} />
        <span className={cn('text-[#DB4444]', 'font-semibold', 'text-base')}>{t('todays')}</span>
      </motion.div>

      { }
      <motion.div variants={itemVariants} className={cn('flex', 'flex-col', 'md:flex-row', 'md:items-end', 'justify-between', 'gap-6', 'mb-10')}>
        <div className={cn('flex', 'flex-col', 'md:flex-row', 'md:items-center', 'gap-8', 'md:gap-20')}>
          <h2 className={cn('text-3xl', 'md:text-4xl', 'font-bold', 'tracking-wide', 'text-black', 'dark:text-white')}>
            {t('flashSales')}
          </h2>

          { }
          <div className={cn('flex', 'items-center', 'gap-4', 'text-black', 'dark:text-white', 'bg-gray-50', 'dark:bg-zinc-900/50', 'px-4', 'py-2', 'rounded-lg', 'backdrop-blur-sm', 'border', 'border-gray-100', 'dark:border-zinc-900', 'shadow-sm')}>
            <div className={cn('flex', 'flex-col', 'items-center', 'w-10')}>
              <span className={cn('text-[10px]', 'font-bold', 'uppercase', 'tracking-wider', 'text-gray-400', 'dark:text-zinc-500', 'mb-0.5')}>{t('days')}</span>
              <span className={cn('text-2xl', 'md:text-3xl', 'font-bold', 'tracking-wider', 'tabular-nums')}>{formatNumber(timeLeft.days)}</span>
            </div>
            <span className={cn('text-[#DB4444]', 'text-2xl', 'font-bold', 'animate-pulse', 'mb-1')}>:</span>
            <div className={cn('flex', 'flex-col', 'items-center', 'w-10')}>
              <span className={cn('text-[10px]', 'font-bold', 'uppercase', 'tracking-wider', 'text-gray-400', 'dark:text-zinc-500', 'mb-0.5')}>{t('hours')}</span>
              <span className={cn('text-2xl', 'md:text-3xl', 'font-bold', 'tracking-wider', 'tabular-nums')}>{formatNumber(timeLeft.hours)}</span>
            </div>
            <span className={cn('text-[#DB4444]', 'text-2xl', 'font-bold', 'animate-pulse', 'mb-1')}>:</span>
            <div className={cn('flex', 'flex-col', 'items-center', 'w-10')}>
              <span className={cn('text-[10px]', 'font-bold', 'uppercase', 'tracking-wider', 'text-gray-400', 'dark:text-zinc-500', 'mb-0.5')}>{t('mins')}</span>
              <span className={cn('text-2xl', 'md:text-3xl', 'font-bold', 'tracking-wider', 'tabular-nums')}>{formatNumber(timeLeft.minutes)}</span>
            </div>
            <span className={cn('text-[#DB4444]', 'text-2xl', 'font-bold', 'animate-pulse', 'mb-1')}>:</span>
            <div className={cn('flex', 'flex-col', 'items-center', 'w-10')}>
              <span className={cn('text-[10px]', 'font-bold', 'uppercase', 'tracking-wider', 'text-gray-400', 'dark:text-zinc-500', 'mb-0.5')}>{t('secs')}</span>
              <motion.span
                key={timeLeft.seconds}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn('text-2xl', 'md:text-3xl', 'font-bold', 'tracking-wider', 'tabular-nums', 'text-[#DB4444]')}
              >
                {formatNumber(timeLeft.seconds)}
              </motion.span>
            </div>
          </div>
        </div>

        { }
        <div className={cn('flex', 'gap-2.5')}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swiperRef.current?.swiper && swiperRef.current.swiper.slidePrev()}
            className={cn('w-12', 'h-12', 'rounded-full', 'bg-gray-100', 'dark:bg-zinc-900', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'hover:bg-[#DB4444]', 'hover:text-white', 'border', 'dark:border-zinc-800', 'hover:border-transparent', 'dark:hover:border-transparent', 'shadow-sm', 'hover:shadow-md', 'transition-colors', 'duration-200')}
          >
            <ArrowLeft className={cn('w-5', 'h-5')} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swiperRef.current?.swiper && swiperRef.current.swiper.slideNext()}
            className={cn('w-12', 'h-12', 'rounded-full', 'bg-gray-100', 'dark:bg-zinc-900', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'hover:bg-[#DB4444]', 'hover:text-white', 'border', 'dark:border-zinc-800', 'hover:border-transparent', 'dark:hover:border-transparent', 'shadow-sm', 'hover:shadow-md', 'transition-colors', 'duration-200')}
          >
            <ArrowRight className={cn('w-5', 'h-5')} />
          </motion.button>
        </div>
      </motion.div>

      {error && (
        <div className={cn('text-center', 'text-red-500', 'py-4', 'font-medium')}>{error}</div>
      )}

      { }
      <motion.div variants={itemVariants}>
        {flashLoading ? (
          <div className={cn('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-8')}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={cn('w-full', 'h-[360px]', 'bg-gray-100', 'dark:bg-zinc-900', 'rounded-md', 'animate-pulse')} />
            ))}
          </div>
        ) : !flashProducts || flashProducts.length === 0 ? (
          <div className={cn('w-full', 'h-64', 'flex', 'flex-col', 'items-center', 'justify-center', 'border', 'border-dashed', 'border-gray-200', 'dark:border-zinc-800', 'rounded-xl')}>
            <p className={cn('text-gray-400', 'dark:text-zinc-500', 'text-lg', 'font-medium')}>{t('noProducts')}</p>
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
              {flashProducts.map((product) => (
                <SwiperSlide key={product.id} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className={cn('group', 'flex', 'flex-col', 'relative', 'bg-white', 'dark:bg-zinc-950', 'rounded-md', 'transition-all', 'duration-300', 'hover:shadow-xl', 'dark:hover:shadow-zinc-900/40', 'border', 'border-transparent', 'dark:border-transparent', 'hover:border-gray-100', 'dark:hover:border-zinc-900', 'p-2', 'h-full')}
                  >

                    { }
                    <div className={cn('w-full', 'h-[250px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900/70', 'rounded-md', 'flex', 'items-center', 'justify-center', 'p-6', 'relative', 'overflow-hidden', 'border', 'border-transparent', 'dark:border-zinc-900', 'group-hover:border-gray-200', 'dark:group-hover:border-zinc-800', 'transition-all', 'duration-300')}>
                      {product.discount && (
                        <span className={cn('absolute', 'top-3', 'left-3', 'bg-[#DB4444]', 'text-white', 'text-xs', 'font-semibold', 'px-2.5', 'py-1', 'rounded-sm', 'z-10', 'shadow-sm')}>
                          -{product.discount}%
                        </span>
                      )}

                      { }
                      <div className={cn('absolute', 'top-3', 'right-3', 'flex', 'flex-col', 'gap-2', 'z-10', 'translate-x-10', 'opacity-0', 'group-hover:translate-x-0', 'group-hover:opacity-100', 'transition-all', 'duration-300')}>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => dispatch(addToWishlist(product))} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-md', 'hover:bg-[#DB4444]', 'hover:text-white', 'dark:hover:bg-[#DB4444]', 'transition-colors', 'duration-200')}>
                          <Heart className={cn('w-4', 'h-4')} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => handleProductClick(product)} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-md', 'hover:bg-[#DB4444]', 'hover:text-white', 'dark:hover:bg-[#DB4444]', 'transition-colors', 'duration-200')}>
                          <Eye className={cn('w-4', 'h-4')} />
                        </motion.button>
                      </div>

                      { }
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.productName}
                      />

                      { }
                      <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className={cn('absolute', 'bottom-0', 'left-0', 'right-0', 'h-11', 'bg-black', 'dark:bg-zinc-800', 'text-white', 'text-sm', 'font-semibold', 'opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'transform', 'translate-y-4', 'group-hover:translate-y-0', 'flex', 'items-center', 'justify-center', 'gap-2', 'active:bg-[#DB4444]', 'dark:active:bg-[#DB4444]')}>
                        {t('addToCart')}
                      </button>
                    </div>

                    { }
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

      { }
      <motion.div
        variants={itemVariants}
        className={cn('w-full', 'flex', 'justify-center', 'mt-12')}
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/products')}
          className={cn('bg-[#DB4444]', 'text-white', 'font-semibold', 'text-base', 'px-12', 'py-4', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-all', 'duration-200', 'shadow-md', 'hover:shadow-xl', 'hover:shadow-[#DB4444]/20')}
        >
          {t('viewAllProducts')}
        </motion.button>
      </motion.div>

    </motion.div>
  )
}