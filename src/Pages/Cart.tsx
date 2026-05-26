"use client"

import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { X, ChevronUp, ChevronDown } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { removeFromCart, updateQuantity, clearCart } from '@/redux/cartSlice'
import { motion, type Variants } from 'framer-motion'
import { cn } from "@/lib/utils";
import { getImageUrl } from '@/redux/productSlice'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function Cart() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { items } = useAppSelector((state) => state.cart)

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-12', 'md:py-16', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'transition-colors', 'duration-300', 'min-h-[60vh]')}>
      
      {}
      <div className={cn('flex', 'items-center', 'gap-2', 'text-sm', 'text-gray-500', 'dark:text-zinc-400', 'mb-12')}>
        <Link to="/" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>{t('cart.home', 'Home')}</Link>
        <span>/</span>
        <span className={cn('text-black', 'dark:text-white', 'font-medium')}>{t('cart.cart', 'Cart')}</span>
      </div>

      {items.length === 0 ? (
        <div className={cn('flex', 'flex-col', 'items-center', 'justify-center', 'py-20', 'text-center')}>
          <h2 className={cn('text-2xl', 'md:text-3xl', 'font-semibold', 'mb-6', 'text-black', 'dark:text-white')}>{t('cart.emptyCart', 'Your cart is empty')}</h2>
          <Link to="/">
            <button className={cn('px-8', 'py-4', 'bg-[#DB4444]', 'text-white', 'rounded-sm', 'font-medium', 'hover:bg-[#bd3535]', 'transition-colors', 'shadow-sm')}>
              {t('cart.returnToShop', 'Return To Shop')}
            </button>
          </Link>
        </div>
      ) : (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className={cn('flex', 'flex-col', 'gap-8')}>
          
          {}
          <div className={cn('hidden', 'md:grid', 'grid-cols-4', 'items-center', 'bg-white', 'dark:bg-zinc-900', 'rounded-sm', 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]', 'px-10', 'py-5')}>
            <span className={cn('text-base', 'font-medium', 'text-black', 'dark:text-white')}>{t('cart.product', 'Product')}</span>
            <span className={cn('text-base', 'font-medium', 'text-black', 'dark:text-white', 'text-center')}>{t('cart.price', 'Price')}</span>
            <span className={cn('text-base', 'font-medium', 'text-black', 'dark:text-white', 'text-center')}>{t('cart.quantity', 'Quantity')}</span>
            <span className={cn('text-base', 'font-medium', 'text-black', 'dark:text-white', 'text-right')}>{t('cart.subtotal', 'Subtotal')}</span>
          </div>

          {}
          <div className={cn('flex', 'flex-col', 'gap-6')}>
            {items.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                className={cn('grid', 'grid-cols-1', 'md:grid-cols-4', 'items-center', 'bg-white', 'dark:bg-zinc-900', 'rounded-sm', 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]', 'px-6', 'md:px-10', 'py-6', 'gap-6', 'md:gap-0', 'relative')}
              >
                {}
                <div className={cn('flex', 'items-center', 'gap-4')}>
                  <div className={cn('relative', 'group', 'w-14', 'h-14', 'shrink-0', 'bg-[#F5F5F5]', 'dark:bg-zinc-800', 'rounded-sm', 'flex', 'items-center', 'justify-center')}>
                    <img   src={getImageUrl(item.image)}
                  alt={item.productName} className={cn('max-w-[40px]', 'max-h-[40px]', 'object-contain')} />
                  </div>
                  <span className={cn('text-sm', 'font-medium', 'text-black', 'dark:text-white', 'line-clamp-2', 'md:line-clamp-1')}>{item.productName}</span>
                </div>

                {}
                <div className={cn('text-black', 'dark:text-white', 'font-medium', 'text-center', 'md:block', 'flex', 'justify-between')}>
                  <span className={cn('md:hidden', 'text-gray-500')}>{t('cart.price', 'Price')}:</span>
                  ${item.price}
                </div>

                {}
                <div className={cn('flex', 'items-center', 'justify-center', 'md:justify-center', 'justify-between')}>
                  <span className={cn('md:hidden', 'text-gray-500')}>{t('cart.quantity', 'Quantity')}:</span>
                  <div className={cn('flex', 'items-center', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'w-16', 'h-10', 'px-2', 'justify-between')}>
                    <span className={cn('font-medium', 'text-black', 'dark:text-white', 'text-sm')}>{String(item.quantity).padStart(2, '0')}</span>
                    <div className={cn('flex', 'flex-col')}>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className={cn('text-gray-500', 'hover:text-black', 'dark:hover:text-white')}>
                        <ChevronUp className={cn('w-3', 'h-3')} />
                      </button>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className={cn('text-gray-500', 'hover:text-black', 'dark:hover:text-white')}>
                        <ChevronDown className={cn('w-3', 'h-3')} />
                      </button>
                    </div>
                  </div>
                </div>

                {}
                <div className={cn('flex', 'items-center', 'justify-between', 'md:justify-end', 'gap-4', 'md:gap-8')}>
                  <span className={cn('md:hidden', 'text-gray-500')}>{t('cart.subtotal', 'Subtotal')}:</span>
                  <div className={cn('flex', 'items-center', 'gap-4', 'sm:gap-8')}>
                    <span className={cn('text-black', 'dark:text-white', 'font-medium')}>${item.price * item.quantity}</span>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className={cn('w-5', 'h-5', 'bg-[#DB4444]', 'text-white', 'rounded-full', 'flex', 'items-center', 'justify-center', 'hover:bg-[#bd3535]', 'transition-colors', 'shrink-0')}
                    >
                      <X className={cn('w-3.5', 'h-3.5')} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {}
          <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-between', 'gap-4', 'mt-2')}>
            <Link to="/" className={cn('w-full', 'sm:w-auto')}>
              <button className={cn('w-full', 'sm:w-auto', 'px-8', 'py-3.5', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'font-medium', 'text-black', 'dark:text-white', 'hover:bg-gray-50', 'dark:hover:bg-zinc-800', 'transition-colors')}>
                {t('cart.returnToShop', 'Return To Shop')}
              </button>
            </Link>
            
            <div className={cn('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'w-full', 'sm:w-auto')}>
              <button className={cn('w-full', 'sm:w-auto', 'px-8', 'py-3.5', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'font-medium', 'text-black', 'dark:text-white', 'hover:bg-gray-50', 'dark:hover:bg-zinc-800', 'transition-colors')}>
                {t('cart.updateCart', 'Update Cart')}
              </button>
              <button 
                onClick={() => dispatch(clearCart())}
                className={cn('w-full', 'sm:w-auto', 'px-8', 'py-3.5', 'border', 'border-[#DB4444]', 'text-[#DB4444]', 'rounded-sm', 'font-medium', 'hover:bg-red-50', 'dark:hover:bg-red-950', 'transition-colors')}
              >
                {t('cart.removeAll', 'Remove all')}
              </button>
            </div>
          </div>

          {}
          <div className={cn('flex', 'flex-col', 'lg:flex-row', 'justify-between', 'gap-10', 'mt-12')}>
            {}
            <div className={cn('flex', 'gap-4', 'h-12', 'w-full', 'lg:w-[500px]')}>
              <input 
                type="text" 
                placeholder={t('cart.couponCode', 'Coupon Code')} 
                className={cn('flex-1', 'h-full', 'px-4', 'border', 'border-black', 'dark:border-zinc-700', 'rounded-sm', 'bg-transparent', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus:outline-none', 'focus:border-[#DB4444]')}
              />
              <button className={cn('px-8', 'h-full', 'bg-[#DB4444]', 'text-white', 'rounded-sm', 'font-medium', 'hover:bg-[#bd3535]', 'transition-colors', 'whitespace-nowrap')}>
                {t('cart.apply', 'Apply')}
              </button>
            </div>

            {}
            <div className={cn('w-full', 'lg:w-[470px]', 'border', 'border-black', 'dark:border-zinc-700', 'rounded-sm', 'p-6', 'md:p-8')}>
              <h3 className={cn('text-lg', 'md:text-xl', 'font-medium', 'text-black', 'dark:text-white', 'mb-6', 'tracking-wide')}>
                {t('cart.cartTotal', 'Cart Total')}
              </h3>
              
              <div className={cn('flex', 'items-center', 'justify-between', 'py-4', 'border-b', 'border-gray-300', 'dark:border-zinc-700')}>
                <span className={cn('text-black', 'dark:text-white')}>{t('cart.subtotal', 'Subtotal')}:</span>
                <span className={cn('text-black', 'dark:text-white')}>${subtotal}</span>
              </div>
              
              <div className={cn('flex', 'items-center', 'justify-between', 'py-4', 'border-b', 'border-gray-300', 'dark:border-zinc-700')}>
                <span className={cn('text-black', 'dark:text-white')}>{t('cart.shipping', 'Shipping')}:</span>
                <span className={cn('text-black', 'dark:text-white')}>{t('cart.free', 'Free')}</span>
              </div>

              <div className={cn('flex', 'items-center', 'justify-between', 'py-4', 'mb-6')}>
                <span className={cn('text-black', 'dark:text-white')}>{t('cart.total', 'Total')}:</span>
                <span className={cn('text-black', 'dark:text-white', 'font-medium')}>${subtotal}</span>
              </div>

              <div className={cn('flex', 'justify-center')}>
                <button 
                  onClick={() => navigate('/checkout')}
                  className={cn('w-[260px]', 'h-12', 'bg-[#DB4444]', 'text-white', 'rounded-sm', 'font-medium', 'hover:bg-[#bd3535]', 'transition-colors', 'shadow-sm')}
                >
                  {t('cart.proceedToCheckout', 'Proceed to checkout')}
                </button>
              </div>
            </div>
          </div>
          
        </motion.div>
      )}
    </div>
  )
}
