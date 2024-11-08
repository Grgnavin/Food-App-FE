import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { MenuItems } from '@/types/resturantTypes'

const AvailableMenu: React.FC = ({menus}: {menus: MenuItems[]}) => {
    return (
        <div className="md:p-4">
            <h1 className="text-xl md:text-2xl font-bold mb-6 text-center">Available Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    menus && menus.map((menu: MenuItems) => (
                        <Card className="w-full mx-auto shadow-lg rounded-lg overflow-hidden">
                            <img 
                                src={menu?.image} 
                                alt="Image" 
                                className="w-full h-40 object-cover"
                            />
                        <CardContent className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                            {menu?.name}
                        </h2>
                            <p className="text-sm text-gray-600 mt-2">{menu?.description}</p>
                            <h3 className="text-lg font-semibold mt-4">Price: ₹<span>{menu?.price}</span></h3>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button className="bg-orange w-full hover:bg-hoverOrange">Add to cart</Button>
                        </CardFooter>
                </Card>
                    ))
                }
            </div>
        </div>
    );
}

export default AvailableMenu