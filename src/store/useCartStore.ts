import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";

interface CartStoreState {
    count: number,
    increment: () => void
};

export const useCartStore = create<CartStoreState>()(persist((set) => ({
    count: 0,
    increment: () => {
        set((state) => ({ count: state.count + 1 }))
    }
}),
    {
        name: "cart-name",
        storage: createJSONStorage(() => localStorage)
    }
));