import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useResturant } from '@/store/useResturantStore'
import React, { useEffect } from 'react'

type CartItemFromOrder = {
    menuId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
};


const Orders: React.FC = () => {
    const { resturantOrders, getResturantOrders, updateResturantOrder } = useResturant();

    useEffect(() => {
        getResturantOrders();
    }, []);

    const handleStatusChange = async (id: string, status: string) => {
        await updateResturantOrder(id, status);
    };

    const calculateTotalAmount = (cartItems: CartItemFromOrder[]) => {
        if (!Array.isArray(cartItems)) {
            return "Invalid cart items";
        }
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    resturantOrders.map((order) => {
        console.log(order.cartItems);
        
    })
    return (
        <div className='max-w-6xl mx-auto py-10 px-6'>
            <h1 className='text-3xl font-medium text-gray-800 dark:text-white mb-10'>Orders Overview</h1>
            <div className='space-y-8'>
                {/* Restaurant Orders Display */}
                {resturantOrders &&  resturantOrders.length > 0 && resturantOrders.map((order) => (
                    <div key={order._id} className='flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700'>
                        <div className='flex-1 mb-6 sm:mb-0'>
                            <h1 className='text-xl font-semibold text-gray-700 dark:text-gray-100'>
                                {order.deliveryDetails.name}
                            </h1>
                            <p className='text-gray-600 dark:text-gray-400 mt-2'>
                                <span className='font-semibold'>Address: </span>
                                {order.deliveryDetails.address}
                            </p>
                            <p className='text-gray-600 dark:text-gray-400 mt-2'>
                                <span className='font-semibold'>Total Amount: </span>
                                {calculateTotalAmount(order.cartItems)}
                            </p>
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
                                        {["Pending", "Confirmed", "Preparing", "Out For Delivery", "Delivered"].map((status, idx) => (
                                            <SelectItem key={idx} value={status.toLowerCase()}>{status}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Orders