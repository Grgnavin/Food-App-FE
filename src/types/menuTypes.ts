export type MenuState = {
    loading: boolean;
    menu: null;
    createMenu: (formdata: FormData) => Promise<void>,
    editMenu: (formdata: FormData, menuId: string) => Promise<void>
}