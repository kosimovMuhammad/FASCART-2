"use client"

import { axiosInstance } from '@/Api/axiosInstance'
import {
  ArrowLeft,
  ArrowRight, 
  Baby,
  Dumbbell,
  HelpCircle,
  Home,
  Laptop,
  Shirt
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import { cn } from "@/lib/utils";

interface Category {
  id: number
  categoryName: string
  categoryImage?: string | null
  image?: string | null 
}

const IMAGE_URL = 'https://fastcard-1-o23z.onrender.com/images/';
const getImageUrl = (imageName?: string | null): string => {
  if (!imageName) return '';
  if (/^(https?:|blob:|data:)/.test(imageName)) return imageName;
  return `${IMAGE_URL}${imageName.replace(/^\//, '')}`;
};

export default function BrowseByCategory() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  const getCategoryIcon = (name: string) => {
    if (!name) return <HelpCircle className={cn('w-10', 'h-10', 'stroke-[1.2]')} />;
    switch (name.toLowerCase()) {
      case 'electronics':
        return <Laptop className={cn('w-10', 'h-10', 'stroke-[1.2]')} />
      case 'fashion':
        return <Shirt className={cn('w-10', 'h-10', 'stroke-[1.2]')} />
      case 'home & garden':
        return <Home className={cn('w-10', 'h-10', 'stroke-[1.2]')} />
      case 'sports':
        return <Dumbbell className={cn('w-10', 'h-10', 'stroke-[1.2]')} />
      case 'toys':
        return <Baby className={cn('w-10', 'h-10', 'stroke-[1.2]')} />
      default:
        return <HelpCircle className={cn('w-10', 'h-10', 'stroke-[1.2]')} />
    }
  }

  // ИСЛОҲОТИ АСОСӢ БАРОИ НИШОН ДОДАНИ НОМ:
  const getDisplayName = (name: string) => {
    if (!name) return 'Unknown';
    const lowerName = name.toLowerCase();
    
    // Агар номҳои стандартӣ бошанд, тарҷумаи онҳоро мекобад
    if (lowerName === 'electronics') return t('category_Electronics', 'Electronics');
    if (lowerName === 'fashion') return t('category_Fashion', 'Fashion');
    if (lowerName === 'home & garden') return t('category_Home_Garden', 'Home & Garden');
    if (lowerName === 'sports') return t('category_Sports', 'Sports');
    if (lowerName === 'toys') return t('category_Toys', 'Toys');
    
    // Агар категорияи нав аз база бошад, бевосита номи аслиашро бармегардонад!
    return name;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/Category/get-categories')
        const data = response.data?.data || response.data;
        if (Array.isArray(data)) {
          setCategories(data)
        } else if (data && Array.isArray(data.items)) {
          setCategories(data.items)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'select-none', 'transition-colors', 'duration-300', 'border-b', 'border-gray-100', 'dark:border-zinc-900', 'overflow-hidden')}>
      
      <div className={cn('flex', 'items-center', 'gap-4', 'mb-6', 'animate-in', 'fade-in', 'slide-in-from-left-5', 'duration-500')}>
        <div className={cn('w-5', 'h-10', 'bg-[#DB4444]', 'rounded-sm')} />
        <span className={cn('text-[#DB4444]', 'font-semibold', 'text-base')}>{t('categoriesTitle', 'Categories')}</span>
      </div>

      <div className={cn('flex', 'items-center', 'justify-between', 'gap-6', 'mb-10', 'animate-in', 'fade-in', 'slide-in-from-left-7', 'duration-600')}>
        <h2 className={cn('text-3xl', 'md:text-4xl', 'font-bold', 'tracking-wide', 'text-black', 'dark:text-white')}>
          {t('browseByCategory', 'Browse By Category')}
        </h2>

        <div className={cn('flex', 'gap-2.5')}>
          <button 
            onClick={() => swiperInstance?.slidePrev()}
            className={cn('w-12', 'h-12', 'rounded-full', 'bg-gray-100', 'dark:bg-zinc-900', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'hover:bg-[#DB4444]', 'hover:text-white', 'active:scale-95', 'border', 'dark:border-zinc-800', 'hover:border-transparent', 'transition-all', 'duration-200', 'shadow-sm')}
          >
            <ArrowLeft className={cn('w-5', 'h-5')} />
          </button>
          <button 
            onClick={() => swiperInstance?.slideNext()}
            className={cn('w-12', 'h-12', 'rounded-full', 'bg-gray-100', 'dark:bg-zinc-900', 'flex', 'items-center', 'justify-center', 'text-black', 'dark:text-white', 'hover:bg-[#DB4444]', 'hover:text-white', 'active:scale-95', 'border', 'dark:border-zinc-800', 'hover:border-transparent', 'transition-all', 'duration-200', 'shadow-sm')}
          >
            <ArrowRight className={cn('w-5', 'h-5')} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className={cn('grid', 'grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-6', 'gap-6')}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={cn('w-full', 'h-[145px]', 'bg-gray-50', 'dark:bg-zinc-900', 'rounded-md', 'animate-pulse', 'border', 'dark:border-zinc-800')} />
          ))}
        </div>
      ) : (
        <div className={cn('w-full', 'animate-in', 'fade-in', 'slide-in-from-bottom-6', 'duration-700')}>
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              480: { slidesPerView: 3, spaceBetween: 15 },
              640: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 30 }
            }}
            className={cn('w-full', 'overflow-visible', 'py-2')}
          >
            {categories.map((category) => {
              const isActive = activeCategoryId === category.id
              const imageSource = category.categoryImage || category.image;
              
              return (
                <SwiperSlide key={category.id}>
                  <div
                    onClick={() => setActiveCategoryId(category.id)}
                    className={`group flex flex-col items-center justify-center gap-4 h-[145px] rounded-md border cursor-pointer transition-all duration-300 active:scale-95
                      ${isActive 
                        ? 'bg-[#DB4444] border-transparent text-white shadow-md shadow-[#DB4444]/20' 
                        : 'bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 text-black dark:text-zinc-200 hover:border-transparent hover:bg-[#DB4444] hover:text-white dark:hover:bg-[#DB4444] dark:hover:text-white hover:shadow-lg hover:shadow-[#DB4444]/10'
                      }`}
                  >
                    
                    <div className={`transition-transform duration-300 group-hover:scale-110 flex items-center justify-center w-12 h-12 ${isActive ? 'scale-110' : ''}`}>
                      {imageSource ? (
                        <img 
                          src={getImageUrl(imageSource)} 
                          alt={category.categoryName} 
                          className={`w-10 h-10 object-contain ${isActive ? 'brightness-0 invert' : 'group-hover:brightness-0 group-hover:invert transition-all duration-300'}`} 
                        />
                      ) : (
                        getCategoryIcon(category.categoryName)
                      )}
                    </div>

                    <span className={cn('text-base', 'font-normal', 'tracking-wide', 'text-center', 'px-2', 'block', 'truncate', 'max-w-full')}>
                      {/* НОМ ДУРУСТ НИШОН ДОДА МЕШАВАД */}
                      {getDisplayName(category.categoryName)}
                    </span>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
    </div>
  )
}