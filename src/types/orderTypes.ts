export type CheckoutSessionRequest = {
    cartItems: {
        menuId: string,
        name: string,
        price: number,
        image: string,
        quantity: number
    }[],
    deliveryDetails: {
        name: string,
        email: string,
        contact: string,
        address: string,
        city: string,
        country: string
    },
    resturantId: string
};

export interface Orders extends CheckoutSessionRequest {
    _id: string,
    status: string,
    totalAmount: number
};

export type OrderState = {
    loading: boolean,
    orders: Orders[],
    createCheckoutSession: (checkoutSessionRequest: CheckoutSessionRequest) => Promise<void>,
    getOrderDetails: () => Promise<void>
}