import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Timer } from 'lucide-react'
import AvailableMenu from './AvailableMenu'
import { useResturant } from '@/store/useResturantStore'
import { useParams } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'

const ResturantDetail: React.FC = () => {
    const params = useParams();
    const { singleResturant, getSingleResturant } = useResturant();
    useEffect(() => {
        const getSingleResturantDetail = async () => {
            await getSingleResturant(params.id!);
        }
        getSingleResturantDetail();
    },[params.id]);

    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='w-full'>
                <div className='relative w-full h-32 md:h-64 lg:h-72'>
                    <img 
                        src={singleResturant?.imageUrl || "Loading..."} 
                        alt="res_image" 
                        className='object-cover w-full h-full rounded-lg shadow-lg'
                    />
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='my-5 '>
                        <h1 className='font-bold text-xl'>{singleResturant?.resturantName}</h1>
                        <div className='flex gap-2 my-2'>
                            {
                                singleResturant?.cuisines.map((x: string, idx: number) => (
                                    <Badge key={idx}>
                                        {x}
                                    </Badge>  
                                ))
                            }
                        </div>
                        <div className='flex md:flex-row flex-col gap-2 my-5'>
                            <div className='flex items-center gap-2'>
                                <Timer className='w-5 h-5'/>
                                <h1 className='flex items-center gap-2 font-medium'>Delivery Time: {" "}
                                    <span>{singleResturant?.deliveryTime}</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <AvailableMenu menus={singleResturant?.menus}/>
                </div>
            </div>
        </div>
    )
}

export default ResturantDetail