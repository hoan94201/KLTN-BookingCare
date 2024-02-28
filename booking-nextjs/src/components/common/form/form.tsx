'use client';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';

import { ServerStatusCode } from '@/components/constants/enum';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import Selection from '@/components/common/Selection/index';
import { CreateUser, PositionType, ProvinceType } from '@/interfaces/common';
import api from '@/services/api';
import { emailRules, fieldRules, passwordRegisterRules, phoneNumberRules } from '@/utils/Validatetor';
import Upload from '../Upload';
import ErrorMessage from '../ErrorMessage';

type Props = {};

export default function Form({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const [isCodeProvince, setCodeProvince] = useState<number>(1);
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
    } = useForm<CreateUser>();

    //ACTION GET ALL PROVINCE
    const getListProvince = async (): Promise<ProvinceType[]> => {
        setIsLoading(true);
        const res = await axios.get('https://provinces.open-api.vn/api/?depth=1');
        return res.data;
    };
    const { data: listProvinces, refetch: refetchGetListProvince } = useQuery('getListProvince', getListProvince, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            setValue('city', res[0].name);
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {
             setIsLoading(false);
        },
        refetchOnMount: true,
    });
    // ACTION GET ALL DISTRICT
    const getListDistrict = async (): Promise<ProvinceType[]> => {
        setIsLoading(true);
        const res = await axios.get(`https://provinces.open-api.vn/api/p/${isCodeProvince}?depth=2`);
        return res.data.districts;
    };
    const { data: listDistrict, refetch: refetchGetListDistrict } = useQuery('getListDistrict', getListDistrict, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            setValue('district', res[0].name);
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {
             setIsLoading(false);
        },
        refetchOnMount: true,
    });
    // ACTION GET ALL POSITION
    const getListPosition = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'POSITION';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listPosition, refetch: refetchGetListPosition } = useQuery('getListPosition', getListPosition, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            setValue('positionId', res[0].keyMap);
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {},
        refetchOnMount: true,
    });
    // ACTION GET ALL GENDER
    const getListGender = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'GENDER';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listGender, refetch: refetchGetListGender } = useQuery('getListGender', getListGender, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            setValue('gender', res[0].keyMap);
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {},
        refetchOnMount: true,
    });
    // ACTION GET ALL ROLE
    const getListRole = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'ROLE';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listRole, refetch: refetchGetListRole } = useQuery('getListRole', getListRole, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            setValue('roleId', res[0].keyMap);
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    // ACTION CREATE
    const userCreateNew = async (data: FormData): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.CREATE_USER, data);
    };
    const { mutate: userCreateRequest, isLoading } = useMutation('userCreateRequest', userCreateNew, {
        onSuccess: async () => {
            await queryClient.refetchQueries(['getListUsers']);
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
            reset({
                firstName: '',
                lastName: '',
                email : '' ,
                password: '',
                phoneNumber: '',
                
     
            })
            setSelectedFile(null)
            setPreviewImage('')
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {},
    });

    const city = watch('city');
    const onSubmit: SubmitHandler<CreateUser> = (data) => {
        const newData = new FormData();
        newData.append('firstName', data.firstName);
        newData.append('lastName', data.lastName);
        newData.append('email', data.email);
        newData.append('password', data.password);
        newData.append('address', data.city + ' ' + data.district);
        newData.append('phoneNumber', data.phoneNumber);
        newData.append('gender', data.gender);
        newData.append('roleId', data.roleId);
        newData.append('positionId', data.positionId);
        if (selectedFile) {
            newData.append('image', selectedFile);
        }
        userCreateRequest(newData);
    };
    useEffect(() => {
        const list = listProvinces?.find((item) => {
            return item.name === city;
        });
        if (list) {
            setCodeProvince(list.code);
        }
    }, [city]);
    useEffect(() => {
        refetchGetListDistrict();
    }, [isCodeProvince]);
    return (
        <div>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
                >
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            First name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                {...register('firstName', fieldRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage error={errors.firstName?.message} />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            Last name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                {...register('lastName', fieldRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage error={errors.lastName?.message} />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Email address
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="email"
                                {...register('email', emailRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage error={errors.email?.message} />
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Password
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="password"
                                {...register('password', passwordRegisterRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage error={errors.password?.message} />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <Selection
                            register={register}
                            textForm="city"
                            label={'City'}
                            listItem={listProvinces ? listProvinces : []}
                        />
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <Selection
                            register={register}
                            textForm="district"
                            label={'District'}
                            listItem={listDistrict ? listDistrict : []}
                        />
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Phone Number
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                {...register('phoneNumber', phoneNumberRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage error={errors.phoneNumber?.message} />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <Selection
                            register={register}
                            textForm="gender"
                            label={'Gender'}
                            listType={listGender ? listGender : []}
                        />
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <Selection
                            register={register}
                            textForm="roleId"
                            label={'Role'}
                            listType={listRole ? listRole : []}
                        />
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <Selection
                            register={register}
                            textForm="positionId"
                            label={'Position'}
                            listType={listPosition ? listPosition : []}
                        />
                    </div>

                    <Upload
                        previewImage={previewImage}
                        setPreviewImage={setPreviewImage}
                        setSelectedFile={setSelectedFile}
                    />
                    <div className="!mt-6 !mb-6 flex !border-none items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
          
        </div>
    );
}
