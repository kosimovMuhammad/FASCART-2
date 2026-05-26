import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setProfile, setProfileLoading, setProfileError } from '@/redux/profileSlice';

const API_BASE = import.meta.env.VITE_API_URL || 'https://fastcard-1-o23z.onrender.com/api';

/** Manually decode a JWT and extract the user id (nameid or sub claim). */
export function getUserIdFromToken(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    // Base64url → Base64 → JSON
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload + '=='.slice(0, (4 - (payload.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded));
    const id = decoded?.nameid ?? decoded?.sub ?? decoded?.userId;
    return id != null ? Number(id) : null;
  } catch {
    return null;
  }
}

export function useProfile() {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.profile);

  const fetchProfile = useCallback(async (userId: number) => {
    dispatch(setProfileLoading(true));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/UserProfile/get-user-profile-by-id?id=${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const json = await res.json();
      if (res.ok && json.data) {
        dispatch(setProfile(json.data));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      dispatch(setProfileError(message));
    } finally {
      dispatch(setProfileLoading(false));
    }
  }, [dispatch]);

  const updateProfile = useCallback(async (formData: FormData): Promise<{ success: boolean; error?: string }> => {
    dispatch(setProfileLoading(true));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/UserProfile/update-user-profile`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      let json: { message?: string; errors?: string[]; data?: unknown } = {};
      try {
        json = await res.json();
      } catch {
      }

      if (res.ok) {
        const userId = formData.get('userId');
        if (userId) {
          await fetchProfile(Number(userId));
        }
        return { success: true };
      }

      const errorMsg =
        json?.message ||
        (Array.isArray(json?.errors) && json.errors.length > 0 ? json.errors[0] : null) ||
        `Server error: ${res.status} ${res.statusText}`;

      return { success: false, error: errorMsg };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      return { success: false, error: message };
    } finally {
      dispatch(setProfileLoading(false));
    }
  }, [dispatch, fetchProfile]);

  const createProfile = useCallback(async (formData: FormData): Promise<{ success: boolean; error?: string }> => {
    dispatch(setProfileLoading(true));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/UserProfile/add-user-profile`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      let json: { message?: string; errors?: string[] } = {};
      try {
        json = await res.json();
      } catch {  }

      if (res.ok) {
        const userId = formData.get('userId');
        if (userId) {
          await fetchProfile(Number(userId));
        }
        return { success: true };
      }

      const errorMsg =
        json?.message ||
        (Array.isArray(json?.errors) && json.errors.length > 0 ? json.errors[0] : null) ||
        `Server error: ${res.status}`;

      return { success: false, error: errorMsg };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      return { success: false, error: message };
    } finally {
      dispatch(setProfileLoading(false));
    }
  }, [dispatch, fetchProfile]);

  return { profile, loading, error, fetchProfile, updateProfile, createProfile };
}