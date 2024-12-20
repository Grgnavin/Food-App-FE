import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { HandPlatter, Loader2, Menu, Moon, PackageCheck, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from 'lucide-react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import { useUserStore } from '@/store/useUserStore';
import { useCartStore } from '@/store/useCartStore';
import { useThemeStore } from '@/store/useThemeStore';


const Navbar: React.FC = () => {
    const { loading ,user, logout } = useUserStore();
    const { cart } = useCartStore();
    const{ setTheme } = useThemeStore();
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex items-center justify-between h-14'>
                <Link to={"/"}>
                    <h1 className='font-bold md:font-extrabold text-2xl'>Melody Eats</h1>
                </Link>
                <div className='hidden md:flex items-center gap-8'>
                    <div className='hidden md:flex items-center gap-6'>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/profile"}>Profile</Link>
                        <Link to={"/admin/orders"}>Order</Link>
                    {
                        user?.admin && (
                            <Menubar>
                                <MenubarMenu>
                                <MenubarTrigger>
                                    Dashboard
                                </MenubarTrigger>
                                <MenubarContent>
                                    <Link to={"/admin/resturant"}>
                                        <MenubarItem>Resturant</MenubarItem>
                                    </Link>
                                    <Link to={"/admin/menu"}>
                                        <MenubarItem>Menu</MenubarItem>
                                    </Link>
                                    <Link to={"/admin/orders"}>
                                        <MenubarItem>Order</MenubarItem>
                                    </Link>
                                </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        )
                    }
                </div>  
                <div className='flex items-center gap-4'>
                    <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                            Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                            Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                        <Link to={"/cart"} className='relative cursor-pointer'>
                            <ShoppingCart/>
                            {
                                cart.length> 0 && (
                                    <Button size={'icon'} className='absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500'>
                                        {cart.length}
                                    </Button>
                                )
                            }
                        </Link>
                    <div>
                        <Avatar>
                            <AvatarImage src={
                                typeof user?.profilePicture === "string" 
                                ? user?.profilePicture
                                : undefined
                            } alt='profilePhoto'/>
                                <AvatarFallback>
                                    CN
                                </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                    {
                        loading ? 
                            <Button disabled className='w-full bg-orange hover:bg-hoverOrange'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> 
                            : <Button onClick={() => logout()} type='submit' className='w-full  bg-orange hover:bg-hoverOrange'>
                                    Logout
                                </Button>
                    }
                    </div>
                </div>
                </div>
                <div className='md:hidden lg:hidden'>
                    {/* Mobile REsponsive */}
                    <MobileNavbar />
                </div>
            </div>
        </div>
    )
}

export default Navbar;

const MobileNavbar = () => {
    const navigate = useNavigate();
    const{ setTheme } = useThemeStore();
    const { user, logout } = useUserStore();
    const handleNavigation = (path: string) => {
        navigate(path);
        document.getElementById("close-sheet")?.click();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={'icon'} className='rounded-full bg-gray-200 hover:bg-gray-200 text-black' variant="outline">
                    <Menu size={'18'}/>
                </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col'>
                <SheetHeader className='flex flex-row items-center justify-between mt-2'>
                    <SheetTitle>Melody Eats</SheetTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SheetHeader>
                <Separator className='my-2'/>
                <SheetDescription className='flex-1'>
                    <div onClick={() => handleNavigation("/profile")} className='flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium'>
                        <User/>
                        <span>Profile</span>
                    </div>
                    <div onClick={() => handleNavigation("/order/status")} className='flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium'>
                        <HandPlatter/>
                        <span>Order</span>
                    </div>
                    <div onClick={() => handleNavigation("/cart")} className='flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium'>
                        <ShoppingCart/>
                        <span>Cart (0)</span>
                    </div>
                    {
                        user?.admin && (
                            <>
                                <div onClick={() => handleNavigation("/admin/menu")} className='flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium'>
                                    <SquareMenu/>
                                        <span>Menu</span>
                                </div>
                                <div onClick={() => handleNavigation("/admin/resturant")} className='flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium'>
                                    <UtensilsCrossed/>
                                    <span>Resturant</span>
                                </div>
                                <div onClick={() => handleNavigation("/admin/orders")} className='flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium'>
                                    <PackageCheck/>
                                    <span>Resturant Orders</span>
                                </div>
                            </>
                        )
                    }
                </SheetDescription>
                <SheetFooter className='flex flex-col gap-4'>   
                    <div className='flex flex-row items-center gap-2'>
                        <Avatar>
                            <AvatarImage src={
                                    typeof user?.profilePicture === "string" 
                                    ? user?.profilePicture
                                    : undefined
                            } />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className='font-semibold'>Melody Gurung</h1>
                    </div> 
                    <div>
                        <SheetClose asChild>
                            <Button onClick={() => logout()} type="submit" className='bg-orange hover:bg-hoverOrange w-full'>Logout</Button>
                        </SheetClose>
                    </div>
                </SheetFooter>
            </SheetContent>
            <SheetClose asChild id="close-sheet">
                <div />
            </SheetClose>
        </Sheet>
    )
}