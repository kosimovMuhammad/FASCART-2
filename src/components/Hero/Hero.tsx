import img from "@/assets/hero_endframe__cvklg0xk3w6e_large 2 (2).png"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight, ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface ApiCategory {
  id: number;
  categoryName: string;
  categoryImage: string | null;
}

export default function HomeHero() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(2) 

  const [categories, setCategories] = useState<ApiCategory[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Category/get-categories', {
          headers: { 'accept': '*/*' }
        })
        const result = await response.json()
        if (result.statusCode === 200 && result.data) {
          setCategories(result.data)
        }
      } catch (error) {
        console.error("Хатогӣ ҳангоми боркунии категорияҳо:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleCategoryClick = (categoryId: number | string) => {
    if (categoryId === 'all') {
      navigate('/products') 
    } else {
      navigate(`/products?category=${categoryId}`)
    }
  }

  const slides = [
    { id: 1, titleKey: "slides.iphone.title", discountKey: "slides.iphone.discount", img: img },
    { id: 2, titleKey: "slides.samsung.title", discountKey: "slides.samsung.discount", img: img },
    { id: 3, titleKey: "slides.iphonePro.title", discountKey: "slides.iphonePro.discount", img: img },
    { id: 4, titleKey: "slides.macbook.title", discountKey: "slides.macbook.discount", img: img },
    { id: 5, titleKey: "slides.ipad.title", discountKey: "slides.ipad.discount", img: img },
  ]

  return (
    <div className={cn(
      'max-w-7xl', 'mx-auto', 'px-4', 
      'flex', 'flex-col', 'md:flex-row', 
      'gap-4', 'md:gap-8', 
      'pt-6', 'md:pt-10', 'pb-10', 
      'font-sans', 'select-none', 
      'bg-white', 'dark:bg-zinc-950', 
      'transition-colors', 'duration-300'
    )}>
      
      {/* CATEGORIES SIDEBAR / MOBILE GRID */}
      <div className={cn(
        'w-full', 'md:w-[240px]', 'shrink-0',
        'md:border-r', 'md:border-gray-200', 'dark:md:border-zinc-800', 
        'md:pr-6', 'md:h-[380px]', 
        'md:overflow-y-auto',
        '[&::-webkit-scrollbar]:w-1',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full'
      )}>
        
        {loading ? (
          <div className={cn('flex', 'items-center', 'justify-center', 'w-full', 'py-4', 'text-gray-500')}>
            <Loader2 className={cn('w-5', 'h-5', 'animate-spin', 'mr-2')} />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {/* MOBILE GRID: Exactly like the uploaded picture */}
            <div className={cn('grid', 'grid-cols-2', 'gap-2.5', 'md:hidden')}>
              {categories.map((category, index) => {
                // Only the first two items have arrows in the picture
                const hasArrow = index === 0 || index === 1;
                return (
                  <div 
                    key={category.id} 
                    onClick={() => handleCategoryClick(category.id)}
                    className={cn(
                      'flex', 'items-center', 'justify-between', 
                      'bg-[#F5F5F5]', 'dark:bg-zinc-900', // Light gray boxes
                      'text-black', 'dark:text-zinc-200', 
                      'text-[13px]', 'font-normal',
                      'rounded-sm', 'cursor-pointer', 
                      'py-2.5', 'px-3', // Padding to match height
                      'transition-colors', 'hover:bg-gray-200', 'dark:hover:bg-zinc-800'
                    )}
                  >
                    <span className={cn('truncate', 'pr-1')}>{category.categoryName}</span>
                    {hasArrow && (
                      <ChevronRight className={cn('w-3.5', 'h-3.5', 'shrink-0', 'text-black', 'dark:text-white')} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* DESKTOP LIST */}
            <div className={cn('hidden', 'md:flex', 'md:flex-col', 'md:gap-3')}>
              {categories.map((category) => (
                <div 
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    'flex', 'items-center', 'justify-between', 
                    'text-black', 'dark:text-zinc-200', 
                    'text-[15px]', 'font-normal', 
                    'hover:text-[#DB4444]', 'dark:hover:text-[#DB4444]', 
                    'cursor-pointer', 'transition-colors', 'py-1.5'
                  )}
                >
                  <span className={cn('truncate', 'pr-2')}>{category.categoryName}</span>
                  <ChevronRight className={cn('w-5', 'h-5', 'text-gray-400')} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* HERO SLIDER */}
       <div className={cn('flex-1', 'bg-black', 'text-white', 'relative', 'rounded-sm', 'overflow-hidden', 'h-[200px]', 'sm:h-[280px]', 'md:h-[380px]', /* ИСЛОҲОТ: Қадди махсус */ 'border', 'dark:border-zinc-800')}>
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className={cn('w-full', 'h-full')}
        >
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id} className="h-full">
                <div className={cn('px-6', 'md:px-16', 'pt-6', 'md:pt-0', 'flex', 'flex-col', 'md:flex-row', 'items-center', 'md:items-end', 'justify-between', 'gap-4', 'md:gap-6', 'h-full', 'pb-10', 'relative', 'overflow-hidden')}>

                  {current === index && (
                    <div
                      key={`text-${current}`}
                      className={cn('flex', 'flex-col', 'gap-2', 'md:gap-4', 'w-full', 'md:max-w-[320px]', 'z-10', 'md:mb-4', 'text-center', 'md:text-left', 'items-center', 'md:items-start', 'animate-in', 'fade-in', 'slide-in-from-left-10', 'duration-500', 'ease-out')}
                    >
                      <div className={cn('flex', 'items-center', 'gap-3', 'md:gap-6')}>
                        <svg className={cn('w-6', 'h-8', 'md:w-10', 'md:h-12', 'fill-white')} viewBox="0 0 170 170">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.92-14.37-6.13-3.57-2.9-7.46-7.66-11.68-14.24-4.88-7.66-8.91-16.74-12.1-27.23-3.19-10.49-4.79-20.4-4.79-29.74 0-15.03 3.74-26.91 11.21-35.66 7.47-8.74 16.53-13.12 27.18-13.12 4.47 0 9.62 1.25 15.43 3.74 5.81 2.49 9.38 3.73 10.72 3.73 1.62 0 5.43-1.37 11.42-4.11 6-2.73 11.08-4.04 15.22-3.92 14.31.62 25.13 6.05 32.44 16.29-11.72 7.15-17.45 16.92-17.18 29.31.28 9.66 3.79 17.65 10.53 23.95 6.74 6.3 14.54 9.68 23.41 10.15-2.24 6.74-5.27 13.34-9.08 19.81zM119.22 19.01c0-7.14 2.53-13.79 7.59-18.95 5.09-5.16 11.45-7.83 19.06-8.01.12 7.6-2.47 14.28-7.78 20.03-5.32 5.76-11.7 8.78-19.16 9.07-.46-1.12-.71-2.17-.71-3.14z" />
                        </svg>
                        <span className={cn('text-xs', 'md:text-base', 'font-normal', 'tracking-wide', 'text-gray-200')}>{t(slide.titleKey)}</span>
                      </div>

                      <h1 className={cn('text-2xl', 'md:text-5xl', 'font-semibold', 'tracking-wide', 'leading-tight', 'md:leading-[60px]', 'max-w-[280px]', 'md:max-w-none')}>
                        {t(slide.discountKey)}
                      </h1>

                      <div className={cn('flex', 'items-center', 'gap-2', 'mt-1', 'md:mt-2', 'group', 'cursor-pointer', 'w-fit')}>
                        <span className={cn('text-sm', 'md:text-base', 'font-medium', 'border-b', 'border-white/60', 'pb-1', 'group-hover:border-white', 'transition-all')}>
                          {t('common.shopNow', 'Shop Now')}
                        </span>
                        <ArrowRight className={cn('w-4', 'h-4', 'md:w-5', 'md:h-5', 'transition-transform', 'group-hover:translate-x-1.5')} />
                      </div>
                    </div>
                  )}

                  {current === index && (
                    <div
                      key={`img-${current}`}
                      className={cn('absolute', 'md:relative', 'w-full', 'md:w-[440px]', 'h-full', 'flex', 'items-end', 'justify-end', 'overflow-hidden', 'animate-in', 'fade-in', 'slide-in-from-right-10', 'duration-600', 'ease-out', 'opacity-30', 'md:opacity-100')}
                    >
                      <img
                        src={slide.img}
                        alt="Product item"
                        className={cn('object-contain', 'max-h-full', 'w-auto', 'md:w-full', 'object-bottom-right', 'transform', 'transition-transform', 'duration-500')}
                      />
                    </div>
                  )}

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className={cn('absolute', 'bottom-4', 'left-1/2', 'transform', '-translate-x-1/2', 'flex', 'gap-2.5', 'z-20')}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${current === index
                  ? "bg-[#DB4444] border-2 border-white ring-1 ring-[#DB4444]"
                  : "bg-white/40 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
