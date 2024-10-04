import React from 'react'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Minus } from 'lucide-react'


const Cart:React.FC = () => {
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
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default Cart