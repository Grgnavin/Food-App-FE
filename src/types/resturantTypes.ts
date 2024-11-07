export type MenuItems = {
    _id: string,
    name: string,
    description: string,
    price: number,
    image: string
}

export type Resturant = {
    _id: string,
    name: string,
    resturantName: string,
    city: string,
    country: string,
    deliveryTime : number,
    cuisines: string[],
    menus: MenuItems[],
    imageUrl: string;
}

export type ResturantState = {
    loading: boolean,
    resturant: null | Resturant,
    searchResturantResult: null | Resturant[],
    appliedFilter: string[],
    createResturant: (formData: FormData) => Promise<void>,
    getResturant: () => Promise<void>,
    updateResturant: (formData: FormData) => Promise<void>,
    searchResturant: (searchText: string, searchQuery: string, selectedCuisines: any) => Promise<void>,
    addMenuToResturant: (menu: any) => void,
    updateMenuToResturant: (updatedMenu: any) => void,
    setAppliedFilter: (value: string) => void,
    resetFilter: () => void
}

export type ResturantResult =  {
    data: Resturant[]
}