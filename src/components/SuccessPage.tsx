import React, { useEffect } from 'react'
import { IndianRupee } from 'lucide-react';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useOrderStore } from '@/store/useOrder';
import { CartItems } from '@/types/cartTypes';

const SuccessPage: React.FC = () => {
    const{ orders,getOrderDetails } = useOrderStore();
    
    useEffect(() => {
        getOrderDetails();
    },[])

    if (orders.length === 0)
        return (
        <div className='flex items-center justify-center min-h-screen'>
            <h1 className='font-semibold text-2xl text-gray-700 dark:text-gray-300'>Orders not found!</h1>
        </div>
        );
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                            Order status: <span className="text-[#22C55E]">{"Confirm".toUpperCase()}</span>
                        </h1>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Order Summary
                        </h2>
                        {/* Order Items Display */}
                        {orders && orders.length > 0 ? (
                            orders.map((order: any, idx: number) => (
                                <div key={idx}> {/* Ensure each order has a unique key */}
                                    {order.cartItems.map((item: CartItems) => (
                                        <div className="mb-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-14 h-14 object-cover rounded-md" 
                                                    />
                                                    <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">{item.name}</h3>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-gray-800 dark:text-gray-200 flex items-center">
                                                        <IndianRupee size={"18px"} />
                                                        <span className="text-lg font-medium">{item.price * item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">No orders found.</p>
                        )}
                        <Separator className="my-4" />
                        <Link to={"/cart"}>
                            <Button className="bg-orange hover:bg-hoverOrange w-full py-3 rounded-lg shadow-lg">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
        
}

export default SuccessPage