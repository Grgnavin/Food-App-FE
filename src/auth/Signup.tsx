import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Contact, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from '../components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from "react-router-dom"
import { SignupInput, userSignupSchema } from '@/schema/userSchema';
import { useUserStore } from '@/store/useUserStore';

// type SignupInput = {
//     fullname: string;
//     email: string;
//     password: string;
//     contact: string;
// }

const Signup: React.FC = () => {
    const[input, setInput] = useState<SignupInput>({
        email: "",
        password: "",
        fullname: "",
        contact: ""
    });
    const { signup, loading } = useUserStore();
    const[errors, setErrors] = useState<Partial<SignupInput>>({});
    const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({...input, [name]: value});
    };
    const loginSubmitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = userSignupSchema.safeParse(input);
        if (!res.success) {
            const fieldError = res.error.formErrors.fieldErrors;
            setErrors(fieldError as Partial<SignupInput>);
            return;
        }
        //api implement
        await signup(input);
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={loginSubmitHandler} className='md:p-8 w-full max-w-md md:border mx-4 border-gray rounded-lg'>
                <div className='mb-4'>
                    <h1 className='font-bold text-2xl text-center'>MelodyEats</h1>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                <Input 
                    type='text'
                    name='fullname'
                    placeholder='Full Name'
                    className='pl-10 focus-visible:ring-1'
                    value={input.fullname}
                    onChange={changeEventHandler}
                />
                <User className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                {
                    errors && <span className='text-sm text-red-500'>{errors.fullname}</span>
                }
                </div>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                    <Input 
                        type='text'
                        name='contact'
                        placeholder='Contact Number'
                        className='pl-10 focus-visible:ring-1'
                        value={input.contact}
                        onChange={changeEventHandler}
                    />
                <Contact className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                {
                    errors && <span className='text-sm text-red-500'>{errors.contact}</span>
                }
                </div>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                    <Input 
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='pl-10 focus-visible:ring-1'
                        value={input.email}
                        onChange={changeEventHandler}
                    />
                    <Mail className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                    {
                        errors && <span className='text-sm text-red-500'>{errors.email}</span>
                    }
                </div>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                    <Input 
                        type='password'
                        name='password'
                        placeholder=' Password'
                        className='pl-10 focus-visible:ring-1'
                        value={input.password}
                        onChange={changeEventHandler}
                    />
                    <LockKeyhole className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                    {
                        errors && <span className='text-sm text-red-500'>{errors.password}</span>
                    }
                </div>
                </div>
                <div className='mb-10'>
                    {
                        loading ? 
                            <Button disabled className='w-full bg-orange hover:bg-hoverOrange'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> 
                            : <Button type='submit' className='w-full  bg-orange hover:bg-hoverOrange'>Signup</Button>
                    }
                </div>
                <Separator />
                <p className='mt-2 text-center'>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-blue-500 font-semibold'>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup