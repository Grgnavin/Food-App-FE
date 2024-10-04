import React from 'react'
import Image from "@/assets/hero_pizza.png"
import { Badge } from './ui/badge'
import { Timer } from 'lucide-react'
import AvailableMenu from './AvailableMenu'

const ResturantDetail: React.FC = () => {
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='w-full'>
                <div className='relative w-full h-32 md:h-64 lg:h-72'>
                    <img 
                        src="https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2021/10/cultural-cuisine.jpg?resize=696%2C385&ssl=1" 
                        alt="res_image" 
                        className='object-cover w-full h-full rounded-lg shadow-lg'
                    />
                </div>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='my-5 '>
                        <h1 className='font-medium text-xl'>{`Tandoori Tadka`}</h1>
                        <div className='flex gap-2 my-2'>
                            {
                                ["Biriyani", "Momos"].map((x: string, idx: number) => (
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
                                    <span>35mins</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <AvailableMenu />
                </div>
            </div>
        </div>
    )
}

export default ResturantDetail