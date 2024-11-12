import { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_ENDPOINT: string= "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials= true;


export const useOrderStore = create<OrderState>()(
    persist((set => ({
        loading: false,
        orders: [],
        createCheckoutSession: async(checkoutSession: CheckoutSessionRequest) => {
            try {
                set({ loading: true });
                const res = await axios.post(`${API_ENDPOINT}/checkout/create-checkout-session`, checkoutSession, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                if (res.data.success) {
                    window.location.href = res.data.session.url; 
                    set({ loading: false, orders: res.data.session });
                }
            } catch (error) {
                console.log(error);
                set({ loading: false });
            }
        },
        getOrderDetails: async() => {

        }
    })),{
        name: "order-name",
        storage: createJSONStorage(() => localStorage)
    })
)