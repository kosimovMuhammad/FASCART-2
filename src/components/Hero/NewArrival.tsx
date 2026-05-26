"use client"

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import img from "@/assets/ps5-slim-goedkope-playstation_large 1 (2).png"
import img1 from "@/assets/attractive-woman-wearing-hat-posing-black-background 1 (2).png"
import img3 from "@/assets/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1 (1).png"
import img4 from "@/assets/652e82cd70aa6522dd785109a455904c (1).png"
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

export default function NewArrival() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleShopNow = (path: string) => {
    navigate(path)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans bg-white dark:bg-zinc-950 select-none transition-colors duration-300">
      {}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-5 h-10 bg-[#DB4444] rounded-sm" />
        <span className="text-[#DB4444] font-semibold text-sm tracking-wider">
          {t('newArrival.badge') || 'Featured'}
        </span>
      </div>

      {}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-black dark:text-white">
          {t('newArrival.title') || 'New Arrival'}
        </h2>
      </div>

      {}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[600px]"
      >
        {}
        <motion.div 
          variants={itemVariants}
          className="relative bg-black rounded-sm overflow-hidden md:col-span-2 group flex items-end justify-center p-6 sm:p-8 h-[350px] md:h-auto"
        >
          <img 
            src={img} 
            alt="PlayStation 5" 
            className="absolute bottom-0 w-full max-w-[400px] md:max-w-[440px] h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop'
            }}
          />
          {}
          <div className="relative z-10 w-full text-left flex flex-col items-start gap-2 md:gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 rounded-sm">
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide">
              {t('newArrival.ps5.name') || 'PlayStation 5'}
            </h3>
            <p className="text-zinc-300 text-xs md:text-sm max-w-[250px] leading-relaxed">
              {t('newArrival.ps5.desc') || 'Black and White version of the PS5 coming out on sale.'}
            </p>
            <button 
              onClick={() => handleShopNow('/category/ps5')}
              className="text-white font-medium text-sm md:text-base underline underline-offset-8 hover:text-[#DB4444] transition-colors duration-200 mt-1"
            >
              {t('newArrival.shopNow') || 'Shop Now'}
            </button>
          </div>
        </motion.div>

        {}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {}
          <motion.div 
            variants={itemVariants}
            className="relative bg-[#0D0D0D] rounded-sm overflow-hidden sm:col-span-2 group flex items-end p-6 h-[280px]"
          >
            <img 
              src={img1} 
              alt="Women's Collections" 
              className="absolute right-0 bottom-0 h-full max-w-[250px] sm:max-w-[300px] object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop'
              }}
            />
            <div className="relative z-10 max-w-[240px] text-left flex flex-col items-start gap-2 bg-gradient-to-r from-black/60 to-transparent p-2 rounded-sm">
              <h3 className="text-white text-xl font-bold tracking-wide">
                {t('newArrival.women.name') || "Women's Collections"}
              </h3>
              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                {t('newArrival.women.desc') || 'Featured woman collections that give you another vibe.'}
              </p>
              <button 
                onClick={() => handleShopNow('/category/women')}
                className="text-white font-medium text-sm underline underline-offset-8 hover:text-[#DB4444] transition-colors duration-200 mt-1"
              >
                {t('newArrival.shopNow') || 'Shop Now'}
              </button>
            </div>
          </motion.div>

          {}
          <motion.div 
            variants={itemVariants}
            className="relative bg-[#1A1A1A] rounded-sm overflow-hidden group flex items-end p-6 h-[270px]"
          >
            {}
            <div className="absolute inset-0 bg-radial-gradient from-zinc-800/30 to-transparent pointer-events-none" />
            <img 
              src={img3} 
              alt="Speakers" 
              className="absolute inset-0 m-auto max-w-[160px] max-h-[160px] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=400&auto=format&fit=crop'
              }}
            />
            <div className="relative z-10 text-left flex flex-col items-start gap-1 w-full">
              <h3 className="text-white text-lg font-bold tracking-wide">
                {t('newArrival.speakers.name') || 'Speakers'}
              </h3>
              <p className="text-zinc-400 text-xs truncate max-w-[150px]">
                {t('newArrival.speakers.desc') || 'Amazon wireless speakers'}
              </p>
              <button 
                onClick={() => handleShopNow('/category/speakers')}
                className="text-white font-medium text-xs underline underline-offset-8 hover:text-[#DB4444] transition-colors duration-200 mt-1.5"
              >
                {t('newArrival.shopNow') || 'Shop Now'}
              </button>
            </div>
          </motion.div>

          {}
          <motion.div 
            variants={itemVariants}
            className="relative bg-[#1A1A1A] rounded-sm overflow-hidden group flex items-end p-6 h-[270px]"
          >
            <div className="absolute inset-0 bg-radial-gradient from-zinc-800/30 to-transparent pointer-events-none" />
            <img 
              src={img4} 
              alt="Perfume" 
              className="absolute inset-0 m-auto max-w-[150px] max-h-[150px] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop'
              }}
            />
            <div className="relative z-10 text-left flex flex-col items-start gap-1 w-full">
              <h3 className="text-white text-lg font-bold tracking-wide">
                {t('newArrival.perfume.name') || 'Perfume'}
              </h3>
              <p className="text-zinc-400 text-xs truncate max-w-[150px]">
                {t('newArrival.perfume.desc') || 'GUCCI INTENSE OUD EDP'}
              </p>
              <button 
                onClick={() => handleShopNow('/category/perfume')}
                className="text-white font-medium text-xs underline underline-offset-8 hover:text-[#DB4444] transition-colors duration-200 mt-1.5"
              >
                {t('newArrival.shopNow') || 'Shop Now'}
              </button>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}