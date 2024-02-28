'use client';
import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';

import { IDataBooking, IDataCreateClinic, SpecialData } from '@/interfaces/common';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import api from '@/services/api';
import Input from '../Input';
import MarkdownForm from '../Markdown/MarkdowForm';
import PrimaryButton from '../Button/PrimaryButton';
import { fieldRules } from '@/utils/Validatetor';
import Upload from '../Upload';

interface Iprop {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isDataEdit?: SpecialData | undefined;
}

export default function Index({ isOpen, setOpen, isDataEdit }: Iprop) {
    const cancelButtonRef = useRef(null);
    const { setIsLoading } = useContext(LoadingContext);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const queryClient = useQueryClient();

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
    } = useForm<IDataCreateClinic>();
    // ACTION CREATE CLINIC
    const userCreateClinic = async (data: FormData): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.CREATE_CLINIC, data);
    };
    const { mutate: userCreateClinicRequest, isLoading } = useMutation('userCreateClinicRequest', userCreateClinic, {
        onSuccess: async () => {
            await queryClient.refetchQueries(['getListClinic']);
            toast.success('Created a new facility successfully!', {
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
            setOpen(false);
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
    });
    // ACTION EDIT CLINIC

    useEffect(() => {
        if (isDataEdit) {
            setValue('name', isDataEdit.name);
            setValue('address', isDataEdit.address);
            setValue('descriptionHTML', isDataEdit.descriptionHTML);
            setValue('descriptionMarkdown', isDataEdit.descriptionMarkdown);
            setPreviewImage(isDataEdit.image);
        }
    }, [isDataEdit]);

    const userEditClinic = async (data: FormData): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.EDIT_CLINIC, data);
    };
    const { mutate: userEditClinicRequest } = useMutation('userEditClinicRequest', userEditClinic, {
        onSuccess: async () => {
            await queryClient.refetchQueries(['getListClinic']);
            toast.success('Edit request a new facility successfully!', {
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
            setOpen(false);
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const onSubmit: SubmitHandler<IDataCreateClinic> = (data) => {
        if (!selectedFile && !isDataEdit) {
            toast.error('Please add new images', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        const newData = new FormData();
        newData.append('name', data.name);
        newData.append('address', data.address);
        newData.append('descriptionHTML', data.descriptionHTML);
        newData.append('descriptionMarkdown', data.descriptionMarkdown);
        if (selectedFile) {
            newData.append('image', selectedFile);
        }
        if (isDataEdit) {
            newData.append('id', `${isDataEdit.id}`);
            userEditClinicRequest(newData);
        } else {
            userCreateClinicRequest(newData);
        }
    };
    const handleClose = () => {
        reset();
        setOpen(false);
    };
    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[80]" initialFocus={cancelButtonRef} onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full lg:min-w-[700px]  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-2 sm:px-4">
                                    <div>
                                        <div className="w-full flex justify-center">
                                            <Dialog.Title
                                                as="h3"
                                                className="!text-lg h-12 flex items-center font-semibold leading-6 text-gray-900"
                                            >
                                                Tạo thêm cơ sỡ
                                            </Dialog.Title>
                                        </div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Input
                                                label="Name"
                                                register={register('name', fieldRules(true))}
                                                error={errors.name?.message}
                                                autoComplete="on"
                                                placeholder="Bệnh viện ...."
                                                className="!w-1/2"
                                            />
                                            <Input
                                                label="Address"
                                                register={register('address', fieldRules(true))}
                                                error={errors.name?.message}
                                                autoComplete="on"
                                                placeholder="1191 Ngô Quyền"
                                                className=""
                                                labelName="mt-3"
                                            />

                                            <div className="mt-3">
                                                <label className="mb-1 block font-normal text-sm text-[#374151] ">
                                                    Description
                                                </label>

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
                                                <PrimaryButton
                                                    type="submit"
                                                    className="px-3 rounded-md hover:opacity-70"
                                                >
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastContainer icon={false} />
        </>
    );
}
