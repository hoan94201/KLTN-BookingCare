'use client';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { apiRouters, pageRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import Input from '@/components/common/Input';
import Selection from '@/components/common/Selection/index';
import Upload from '@/components/common/Upload';
import ErrorMessage from '@/components/common/ErrorMessage';
import ConfirmPassword from '@/components/common/Modal/ConfirmPassword';
import { CreateUser, PositionType, ProvinceType } from '@/interfaces/common';
import api from '@/services/api';
import { emailRules, fieldRules, phoneNumberRules } from '@/utils/Validatetor';
import { MetaData } from '@/components/MetaData/MetaData';

export default function Page() {
    const { setIsLoading } = useContext(LoadingContext);
    const { data: session, update: updateSession } = useSession();
    const [isCodeProvince, setCodeProvince] = useState<number>(1);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [isModal, setModal] = useState<boolean>(false);

    useEffect(() => {
        setValue('email', session?.user.email);
        setValue('firstName', session?.user.firstName);
        setValue('lastName', session?.user.lastName);
        setValue('phoneNumber', session?.user.phoneNumber);
        setValue('gender', session?.user.gender);
        setValue('roleId', session?.user.roleId);
        setValue('positionId', session?.user.positionId);
        setSelectedFile(session?.user.image);
        setPreviewImage(session?.user.image);
    }, [session]);

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
    const city = watch('city');

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

    // ACTION EDIT
    const userEditInfor = async (data: FormData): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.EDIT_USER, data);
    };
    const { mutate: userEditRequest, isLoading } = useMutation('userEditRequest', userEditInfor, {
        onSuccess: async () => {
            toast.success('🦄 User information updated successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            await updateSession({
                firstName: getValues('firstName'),
                lastName: getValues('lastName'),
            });
        },
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const onSubmit: SubmitHandler<CreateUser> = (data) => {
        setModal(true);
    };
    const handleConfirm = () => {
        const newData = new FormData();
        newData.append('id', `${session?.user.id}`);
        newData.append('firstName', getValues('firstName'));
        newData.append('lastName', getValues('lastName'));
        newData.append('email', getValues('email'));
        newData.append('address', getValues('city') + ' ' + getValues('district'));
        newData.append('phoneNumber', getValues('phoneNumber'));
        newData.append('gender', getValues('gender'));
        newData.append('roleId', getValues('roleId'));
        newData.append('positionId', getValues('positionId'));
        if (selectedFile) {
            newData.append('image', selectedFile);
        }
        userEditRequest(newData);
    };

    return (
        <MetaData title={'Profile - BookingCare'} className={''}>
            <div className="space-y-10 divide-y divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
                    >
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="firstName"
                                            register={register('firstName', fieldRules(true))}
                                            autoComplete="on"
                                            placeholder="..."
                                            error={errors.firstName?.message}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="lastName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="lastName"
                                            register={register('lastName', fieldRules(true))}
                                            autoComplete="on"
                                            placeholder="..."
                                            error={errors.lastName?.message}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            id="email"
                                            register={register('email', emailRules(true))}
                                            autoComplete="on"
                                            placeholder="..."
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            disabled
                                            id="password"
                                            type="password"
                                            value="12345678"
                                            autoComplete="on"
                                            placeholder="..."
                                            className="disabled:bg-gray-100"
                                        />
                                    </div>
                                    <Link
                                        href={pageRouters.CHANGE_PASSWORD}
                                        className="text-xs mt-1 text-primary hover:opacity-60"
                                    >
                                        {' '}
                                        Change Password
                                    </Link>
                                </div>
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="phoneNumber"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                                +84
                                            </span>
                                            <Input
                                                id="phoneNumber"
                                                register={register('phoneNumber', phoneNumberRules(true))}
                                                autoComplete="on"
                                                placeholder="..."
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage error={errors.phoneNumber?.message} />
                                </div>
                                <div className="sm:col-span-4  flex flex-col gap-3">
                                    <label className="text-sm !font-medium text-[#374151]">Ngày sinh</label>
                                    <DatePicker
                                        className="border-gray-300 w-full max-w-[50%] focus:border-primary bg-[#F9FAFB] focus:ring-primary rounded-md shadow-sm "
                                        showIcon
                                        maxDate={new Date()}
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <Selection
                                        register={register}
                                        textForm="city"
                                        label={'City'}
                                        listItem={listProvinces ? listProvinces : []}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <Selection
                                        register={register}
                                        textForm="district"
                                        label={'District'}
                                        listItem={listDistrict ? listDistrict : []}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <Selection
                                        register={register}
                                        textForm="gender"
                                        label={'Gender'}
                                        listType={listGender ? listGender : []}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <label
                                        htmlFor="about"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                        Write a few sentences about yourself.
                                    </p>
                                </div>

                                <Upload
                                    previewImage={previewImage}
                                    setPreviewImage={setPreviewImage}
                                    setSelectedFile={setSelectedFile}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
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
                    </form>
                </div>
                <ToastContainer icon={true} />
                <ConfirmPassword open={isModal} onConfirm={handleConfirm} onClose={() => setModal(false)} />
            </div>
        </MetaData>
    );
}
