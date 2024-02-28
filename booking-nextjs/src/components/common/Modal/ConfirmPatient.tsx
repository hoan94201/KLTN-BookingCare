'use client';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useFieldArray, Controller, useWatch, useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import { useMutation, useQueryClient } from 'react-query';

import Input from '../Input';
import { fieldRules, validateRules } from '@/utils/Validatetor';
import PrimaryButton from '../Button/PrimaryButton';
import { IDataPatient } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { ResponseError } from '@/interfaces/response';

interface Iprop {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPatient: IDataPatient | undefined;
}

interface IConfirmPatient {
    name: string;
    date: number;
}
export default function Index({ open, setOpen, isPatient }: Iprop) {
    const cancelButtonRef = useRef(null);
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();
    const {
        register,
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            data: [{ name: '...', date: 2 }],
        },
    });
    const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
        control,
        name: 'data',
    });
    const handleSendPatient = async (data: any): Promise<any> => {
         setIsLoading(true);
        return await api.post(apiRouters.SEND_REMEDY, data);
    };
    const { mutate: confirmPatient } = useMutation(handleSendPatient, {
        onSuccess: async(response, data) => {
             toast.success('🦄 Confirm successful examination', {
                 position: 'top-right',
                 autoClose: 5000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: 'light',
             });
            setOpen(false);
            reset()
             await queryClient.refetchQueries(['getListPatient']);
        },
        onError: ({ response }: ResponseError<any>) => {
            toast.error('🦄 Confirmation failed please try again', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        },
        onSettled() {
            setIsLoading(false);
        },
    });
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

    const onSubmit = (data: { data: IConfirmPatient[] }) => {
        const doc = new jsPDF();

        doc.text('This is your prescription :', 10, 10);
        data.data.map((item , index) => {
            doc.text(`Type of medicine : ${item.name}`, 10, (index*2 + 2)*10);
            doc.text(`Use : ${item.date}times/day`, 10, (index * 2 + 3) * 10);
        });

        const pdf = doc.output('datauristring');
                const blob = dataURItoBlob(pdf);

        const newData = {
            email: isPatient?.patientData.email,
            doctorId: isPatient?.doctorId,
            patientId: isPatient?.patientId,
            timeType: isPatient?.timeType,
            patientName: isPatient?.patientData.firstName,
            pdf: pdf,
            date: isPatient?.date
        };
     confirmPatient(newData);
    };

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={() => setOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl ">
                                    <div>
                                        <div className="w-full flex justify-center">
                                            <Dialog.Title
                                                as="h3"
                                                className="!text-lg h-12 flex items-center font-semibold leading-6 text-gray-900"
                                            >
                                                Confirm receipt of patient
                                            </Dialog.Title>
                                        </div>
                                        <div className="absolute top-2 right-2 flex justify-end w-full">
                                            <div
                                                onClick={() => setOpen(false)}
                                                className="flex hover:opacity-80 cursor-pointer h-12 w-12 items-center justify-center rounded-full bg-red-100"
                                            >
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />{' '}
                                            </div>
                                        </div>
                                        <div className="mt-3 sm:mt-5 px-2">
                                            <div className="flex gap-2 items-center">
                                                <p>Name patient : </p>
                                                <p className="text-sm text-blue-600 border-gray-300 focus:border-primary bg-[#F9FAFB] focus:ring-primary rounded-md shadow-sm mt-1 block w-[30%]">
                                                    {isPatient?.patientData.firstName}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <p>Email : </p>
                                                <p className="text-sm text-blue-600 border-gray-300 focus:border-primary bg-[#F9FAFB] focus:ring-primary rounded-md shadow-sm mt-1 block w-[30%]">
                                                    {isPatient?.patientData.email}
                                                </p>
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                                {fields.map((item, index) => {
                                                    return (
                                                        <div key={index} className="flex gap-4">
                                                            <Input
                                                                labelName="text-sm !font-medium mt-3"
                                                                label={`Drug name`}
                                                                placeholder="Drug name"
                                                                autoComplete="on"
                                                                className="w-full max-w-[90%]"
                                                                register={register(
                                                                    `data.${index}.name`,
                                                                    fieldRules(true),
                                                                )}
                                                                error={errors.data?.[index]?.name?.message}
                                                            />
                                                            <div className=" flex gap-2">
                                                                <Input
                                                                    labelName="text-sm !font-medium mt-3"
                                                                    label={`Date`}
                                                                    placeholder="0"
                                                                    autoComplete="on"
                                                                    type="number"
                                                                    className=""
                                                                    register={register(
                                                                        `data.${index}.date`,
                                                                        validateRules(true),
                                                                    )}
                                                                    error={errors.data?.[index]?.date?.message}
                                                                />
                                                                <p className="flex items-end w-full text-xs">/ Lần</p>
                                                            </div>
                                                            <div
                                                                className={`flex items-end ${
                                                                    index > 0 ? '' : 'opacity-0'
                                                                }`}
                                                            >
                                                                <button
                                                                    className="py-2 text-red-400 hover:opacity-60"
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                <div className="mt-4">
                                                    <PrimaryButton
                                                        type="button"
                                                        onClick={() => {
                                                            append({ name: '...', date: 0 });
                                                        }}
                                                        className="!text-sm px-2 py-1"
                                                    >
                                                        append
                                                    </PrimaryButton>
                                                </div>

                                                <div className="mt-3 flex justify-end">
                                                    <PrimaryButton
                                                        type="submit"
                                                        className="px-2 py-1 rounded-md hover:opacity-80 font-bold"
                                                    >
                                                        SAVE
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                        <ToastContainer icon={false} />
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastContainer icon={false} />
        </>
    );
}
