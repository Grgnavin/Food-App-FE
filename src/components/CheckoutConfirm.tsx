import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useUserStore } from '@/store/useUserStore'
import { CheckoutSessionRequest } from '@/types/orderTypes'
import { useCartStore } from '@/store/useCartStore'
import { useResturant } from '@/store/useResturantStore'
import { useOrderStore } from '@/store/useOrder'
import { Loader2 } from 'lucide-react'

type Input = {
    name: string,
    email: string,
    contact: string,
    address: string,
    city: string,
    country: string
}

const CheckoutConfirm = ({
    open, setOpen
}: {
    open:boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const { user } = useUserStore();
    const[input, setInput] = useState<Input>({
        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact || "",
        address: user?.address || "",
        city: user?.city || "",
        country: user?.country || ""
    });
    const { cart } = useCartStore();
    const { resturant } = useResturant();
    const { loading ,createCheckoutSession } = useOrderStore();
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(e.target);
        setInput({...input, [name]:value});
    }
    const checkoutHandler = async(e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        //implement api
        try {
            const checkoutData: CheckoutSessionRequest = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem._id,
                    name: cartItem.name,
                    image: cartItem.image,
                    price: cartItem.price,
                    quantity: cartItem.quantity
                })),
                deliveryDetails: input,
                resturantId: resturant?._id as string
            };
            await createCheckoutSession(checkoutData);
        } catch (error) {
            console.log(error);
        }
    }   

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle className='text-center'>Review Your order</DialogTitle>
                <DialogDescription className='text-xs'>Double Check your delivery details and ensure everythingis in order.
                    When you are ready, hit confirm button to finalize tour order
                </DialogDescription>
                <form onSubmit={checkoutHandler} className='md:grid md:grid-cols-2 gap-2 space-y-1 md:space-y-0'>
                    <div>
                        <Label>Fullname</Label>
                        <Input
                            type='text'
                            name='name'
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            disabled
                            type='email'
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Contact</Label>
                        <Input
                            type='text'
                            name='contact'
                            value={input.contact}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input
                            type='text'
                            name='address'
                            value={input.address}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>City</Label>
                        <Input
                            type='text'
                            name='city'
                            value={input.city}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Country</Label>
                        <Input
                            type='text'
                            name='country'
                            value={input.country}
                            onChange={changeEventHandler}
                        />
                    </div>
            <DialogFooter className='col-span-2 p-5'>
                {
                    loading ? (
                        <Button disabled className='w-full bg-orange hover:bg-hoverOrange'>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                            Please wait
                        </Button>
                    ) : (
                        <Button className='w-full bg-orange hover:bg-hoverOrange'>Continue To Payment</Button>
                    )
                }
            </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutConfirm