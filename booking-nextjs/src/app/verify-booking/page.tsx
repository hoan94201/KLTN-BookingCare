'use client'
import { useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import api from '@/services/api';

type Props = {}

export default function Page({ }: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    const searchParams = useSearchParams();
    const TOKEN = searchParams.get('token');
    const doctorId = searchParams.get('doctorId');
    const [isError, setIsError] = useState<boolean>(false)
    const [isSuccess, seSuccess] = useState<boolean>(false);

    // ACTION VERIFY TOKEN
    const GetInfoDoctor = async (): Promise<any> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.VERIFY_BOOKING(TOKEN as string)}`);
        return data.data;
    };
    const { data: dataInfoDoctor, refetch: refetchGetInfoDoctor } = useQuery('getInfoDoctor', GetInfoDoctor, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
             seSuccess(true);
             setIsError(false);
        },
        onError: () => {
            seSuccess(false)
            setIsError(true)
        },
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });

    return (
        <div className="relative bg-white">
            <div className="mx-auto max-w-7xl relative lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
                <div className="absolute z-20 text-lg top-10 left-0 right-0 mx-auto text-center ">
                    {isSuccess && !isError && <p className="text-green-400">Xác nhận đặt lịch thành công ! </p>}
                    {isError && !isSuccess && (
                        <p className="text-red-600 ">Token đã hết hạn hoặc đã được xác nhận ! </p>
                    )}
                </div>
                <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <img
                            className="h-32"
                            src="https://res.cloudinary.com/dl0wt2mgx/image/upload/v1700109307/Screen_Shot_2023-11-16_at_11.28.22_rmtjxe.png"
                            alt="Your Company"
                        />
                        <div className="hidden sm:mt-32 sm:flex lg:mt-16">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                Live healthy for life.{' '}
                                <a href="#" className="whitespace-nowrap font-semibold text-indigo-600">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                        <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                            Live healthy for life.
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Understanding to Live Healthily - Collection of articles and specialized diseases is an
                            accurate reference source - useful in treatment and preventive care.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
                    <img
                        className="aspect-[3/2] object-contain h-full w-full bg-gray-50  lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
                        src="https://res.cloudinary.com/dl0wt2mgx/image/upload/v1701308894/booking_gh96ks.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}