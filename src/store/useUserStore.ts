import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";
import axios from "axios";
import { LoginInput, SignupInput } from '@/schema/userSchema';
import { toast } from 'sonner';

interface UserStore {
    user: null,
    isAuthenticated: boolean,
    isCheckingAuth: boolean,
    loading: boolean,
    signup: (input: SignupInput) => Promise<void>,
    login: (input: LoginInput) => Promise<void>,
    verifyEmail: (verificationCode: string) => Promise<void>
}

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

export const useUserStore = create<UserStore>()(
    persist((set) =>({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: true,
        loading: false,
        //signup api implementation
        signup: async(input: SignupInput) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/signup`, input, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) {
                    console.log(response.data);
                    toast.success(response.data.message);
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                }
            } catch (error: any) {
                set({ loading: false });
                toast.error(error.response.data.message);
            }
        },
        login: async(input: LoginInput) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/login`, input, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) {
                    console.log(response.data);
                    toast.success(response.data.message);
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                }
            } catch (error: any) {
                set({ loading: false });
                toast.error(error.response.data.message);
            } finally {
                set({ loading: false });
            }
        }, 
        verifyEmail: async (verificationCode: string) => {
            try {
                set({ loading: true });
                const res = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.data.success) {
                    set({ loading: false ,user: res.data.user, isAuthenticated: true });
                    toast.success(res.data.message);
                } else {
                    set({ loading: false })
                    toast.error('Verification failed');
                }
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Verification failed');
            } finally {
                set({ loading: false }); // This will handle setting loading to false in all cases
            }
        }
    }),
        {
            name: "user-name",
            storage: createJSONStorage(() => localStorage)
        }
))