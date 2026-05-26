"use client"

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, type Variants } from 'framer-motion'
import img from "@/assets/JBL_BOOMBOX_2_HERO_020_x1 (1) 1 (1).png"
interface TimeLeft {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const textVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

const imgVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
}

export default function MusicExperienceBanner() {
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "05",
    hours: "23",
    minutes: "59",
    seconds: "35"
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 5)
    targetDate.setHours(targetDate.getHours() + 23)
    targetDate.setMinutes(targetDate.getMinutes() + 59)
    targetDate.setSeconds(targetDate.getSeconds() + 35)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate.getTime() - now

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timerItems = [
    { value: timeLeft.hours, label: t('musicBanner.hours') || 'Hours' },
    { value: timeLeft.days, label: t('musicBanner.days') || 'Days' },
    { value: timeLeft.minutes, label: t('musicBanner.minutes') || 'Minutes' },
    { value: timeLeft.seconds, label: t('musicBanner.seconds') || 'Seconds' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans select-none">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="w-full bg-black dark:bg-zinc-950 px-8 py-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden min-h-[500px]"
      >
        <div className="flex flex-col items-start gap-5 max-w-xl z-10 order-2 md:order-1">
          <motion.span
            variants={textVariants}
            className="text-[#00FF66] font-semibold text-base tracking-wide"
          >
            {t('musicBanner.badge') || 'Categories'}
          </motion.span>

          <motion.h2
            variants={textVariants}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight md:leading-tight"
          >
            {t('musicBanner.title') || 'Enhance Your Music Experience'}
          </motion.h2>

          <motion.div variants={textVariants} className="flex flex-wrap gap-4 my-4">
            {timerItems.map((item, index) => (
              <div
                key={index}
                className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-white flex flex-col items-center justify-center p-1"
              >
                <span className="text-black font-bold text-base md:text-lg leading-none tabular-nums">
                  {item.value}
                </span>
                <span className="text-black text-[10px] font-medium mt-0.5 capitalize">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.button
            variants={textVariants}
            whileHover={{ scale: 1.03, backgroundColor: "#00E055" }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#00FF66] text-white font-semibold text-base px-12 py-4 rounded-sm transition-all duration-200"
          >
            {t('musicBanner.button') || 'Buy Now!'}
          </motion.button>
        </div>

        <motion.div
          variants={imgVariants}
          className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none" />
          <motion.img
            src={img}
            alt="JBL Boombox"
            animate={{
              y: [0, -8, 0]
            }}
           
            className="object-contain max-h-[300px] md:max-h-[400px] w-full z-10 drop-shadow-[0_15px_30px_rgba(255,255,255,0.03)]"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}