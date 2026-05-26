import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending data:', formData);
  };

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'select-none', 'transition-colors', 'duration-300', 'min-h-screen')}>
      
      {/* Breadcrumb */}
      <div className={cn('flex', 'items-center', 'gap-2', 'text-sm', 'text-gray-500', 'dark:text-zinc-400', 'mb-10')}>
        <Link to="/" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>{t('nav.home', 'Home')}</Link>
        <span>/</span>
        <span className={cn('text-black', 'dark:text-white', 'font-medium')}>{t('nav.contact', 'Contact')}</span>
      </div>

      {/* Content */}
      <div className={cn('flex', 'flex-col', 'md:flex-row', 'gap-8', 'items-stretch')}>
        
        {/* Info card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            'w-full', 'md:w-[340px]', 'shrink-0', 'bg-white', 'dark:bg-zinc-900', 
            'shadow-[0_0_20px_rgba(0,0,0,0.05)]', 'dark:shadow-none', 
            'border', 'border-gray-100', 'dark:border-zinc-800', 'rounded-sm', 'p-8',
            'flex', 'flex-col', 'gap-8'
          )}
        >
          {/* Phone */}
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <div className={cn('w-10', 'h-10', 'rounded-full', 'bg-[#DB4444]', 'flex', 'items-center', 'justify-center', 'text-white')}>
                <Phone className={cn('w-5', 'h-5')} />
              </div>
              <h3 className={cn('font-medium', 'text-base', 'text-black', 'dark:text-white')}>{t('contact.callTitle', 'Call To Us')}</h3>
            </div>
            <div className={cn('flex', 'flex-col', 'gap-2', 'text-sm', 'text-black', 'dark:text-zinc-300')}>
              <p>{t('contact.available', 'We are available 24/7, 7 days a week.')}</p>
              <p className="font-medium">{t('contact.phone', 'Phone: +8801611112222')}</p>
            </div>
          </div>

          {/* Divider */}
          <div className={cn('h-px', 'w-full', 'bg-gray-200', 'dark:bg-zinc-700')} />

          {/* Email */}
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <div className={cn('w-10', 'h-10', 'rounded-full', 'bg-[#DB4444]', 'flex', 'items-center', 'justify-center', 'text-white')}>
                <Mail className={cn('w-5', 'h-5')} />
              </div>
              <h3 className={cn('font-medium', 'text-base', 'text-black', 'dark:text-white')}>{t('contact.writeTitle', 'Write To Us')}</h3>
            </div>
            <div className={cn('flex', 'flex-col', 'gap-2', 'text-sm', 'text-black', 'dark:text-zinc-300')}>
              <p>{t('contact.fillForm', 'Fill out our form and we will contact you within 24 hours.')}</p>
              <p>{t('contact.email1', 'Emails: customer@exclusive.com')}</p>
              <p>{t('contact.email2', 'Emails: support@exclusive.com')}</p>
            </div>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            'flex-1', 'bg-white', 'dark:bg-zinc-900', 
            'shadow-[0_0_20px_rgba(0,0,0,0.05)]', 'dark:shadow-none', 
            'border', 'border-gray-100', 'dark:border-zinc-800', 'rounded-sm', 'p-8'
          )}
        >
          <form onSubmit={handleSubmit} className={cn('flex', 'flex-col', 'gap-6', 'h-full', 'justify-between')}>
            
            {/* Inputs row */}
            <div className={cn('grid', 'grid-cols-1', 'lg:grid-cols-3', 'gap-4')}>
              <input
                type="text"
                name="name"
                placeholder={t('contact.namePlaceholder', 'Name')}
                required
                value={formData.name}
                onChange={handleChange}
                className={cn(
                  'w-full', 'bg-gray-50', 'dark:bg-zinc-800', 'border-none', 'rounded-sm', 
                  'px-4', 'py-3', 'text-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400',
                  'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]'
                )}
              />
              <input
                type="email"
                name="email"
                placeholder={t('contact.emailPlaceholder', 'Email')}
                required
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  'w-full', 'bg-gray-50', 'dark:bg-zinc-800', 'border-none', 'rounded-sm', 
                  'px-4', 'py-3', 'text-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400',
                  'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]'
                )}
              />
              <input
                type="text"
                name="phone"
                placeholder={t('contact.phonePlaceholder', 'Phone')}
                required
                value={formData.phone}
                onChange={handleChange}
                className={cn(
                  'w-full', 'bg-gray-50', 'dark:bg-zinc-800', 'border-none', 'rounded-sm', 
                  'px-4', 'py-3', 'text-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400',
                  'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]'
                )}
              />
            </div>

            {/* Textarea */}
            <div className={cn('flex-1', 'mt-4', 'min-h-[180px]')}>
              <textarea
                name="message"
                placeholder={t('contact.messagePlaceholder', 'Your Message')}
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={cn(
                  'w-full', 'h-full', 'bg-gray-50', 'dark:bg-zinc-800', 'border-none', 'rounded-sm', 
                  'px-4', 'py-3', 'text-sm', 'text-black', 'dark:text-white', 'placeholder:text-gray-400',
                  'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]', 'resize-none'
                )}
              />
            </div>

            {/* Submit */}
            <div className={cn('flex', 'justify-end', 'mt-6')}>
              <button
                type="submit"
                className={cn(
                  'bg-[#DB4444]', 'text-white', 'px-10', 'py-4', 'rounded-sm', 
                  'text-sm', 'font-medium', 'hover:bg-[#bd3535]', 'transition-colors', 
                  'shadow-sm', 'w-full', 'sm:w-auto'
                )}
              >
                {t('contact.sendMessage', 'Send Message')}
              </button>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}