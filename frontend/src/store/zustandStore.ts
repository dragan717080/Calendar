import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  AuthStore
}
  from '~/interfaces/Zustand';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      authToken: null,
      error: null,
      email: null,
      setAuthToken: (authToken: string | null) => set({ authToken, error: null }),
      setError: (error: string | null) => set({ error }),
      setEmail: (email: string | null) => set({ email }),
    }),
    {
      name: 'zustand-auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
