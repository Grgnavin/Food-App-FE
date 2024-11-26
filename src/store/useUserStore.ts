import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";
import axios from "axios";
import { LoginInput, SignupInput } from '@/schema/userSchema';
import { toast } from 'sonner';

type User = {
    fullname: string,
    email: string,
    contact: string,
    city: string,
    country: string,
    profilePicture: File | string,
    admin: boolean,
    isVerified: boolean,
    address: string
}

type InputType = {
    fullname?: string,
    email?: string,
    address?: string,
    city?: string,
    country?: string,
    profilePicture?: File
}

interface UserStore {
    user: null | User,
    isAuthenticated: boolean,
    isCheckingAuth: boolean,
    loading: boolean,
    signup: (input: SignupInput) => Promise<void>,
    login: (input: LoginInput) => Promise<void>,
    verifyEmail: (verificationCode: string) => Promise<void>,
    checkAuthentication: () => Promise<void>,
    logout: () => Promise<void>,
    forgotPassword: (email: string) => Promise<void>,
    resetPassword: (token: string, newPassword: string) => Promise<void>,
    updateProfile: (input: InputType) => Promise<void>
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
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                    toast.success(response.data.message);
                }else{
                    set({ loading: false, isAuthenticated: false });
                }
            } catch (error: any) {
                set({ loading: false });
                toast.error(error.response.data.message);
            }
        },
        //Login api implementation
        login: async(input: LoginInput) => {
            try {
                set({ loading: true });
                const response = await axios.post(`${API_END_POINT}/login`, input, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) {
                    toast.success(response.data.message);
                    set({ loading: false, user: response.data.user, isAuthenticated: true });
                }else{
                    set({ loading: false, isAuthenticated: false });
                }
            } catch (error: any) {
                set({ loading: false });
                toast.error(error.response.data.message);
            } finally {
                set({ loading: false });
            }
        }, 
        //verify api implementation
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
        },
        //checkauthentication api implementation
        checkAuthentication: async() => {
            try {
                set({ isCheckingAuth: true, loading: true });
                const res = await axios.get(`${API_END_POINT}/check-authentication`);
                if (res.data.success) {
                    set({ loading: false, user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
                    toast.success(res.data.message)
                }else{
                    set({ loading: false, isAuthenticated: false });
                }
            } catch (error: any) {
                set({ loading: false, isAuthenticated: false, isCheckingAuth: true });
                toast.error(error.response?.data.message || "Verification failed");
            }
        },
        //Logout api implementation
        logout: async() => {
            try {
                set({ loading: true });
                const res = await axios.post(`${API_END_POINT}/logout`);
                if (res.data.success) {
                    toast.success(res.data.message);
                    set({ loading: false, isAuthenticated: false, user: null });
                }else{
                    set({ loading: false, isAuthenticated: false });
                }
            } catch (error: any) {
                set({ loading: false, isAuthenticated: false, isCheckingAuth: true });
                toast.error(error.response?.data.message || "Verification failed");
            }
        },
        //forgotPassword api implementation
        forgotPassword: async(email: string) => {
            try {
                set({ loading: true });
                const res = await axios.post(`${API_END_POINT}/forgot-password`, { email });
                if (res.data.success) {
                    toast.success(res.data.message);
                    set({ loading: true });
                }else{
                    set({ loading: false, isAuthenticated: false });
                }
            } catch (error: any) {
                set({ loading: false });
                toast.error(error.response?.data.message || "Verification failed");
            }
        },
        //forgotPassword api implementation
        resetPassword: async(token: string, newPassword: string) => {
            try {
                set({ loading: true });
                const res = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
                if (res.data.success) {
                    set({ loading: false });
                    toast.success(res.data.message);
                }else{
                    set({ loading: false, isAuthenticated: false });
                }
            } catch (err: any) {
                set({ loading: false });
                toast.error(err.response?.data.message || "Verification failed");
            }
        },
        //updateProfile api implementation
        updateProfile: async(input: InputType) => {
            try {
                const res = await axios.put(`${API_END_POINT}/profile/update`, input, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                if (res.data.success) {
                    set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
                    toast.success(res.data.message);
                }else{
                    set({ isAuthenticated: false });
                }
            } catch (error: any) {
                toast.error(error.response?.data.message || "Verification failed");
            }
        }
    }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage)
        }
))