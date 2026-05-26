import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';


import { FaXTwitter } from 'react-icons/fa6';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';


import member1 from '@/assets/image 46.png'; 
import member2 from '@/assets/image 51.png';
import member3 from '@/assets/image 47 (1).png';

export default function TeamSlider() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(1); 

  const team = [
    {
      id: 1,
      name: 'Tom Cruise',
      roleKey: 'aboutPage.team.founder',
      defaultRole: 'Founder & Chairman',
      image: member1,
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 2,
      name: 'Emma Watson',
      roleKey: 'aboutPage.team.director',
      defaultRole: 'Managing Director',
      image: member2,
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    }, {
      id: 3, 
      name: 'Will Smith',
      roleKey: 'aboutPage.team.designer',
      defaultRole: 'Product Designer',
      image: member3,
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 4,
      name: 'Will Smith',
      roleKey: 'aboutPage.team.designer',
      defaultRole: 'Product Designer',
      image: member1,
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 5,
      name: 'Will Smith',
      roleKey: 'aboutPage.team.designer',
      defaultRole: 'Product Designer',
      image: member2,
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
    {
      id: 6,
      name: 'Will Smith',
      roleKey: 'aboutPage.team.designer',
      defaultRole: 'Product Designer',
      image: member3,
      socials: { twitter: '#', instagram: '#', linkedin: '#' },
    },
   
  ];

  return (
    <div className={cn('w-full', 'bg-white', 'dark:bg-zinc-950', 'py-16', 'transition-colors', 'duration-300')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'md:px-8', 'lg:px-12', 'flex', 'flex-col', 'gap-10')}>
        
        {}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          initialSlide={1} 
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {team.map((member) => (
            <SwiperSlide key={member.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={cn('flex', 'flex-col', 'pb-4')}
              >
                {}
                <div className={cn(
                  'w-full', 'h-[430px]', 'bg-[#F5F5F5]', 'dark:bg-zinc-900', 
                  'rounded-sm', 'flex', 'items-end', 'justify-center', 'overflow-hidden', 'pt-8'
                )}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={cn('max-h-full', 'w-auto', 'object-contain', 'transition-transform', 'duration-300', 'hover:scale-105')}
                  />
                </div>

                {}
                <div className={cn('flex', 'flex-col', 'pt-6', 'gap-2')}>
                  <h3 className={cn('text-[32px]', 'font-medium', 'tracking-wide', 'text-black', 'dark:text-white', 'font-sans')}>
                    {member.name}
                  </h3>
                  <p className={cn('text-sm', 'font-normal', 'text-gray-600', 'dark:text-zinc-400')}>
                    {t(member.roleKey, member.defaultRole)}
                  </p>

                  {}
                  <div className={cn('flex', 'items-center', 'gap-4', 'pt-2')}>
                    <a href={member.socials.twitter} className={cn('text-black', 'dark:text-white', 'hover:text-[#DB4444]', 'dark:hover:text-[#DB4444]', 'transition-colors')}>
                      <FaXTwitter className={cn('w-[18px]', 'h-[18px]')} />
                    </a>
                    <a href={member.socials.instagram} className={cn('text-black', 'dark:text-white', 'hover:text-[#DB4444]', 'dark:hover:text-[#DB4444]', 'transition-colors')}>
                      <FiInstagram className={cn('w-5', 'h-5')} />
                    </a>
                    <a href={member.socials.linkedin} className={cn('text-black', 'dark:text-white', 'hover:text-[#DB4444]', 'dark:hover:text-[#DB4444]', 'transition-colors')}>
                      <FiLinkedin className={cn('w-5', 'h-5')} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {}
        <div className={cn('flex', 'items-center', 'justify-center', 'gap-3', 'pt-2')}>
          {team.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-3', 'h-3', 'rounded-full', 'transition-all', 'duration-300',
                activeIndex === index
                  ? 'bg-[#DB4444] ring-2 ring-offset-2 ring-[#DB4444] dark:ring-offset-zinc-950'
                  : 'bg-gray-300 dark:bg-zinc-700'
              )}
            />
          ))}
        </div>

      </div>
    </div>
  );
}