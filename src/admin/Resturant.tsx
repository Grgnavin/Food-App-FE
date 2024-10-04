import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ResturantFormSchema } from '@/schema/resturantSchem'
import { Loader2 } from 'lucide-react'
import React, { FormEvent, useState } from 'react'

type InputForm = {
    resturantName: string,
    city: string,
    country: string,
    deliveryTime: number,
    cuisines: string[],
    imageFile?: File | undefined;
}

const Resturant: React.FC = () => {
    const[input, setInput] = useState<InputForm>({
        resturantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined,
    })
    const[error, setError] = useState<Partial<InputForm>>({});
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    }

    const SubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = ResturantFormSchema.safeParse(input);
        if (!res.success) {
            const fieldErrors = res.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<InputForm>);
            return;
        }
        //api implementation
        console.log(input);
    }

    const loading = false;
    const resturant = false;
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div>
                <div>
                    <h1 className='font-semibold text-xl mb-5 text-center'>Add Resturant Details</h1>
                    <form onSubmit={SubmitHandler}>
                        <div className='md:grid grid-cols-2 gap-2 space-y-2 md:space-y-0'>
                            {/* Resturant name */}
                            <div>
                                <Label>Resturant Name</Label>
                                <Input
                                    type='text'
                                    name='resturantName'
                                    value={input.resturantName}
                                    onChange={changeEventHandler}
                                    placeholder='Enter your resturant name'
                                />
                                {
                                    error && <span className='text-xs text-red-600 font-medium'>{error.resturantName}</span>
                                }
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input
                                    type='text'
                                    value={input.city}
                                    onChange={changeEventHandler}
                                    name='city'
                                    placeholder='Enter your city name'
                                />
                                {
                                    error && <span className='text-xs text-red-600 font-medium'>{error.city}</span>
                                }
                            </div>
                            <div>
                                <Label>Country </Label>
                                <Input
                                    type='text'
                                    value={input.country}
                                    onChange={changeEventHandler}
                                    name='country'
                                    placeholder='Enter your country name'
                                />
                                {
                                    error && <span className='text-xs text-red-600 font-medium'>{error.country}</span>
                                }
                            </div>
                            <div>
                                <Label>Delivery Time</Label>
                                <Input
                                    type='number'
                                    name='deliveryTime'
                                    value={input.deliveryTime}
                                    onChange={changeEventHandler}
                                    placeholder='Enter your delivery time'
                                />
                                {
                                    error && <span className='text-xs text-red-600 font-medium'>{error.deliveryTime}</span>
                                }
                            </div>
                            <div>
                                <Label>Cuisines</Label>
                                <Input
                                    type='text'
                                    value={input.cuisines}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput({ ...input, cuisines: e.target.value.split(",") })}
                                    name='cuisines'
                                    placeholder='eg. Momos, Biriyani'
                                />
                                {
                                    error && <span className='text-xs text-red-600 font-medium'>{error.cuisines}</span>
                                }
                            </div>
                            <div>
                                <Label>Upload Resturant Image</Label>
                                <Input
                                    type='file'
                                    name='image'
                                    accept='image/*'
                                />
                                {
                                    error && <span className='text-xs text-red-600 font-medium'>{error.imageFile?.name}</span>
                                }
                            </div>
                        </div>
                        <div className='my-5 w-fit'>
                            {
                                loading ? (
                                    <Button disabled className='bg-orange hover:bg-hoverOrange'>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                                        Please wait 
                                    </Button>
                                ) : 
                            <Button className='bg-orange hover:bg-hoverOrange'>
                                {
                                    resturant ? "Update Resturant" : "Submit Resturant Details"
                                }
                            </Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Resturant