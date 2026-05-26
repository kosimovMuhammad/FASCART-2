"use client"

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom' 
import { Heart, Eye, Star } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchExploreProducts, getImageUrl, type Product } from '@/redux/productSlice'
import { addToWishlist } from '@/redux/wishlistSlice'
import { addToCart } from '@/redux/cartSlice'
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

export default function ExploreOurProducts() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate() 
  const { exploreProducts, exploreLoading } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchExploreProducts({ pageNumber: 1, pageSize: 8 }))
  }, [dispatch])

  const handleProductClick = (product: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    navigate(`/product/${product.id}`) 
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }))
  }

  const handleViewAllClick = () => {
    navigate('/products') 
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

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'select-none', 'transition-colors', 'duration-300')}>
      <div className={cn('flex', 'items-center', 'gap-4', 'mb-6')}>
        <div className={cn('w-5', 'h-10', 'bg-[#DB4444]', 'rounded-sm')} />
        <span className={cn('text-[#DB4444]', 'font-semibold', 'text-base')}>{t('exploreProducts.badge') || 'Our Products'}</span>
      </div>

      <div className="mb-10">
        <h2 className={cn('text-3xl', 'md:text-4xl', 'font-bold', 'tracking-wide', 'text-black', 'dark:text-white')}>
          {t('exploreProducts.title') || 'Explore Our Products'}
        </h2>
      </div>

      {exploreLoading && exploreProducts.length === 0 ? (
        <div className={cn('flex', 'overflow-x-auto', 'sm:grid', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6', 'pb-6', 'snap-x', 'snap-mandatory', 'hide-scrollbar')}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className={cn('w-[85vw]', 'sm:w-full', 'shrink-0', 'snap-center', 'h-[380px]', 'bg-gray-100', 'dark:bg-zinc-900', 'animate-pulse', 'rounded-sm')} />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className={cn('flex', 'overflow-x-auto', 'sm:grid', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-6', 'pb-6', 'snap-x', 'snap-mandatory', 'hide-scrollbar')}
        >
          {exploreProducts.map((product: Product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              className={cn('group', 'flex', 'flex-col', 'justify-between', 'cursor-pointer', 'w-[85vw]', 'sm:w-auto', 'shrink-0', 'snap-center')}
              onClick={() => handleProductClick(product)}
            >
              <div className={cn('relative', 'w-full', 'h-[250px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'transition-colors', 'duration-300')}>
                {product.discount && product.discount > 0 && (
                  <div className={cn('absolute', 'top-3', 'left-3', 'bg-[#EE4D2D]', 'text-white', 'text-xs', 'px-3', 'py-1', 'rounded-sm', 'font-medium')}>
                    {t('exploreProducts.new') || 'NEW'}
                  </div>
                )}

                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                   src={getImageUrl(product.image)}
                  alt={product.productName}
                  className={cn('max-w-[180px]', 'max-h-[180px]', 'object-contain', 'transition-transform', 'duration-300')}
                />

                <div className={cn('absolute', 'top-3', 'right-3', 'flex', 'flex-col', 'gap-2')} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => dispatch(addToWishlist(product))} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors', 'duration-200')}>
                    <Heart className={cn('w-5', 'h-5')} />
                  </button>
                  <button onClick={() => handleProductClick(product)} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors', 'duration-200')}>
                    <Eye className={cn('w-5', 'h-5')} />
                  </button>
                </div>

                <button
                  className={cn('absolute', 'bottom-0', 'left-0', 'right-0', 'h-11', 'bg-black', 'dark:bg-zinc-800', 'text-white', 'text-sm', 'font-semibold', 'opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'transform', 'translate-y-4', 'group-hover:translate-y-0', 'flex', 'items-center', 'justify-center', 'gap-2', 'active:bg-[#DB4444]', 'dark:active:bg-[#DB4444]')}
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                >
                  {t('addToCart', 'Add To Cart')}
                </button>
              </div>

              <div className={cn('mt-4', 'flex', 'flex-col', 'gap-1.5')}>
                <h3 className={cn('font-medium', 'text-base', 'text-black', 'dark:text-white', 'truncate', 'tracking-wide')}>
                  {product.productName}
                </h3>
                
                <div className={cn('flex', 'items-center', 'gap-3')}>
                  <span className={cn('text-[#DB4444]', 'font-semibold', 'text-base')}>${product.price}</span>
                  {product.oldPrice && (
                    <span className={cn('text-gray-400', 'line-through', 'text-sm', 'font-medium')}>${product.oldPrice}</span>
                  )}
                </div>

                <div className={cn('flex', 'items-center', 'gap-2')}>
                  <div className={cn('flex', 'items-center')}>{renderStars(product.rating || 5)}</div>
                  <span className={cn('text-gray-400', 'dark:text-zinc-500', 'text-xs', 'font-semibold')}>
                    ({product.reviewsCount || 0})
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={cn('flex', 'justify-center', 'mt-16')}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleViewAllClick}
          className={cn('bg-[#DB4444]', 'text-white', 'font-medium', 'text-base', 'px-12', 'py-4', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-colors', 'duration-200', 'shadow-sm')}
        >
          {t('exploreProducts.viewAll') || 'View All Products'}
        </motion.button>
      </motion.div>
    </div>
  )
}