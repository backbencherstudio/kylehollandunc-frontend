"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Pencil, ChevronDown, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useGetGeneralProfileQuery, useUpdateGeneralProfileMutation } from '@/redux/features/admin/settings/settingsApi';
import Loader from '@/components/reusable/Loader';
import { toast } from 'sonner';

interface ProfileData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    avatar?: string; // Add avatar field
}

const mapUserToProfileData = (user: any): ProfileData => {
    const nameParts = user?.name ? user.name.split(" ") : [];

    return {
        firstName: nameParts[0] || "N/A",
        lastName: nameParts.slice(1).join(" ") || "N/A",
        email: user?.email || "N/A",
        phone: user?.profile_info?.phone || "N/A",
        country: user?.profile_info?.country || "N/A",
        state: user?.profile_info?.state || "N/A",
        avatar: user?.avatar || user?.profile_info?.avatar || null, // Get avatar from API
    };
};

const GeneralProfile: React.FC = () => {
    const { data: userData, isLoading, refetch } = useGetGeneralProfileQuery();
    const [updateProfileImage, { isLoading: isUploading }] = useUpdateGeneralProfileMutation(); // Add this mutation

    const defaultImage = '/images/default-profile.png';
    const [formData, setFormData] = useState<ProfileData>(mapUserToProfileData(userData));
    const [editMode, setEditMode] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userData) {
            const mappedData = mapUserToProfileData(userData);
            setFormData(mappedData);
            // Reset image state when new user data comes in
            setProfileImage(null);
            setIsImageChanged(false);
        }
    }, [userData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
            toast.error('Please upload a PNG or JPEG image');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result as string);
            setIsImageChanged(true);
        };
        reader.readAsDataURL(file);

        // If you want to upload immediately when selected (auto-upload)
        // await uploadImage(file);
    };

    const uploadImage = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            await updateProfileImage(formData).unwrap();
            toast.success('Profile image updated successfully');
            refetch(); // Refresh user data
            setIsImageChanged(false);
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to upload image');
            // Revert preview on error
            setProfileImage(null);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
          const formDataToSend = new FormData();
      
          formDataToSend.append(
            "name",
            `${formData.firstName} ${formData.lastName}`
          );
      
          formDataToSend.append("email", formData.email);
          formDataToSend.append("phone", formData.phone);
          formDataToSend.append("country", formData.country);
          formDataToSend.append("state", formData.state);
      
          if (fileInputRef.current?.files?.[0]) {
            formDataToSend.append(
              "profile_img", // must match backend
              fileInputRef.current.files[0]
            );
          }
      
          await updateProfileImage(formDataToSend).unwrap();
      
          toast.success("Profile updated successfully");
          setEditMode(false);
          refetch();
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to update profile");
        }
      };

    const handleDiscard = () => {
        setFormData(mapUserToProfileData(userData));
        setProfileImage(null);
        setIsImageChanged(false);
        setEditMode(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear file input
        }
    };

    // Get the current image source
    const getImageSource = () => {
        if (profileImage) {
            return profileImage; // Preview of newly uploaded image
        }
        if (formData.avatar) {
            return formData.avatar; // Existing image from API
        }
        return defaultImage; // Default fallback
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="mx-auto bg-white border p-6 rounded-xl relative">
            <div className='flex items-center justify-between'>
                <h2 className='self-stretch text-[#1D1F2C] text-2xl font-semibold leading-[150%] tracking-[0.07px] mb-4.5'>
                    My Profile
                </h2>

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
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 relative group">
                        {/* Image */}
                        <Image
                            src={getImageSource()}
                            alt={formData.firstName || "Profile"}
                            fill
                            className="object-cover"
                            sizes="64px"
                            priority
                        />

                        {/* Upload overlay in edit mode */}
                        {editMode && (
                            <div
                                onClick={triggerFileInput}
                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        )}

                        {/* Loading spinner */}
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
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
                                        disabled={isUploading}
                                        className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-white transition-colors disabled:opacity-50"
                                    >
                                        {isUploading ? 'Uploading...' : 'Change'}
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
            <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Personal Information
                    </h2>
                    <p className="text-sm text-gray-400">
                        {editMode ? 'Modify Your Personal Information' : 'Your personal details'}   
                    </p>
                </div>

                {/* Form fields (rest of your existing form code) */}
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
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                readOnly={!editMode}
                                className={`w-full p-2.5 pr-10 border rounded-lg outline-none transition-all ${editMode
                                        ? 'border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white'
                                        : 'border-transparent bg-gray-50 text-gray-700 cursor-default'
                                    }`}
                            />

                            {editMode && (
                                <Pencil className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                {editMode && (
                    <div className="mt-10 flex gap-3">
                        <button
                            onClick={handleSave}
                            disabled={isUploading}
                            className="px-6 py-2.5 bg-[#3b6b8f] text-white font-semibold rounded-lg hover:bg-[#2d526e] transition-colors shadow-sm disabled:opacity-50"
                        >
                            {isUploading ? 'Saving...' : 'Save changes'}
                        </button>
                        <button
                            onClick={handleDiscard}
                            disabled={isUploading}
                            className="px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
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