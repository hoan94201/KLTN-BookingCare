import { PhotoIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import NoImg from '@/components/images/no-user-image.gif';
import PrimaryButton from '../Button/PrimaryButton';

type Props = {
    previewImage: string | null;
    setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function index({ previewImage, setPreviewImage, setSelectedFile }: Props) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    if (typeof e.target.result === 'string') {
                        setPreviewImage(e.target.result);
                    }
                }
            };

            reader.readAsDataURL(file);
        } else {
            // Reset the selection and preview if the file is not an image
            setSelectedFile(null);
            setPreviewImage(null);
        }
    };
    return (
        <>
            <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                    <input onChange={handleFileChange} id="thumbnail" hidden type="file" accept="image/*" />
                    <label
                        htmlFor="thumbnail"
                        className="outline-none border-none rounded-md h-[30px] my-2.5 bg-background  text-white  bg-white px-2.5 py-1.5 text-sm font-semibold hover:opacity-70"
                    >
                        Change
                    </label>
                </div>
            </div>
            <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <label htmlFor="thumbnail" className="text-center">
                        {previewImage ? (
                            <Image
                                src={previewImage ? previewImage : NoImg}
                                width={150}
                                height={150}
                                alt={''}
                                className="h-full min-h-[150px] max-h-[220px] w-full bg-cover"
                            />
                        ) : (
                            <>
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </>
                        )}
                    </label>
                </div>
            </div>
        </>
    );
}
