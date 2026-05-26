import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react'; 
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { setProfile } from '@/redux/profileSlice';
import { FaCamera, FaSpinner } from 'react-icons/fa';
// ИСЛОҲОТ: getImageUrl-ро барои пурра кардани суроғаи расм ворид кардем
import { getImageUrl } from '@/redux/productSlice'; 

export default function Account() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.app);
  const { profile, loading, updateProfile, fetchProfile, createProfile } = useProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Always re-fetch profile from the server when the page mounts or userId changes.
  // This ensures fresh data is shown even if a stale cached version exists.
  useEffect(() => {
    if (user?.userId) {
      fetchProfile(user.userId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId]);

 useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        userName: profile.name || user?.name || '',
        // Агар аз профил ояд - истифода баред, агар не - аз user.name ҷудо кунед
        firstName: profile.firstName || (user?.name ? user.name.split(' ')[0] : ''),
        lastName: profile.lastName || (user?.name && user.name.includes(' ') ? user.name.split(' ')[1] : ''),
        email: profile.email || user?.email || '',
        phoneNumber: profile.phoneNumber || '',
        dob: profile.dob ? profile.dob.split('T')[0] : '',
      }));

      if (profile.image && profile.image.trim() !== '') {
        setAvatarPreview(getImageUrl(profile.image));
      } else {
        setAvatarPreview(null);
      }
    } else if (user) {
      // Агар профил ҳанӯз аз сервер наомада бошад, аз user.name истифода баред
      setFormData(prev => ({
        ...prev,
        userName: user.name || '',
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name && user.name.includes(' ') ? user.name.split(' ')[1] : '',
        email: user.email || '',
      }));
    }
  }, [profile, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'firstName' && profile) {
      dispatch(setProfile({ ...profile, firstName: e.target.value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setSuccessMsg(null);
    setErrorMsg(null);

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setErrorMsg(t('account.errorPasswordMatch') || 'New passwords do not match');
      return;
    }

    const userId = profile?.userId || user?.userId;
    if (!userId) {
      setErrorMsg('User ID not found');
      return;
    }

    const submitData = new FormData();
    submitData.append('userId', String(userId));
    submitData.append('FirstName', formData.firstName);
    submitData.append('LastName', formData.lastName);
    submitData.append('Email', formData.email);
    submitData.append('PhoneNumber', formData.phoneNumber);
    
    if (formData.dob) {
      submitData.append('Dob', formData.dob);
    }
    
    if (avatarFile) {
      submitData.append('Image', avatarFile);
    }
    
    // Try PUT first (update existing profile)
    let res = await updateProfile(submitData);

    // If PUT fails (profile doesn't exist yet), fall back to POST (create profile)
    if (!res.success) {
      const putError = res.error || '';
      // Treat 404 / "not found" type errors as "profile doesn't exist — create it"
      if (
        putError.includes('404') ||
        putError.toLowerCase().includes('not found') ||
        putError.toLowerCase().includes('no profile')
      ) {
        res = await createProfile(submitData);
      }
    }
    
    if (res.success) {
      setSuccessMsg(t('account.updateSuccess') || 'Profile updated successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setErrorMsg(res.error || t('account.updateError') || 'Failed to update profile');
    }
  };

  return (
    <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'py-8', 'md:py-12', 'font-sans', 'bg-white', 'dark:bg-zinc-950', 'select-none', 'transition-colors', 'duration-300', 'min-h-[80vh]')}>
      
      {/* Breadcrumb */}
      <div className={cn('flex', 'items-center', 'gap-2', 'text-sm', 'text-gray-500', 'dark:text-zinc-400', 'mb-6', 'md:mb-10')}>
        <Link to="/" className={cn('hover:text-black', 'dark:hover:text-white', 'transition-colors')}>{t('nav.home', 'Home')}</Link>
        <span>/</span>
        <span className={cn('text-black', 'dark:text-white')}>{t('account.myAccount', 'My Account')}</span>
      </div>

      <div className={cn('flex', 'flex-col', 'lg:flex-row', 'gap-8', 'lg:gap-16')}>
        {/* Sidebar */}
        <aside className={cn('w-full', 'lg:w-64', 'shrink-0', 'order-2', 'lg:order-1')}>
          <div className={cn('flex', 'flex-col', 'gap-6', 'bg-gray-50', 'dark:bg-zinc-900', 'lg:bg-transparent', 'lg:dark:bg-transparent', 'p-6', 'lg:p-0', 'rounded-xl', 'lg:rounded-none')}>
            <div>
              <h3 className={cn('font-semibold', 'text-black', 'dark:text-white', 'text-base', 'mb-4')}>{t('account.manageAccount', 'Manage My Account')}</h3>
              <ul className={cn('flex', 'flex-col', 'gap-3', 'pl-0', 'lg:pl-6')}>
                <li>
                  <Link to="/account" className={cn('text-[#DB4444]', 'font-medium', 'text-sm', 'hover:opacity-80', 'transition-opacity')}>
                    {t('account.myProfile', 'My Profile')}
                  </Link>
                </li>
                <li>
                  <Link to="/account" className={cn('text-gray-500', 'dark:text-zinc-400', 'hover:text-black', 'dark:hover:text-white', 'text-sm', 'transition-colors')}>
                    {t('account.addressBook', 'Address Book')}
                  </Link>
                </li>
                <li>
                  <Link to="/account" className={cn('text-gray-500', 'dark:text-zinc-400', 'hover:text-black', 'dark:hover:text-white', 'text-sm', 'transition-colors')}>
                    {t('account.paymentOptions', 'My Payment Options')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={cn('font-semibold', 'text-black', 'dark:text-white', 'text-base', 'mb-4')}>{t('account.myOrders', 'My Orders')}</h3>
              <ul className={cn('flex', 'flex-col', 'gap-3', 'pl-0', 'lg:pl-6')}>
                <li>
                  <Link to="/account" className={cn('text-gray-500', 'dark:text-zinc-400', 'hover:text-black', 'dark:hover:text-white', 'text-sm', 'transition-colors')}>
                    {t('account.myReturns', 'My Returns')}
                  </Link>
                </li>
                <li>
                  <Link to="/account" className={cn('text-gray-500', 'dark:text-zinc-400', 'hover:text-black', 'dark:hover:text-white', 'text-sm', 'transition-colors')}>
                    {t('account.myCancellations', 'My Cancellations')}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Link to="/wishlist" className={cn('font-semibold', 'text-black', 'dark:text-white', 'text-base', 'hover:text-[#DB4444]', 'transition-colors')}>
                {t('account.myWishlist', 'My WishList')}
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn('flex-1', 'bg-white', 'dark:bg-zinc-950', 'lg:shadow-[0_0_20px_rgba(0,0,0,0.05)]', 'dark:lg:shadow-none', 'lg:border', 'lg:border-gray-100', 'dark:lg:border-zinc-800', 'rounded-lg', 'p-0', 'lg:p-10', 'order-1', 'lg:order-2')}
        >
          <div className={cn('flex', 'flex-col', 'md:flex-row', 'items-start', 'md:items-center', 'justify-between', 'mb-8', 'gap-4')}>
            <h2 className={cn('text-xl', 'font-medium', 'text-[#DB4444]')}>{t('account.profile', 'Profile')}</h2>
            
            {/* Avatar Upload */}
            <div className={cn('flex', 'items-center', 'gap-4')}>
              <div className={cn('relative', 'group')}>
                <div className={cn('w-16', 'h-16', 'rounded-full', 'overflow-hidden', 'bg-gray-100', 'dark:bg-zinc-800', 'border-2', 'border-gray-200', 'dark:border-zinc-700', 'flex', 'items-center', 'justify-center')}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className={cn('w-full', 'h-full', 'object-cover')} />
                  ) : (
                    <span className={cn('text-gray-400', 'text-2xl', 'font-bold')}>{formData.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className={cn('absolute', 'inset-0', 'bg-black/40', 'rounded-full', 'flex', 'items-center', 'justify-center', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'cursor-pointer', 'text-white')}
                  title="Upload Image"
                >
                  <FaCamera />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>
              <div className={cn('text-sm', 'text-gray-500', 'dark:text-zinc-400')}>
                <p className={cn('font-medium', 'text-black', 'dark:text-white')}>{t('account.profileImage', 'Profile Image')}</p>
                <p className="text-xs">JPG, PNG, GIF</p>
              </div>
            </div>
          </div>

          {successMsg && (
            <div className={cn('mb-6', 'p-4', 'bg-green-50', 'dark:bg-green-900/30', 'text-green-700', 'dark:text-green-400', 'text-sm', 'font-medium', 'rounded-lg', 'border', 'border-green-200', 'dark:border-green-800')}>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className={cn('mb-6', 'p-4', 'bg-red-50', 'dark:bg-red-900/30', 'text-red-700', 'dark:text-red-400', 'text-sm', 'font-medium', 'rounded-lg', 'border', 'border-red-200', 'dark:border-red-800')}>
              {errorMsg}
            </div>
          )}

          <form className={cn('flex', 'flex-col', 'gap-6')} onSubmit={(e) => e.preventDefault()}>
            <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6')}>
              <div className={cn('relative', 'mt-2')}>
                <label className={cn('absolute', '-top-2.5', 'left-3', 'bg-white', 'dark:bg-zinc-950', 'px-1', 'text-sm', 'text-gray-500', 'dark:text-zinc-400')}>{t('account.firstName', 'First name')}</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-transparent', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-md', 'px-4', 'py-3.5', 'text-black', 'dark:text-white', 'focus:outline-none', 'focus:border-[#DB4444]')}
                />
              </div>
              <div className={cn('relative', 'mt-2')}>
                <label className={cn('absolute', '-top-2.5', 'left-3', 'bg-white', 'dark:bg-zinc-950', 'px-1', 'text-sm', 'text-gray-500', 'dark:text-zinc-400')}>{t('account.lastName', 'Last name')}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-transparent', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-md', 'px-4', 'py-3.5', 'text-black', 'dark:text-white', 'focus:outline-none', 'focus:border-[#DB4444]')}
                />
              </div>
            </div>

            <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'mt-4')}>
              <div className={cn('relative', 'mt-2')}>
                <label className={cn('absolute', '-top-2.5', 'left-3', 'bg-white', 'dark:bg-zinc-950', 'px-1', 'text-sm', 'text-gray-500', 'dark:text-zinc-400')}>{t('account.email', 'Email address')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-transparent', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-md', 'px-4', 'py-3.5', 'text-black', 'dark:text-white', 'focus:outline-none', 'focus:border-[#DB4444]')}
                />
              </div>
              <div className={cn('relative', 'mt-2')}>
                <label className={cn('absolute', '-top-2.5', 'left-3', 'bg-white', 'dark:bg-zinc-950', 'px-1', 'text-sm', 'text-gray-500', 'dark:text-zinc-400')}>{t('account.phoneNumber', 'Phone number')}</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-transparent', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-md', 'px-4', 'py-3.5', 'text-black', 'dark:text-white', 'focus:outline-none', 'focus:border-[#DB4444]')}
                />
              </div>
            </div>

            <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'mt-4')}>
              <div className={cn('relative', 'mt-2')}>
                <label className={cn('absolute', '-top-2.5', 'left-3', 'bg-white', 'dark:bg-zinc-950', 'px-1', 'text-sm', 'text-gray-500', 'dark:text-zinc-400')}>{t('account.dob', 'Date of Birth')}</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-transparent', 'border', 'border-gray-300', 'dark:border-zinc-700', 'rounded-md', 'px-4', 'py-3.5', 'text-black', 'dark:text-white', 'focus:outline-none', 'focus:border-[#DB4444]', 'scheme:light', 'dark:scheme:dark')}
                />
              </div>
            </div>

            {/* Password section */}
            <div className={cn('mt-8', 'border-t', 'border-gray-100', 'dark:border-zinc-800/50', 'pt-8')}>
              <h3 className={cn('text-lg', 'font-bold', 'text-black', 'dark:text-white', 'mb-6', 'tracking-wide')}>{t('account.passwordChanges', 'Password Changes')}</h3>
              <div className={cn('flex', 'flex-col', 'gap-5')}>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder={t('account.currentPassword', 'Current password') || ''}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-gray-100', 'dark:bg-[#1C1C1C]', 'border-none', 'rounded-md', 'px-4', 'py-3.5', 'text-base', 'text-black', 'dark:text-white', 'placeholder:text-gray-500', 'dark:placeholder:text-zinc-500', 'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]')}
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder={t('account.newPassword', 'New password') || ''}
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-gray-100', 'dark:bg-[#1C1C1C]', 'border-none', 'rounded-md', 'px-4', 'py-3.5', 'text-base', 'text-black', 'dark:text-white', 'placeholder:text-gray-500', 'dark:placeholder:text-zinc-500', 'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]')}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder={t('account.confirmNewPassword', 'Confirm new password') || ''}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={cn('w-full', 'bg-gray-100', 'dark:bg-[#1C1C1C]', 'border-none', 'rounded-md', 'px-4', 'py-3.5', 'text-base', 'text-black', 'dark:text-white', 'placeholder:text-gray-500', 'dark:placeholder:text-zinc-500', 'focus:outline-none', 'focus:ring-1', 'focus:ring-[#DB4444]')}
                />
              </div>
            </div>

            <div className={cn('flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-end', 'gap-4', 'sm:gap-8', 'mt-6', 'pb-4')}>
              <button
                type="button"
                className={cn('text-black', 'dark:text-white', 'text-base', 'font-semibold', 'hover:opacity-70', 'transition-opacity', 'w-full', 'sm:w-auto')}
              >
                {t('account.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className={cn('bg-[#E64646]', 'text-white', 'px-10', 'py-3.5', 'rounded-md', 'text-base', 'font-semibold', 'hover:bg-[#d43f3f]', 'transition-colors', 'shadow-sm', 'w-full', 'sm:w-auto', 'flex', 'items-center', 'justify-center', 'gap-2', 'disabled:opacity-70')}
              >
                {loading && <FaSpinner className="animate-spin" />}
                {t('account.saveChanges', 'Save Changes')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>  
  );
}