import React, { useState } from 'react'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Minus, Plus } from 'lucide-react'
import CheckoutConfirm from './CheckoutConfirm'
import { useCartStore } from '@/store/useCartStore'
import { CartItems } from '@/types/cartTypes'


const Cart:React.FC = () => {
    const[open, setOpen] = useState<boolean>(false);
    const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCartStore();
    const totalAmount = cart.reduce((acc, ele) => {
        return acc + ele.price * ele.quantity
    }, 0);

    const RemoveItem = (id: string) => {
        return removeFromCart(id);
    }

    return (
        <div className='flex flex-col max-w-7xl mx-auto my-10'>
            <div className='flex justify-end'>
                <Button onClick={clearCart} variant={"link"}>Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Items</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className='text-right'>Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cart.map((item: CartItems) => (
                            <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage 
                                    src={item.image}
                                    alt=''
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>
                            {item.name}
                        </TableCell>
                        <TableCell>
                            {item.price}
                        </TableCell>
                        <TableCell>
                            <div className='w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md'>
                                <Button onClick={() => decrementQuantity(item._id)} size={'icon'} variant={'outline'} className='rounded-full bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-700'>
                                    <Minus/>
                                </Button>
                                <Button disabled variant={'outline'} size={'icon'} className='font-bold'>{item.quantity}</Button>
                                <Button onClick={() => incrementQuantity(item._id)} variant={'outline'} size={'icon'} className='rounded-full bg-gray-200 border-none dark:bg-gray-500 dark:hover:bg-gray-700'>
                                    <Plus className=''/>
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell>
                            {item.price * item.quantity}
                        </TableCell>
                        <TableCell className='text-right'>
                            <Button className='bg-orange hover:bg-hoverOrange' onClick={() => RemoveItem(item._id)} size={'sm'}>Remove</Button>
                        </TableCell>
                    </TableRow>
                        ))
                    }
                    
                </TableBody>
                <TableFooter>
                    <TableRow className='text-xl'>
                        <TableCell colSpan={5}>
                            Total
                        </TableCell>
                        <TableCell className='text-right'>
                            {totalAmount}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className='flex justify-end my-5'>
                <Button onClick={() => setOpen(true)} className='bg-orange hover:bg-hoverOrange'>Proceed To Checkout</Button>
            </div>  
            <CheckoutConfirm open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Cart