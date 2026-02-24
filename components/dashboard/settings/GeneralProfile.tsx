import React, { useState, useRef } from 'react';
import { Pencil, ChevronDown, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProfileData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    state: string;
}

const GeneralProfile: React.FC = () => {
    // Original data (could come from props/API)
    const originalData: ProfileData = {
        firstName: 'kyle',
        lastName: 'Holland',
        phone: '(555) 000-0000',
        email: 'etaibastob@mail.com',
        country: 'United States',
        state: '',
    };

    const defaultImage = '/images/default-profile.png';
    const [formData, setFormData] = useState<ProfileData>(originalData);
    const [editMode, setEditMode] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [imageKey, setImageKey] = useState(0); // Add key to force re-render
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file type
            if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
                alert('Please upload a PNG or JPEG image');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                setImageKey(prev => prev + 1); // Force re-render of Image component
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Here you would send data to your API
        console.log('Saving data', formData, profileImage);
        setEditMode(false);
    };

    const handleDiscard = () => {
        setFormData(originalData);
        setProfileImage(null);
        setImageKey(prev => prev + 1); // Force re-render
        setEditMode(false);
    };

    return (
        <div className="mx-auto  bg-white border p-6 rounded-xl   relative">

            <div className='flex items-center justify-between'>
                <h2 className='self-stretch text-[#1D1F2C]  text-2xl font-semibold leading-[150%] tracking-[0.07px] mb-4.5'>My Profile</h2>


                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={toggleEditMode}
                >
                    <Pencil className="w-5 h-5" />
                    <span className="text-sm font-medium">Edit</span>
                </Button>
            </div>
            {/* Profile Photo Section */}
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 relative">
                        {profileImage ? (
                            <Image
                                key={imageKey} // Add key to force refresh when image changes
                                src={profileImage}
                                alt="Profile"
                                fill
                                className="object-cover"
                                sizes="64px"
                                unoptimized // Add this for base64/local images
                            />
                        ) : (
                            <Image
                                src={defaultImage}
                                alt="Default Profile"
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">
                                Profile Photo
                            </span>

                            {editMode && (
                                <>
                                    <button
                                        onClick={triggerFileInput}
                                        className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-colors"
                                    >
                                        Change
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="hidden"
                                    />
                                </>
                            )}
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                            Min 400x400px, PNG or JPEG formats. Max 5MB.
                        </p>
                    </div>
                </div>


            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 ">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Personal Information
                    </h2>
                    <p className="text-sm text-gray-400">
                        {editMode ? 'Modify Your Personal Information' : 'Your personal details'}
                    </p>
                </div>

                {/* Always show input fields, but with readOnly/disabled based on editMode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                readOnly={!editMode}
                                className={`w-full p-2.5 pr-10 border rounded-lg outline-none transition-all ${editMode
                                        ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white'
                                        : 'border-transparent bg-gray-50 text-gray-700 cursor-default'
                                    }`}
                            />
                            {editMode && <Pencil className="absolute right-3 top-3 text-gray-400 w-4 h-4" />}
                        </div>
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                readOnly={!editMode}
                                className={`w-full p-2.5 pr-10 border rounded-lg outline-none transition-all ${editMode
                                        ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white'
                                        : 'border-transparent bg-gray-50 text-gray-700 cursor-default'
                                    }`}
                            />
                            {editMode && <Pencil className="absolute right-3 top-3 text-gray-400 w-4 h-4" />}
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <div className={`flex border rounded-lg overflow-hidden ${editMode
                                ? 'border-gray-200 focus-within:ring-2 focus-within:ring-blue-500'
                                : 'border-transparent bg-gray-50'
                            }`}>
                            <div className={`flex items-center gap-1 px-3 border-r ${editMode ? 'border-gray-200 bg-gray-50' : 'border-transparent bg-gray-50'
                                } text-sm`}>
                                <span className="text-lg">🇺🇸</span>
                                <span>+1</span>
                                {editMode && <ChevronDown className="w-3 h-3 text-gray-500" />}
                            </div>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                readOnly={!editMode}
                                className={`w-full p-2.5 outline-none ${editMode ? 'bg-white' : 'bg-gray-50 text-gray-700 cursor-default'
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly={!editMode}
                                className={`w-full p-2.5 pr-10 border rounded-lg outline-none transition-all ${editMode
                                        ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white'
                                        : 'border-transparent bg-gray-50 text-gray-700 cursor-default'
                                    }`}
                            />
                            {editMode && <Pencil className="absolute right-3 top-3 text-gray-400 w-4 h-4" />}
                        </div>
                    </div>

                    {/* Country */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            Country/Region
                        </label>
                        <div className="relative">
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`w-full p-2.5 appearance-none border rounded-lg outline-none ${editMode
                                        ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white'
                                        : 'border-transparent bg-gray-50 text-gray-700 cursor-default'
                                    }`}
                            >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                            </select>
                            <ChevronDown className={`absolute right-3 top-3 w-4 h-4 pointer-events-none ${editMode ? 'text-gray-400' : 'text-gray-300'
                                }`} />
                        </div>
                    </div>

                    {/* State */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            State
                        </label>
                        <div className="relative">
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                disabled={!editMode}
                                className={`w-full p-2.5 appearance-none border rounded-lg outline-none ${editMode
                                        ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white'
                                        : 'border-transparent bg-gray-50 text-gray-500 cursor-default'
                                    }`}
                            >
                                <option value="">Select a state</option>
                                <option value="CA">California</option>
                                <option value="NY">New York</option>
                                <option value="TX">Texas</option>
                            </select>
                            <ChevronDown className={`absolute right-3 top-3 w-4 h-4 pointer-events-none ${editMode ? 'text-gray-400' : 'text-gray-300'
                                }`} />
                        </div>
                    </div>
                </div>

                {/* Form Actions (only show in edit mode) */}
                {editMode && (
                    <div className="mt-10 flex gap-3">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2.5 bg-[#3b6b8f] text-white font-semibold rounded-lg hover:bg-[#2d526e] transition-colors shadow-sm"
                        >
                            Save changes
                        </button>
                        <button
                            onClick={handleDiscard}
                            className="px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Discard changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GeneralProfile;