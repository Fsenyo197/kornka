import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    loading: false,
    error: null,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
