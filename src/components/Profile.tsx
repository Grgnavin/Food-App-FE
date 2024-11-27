import React, { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Loader2, LocateIcon, Mail, MapPin, MapPinnedIcon, Plus } from 'lucide-react'
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useUserStore } from '@/store/useUserStore';

const Profile: React.FC = () => {
    const { user, updateProfile } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState<any>({
        fullname: user?.fullname || '',
        email: user?.email || '',
        address: user?.address || '',
        city: user?.city || '',
        country: user?.country || '',
        profilePicture: user?.profilePicture as string || "" || undefined,
        contact: '',
        admin: false,
        isVerified: false,
    });

    const imageRef = useRef<HTMLInputElement | null>(null);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState<any>(user?.profilePicture || "");
    
    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setSelectedProfilePicture(base64); // Set preview as base64
                setProfileData((prev: any) => ({
                    ...prev,
                    profilePicture: base64, // Store the actual file for upload
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData((prev: any) => ({ ...prev, [name]: value }));
    };

    const updateProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateProfile(profileData);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
                        <AvatarImage src={selectedProfilePicture} alt="Profile Picture" />
                        <AvatarFallback>Cn</AvatarFallback>
                        <input
                            ref={imageRef}
                            accept="image/*"
                            onChange={fileChangeHandler}
                            className="hidden"
                            type="file"
                            aria-label="Upload Profile Picture"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
                            onClick={() => imageRef.current?.click()}
                        >
                            <Plus className="text-white w-8 h-8" />
                        </div>
                    </Avatar>
                    <Input
                        type="text"
                        name="fullname"
                        value={profileData.fullname}
                        onChange={changeHandler}
                        className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
                        placeholder="Full Name"
                    />
                </div>
            </div>
            <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-300 dark:text-gray-600">
                    <Mail className="text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input
                            disabled
                            type="text"
                            name="email"
                            value={profileData.email}
                            className="w-full text-gray-600 bg-transparent focus-visible:ring-transparent outline-none border-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-300 dark:text-gray-600">
                    <LocateIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <Input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-300 dark:text-gray-600">
                    <MapPin className="text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <Input
                            type="text"
                            name="city"
                            value={profileData.city}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200 dark:bg-gray-300 dark:text-gray-600">
                    <MapPinnedIcon className="text-gray-500" />
                    <div className="w-full">
                        <Label>Country</Label>
                        <Input
                            type="text"
                            name="country"
                            value={profileData.country}
                            onChange={changeHandler}
                            className="w-full text-gray-600 bg-transparent"
                        />
                    </div>
                </div>
            </div>
            <div className="text-center">
                {isLoading ? (
                    <Button disabled className="bg-orange hover:bg-hoverOrange w-full mt-2">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" className="bg-orange hover:bg-hoverOrange w-full mt-2">
                        Update
                    </Button>
                )}
            </div>
        </form>
    );
};

export default Profile;