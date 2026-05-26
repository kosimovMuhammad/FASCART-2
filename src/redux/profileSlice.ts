import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  userId: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  image?: string;
  roles?: string[];
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const savedProfile = localStorage.getItem('fastcart_profile');
const initialState: ProfileState = {
  profile: savedProfile ? JSON.parse(savedProfile) : null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('fastcart_profile', JSON.stringify(action.payload));
    },
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('fastcart_profile');
    },
  },
});

export const { setProfileLoading, setProfileError, setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
