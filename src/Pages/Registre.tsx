import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/appSlice';
import { useProfile, getUserIdFromToken } from '@/hooks/useProfile';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

export const ProductCheckout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fetchProfile, createProfile } = useProfile();
  
  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.errorPasswordMatch') || "Паролҳо мувофиқат намекунанд!");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://fastcard-1-o23z.onrender.com';
      
      // Калидҳо маҳз бо ҳарфи хурд, тавре ки дар калиди Curl ва Express нишон додӣ
      const response = await axios.post(`${apiUrl}/Account/register`, {
        userName: formData.userName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });

      // On 200 or 201 success
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        
        const token = response.data?.data;
        if (token) {
          localStorage.setItem('token', token);
          const userId = getUserIdFromToken(token);

          dispatch(login({
            userId: userId || undefined,
            name: formData.userName,
            email: formData.email
          }));

          if (userId) {
            // Try to fetch existing profile first
            await fetchProfile(userId);

            // Create a profile record seeded with registration data.
            // The server may not auto-create one — so we POST it ourselves.
            const profileData = new FormData();
            profileData.append('userId', String(userId));
            profileData.append('FirstName', formData.userName); // use username as first name
            profileData.append('Email', formData.email);
            profileData.append('PhoneNumber', formData.phoneNumber);
            await createProfile(profileData);

            // Re-fetch to get the full saved profile
            await fetchProfile(userId);
          }
        }
        
        setFormData({ userName: '', phoneNumber: '', email: '', password: '', confirmPassword: '' });
        
        setTimeout(() => {
          navigate('/login'); 
        }, 1500);
      }
    } catch (err: any) {
      console.error("Хатогии сервер:", err.response);

      // Хониши паёми "User with this username or email already exists" аз сервер
      if (err.response && err.response.data) {
        const serverData = err.response.data;
        
        if (serverData.message) {
          setError(serverData.message); // Паёми аниқи серверро нишон медиҳад
        } else if (serverData.errors) {
          setError(serverData.errors[0]);
        } else {
          setError("Камбудӣ дар маълумоти воридшуда.");
        }
      } else {
        setError(t('auth.errorConnection') || "Камбудӣ дар пайвастшавӣ бо сервер.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('min-h-[85vh]', 'w-full', 'flex', 'flex-col', 'lg:flex-row', 'items-center', 'justify-center', 'bg-white', 'dark:bg-zinc-950', 'overflow-hidden', 'pt-4', 'pb-12', 'my-10', 'lg:py-0')}>
      
      <div className={cn('w-full', 'lg:w-1/2', 'flex', 'items-center', 'justify-center', 'px-4', 'sm:px-8', 'md:px-16', 'lg:px-20')}>
        <div className={cn('w-full', 'max-w-[400px]', 'space-y-6', 'sm:space-y-8')}>
          
          <div className={cn('text-center', 'md:text-left', 'space-y-2')}>
            <h2 className={cn('text-2xl', 'sm:text-3xl', 'font-black', 'tracking-tight', 'text-zinc-900', 'dark:text-zinc-50', 'uppercase')}>
              {t('auth.createAccount') || "Create an account"}
            </h2>
            <p className={cn('text-xs', 'sm:text-sm', 'text-zinc-500', 'dark:text-zinc-400')}>
              {t('auth.enterDetails') || "Enter your details below"}
            </p>
          </div>

          {error && (
            <div className={cn('bg-red-50', 'dark:bg-red-950/20', 'text-red-600', 'dark:text-red-400', 'p-3.5', 'rounded-2xl', 'text-xs', 'font-semibold', 'border', 'border-red-100', 'dark:border-red-900/30', 'shadow-sm', 'animate-shake')}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className={cn('bg-emerald-50', 'dark:bg-emerald-950/20', 'text-emerald-600', 'dark:text-emerald-400', 'p-3.5', 'rounded-2xl', 'text-xs', 'font-semibold', 'border', 'border-emerald-100', 'dark:border-emerald-900/30', 'shadow-sm')}>
              🎉 {t('auth.successRegister') || "Регистрация бомуваффақият иҷро шуд!"}
            </div>
          )}

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder={t('auth.placeholderName') || "Name (User Name)"}
                required
                className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'dark:focus-visible:ring-zinc-700', 'transition-all', 'duration-300', 'placeholder:text-zinc-400')}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={t('auth.placeholderPhone') || "Phone number"}
                required
                className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'dark:focus-visible:ring-zinc-700', 'transition-all', 'duration-300', 'placeholder:text-zinc-400')}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('auth.placeholderEmail') || "Email"}
                required
                className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'dark:focus-visible:ring-zinc-700', 'transition-all', 'duration-300', 'placeholder:text-zinc-400')}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('auth.placeholderPassword') || "Password"}
                required
                className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'dark:focus-visible:ring-zinc-700', 'transition-all', 'duration-300', 'placeholder:text-zinc-400')}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('auth.placeholderConfirmPassword') || "Confirm Password"}
                required
                className={cn('h-12', 'rounded-xl', 'bg-zinc-50', 'dark:bg-zinc-900/50', 'border-zinc-200', 'dark:border-zinc-800', 'text-sm', 'focus-visible:ring-1', 'focus-visible:ring-zinc-400', 'dark:focus-visible:ring-zinc-700', 'transition-all', 'duration-300', 'placeholder:text-zinc-400')}
              />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className={cn('w-full', 'h-12', 'bg-[#db4444]', 'hover:bg-[#c33a3a]', 'text-white', 'font-bold', 'text-sm', 'rounded-xl', 'tracking-wide', 'transition-all', 'duration-300', 'shadow-lg', 'shadow-red-500/10', 'active:scale-[0.99]', 'disabled:opacity-50')}
              >
                {loading ? (t('auth.creating') || "Creating Account...") : (t('auth.btnCreate') || "Create Account")}
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            <Button 
              variant="outline" 
              className={cn('w-full', 'h-12', 'rounded-xl', 'flex', 'items-center', 'justify-center', 'gap-3', 'font-semibold', 'text-sm', 'border-zinc-200', 'dark:border-zinc-800', 'hover:bg-zinc-50', 'dark:hover:bg-zinc-900/50', 'transition-colors', 'duration-300')}
            >
              <svg className={cn('h-4', 'w-4')} viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.207 1.594 15.485 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.57-4.894 11.57-11.79 0-.795-.085-1.4-.195-1.905H12.24z"/>
              </svg>
              {t('auth.signUpGoogle') || "Sign up with Google"}
            </Button>

            <div className={cn('text-center', 'text-xs', 'sm:text-sm', 'text-zinc-500', 'dark:text-zinc-400')}>
              {t('auth.alreadyHaveAccount') || "Already have account?"}{' '}
              <button 
                type="button"
                onClick={() => navigate('/login')} 
                className={cn('font-bold', 'text-black', 'dark:text-white', 'underline', 'underline-offset-4', 'hover:text-[#db4444]', 'dark:hover:text-[#db4444]', 'transition-colors')}
              >
                {t('auth.logIn') || "Log in"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;