interface TradeState {
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}
declare const useTradeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<TradeState>>;
export default useTradeStore;
