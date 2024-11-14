import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCartStore } from '@/store/useCartStore'
import { useResturant } from '@/store/useResturantStore'
import { CartItems } from '@/types/cartTypes'
import React, { useEffect } from 'react'

const Orders: React.FC = () => {
    const { resturantOrders ,getResturantOrders, updateResturantOrder } = useResturant();
    const { cart } = useCartStore();
    useEffect(() => {
        getResturantOrders();
    },[]);

    // const calculateTotalAmount = (cartItems: CartItems[])=>{
    //     if (!Array.isArray(cartItems)) {
    //         return "It is not an array"
    //     }
    //     return cartItems.reduce((total, item) => {
    //         return total + (item.price * item.quantity);
    //     }, 0)
    // }

    const handleStatusChange = async(id: string, status: string) => {
        await updateResturantOrder(id, status);
    }

    return (
        <div className='max-w-6xl mx-auto py-10 px-6'>
            <h1 className='text-3xl font-medium text-gray-800 dark:text-white mb-10'>Orders OverView</h1>
            <div className='space-y-8'>
                {/* Resturant Orders Display */}
                {
                    resturantOrders.length > 0 && resturantOrders.map((order ) => (
                        <div className='flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700'>
                        <div className='flex-1 mb-6 sm:mb-0'>
                            <h1 className='text-xl font-semibold text-gray-700 dark:text-gray-100'>
                                {order.deliveryDetails.name}
                            </h1>
                            <p className='text-gray-600 dark:text-gray-400 mt-2'>
                                <span className='font-semibold'>Address: </span>
                                {order.deliveryDetails.address}
                            </p>
                            {
                                cart.length > 0 && cart.map((x: CartItems) => (
                                    <p className='text-gray-600 dark:text-gray-400 mt-2'>
                                <span className='font-semibold'>Total Amount: </span>
                                    {x.price * x.quantity}
                            </p>
                                )) 
                            }
                        </div>
                        <div className='w-full sm:w-1/3'>
                            <Label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                                Order Status
                            </Label>
                            <Select onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)} defaultValue={order.status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    ["Pending", "Confirmed", "Preparing", "Out For Delivery", "Delivered"].map((status:string, idx: number) => (
                                                        <SelectItem key={idx} value={status.toLowerCase()}>{status}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                            </Select>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders