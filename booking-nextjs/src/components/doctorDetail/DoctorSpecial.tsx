'use client';
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { LoadingContext } from '../contexts/Loading';
import { AllDataDoctor } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters, pageRouters } from '../constants/router';
import ScheduleDoctor from './ScheduleDoctor';
import InfoDoctor from './InfoDoctor';

type Props = {
    idDoctor: number;
};

export default function DoctorSpecial({ idDoctor }: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    // ACTION GET ALL INFO DOCTOR
    const GetInfoDoctor = async (): Promise<AllDataDoctor> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.DETAIL_DOCTOR(idDoctor)}`);
        return data.data;
    };
    const { data: dataInfoDoctor, refetch: refetchGetInfoDoctor , isLoading } = useQuery(
        `getInfoDoctor${idDoctor}`,
        GetInfoDoctor,
        {
            staleTime: Infinity,
            enabled: true,
            retry: 0,
            onSuccess: (res) => {},
            onError: () => {},
            onSettled: () => {
                setIsLoading(false);
            },
            refetchOnMount: true,
        },
    );
    return (
        <div className="py-4 mt-4">
            {dataInfoDoctor
                &&
            <div className="py-4 flex bg-white rounded-md min-h-[300px]">
                <div className="flex gap-6  p-4 py-2 w-1/2 border-r border-solid ">
                    <div className="w-[80px]">
                        <Image
                            className="w-[80px] h-[80px] object-cover rounded-full "
                            src={dataInfoDoctor?.image ? dataInfoDoctor?.image : ''}
                            width={300}
                            height={300}
                            alt="doctor-infor"
                        />

                        <Link
                            href={pageRouters.DOCTOR_DETAIL(`${idDoctor}`)}
                            className="text-[#45C3D2] mx-2 cursor-pointer mt-3 text-xs"
                        >
                            Xem thêm
                        </Link>
                    </div>
                    <div className="w-[80%]">
                        <h3 className="text-2xl font-bold mb-3 text-[#45C3D2] mt-3">
                            Bác sĩ chuyên khoa : {dataInfoDoctor?.firstName} {dataInfoDoctor?.lastName}
                        </h3>
                        {dataInfoDoctor?.Markdown && (
                            <p className="text-[#555] text-xs max-w-xl">{dataInfoDoctor?.Markdown.description}</p>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    {dataInfoDoctor && <ScheduleDoctor dataInfoDoctor={dataInfoDoctor} />}
                    <InfoDoctor DoctorInfor={dataInfoDoctor} />
                </div>
            </div>
            }
        </div>
    );
}
