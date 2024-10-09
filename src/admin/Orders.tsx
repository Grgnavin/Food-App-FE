import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

const Orders: React.FC = () => {
    return (
        <div className='max-w-6xl mx-auto py-10 px-6'>
            <h1 className='text-3xl font-medium text-gray-800 dark:text-white mb-10'>Orders OverView</h1>
            <div className='space-y-8'>
                {/* Resturant Orders Display */}
                <div className='flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700'>
                    <div className='flex-1 mb-6 sm:mb-0'>
                        <h1 className='text-xl font-semibold text-gray-700 dark:text-gray-100'>
                            Biriyani or wot?
                        </h1>
                        <p className='text-gray-600 dark:text-gray-400 mt-2'>
                            <span className='font-semibold'>Address: </span>
                            Pokhara, Nepal
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 mt-2'>
                            <span className='font-semibold'>Total Amount: </span>
                            480
                        </p>
                    </div>
                    <div className='w-full sm:w-1/3'>
                        <Label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                            Order Status
                        </Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((status:string, idx: number) => (
                                                    <SelectItem key={idx} value={status.toLowerCase()}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders