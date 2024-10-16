import React from 'react'
import image from "@/assets/hero_pizza.png";
import { IndianRupee } from 'lucide-react';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const SuccessPage: React.FC = () => {
    const orders = [1];
    if (orders.length === 0)
        return (
        <div className='flex items-center justify-center min-h-screen'>
            <h1 className='font-semibold text-2xl text-gray-700 dark:text-gray-300'>Orders not found!</h1>
        </div>
        );
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:gray-900 px-4'>
            <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full'>
                <div className='text-center mb-6'>
                    <h1 className='text-xl font-medium text-gray-800 dark:text-gray-200'>
                        Order status : {" "}
                        <span className='text-[#22C55E]'>{"Confirm".toUpperCase()}</span>
                    </h1>
                </div>
                <div className='mb-6'>
                    <h2 className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4'>
                        Order Summary
                    </h2>
                    {/* Your Order Items display from here */}
                    <div className='mb-4'>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <img 
                                    src={image} 
                                    alt=""
                                    className='w-14 h-14 object-cover rounded-md' 
                                />
                                <h3 className='ml-4 text-gray-800 dark:text-gray-200 font-medium'>Pizza</h3>
                            </div>
                            <div className='text-right'>
                                <div className='text-gray-800 dark:text-gray-200 flex items-center'>
                                    <IndianRupee size={"18px"}/>
                                    <span className='text-lg font-medium'>480</span>
                                </div>
                            </div>
                        </div>
                        <Separator className='my-4'/>
                    </div>
                        <Link to={"/cart"}>
                            <Button className='bg-orange hover:bg-hoverOrange w-full py-3 rounded-lg shadow-lg'>
                                Continue Shopping
                            </Button>
                        </Link>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage