import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from '../components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from "react-router-dom"
import { LoginInput, userLoginSchema } from '@/schema/userSchema';
import { useUserStore } from '@/store/useUserStore';

const Login: React.FC = () => {
    const[input, setInput] = useState<LoginInput>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { loading, login } = useUserStore();
    const[errors, setErrors] = useState<Partial<LoginInput>>({});
    const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({...input, [name]: value});
    };
    const loginSubmitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = userLoginSchema.safeParse(input);
        if (!res.success) {
            const fieldError = res.error.formErrors.fieldErrors;
            setErrors(fieldError as Partial<LoginInput>);
            return;
        }
        try {
            await login(input);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
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
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    className='pl-10 focus-visible:ring-1'
                    value={input.email}
                    onChange={changeEventHandler}
                />
                <Mail className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                {
                    errors && <span className='text-xs text-red-500'>{errors.email}</span>
                }
                </div>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                <Input 
                    type='password'
                    name='password'
                    placeholder='Enter your Password'
                    className='pl-10 focus-visible:ring-1'
                    value={input.password}
                    onChange={changeEventHandler}
                />
                <LockKeyhole className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                {
                    errors && <span className='text-xs text-red-500'>{errors.password}</span>
                }
                </div>
                </div>
                <div className='mb-10'>
                    {
                        loading ? 
                            <Button disabled className='w-full bg-orange hover:bg-hoverOrange'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> 
                            : <Button type='submit' className='w-full  bg-orange hover:bg-hoverOrange'>Login</Button>
                    }
                    <div className='mt-4 text-center font-semibold'>
                    <Link to={"/forgot-password"} className='hover:text-blue-500 hover:underline'>Forgot Password?</Link>
                    </div>
                </div>
                <Separator />
                <p className='mt-2 text-center'>
                    Don't have an account?{" "}
                    <Link to={"/signup"} className='text-blue-500 font-semibold'>Signup</Link>
                </p>
            </form>
        </div>
    )
}

export default Login