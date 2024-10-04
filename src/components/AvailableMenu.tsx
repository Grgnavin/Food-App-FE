import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'

const AvailableMenu: React.FC = () => {
    return (
        <div className='md:p-4'>
            <h1 className='text-xl md:text-2xl font-bold mb-6 text-center'>Available Menu</h1>
            <div className='grid md:grid-cols-3 space-y-4 md:space-y-0'>
                <Card className='md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden'>
                    <img 
                        src="https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2021/10/cultural-cuisine.jpg?resize=696%2C385&ssl=1" 
                        alt="" 
                        className='w-full h-40 object-cover'
                    />
                    <CardContent className='p-4'>
                        <h2 className='text-xl font-semibold text-gray-800 dark:text-white text-center'>Tandoori Biriyani</h2>
                        <p className='text-sm text-gray-600 mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit totam error porro sit consequuntur illo eveniet </p>
                        <h3 className='text-lg font-semibold mt-4'>Price: ₹<span>400</span></h3>
                    </CardContent>
                    <CardFooter className='p-4'>
                        <Button className='bg-orange w-full hover:bg-hoverOrange'>Add to cart</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AvailableMenu