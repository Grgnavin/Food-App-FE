import React, { useState } from 'react'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Minus, Plus } from 'lucide-react'
import CheckoutConfirm from './CheckoutConfirm'


const Cart:React.FC = () => {
    const[open, setOpen] = useState<boolean>(false);
    return (
        <div className='flex flex-col max-w-7xl mx-auto my-10'>
            <div className='flex justify-end'>
                <Button variant={"link"}>Clear All</Button>
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
                    <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage 
                                    src=''
                                    alt=''
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>
                            Biriyani
                        </TableCell>
                        <TableCell>
                            80
                        </TableCell>
                        <TableCell>
                            <div className='w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md'>
                                <Button size={'icon'} variant={'outline'} className='rounded-full bg-gray-200'><Minus/></Button>
                                <Button disabled variant={'outline'} size={'icon'} className='font-bold'>1</Button>
                                <Button variant={'outline'} size={'icon'} className='rounded-full bg-gray-200 hover:bg-gray-100 border-none'><Plus className=''/></Button>
                            </div>
                        </TableCell>
                        <TableCell>
                            400
                        </TableCell>
                        <TableCell className='text-right'>
                            <Button className='bg-orange hover:bg-hoverOrange' size={'sm'}>Remove</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className='text-xl'>
                        <TableCell colSpan={5}>
                            Total
                        </TableCell>
                        <TableCell className='text-right'>
                            400
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