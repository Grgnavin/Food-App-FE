import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import EditMenu, { MenuFormSchema } from './EditMenu';
import { MenuSchema } from '@/schema/menuSchema';
import { useMenu } from '@/store/useMenuStore';
import { useResturant } from '@/store/useResturantStore';

type Input = {
    name: string,
    description: string,
    price: number,
    image: File | undefined;
}

const AddMenu:React.FC = () => {
    const[input, setInput] = useState<Input>({
        name: "",
        description: "",
        price: 0,
        image: undefined
    });
    const { resturant } = useResturant();
    const { loading, createMenu } = useMenu();
    const[open, setOpen] = useState<boolean>(false);
    const[selectedMenu, setSelectedMenu] = useState<any>();
    const[editOpen, setEditOpen] = useState<boolean>(false);
    const [error, setError] = useState<Partial<MenuFormSchema>>();

    const SubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = MenuSchema.safeParse(input);
        if (!res.success) {
            const fieldError = res.error.formErrors.fieldErrors;
            setError(fieldError as Partial<MenuFormSchema>);
            return;
        }
        //api start here
        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            if (input.image) {
                formData.append('image', input.image);
            }
            await createMenu(formData);
        } catch (error) {
            console.log(error);
        }
    };

    const ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === "number" ? Number(value) :value});
    }
    
    useEffect(() => {
        
    }, [])

    return (
        <div className='max-w-6xl mx-auto my-10'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-lg md:text-2xl'>Available Menus</h1>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button className='bg-orange hover:bg-hoverOrange'>
                        <Plus className='mr-2'/>
                        Add menu
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-center text-gray-600'>
                            Add a new Menu
                        </DialogTitle>
                        <DialogDescription className='text-center'>
                            Create  menu that will make your resturant stand out.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={SubmitHandler} className='space-y-4'>
                        <div>
                            <Label>Name</Label>
                            <Input 
                                value={input.name}
                                onChange={ChangeEventHandler}
                                type='text'
                                placeholder='Enter menu name'
                                name='name'
                            />
                            {
                                error && <span className='text-xs text-red-600 font-medium'>{error.name}</span>
                            }
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                                type='text'
                                value={input.description}
                                onChange={ChangeEventHandler}
                                placeholder='Enter menu description'
                                name='description'
                            />
                            {
                                error && <span className='text-xs text-red-600 font-medium'>{error.description}</span>
                            }
                        </div>
                        <div>
                            <Label>Price in (Rupees)</Label>
                            <Input 
                                type='number'
                                value={input.price}
                                onChange={ChangeEventHandler}
                                placeholder='Enter menu price'
                                name='price'
                            />
                            {
                                error && <span className='text-xs text-red-600 font-medium'>{error.price}</span>
                            }
                        </div>
                        <div>
                            <Label>Upload menu Image</Label>
                            <Input 
                                type='file'
                                onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined})}
                                name='image'
                            />
                            {
                                error && <span className='text-xs text-red-600 font-medium'>{error.image?.name || "Image is required"}</span>
                            }
                        </div>
                        <DialogFooter className='mt-5'>
                            {
                                loading ? (
                                    <Button className='bg-orange w-full hover:bg-hoverOrange'>
                                        <Loader2 className='mr-2 w-4 h-4 animate-spin'/> Please wait 
                                    </Button>   
                                ) : <Button className='bg-orange w-full hover:bg-hoverOrange'>
                                    Submit
                                </Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            {/* Displaying the menus */}
            </div>
            {
                resturant && resturant.menus && resturant.menus.map((menu:any, idx: number) => (
                    <div className='mt-6 space-y-4' key={idx}>
                        <div className='flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border'>
                                <img 
                                    src={menu.image}
                                    alt=""
                                    className='md:h-24 h-16 md:w-24 object-cover rounded-lg'
                                />
                                <div className='flex-1'>
                                    <h1 className='text-lg font-medium text-gray-800 dark:text-gray-200'>Name: {menu.name}</h1>
                                    <p className='text-sm text-gray-600 mt-1 dark:text-gray-200'>{menu.description}</p>
                                    <h2 className='text-md font-medium mt-1'>
                                        Price: <span>{menu.price}</span>
                                    </h2>
                                </div>
                                    {/* Added Prev instead of the true */}
                                    <Button onClick={() => {
                                            setSelectedMenu(menu) 
                                            setEditOpen(prev => !prev)
                                        }} size={'sm'} className='bg-orange mt-2 hover:bg-hoverOrange'>
                                        Edit
                                    </Button>
                        </div>
                    </div>
                ))
            }
            <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen}/>
        </div>
    )
}

export default AddMenu