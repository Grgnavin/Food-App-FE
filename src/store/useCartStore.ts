import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";
import { CartState } from '@/types/cartTypes';
import { MenuItems } from '@/types/resturantTypes';


export const useCartStore = create<CartState>()(persist((set) => ({
    cart: [],
    addToCart: (item: MenuItems) => {
        set((state) => {
            //check if the item is already in the cart
            const existingItem = state.cart.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return {
                    cart: state.cart.map((cartItem) => cartItem._id === item._id 
                    ? { ...cartItem, quantity: cartItem.quantity+1 } : cartItem)
                }
            }else{
                //add to cart
                return {
                    cart: [ ...state.cart, { ...item, quantity: 1 } ]
                }
            }
        })
    },
    clearCart: () => {
        set({ cart: [] })
    },
    removeFromCart: (id: string) => {
        set((state) => ({
            cart: state.cart.filter((item) => item._id !== id)
        }))
    },
    incrementQuantity: (id: string) => {
        set((state) => ({
            cart: state.cart.map((item) => item._id === id ? { ...item, quantity: item.quantity+1 } : item)
        }))
    },
    decrementQuantity: (id: string) => {
        set((state) => ({
            cart: state.cart.map((item) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity-1 } : item)
        })) 
    }
}),
    {
        name: "cart-name",
        storage: createJSONStorage(() => localStorage)
    }
));