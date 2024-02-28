'use client';
import React from 'react';
import { jsPDF } from 'jspdf';
import { useForm } from 'react-hook-form';
import PrimaryButton from '@/components/common/Button/PrimaryButton';
import Input from '@/components/common/Input';
import { MetaData } from '@/components/MetaData/MetaData';

type Props = {};

interface IChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export default function Page({}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setError,
        getValues,
        setValue,
        formState: { errors },
        watch,
    } = useForm<IChangePassword>();
    const handleSubmited = () => {
        // create pdf
        const doc = new jsPDF();

        doc.text('Hello world!', 10, 10);
        doc.text('name! : truongne', 10, 20);
        doc.text('name! : truongne', 10, 30);

        const pdf = doc.output('datauristring');

        const blob = dataURItoBlob(pdf);
        console.log(pdf);

        // download(blob, 'data.pdf');
    };

    const dataURItoBlob = (dataURI: any) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    };

    const download = (blob: any, filename: any) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    };

    return (
        <MetaData title={'ChangePassword - BookingCare'} className={''}>
            <div className="relative top-[-40px] h-[100vh] bg-[url(https://bookingcare.vn/assets/anh/bookingcare-cover-4.jpg)]">
                <h4 className="text-xl font-medium flex justify-center"> Change Password </h4>
                <div className="flex justify-center">
                    <form onSubmit={handleSubmited} className="w-full max-w-sm mt-5">
                        <Input label="Old password" />
                        <div className="mt-4">
                            <Input label="New Password" />
                        </div>
                        <div className="mt-4">
                            <Input label="Confirm password" />
                        </div>
                        <div className="flex justify-end mt-5">
                            <PrimaryButton
                                type="button"
                                onClick={handleSubmited}
                                className="px-4 py-1 hover:opacity-60"
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </MetaData>
    );
}
