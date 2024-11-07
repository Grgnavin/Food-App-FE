import { ResturantState } from "@/types/resturantTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/resturant";
axios.defaults.withCredentials = true;

export const useResturant = create<ResturantState>()(
    persist((set)=> ({
        loading: false,
        resturant: null,
        searchResturantResult: null,
        appliedFilter: [],
        createResturant: async(formData: FormData) => {
            try {
                set({ loading: true });
                const res = await axios.post(`${API_END_POINT}/`, formData, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    set({ loading: false });
                }else{
                    set({ loading: false });
                    toast.error("Error while creating resturant");
                }
            } catch (error: any) {
                console.log(error);
                set({ loading: false });
                toast.error( error.response?.data.message ||"Error while creating resturant");
            }
        },
        updateMenuToResturant: async(updatedMenu: any) => {
            set((state:any) => {
                if (state.resturant) {
                    const updatedMenuList = state.resturant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu);
                    return {
                        resturant: {
                            ...state.resturant,
                            menus: updatedMenuList
                        }
                    }
                }
                return state;
            })
        },
        addMenuToResturant: (menu: any) => {
            set((state : any) => ({
                resturant: state.resturant 
                            ? { ...state.resturant, menus:[...state.resturant.menus, menu] }
                            : null
            }))
        }, 
        getResturant: async() => {
            try {
                set({ loading: true });
                const res = await axios.get(`${API_END_POINT}/`);
                if(res.data.success) {
                    set({ loading: false, resturant: res.data.resturant });
                }else{
                    set({ loading: false });
                    toast.error("Error while getting resturant");
                }
            } catch (error: any) {
                console.log(error);
                if (error.response.status === 404) {
                    set({ resturant: null });
                }
                set({ loading: false });
                toast.error( error.response?.data.message ||"Error while creating resturant");
            }
        },
        updateResturant: async(formData: FormData) => {
            try {
                set({ loading: true });
                const res = await axios.put(`${API_END_POINT}/`, {formData}, {
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    set({ loading: false, resturant: res.data.resturant });
                }else{
                    set({ loading: false });
                    toast.error("Error while updating resturant");
                }
            } catch (error: any) {
                console.log(error);
                set({ loading: false });
                toast.error( error.response?.data.message ||"Error while creating resturant");
            }
        },
        searchResturant: async(searchText: string, searchQuery: string, selectedCuisines: any) => {
            try {
                set({ loading: true });
                
                const params = new URLSearchParams();
                params.set("searchQuery", searchQuery);
                params.set("selectedCuisines", selectedCuisines.join(','));
                // await new Promise((resolve) => setTimeout(resolve, 5000) );
                const res = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`);
                if (res.data.success) {
                    set({ loading: false, searchResturantResult: res.data.resturants });
                }else{
                    set({ loading: false });
                    toast.error("Error while searching resturant");
                }
            } catch (error: any) {
                console.log(error);
                set({ loading: false });
                toast.error( error.response?.data.message ||"Error while creating resturant");
            }
        },
        setAppliedFilter: (value: string) => {
            set((state: any) => {
                const isAlreadyApplied = state.appliedFilter.includes(value);
                const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item:any) => item !== value) : [...state.appliedFilter, value];
                return { appliedFilter: updatedFilter }
            })
        },
        resetFilter: () => {
            set({ appliedFilter: [] });
        }
    }), 
    {
        name: "resturant",
        storage: createJSONStorage(() => localStorage)
    })
)