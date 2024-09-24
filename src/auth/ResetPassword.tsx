import { Button } from '@/components/ui/button';
import { Loader2, LockKeyhole } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const ResetPassowrd: React.FC = () => {
    const[newPassword, setNewPassword] = useState<string>("");
    const loading = false;
    return (
        <div className='flex items-center justify-center min-h-screen w-full text-center'>
            <form className='w-full max-w-md rounded-lg mx-4 md:p-8 border border-gray-200 shadow-sm'>
                <div className='text-center mb-5'>
                    <h1 className='font-bold text-2xl'>Reset Password</h1>
                    <p className='text-sm text-gray-600 mt-2'>Create your new password</p>
                </div>
                <div className='relative w-full'>
                    <input 
                        type="password"
                        name="email"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='Enter your new password'
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <LockKeyhole className='absolute inset-y-2 left-2 text-gray-600 pointer-events-none'/>
                </div>
                    {
                        loading ? <Button disabled className='bg-orange hover:bg-hoverOrange w-full mt-2'><Loader2 className='mr-2 h-4 w-4 animate-spin '/>Please wait</Button>
                        : <Button className='bg-orange hover:bg-hoverOrange w-full mt-2'>Reset Password</Button>
                    }
                    <span>
                        Back to {" "}
                        <Link to={"/login"} className='text-blue-500'>Login</Link>
                    </span>
            </form>
        </div>
    )
}

export default ResetPassowrd;