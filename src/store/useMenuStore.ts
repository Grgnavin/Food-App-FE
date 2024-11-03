import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from "zustand";
import axios from "axios";
import { toast } from 'sonner';
import { useResturant } from './useResturantStore';

type MenuState = {
    loading: boolean;
    menu: null;
    createMenu: (formdata: FormData) => Promise<void>,
    editMenu: (formdata: FormData, menuId: string) => Promise<void>
}

const API_END_POINT = "http://localhost:8000/api/v1/menu";
axios.defaults.withCredentials = true;

export const useMenu = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async(formData: FormData) => {
        try {
            set({ loading: true });
            const res = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                set({ loading: false, menu: res.data.menu });
            }
            //update resturant
            useResturant.getState().addMenuToResturant(res.data.menu);
        } catch (error: any) {
            console.log(error);
            set({ loading: false });
            toast.error( error.response?.data.message ||"Error while creating resturant");
        }
    },  
    editMenu: async(formData: FormData, menuId: string) => {
        try {
            set({ loading: true });
            const res = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            if (res.data.success) {
                toast.success(res.data.message);
                set({ loading: false , menu: res.data.menu});
            }
        } catch (error: any) {
            console.log(error);
            set({ loading: false });
            toast.error( error.response?.data.message ||"Error while creating resturant");
        }
    },
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))
