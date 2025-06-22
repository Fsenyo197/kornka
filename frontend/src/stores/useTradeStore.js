import { create } from 'zustand';
const useTradeStore = create((set) => ({
    loading: false,
    error: null,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));
export default useTradeStore;
