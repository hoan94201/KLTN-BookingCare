'use client';
import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import SelectDoctor from '../Selection/SelectDoctor';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import api from '@/services/api';
import CheckboxOptions from '../Checkbox/checkboxOptions';
import { DoctorInforData, InforDoctorData, PositionType } from '@/interfaces/common';
import SelectSpecial from '../Selection/SelectSpecial';
import SelectClinics from '../Selection/SelectClinics';
import Markdowns from '../Markdown/Markdown';

export default function FormDoctor() {
    const { setIsLoading } = useContext(LoadingContext);

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
    } = useForm<DoctorInforData>();

    // ACTION GET ALL PRICE
    const getListPrice = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'PRICE';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listPrice, refetch: refetchGetListPrice } = useQuery('getListPrice', getListPrice, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {},
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {},
        refetchOnMount: true,
    });
    // ACTION GET ALL PAYMENT
    const getListPayment = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'PAYMENT';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listPayment, refetch: refetchGetListPayment } = useQuery('getListPayment', getListPayment, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {},
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    // ACTION GET ALL INFO DOCTOR
    const GetInfoDoctor = async (): Promise<InforDoctorData> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.DETAIL_DOCTOR(parseInt(getValues('doctorId')))}`);
        return data.data;
    };
    const { data: dataInfoDoctor, refetch: refetchGetInfoDoctor } = useQuery('getInfoDoctor', GetInfoDoctor, {
        staleTime: Infinity,
        enabled: false,
        retry: 0,
        onSuccess: (res) => {
            if (res.Markdown) {
                setValue('description', res.Markdown.description);
                setValue('contentHTML', res.Markdown.contentHTML);
                setValue('contentMarkdowmn', res.Markdown.contentMarkdowmn);
            } else {
                setValue('description', '');
                setValue('contentHTML', '');
                 setValue('contentMarkdowmn', '');

            }
            if (res.DoctorInfor) {
                setValue('specialtyId', res.DoctorInfor.SpecialtyId);
                setValue('clinicId', res.DoctorInfor.clinicId);
                setValue('priceId', res.DoctorInfor.priceId);
                setValue('paymentId', res.DoctorInfor.paymentId);
                setValue('action', 'EDIT');
            } else {
                setValue('specialtyId', NaN);
                setValue('clinicId', NaN);
                setValue('priceId', '');
                setValue('paymentId', '');
                setValue('action', 'ADD');
            }
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    // ACTION CREATE INFORMATION DOCTOR
    const doctorCreateInfor = async (data: DoctorInforData): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.SAVE_INFO, data);
    };
    const { mutate: doctorCreateInfoRequest, isLoading } = useMutation('doctorCreateInforRequest', doctorCreateInfor, {
        onSuccess: async () => {
            toast.success('🦄 Doctor information has been successfully updated !', {
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
        onError: () => {
                toast.error('🦄 Doctor information has been fail updated !', {
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
        onSettled: () => {
            setIsLoading(false);
        },
    });
    const onSubmit: SubmitHandler<DoctorInforData> = (data) => {
        doctorCreateInfoRequest(data);
    };
    useEffect(() => {
        refetchGetInfoDoctor();
    }, [watch('doctorId')]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <SelectDoctor register={register('doctorId')} />
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    {...register('description')}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about yourself.
                            </p>
                        </div>
                        <SelectSpecial setValue={setValue} register={register} />
                        <SelectClinics setValue={setValue} register={register} />
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We will always let you know about important changes, but you pick what else you want to hear
                        about.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <CheckboxOptions
                            register={register}
                            title="Price"
                            type="PRICE"
                            listData={listPrice ? listPrice : []}
                        />
                        <CheckboxOptions
                            register={register}
                            title="Payment"
                            type="PAYMENT"
                            listData={listPayment ? listPayment : []}
                        />
                    </div>
                </div>
                <div>
                    <Markdowns getValues={getValues} setValue={setValue} />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
            <ToastContainer icon={true} />
        </form>
    );
}
