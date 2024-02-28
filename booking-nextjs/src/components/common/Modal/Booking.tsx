'use client';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { AllDataDoctor, IDataBooking } from '@/interfaces/common';
import Input from '../Input';
import { emailRules, fieldRules, phoneNumberRules } from '@/utils/Validatetor';
import PrimaryButton from '../Button/PrimaryButton';
import { formatTimestamp, formatVND } from '@/utils';
import ErrorMessage from '../ErrorMessage';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import api from '@/services/api';

interface Iprop {
    dataInfoDoctor: AllDataDoctor | undefined;
    isChooseDay: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSelectDay: number;
    isTimeType: string;
}

export default function Index({ dataInfoDoctor, isChooseDay, open, setOpen, isSelectDay, isTimeType }: Iprop) {
    const cancelButtonRef = useRef(null);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const { setIsLoading } = useContext(LoadingContext);
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
    } = useForm<IDataBooking>();

    useEffect(() => {
        setValue('date', isSelectDay);
        if (dataInfoDoctor) {
            setValue('doctorId', dataInfoDoctor?.id);
            setValue('doctorName', dataInfoDoctor?.firstName + dataInfoDoctor.lastName);
            setValue('timeString', isChooseDay);
        }
        setValue('timeType', isTimeType);
    }, [isSelectDay, isTimeType]);

    // ACTION BOOKING
    const userBookingData = async (data: IDataBooking): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.BOOKING_REQUEST, data);
    };
    const { mutate: userBookingRequest, isLoading } = useMutation('userBookingRequest', userBookingData, {
        onSuccess: async () => {
            await queryClient.refetchQueries(['getScheduleDoctor']);
            toast.success('You have successfully scheduled your appointment Please confirm with email!', {
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
        },
        onError: () => {
            setIsLoading(false);
            toast.error('You have fail scheduled your appointment Please check again', {
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

    const onSubmit: SubmitHandler<IDataBooking> = (data) => {
        userBookingRequest(data);
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-2">
                                    <div>
                                        <div className="w-full flex justify-center">
                                            <Dialog.Title
                                                as="h3"
                                                className="!text-lg h-12 flex items-center font-semibold leading-6 text-gray-900"
                                            >
                                                Thông tin đặt lịch khám
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
                                            {dataInfoDoctor && (
                                                <div className="flex gap-6">
                                                    <div>
                                                        <Image
                                                            width={80}
                                                            height={80}
                                                            alt="doctor-detail"
                                                            src={dataInfoDoctor.image}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h2 className="font-medium text-[#337ab7]">
                                                            {' '}
                                                            Bác sĩ chuyên khoa :{' '}
                                                            {dataInfoDoctor.firstName +
                                                                ' ' +
                                                                dataInfoDoctor.lastName}{' '}
                                                        </h2>
                                                        <p>
                                                            Giá Khám :{' '}
                                                            {dataInfoDoctor.DoctorInfor.priceData &&
                                                                formatVND(
                                                                    parseInt(
                                                                        dataInfoDoctor.DoctorInfor.priceData?.valueVi,
                                                                    ),
                                                                )}
                                                        </p>
                                                        <p>
                                                            Thời gian khám : {isChooseDay}{' '}
                                                            {formatTimestamp(isSelectDay)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                                                <Input
                                                    labelName="text-sm !font-medium"
                                                    label="Họ & tên"
                                                    placeholder="Họ và tên"
                                                    autoComplete="on"
                                                    className="w-full max-w-[90%]"
                                                    register={register('fullName', fieldRules(true))}
                                                    error={errors.fullName?.message}
                                                />
                                                <Input
                                                    labelName="text-sm !font-medium mt-3"
                                                    label="Email"
                                                    placeholder="Email"
                                                    autoComplete="on"
                                                    className="w-full max-w-[90%]"
                                                    register={register('email', emailRules(true))}
                                                    error={errors.email?.message}
                                                />
                                                <Input
                                                    labelName="text-sm !font-medium mt-3"
                                                    label="Địa chỉ liên hệ"
                                                    placeholder="Địa chỉ"
                                                    autoComplete="on"
                                                    className="w-full max-w-[90%]"
                                                    register={register('address', fieldRules(true))}
                                                    error={errors.address?.message}
                                                />
                                                <Input
                                                    labelName="text-sm !font-medium mt-3"
                                                    label="Số điện thoại"
                                                    placeholder="Sđt"
                                                    autoComplete="on"
                                                    className="w-full max-w-[90%]"
                                                    error={errors.phoneNumber?.message}
                                                    register={register('phoneNumber', phoneNumberRules(true))}
                                                />
                                                <div className="mt-2">
                                                    <label className="text-sm !font-medium text-[#374151]">
                                                        Giới tính
                                                    </label>
                                                    <select
                                                        {...register('selectedGender')}
                                                        id="doctor"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                                                    >
                                                        <option value="M">Nam</option>
                                                        <option value="F">Nữ</option>
                                                        <option value="0">Khác</option>
                                                    </select>
                                                </div>
                                                <div className="mt-2 flex flex-col gap-1">
                                                    <label className="text-sm !font-medium text-[#374151]">
                                                        Ngày sinh
                                                    </label>
                                                    <DatePicker
                                                        maxDate={new Date()}
                                                        className="border-gray-300 w-full max-w-[50%] focus:border-primary bg-[#F9FAFB] focus:ring-primary rounded-md shadow-sm "
                                                        showIcon
                                                        selected={startDate}
                                                        onChange={(date: Date) => setStartDate(date)}
                                                    />
                                                </div>
                                                <div className="mt-2">
                                                    <label className="text-sm !font-medium text-[#374151]">
                                                        Lý do khám
                                                    </label>
                                                    <textarea
                                                        {...register('note', fieldRules(true))}
                                                        className="border-gray-300 w-full max-w-[90%] focus:border-primary bg-[#F9FAFB] focus:ring-primary rounded-md shadow-sm "
                                                    />
                                                    <ErrorMessage error={errors.note?.message} />
                                                </div>

                                                <div className="mt-3 flex justify-end">
                                                    <PrimaryButton
                                                        type="submit"
                                                        className="px-2 py-1 rounded-md hover:opacity-80 font-bold"
                                                    >
                                                        Lưu thông tin
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
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
