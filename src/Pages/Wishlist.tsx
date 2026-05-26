"use client"

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Trash2, Eye, Star } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { removeFromWishlist, clearWishlist } from '@/redux/wishlistSlice'
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

export default function Wishlist() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const { exploreProducts, exploreLoading } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchExploreProducts({ pageNumber: 1, pageSize: 4 }))
  }, [dispatch])

  const handleRemoveFromWishlist = (id: string | number) => {
    dispatch(removeFromWishlist(id))
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ product, quantity: 1 }))
  }

  const handleMoveAllToBag = () => {
    wishlistItems.forEach(item => dispatch(addToCart({ product: item, quantity: 1 })))
    dispatch(clearWishlist())
  }

  const handleProductClick = (product: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    navigate(`/product/${product.id}`)
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
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'select-none', 'transition-colors', 'duration-300', 'min-h-screen')}>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className={cn('flex', 'items-center', 'justify-between', 'mb-10')}>
          <h2 className={cn('text-xl', 'md:text-2xl', 'font-medium', 'tracking-wide', 'text-black', 'dark:text-white')}>
            {t('wishlist.title', 'Wishlist')} ({wishlistItems.length})
          </h2>
          {wishlistItems.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleMoveAllToBag}
              className={cn('px-6', 'py-3', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'text-sm', 'font-medium', 'text-black', 'dark:text-white', 'hover:bg-[#DB4444]', 'hover:text-white', 'hover:border-[#DB4444]', 'transition-all', 'duration-200')}
            >
              {t('wishlist.moveAllToBag', 'Move All To Bag')}
            </motion.button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <motion.div 
            variants={fadeIn}
            className={cn('w-full', 'h-64', 'flex', 'flex-col', 'items-center', 'justify-center', 'border', 'border-dashed', 'border-gray-200', 'dark:border-zinc-800', 'rounded-xl', 'gap-4')}
          >
            <div className={cn('w-20', 'h-20', 'rounded-full', 'bg-gray-100', 'dark:bg-zinc-900', 'flex', 'items-center', 'justify-center')}>
              <svg className={cn('w-10', 'h-10', 'text-gray-300', 'dark:text-zinc-600')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className={cn('text-gray-400', 'dark:text-zinc-500', 'text-lg', 'font-medium')}>
              {t('wishlist.empty', 'Your wishlist is empty')}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/')}
              className={cn('mt-2', 'bg-[#DB4444]', 'text-white', 'font-medium', 'text-sm', 'px-8', 'py-3', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-colors', 'duration-200', 'shadow-sm')}
            >
              {t('wishlist.returnToShop', 'Return To Shop')}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className={cn('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-x-8', 'gap-y-10')}
          >
            {wishlistItems.map((product) => {
              // ИСЛОҲОТ: Гирифтани суроғаи расм 
              const imageSource = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);

              return (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className={cn('group', 'flex', 'flex-col')}
                >
                  <div className={cn('relative', 'w-full', 'h-[250px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'transition-colors', 'duration-300')}>
                    
                    {product.discount && product.discount > 0 && (
                      <span className={cn('absolute', 'top-3', 'left-3', 'bg-[#DB4444]', 'text-white', 'text-xs', 'font-semibold', 'px-2.5', 'py-1', 'rounded-sm', 'z-10', 'shadow-sm')}>
                        -{product.discount}%
                      </span>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFromWishlist(product.id)
                      }}
                      className={cn('absolute', 'top-3', 'right-3', 'w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors', 'duration-200', 'z-10')}
                    >
                      <Trash2 className={cn('w-4', 'h-4')} />
                    </motion.button>

                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                      // ИСЛОҲОТ: Истифодаи getImageUrl барои нишон додани расм
                      src={imageSource ? getImageUrl(imageSource) : '/placeholder-product.png'}
                      alt={product.productName}
                      className={cn('max-w-[180px]', 'max-h-[180px]', 'object-contain', 'transition-transform', 'duration-300', 'cursor-pointer')}
                      onClick={() => handleProductClick(product)}
                    />

                    <button
                      className={cn('absolute', 'bottom-0', 'left-0', 'right-0', 'h-11', 'bg-black', 'dark:bg-zinc-800', 'text-white', 'text-sm', 'font-semibold', 'opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'transform', 'translate-y-4', 'group-hover:translate-y-0', 'flex', 'items-center', 'justify-center', 'gap-2', 'active:bg-[#DB4444]', 'dark:active:bg-[#DB4444]')}
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                    >
                      {t('addToCart', 'Add To Cart')}
                    </button>
                  </div>

                  <div className={cn('flex', 'flex-col', 'gap-2', 'pt-4', 'px-1', 'pb-2')}>
                    <h3 className={cn('text-base', 'font-semibold', 'text-black', 'dark:text-zinc-100', 'truncate')}>
                      {product.productName}
                    </h3>
                    <div className={cn('flex', 'items-center', 'gap-3')}>
                      <span className={cn('text-[#DB4444]', 'font-bold', 'text-lg')}>${product.price}</span>
                      {product.oldPrice && (
                        <span className={cn('text-gray-400', 'dark:text-zinc-500', 'line-through', 'text-sm', 'font-medium')}>${product.oldPrice}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>

      <div className={cn('my-16', 'border-t', 'border-gray-100', 'dark:border-zinc-900')} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeIn}
      >
        <div className={cn('flex', 'items-center', 'justify-between', 'mb-10')}>
          <div className={cn('flex', 'items-center', 'gap-4')}>
            <div className={cn('w-5', 'h-10', 'bg-[#DB4444]', 'rounded-sm')} />
            <h2 className={cn('text-xl', 'md:text-2xl', 'font-medium', 'tracking-wide', 'text-black', 'dark:text-white')}>
              {t('wishlist.justForYou', 'Just For You')}
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className={cn('px-6', 'py-3', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'text-sm', 'font-medium', 'text-black', 'dark:text-white', 'hover:bg-[#DB4444]', 'hover:text-white', 'hover:border-[#DB4444]', 'transition-all', 'duration-200')}
          >
            {t('wishlist.seeAll', 'See All')}
          </motion.button>
        </div>

        {exploreLoading ? (
          <div className={cn('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-8')}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className={cn('w-full', 'h-[380px]', 'bg-gray-100', 'dark:bg-zinc-900', 'animate-pulse', 'rounded-sm')} />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className={cn('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-x-8', 'gap-y-12')}
          >
            {exploreProducts.slice(0, 4).map((product: Product) => {
              // ИСЛОҲОТ: Гирифтани суроғаи расм барои "Just For You"
              const imageSource = product.image || (product.images && product.images.length > 0 ? product.images[0] : null);

              return (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className={cn('group', 'flex', 'flex-col', 'justify-between', 'cursor-pointer')}
                  onClick={() => handleProductClick(product)}
                >
                  <div className={cn('relative', 'w-full', 'h-[250px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'rounded-sm', 'flex', 'items-center', 'justify-center', 'overflow-hidden', 'transition-colors', 'duration-300')}>
                    
                    {product.discount && product.discount > 0 && (
                      <div className={cn('absolute', 'top-3', 'left-3', 'bg-[#00C853]', 'text-white', 'text-xs', 'px-3', 'py-1', 'rounded-sm', 'font-medium', 'z-10')}>
                        -{product.discount}%
                      </div>
                    )}

                    <div className={cn('absolute', 'top-3', 'right-3', 'flex', 'flex-col', 'gap-2', 'z-10')} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => handleProductClick(product)} className={cn('w-9', 'h-9', 'rounded-full', 'bg-white', 'dark:bg-zinc-800', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'shadow-sm', 'hover:bg-[#DB4444]', 'hover:text-white', 'transition-colors', 'duration-200')}>
                        <Eye className={cn('w-5', 'h-5')} />
                      </button>
                    </div>

                    <motion.img
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.3 }}
                      // ИСЛОҲОТ: Истифодаи getImageUrl барои нишон додани расм
                      src={imageSource ? getImageUrl(imageSource) : '/placeholder-product.png'}
                      alt={product.productName}
                      className={cn('max-w-[180px]', 'max-h-[180px]', 'object-contain', 'transition-transform', 'duration-300')}
                    />

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
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}