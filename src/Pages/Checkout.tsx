"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { clearCart } from '@/redux/cartSlice'
import { CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from "@/lib/utils";
import { getImageUrl } from '@/redux/productSlice'

export default function Checkout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const cartItems = useAppSelector(state => state.cart.items)
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const total = subtotal 
  
  const [paymentMethod] = useState('bank')
  const [showModal, setShowModal] = useState(false)
  
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    apartment: '',
    townCity: '',
    phone: '',
    email: '',
    saveInfo: true
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    dispatch(clearCart())
    navigate('/')
  }

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-8', 'md:py-16', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'transition-colors', 'min-h-screen')}>
      
      {}
      <div className={cn('flex', 'items-center', 'gap-2', 'text-sm', 'text-gray-500', 'dark:text-zinc-400', 'mb-12')}>
        <Link to="/product/1" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>Product</Link>
        <span>/</span>
        <Link to="/cart" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>View Cart</Link>
        <span>/</span>
        <span className={cn('text-black', 'dark:text-white', 'font-medium')}>CheckOut</span>
      </div>

      <h1 className={cn('text-4xl', 'font-semibold', 'tracking-wide', 'text-black', 'dark:text-white', 'mb-10')}>
        {t('checkout.title', 'Billing Details')}
      </h1>

      <div className={cn('flex', 'flex-col', 'lg:flex-row', 'gap-16', 'lg:gap-24')}>
        
        {}
        <div className={cn('flex-1', 'max-w-[500px]')}>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className={cn('flex', 'flex-col', 'gap-6')}>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t('checkout.firstName', 'First Name')}
              required
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />
            
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t('checkout.lastName', 'Last Name')}
              required
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />
            
            <Input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder={t('checkout.street', 'Street address')}
              required
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />
            
            <Input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              placeholder={t('checkout.apartment', 'Apartment, floor, etc. (optional)')}
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />
            
            <Input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleChange}
              placeholder={t('checkout.townCity', 'Town/City')}
              required
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />
            
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('checkout.phone', 'Phone number')}
              required
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />
            
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('checkout.email', 'Email address')}
              required
              className={cn('h-12', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 'border-none', 'rounded-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus-visible:ring-1', 'focus-visible:ring-[#DB4444]')}
            />

            <div className={cn('flex', 'items-center', 'space-x-3', 'mt-2')}>
              <Checkbox
                id="saveInfo"
                checked={formData.saveInfo}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saveInfo: checked as boolean }))}
                className={cn('w-5', 'h-5', 'rounded-sm', 'border-gray-400', 'data-[state=checked]:bg-[#DB4444]', 'data-[state=checked]:border-[#DB4444]')}
              />
              <label
                htmlFor="saveInfo"
                className={cn('text-sm', 'text-black', 'dark:text-white', 'font-medium', 'cursor-pointer')}
              >
                {t('checkout.saveInfo', 'Save this information for faster check-out next time')}
              </label>
            </div>
          </form>
        </div>

        {}
        <div className={cn('flex-1', 'max-w-[450px]')}>
          <div className={cn('flex', 'flex-col', 'gap-6')}>
            
            {}
            <div className={cn('flex', 'flex-col', 'gap-4', 'max-h-[300px]', 'overflow-y-auto', 'pr-2', 'custom-scrollbar')}>
              {cartItems.map((item) => (
                <div key={item.id} className={cn('flex', 'items-center', 'justify-between')}>
                  <div className={cn('flex', 'items-center', 'gap-4')}>
                    <div className={cn('relative', 'w-12', 'h-12', 'flex', 'items-center', 'justify-center')}>
                      <img  src={getImageUrl(item.image)}
                  alt={item.productName} className={cn('max-w-[40px]', 'max-h-[40px]', 'object-contain')} />
                    </div>
                    <span className={cn('text-black', 'dark:text-white', 'text-sm', 'font-medium')}>{item.productName}</span>
                  </div>
                  <span className={cn('text-black', 'dark:text-white', 'text-sm', 'font-medium')}>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {}
            <div className={cn('flex', 'flex-col', 'gap-4', 'mt-2')}>
              <div className={cn('flex', 'items-center', 'justify-between', 'border-b', 'border-gray-200', 'dark:border-zinc-800', 'pb-4')}>
                <span className={cn('text-black', 'dark:text-white')}>{t('checkout.subtotal', 'Subtotal:')}</span>
                <span className={cn('text-black', 'dark:text-white', 'font-medium')}>${subtotal}</span>
              </div>
              <div className={cn('flex', 'items-center', 'justify-between', 'border-b', 'border-gray-200', 'dark:border-zinc-800', 'pb-4')}>
                <span className={cn('text-black', 'dark:text-white')}>{t('checkout.shipping', 'Shipping:')}</span>
                <span className={cn('text-black', 'dark:text-white', 'font-medium')}>{t('checkout.free', 'Free')}</span>
              </div>
              <div className={cn('flex', 'items-center', 'justify-between', 'pb-2')}>
                <span className={cn('text-black', 'dark:text-white')}>{t('checkout.total', 'Total:')}</span>
                <span className={cn('text-black', 'dark:text-white', 'font-bold')}>${total}</span>
              </div>
            </div>

            {}
            <div className={cn('flex', 'flex-col', 'gap-4', 'mt-2')}>
              <label className={cn('flex', 'items-center', 'justify-between', 'cursor-pointer', 'group')}>
                <div className={cn('flex', 'items-center', 'gap-3')}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'bank' ? 'border-black dark:border-white' : 'border-gray-400 dark:border-zinc-600'}`}>
                    {paymentMethod === 'bank' && <div className={cn('w-2', 'h-2', 'rounded-full', 'bg-black', 'dark:bg-white')} />}
                  </div>
                  <span className={cn('text-black', 'dark:text-white', 'font-medium')}>{t('checkout.bank', 'Bank')}</span>
                </div>
                {}
                <div className={cn('flex', 'items-center', 'gap-1.5', 'opacity-80')}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/30px-Visa_2021.svg.png" alt="Visa" className={cn('h-4', 'object-contain')} />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/30px-Mastercard_2019_logo.svg.png" alt="Mastercard" className={cn('h-4', 'object-contain')} />
                </div>
              </label>
              
              <label className={cn('flex', 'items-center', 'gap-3', 'cursor-pointer', 'group', 'mt-2')}>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cash' ? 'border-black dark:border-white' : 'border-gray-400 dark:border-zinc-600'}`}>
                  {paymentMethod === 'cash' && <div className={cn('w-2', 'h-2', 'rounded-full', 'bg-black', 'dark:bg-white')} />}
                </div>
                <span className={cn('text-black', 'dark:text-white', 'font-medium')}>{t('checkout.cash', 'Cash on delivery')}</span>
              </label>
            </div>

            {}
            <div className={cn('flex', 'gap-4', 'mt-4')}>
              <input 
                type="text" 
                placeholder={t('checkout.couponPlaceholder', 'Coupon Code')}
                className={cn('flex-1', 'h-12', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-sm', 'px-4', 'bg-transparent', 'text-black', 'dark:text-white', 'placeholder:text-gray-400', 'focus:outline-none', 'focus:border-black', 'dark:focus:border-white')}
              />
              <button className={cn('h-12', 'px-8', 'bg-[#DB4444]', 'text-white', 'font-medium', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-colors', 'shrink-0')}>
                {t('checkout.applyCoupon', 'Apply')}
              </button>
            </div>

            {}
            <button 
              type="submit"
              form="checkout-form"
              className={cn('h-12', 'w-48', 'bg-[#DB4444]', 'text-white', 'font-medium', 'rounded-sm', 'hover:bg-[#bd3535]', 'transition-colors', 'mt-4')}
            >
              {t('checkout.placeOrder', 'Place Order')}
            </button>

          </div>
        </div>
      </div>

      {}
      <AnimatePresence>
        {showModal && (
          <div className={cn('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'p-4')}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn('absolute', 'inset-0', 'bg-black/60', 'backdrop-blur-sm')}
              onClick={handleCloseModal}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn('relative', 'bg-white', 'dark:bg-zinc-900', 'w-full', 'max-w-md', 'rounded-2xl', 'p-8', 'flex', 'flex-col', 'items-center', 'text-center', 'shadow-2xl')}
            >
              <div className={cn('w-20', 'h-20', 'bg-emerald-100', 'dark:bg-emerald-900/30', 'text-emerald-500', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mb-6')}>
                <CheckCircle2 className={cn('w-10', 'h-10')} strokeWidth={2.5} />
              </div>
              <h3 className={cn('text-2xl', 'font-bold', 'text-black', 'dark:text-white', 'mb-2')}>
                {t('checkout.successTitle', 'Order Placed Successfully!')}
              </h3>
              <p className={cn('text-gray-500', 'dark:text-zinc-400', 'mb-8', 'leading-relaxed')}>
                {t('checkout.successMessage', 'Thank you for your purchase. Your order has been placed and is being processed.')}
              </p>
              <button 
                onClick={handleCloseModal}
                className={cn('w-full', 'h-12', 'bg-[#DB4444]', 'text-white', 'font-bold', 'rounded-xl', 'hover:bg-[#bd3535]', 'transition-colors', 'shadow-lg', 'shadow-red-500/20', 'active:scale-95')}
              >
                {t('checkout.backToShop', 'Back to Shop')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
