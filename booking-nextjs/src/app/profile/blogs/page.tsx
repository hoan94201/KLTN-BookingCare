'use client';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import PrimaryButton from '@/components/common/Button/PrimaryButton';
import Input from '@/components/common/Input';
import MarkdownForm from '@/components/common/Markdown/MarkdowForm';
import Upload from '@/components/common/Upload';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters, pageRouters } from '@/components/constants/router';
import { MetaData } from '@/components/MetaData/MetaData';
import { IBlogs } from '@/interfaces/common';
import { fieldRules } from '@/utils/Validatetor';
import api from '@/services/api';

type Props = {};

export default function Page({}: Props) {
    const { data: session } = useSession();
    const { setIsLoading } = useContext(LoadingContext);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
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
    } = useForm<IBlogs>();

    // ACTION CREATE
    const userCreateBlog = async (data: FormData): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.CREATE_BLOG, data);
    };
    const { mutate: userCreateBlogRequest, isLoading } = useMutation('userCreateBlog', userCreateBlog, {
        onSuccess: async () => {
            reset();
            toast.success('🦄 New user created successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            reset();
            setSelectedFile(null);
            setPreviewImage('');
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const onSubmit: SubmitHandler<IBlogs> = (data) => {
        const newData = new FormData();
        newData.append('title', data.title);
        newData.append('descriptionHTML', data.descriptionHTML);
        newData.append('descriptionMarkdown', data.descriptionMarkdown);
        newData.append('topic', data.topic);
        newData.append('userId', `${session?.user.id}`);
        if (selectedFile) {
            newData.append('image', selectedFile);
        }
        userCreateBlogRequest(newData);
    };

    return (
        <MetaData title={'Hanbook - BookingCare'} className={''}>
            <div>
                <div className="text-xl font-bold flex justify-center mb-5">
                    <h4>Create new handbook</h4>
                </div>

                <div className="text-sm hover:opacity-60 text-primary font-bold flex justify-end mb-5">
                    <Link href={pageRouters.MY_BLOGS}>list of your handbooks</Link>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Title"
                        register={register('title', fieldRules(true))}
                        error={errors.title?.message}
                        autoComplete="on"
                        placeholder="Bệnh gout ...."
                        className="!w-1/2"
                    />
                    <Input
                        label="Topic"
                        register={register('topic', fieldRules(true))}
                        error={errors.topic?.message}
                        autoComplete="on"
                        placeholder="Sống khoẻ "
                        className=""
                        labelName="mt-3"
                    />

                    <div className="mt-3">
                        <label className="mb-1 block font-normal text-sm text-[#374151] ">Content</label>

                        <MarkdownForm getValues={getValues} setValue={setValue} />
                    </div>
                    <div>
                        <Upload
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            setSelectedFile={setSelectedFile}
                        />
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton type="submit" className="px-3 rounded-md hover:opacity-70">
                            Save
                        </PrimaryButton>
                    </div>
                </form>
                <ToastContainer icon={true} />
            </div>
        </MetaData>
    );
}
