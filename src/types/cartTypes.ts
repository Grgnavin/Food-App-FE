import { MenuItems } from "./resturantTypes";

export interface CartItems extends MenuItems{
    quantity: number
};

export type CartState = {
    cart: CartItems[],
    addToCart: (item: MenuItems) => void,
    clearCart: () => void,
    removeFromCart: (id: string) => void,
    incrementQuantity: (id: string) => void,
    decrementQuantity: (id: string) => void,
}