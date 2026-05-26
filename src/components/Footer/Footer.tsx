import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { cn } from "@/lib/utils";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={cn('w-full', 'bg-black', 'text-white', 'pt-16', 'pb-6', 'font-sans', 'border-t', 'border-zinc-900')}>
      {/* Контейнери асосӣ: дар телефон gap-10 ва ҳама чиз ба чап */}
      <div className={cn('container', 'mx-auto', 'px-6', 'grid', 'grid-cols-1', 'lg:grid-cols-5', 'gap-10', 'text-left')}>
        
        {/* Блоки 1: Exclusive */}
        <div className={cn('flex', 'flex-col', 'gap-4')}>
          <h2 className={cn('text-2xl', 'font-bold', 'tracking-wide')}>{t('footer.exclusive', 'Exclusive')}</h2>
          <h3 className={cn('text-xl', 'font-medium')}>{t('footer.subscribe', 'Subscribe')}</h3>
          <p className={cn('text-base', 'text-zinc-300')}>{t('footer.get10Off', 'Get 10% off your first order')}</p>
          <div className={cn('relative', 'w-full', 'max-w-[240px]')}>
            <input 
              type="email" 
              placeholder={t('footer.enterEmail', 'Enter your email')} 
              className={cn('w-full', 'bg-transparent', 'border', 'border-white', 'rounded', 'py-3', 'pl-4', 'pr-10', 'text-base', 'text-white', 'placeholder-zinc-500', 'focus:outline-none')}
            />
            <button className={cn('absolute', 'right-4', 'top-3.5', 'text-white', 'hover:text-zinc-400', 'transition-colors')}>
              <FiSend className={cn('h-5', 'w-5')} />
            </button>
          </div>
        </div>

        {/* Блоки 2: Support */}
        <div className={cn('flex', 'flex-col', 'gap-4')}>
          <h2 className={cn('text-2xl', 'font-bold', 'tracking-wide')}>{t('footer.support', 'Support')}</h2>
          <p className={cn('text-base', 'text-zinc-300', 'leading-relaxed', 'max-w-[220px]')}>
            {t('footer.address', '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.')}
          </p>
          <p className={cn('text-base', 'text-zinc-300')}>{t('footer.email', 'exclusive@gmail.com')}</p>
          <p className={cn('text-base', 'text-zinc-300')}>{t('footer.phone', '+88015-88888-9999')}</p>
        </div>

        {/* Ин қисм дар телефон Account ва Quick Link-ро паҳлӯи ҳам нишон медиҳад (мисли расм) */}
        <div className={cn('grid', 'grid-cols-2', 'gap-4', 'col-span-1', 'md:grid-cols-2', 'lg:grid-cols-2', 'lg:contents')}>
          
          {/* Блоки 3: Account */}
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            <h2 className={cn('text-2xl', 'font-bold', 'tracking-wide')}>{t('footer.account', 'Account')}</h2>
            <nav className={cn('flex', 'flex-col', 'gap-3', 'text-base', 'text-zinc-300')}>
              <Link to="/account" className={cn('hover:text-white', 'transition-colors')}>{t('footer.myAccount', 'My Account')}</Link>
              <Link to="/cart" className={cn('hover:text-white', 'transition-colors')}>{t('footer.cart', 'Cart')}</Link>
              <Link to="/wishlist" className={cn('hover:text-white', 'transition-colors')}>{t('footer.wishlist', 'Wishlist')}</Link>
              <Link to="/" className={cn('hover:text-white', 'transition-colors')}>{t('footer.shop', 'Shop')}</Link>
            </nav>
          </div>

          {/* Блоки 4: Quick Link */}
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            <h2 className={cn('text-2xl', 'font-bold', 'tracking-wide')}>{t('footer.quickLink', 'Quick Link')}</h2>
            <nav className={cn('flex', 'flex-col', 'gap-3', 'text-base', 'text-zinc-300')}>
              <Link to="/privacy-policy" className={cn('hover:text-white', 'transition-colors')}>{t('footer.privacyPolicy', 'Privacy Policy')}</Link>
              <Link to="/terms" className={cn('hover:text-white', 'transition-colors')}>{t('footer.termsOfUse', 'Terms Of Use')}</Link>
              <Link to="/faq" className={cn('hover:text-white', 'transition-colors')}>{t('footer.faq', 'FAQ')}</Link>
              <Link to="/contact" className={cn('hover:text-white', 'transition-colors')}>{t('footer.contact', 'Contact')}</Link>
            </nav>
          </div>

        </div>

        {/* Блоки 5: Social */}
        <div className={cn('flex', 'flex-col', 'gap-4')}>
          <h2 className={cn('text-2xl', 'font-bold', 'tracking-wide')}>{t('footer.social', 'Social')}</h2>
          <div className={cn('flex', 'items-center', 'gap-6', 'mt-1', 'justify-start')}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className={cn('text-white', 'hover:text-zinc-400', 'transition-colors')}>
              <FaFacebookF className={cn('h-5', 'w-5')} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className={cn('text-white', 'hover:text-zinc-400', 'transition-colors')}>
              <FaTwitter className={cn('h-5', 'w-5')} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={cn('text-white', 'hover:text-zinc-400', 'transition-colors')}>
              <FaInstagram className={cn('h-5', 'w-5')} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={cn('text-white', 'hover:text-zinc-400', 'transition-colors')}>
              <FaLinkedinIn className={cn('h-5', 'w-5')} />
            </a>
          </div>
        </div>

      </div>
      <div className={cn('mt-16', 'pt-6', 'border-t', 'border-zinc-900', 'text-center', 'text-sm', 'text-zinc-500')}>
        <p>{t('footer.copyright', '© Copyright Rimel 2022. All right reserved')}</p>
      </div>
    </footer>
  );
};