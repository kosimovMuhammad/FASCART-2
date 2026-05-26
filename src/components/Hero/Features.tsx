"use client"

import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Truck, Headphones, ShieldCheck } from "lucide-react"

export default function Features() {
  const { t } = useTranslation()

  const featuresData = [
    {
      id: "delivery",
      icon: Truck,
      titleKey: "features.delivery.title",
      descKey: "features.delivery.desc",
      defaultTitle: "FREE AND FAST DELIVERY",
      defaultDesc: "Free delivery for all orders over $140"
    },
    {
      id: "service",
      icon: Headphones,
      titleKey: "features.service.title",
      descKey: "features.service.desc",
      defaultTitle: "24/7 CUSTOMER SERVICE",
      defaultDesc: "Friendly 24/7 customer support"
    },
    {
      id: "guarantee",
      icon: ShieldCheck,
      titleKey: "features.guarantee.title",
      descKey: "features.guarantee.desc",
      defaultTitle: "MONEY BACK GUARANTEE",
      defaultDesc: "We return money within 30 days"
    }
  ]

  return (
    <section className="bg-white dark:bg-black py-30 transition-colors duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-14"
        >
          {featuresData.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.id}
                initial={{
                  opacity: 0,
                  y: 50
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -6, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 rounded-full bg-zinc-300 dark:bg-zinc-800 flex items-center justify-center mb-6"
                >
                  <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                    <Icon
                      size={26}
                      strokeWidth={2.3}
                      className="text-white"
                    />
                  </div>
                </motion.div>

                <h3 className="text-[20px] font-bold uppercase text-black dark:text-white mb-2">
                  {t(feature.titleKey) || feature.defaultTitle}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t(feature.descKey) || feature.defaultDesc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}