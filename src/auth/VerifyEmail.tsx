import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react'

const VerifyEmail: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const loading = false;
    const handleChange = (index: number, value: string) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp)
        }
        //Move to the next input field 
        if (value !== "" && index < 5) {
            inputRef.current[index+1]?.focus();
        }
    }
    const handleKeydown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRef.current[index-1]?.focus();
        }
    }

    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <div className='p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200'>
                <div className='text-center'>
                    <h1 className='font-bold text-2xl'>VeriFy your email</h1>
                    <p className='text-sm text-gray-600'>Enter the 6 digit code sent to your email address</p>
                </div>
                <form action="">
                    <div className='flex justify-between'>
                        {
                            otp.map((letter: string, index: number) =>( 
                                <Input 
                                    key={index}
                                    type='text'
                                    value={letter}
                                    maxLength={1}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeydown(index, e)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                    ref={(e) => (inputRef.current[index] = e)}
                                    className='md:w-12 md:h-12w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 '
                                />
                            ))
                        }
                    </div>
                    {
                        loading ? <Button disabled className='bg-orange hover:bg-hoverOrange mt-6 w-full'><Loader2 className='mr-2 w-4 h-4 animate-spin'/>Please wait</Button> : <Button className='bg-orange hover:bg-hoverOrange mt-6 w-full'>Verify</Button> 
                    }
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail