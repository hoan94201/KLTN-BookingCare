'use client';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { LoadingContext } from '../contexts/Loading';
import { AllDataDoctor } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters } from '../constants/router';
import ScheduleDoctor from './ScheduleDoctor';
import InfoDoctor from './InfoDoctor';
import { useParams } from 'next/navigation';
import { MetaData } from '../MetaData/MetaData';

type Props = {};

export default function DoctorDetail({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const { id } = useParams();

    // ACTION GET ALL INFO DOCTOR
    const GetInfoDoctor = async (): Promise<AllDataDoctor> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.DETAIL_DOCTOR(parseInt(id as string))}`);
        return data.data;
    };
    const { data: dataInfoDoctor, refetch: refetchGetInfoDoctor } = useQuery('getInfoDoctor', GetInfoDoctor, {
        staleTime: Infinity,
        enabled: false,
        retry: 0,
        onSuccess: (res) => {},
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    useEffect(() => {
        refetchGetInfoDoctor();
    }, []);
    return (
        <MetaData title={`Doctor Detail - BookingCare`} className={''}>
            <div className="w-full flex justify-center mt-10">
                <div className="w-full max-w-6xl">
                    <div className="flex gap-6 ">
                        <div>
                            <Image
                                className="w-[120px] h-[120px] object-cover rounded-full "
                                src={dataInfoDoctor?.image ? dataInfoDoctor?.image : ''}
                                width={300}
                                height={300}
                                alt="doctor-infor"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-[#333]">
                                Bác sĩ chuyên khoa : {dataInfoDoctor?.firstName} {dataInfoDoctor?.lastName}
                            </h3>
                            {dataInfoDoctor?.Markdown && (
                                <p className="text-[#555] text-xs max-w-xl">{dataInfoDoctor?.Markdown.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-20 flex h-auto">
                        <div className="w-1/2">
                            {dataInfoDoctor && <ScheduleDoctor dataInfoDoctor={dataInfoDoctor} />}
                        </div>
                        <div className="w-1/2">
                            <InfoDoctor DoctorInfor={dataInfoDoctor} />
                        </div>
                    </div>
                    {dataInfoDoctor && dataInfoDoctor.Markdown && (
                        <div
                            className="pb-20"
                            dangerouslySetInnerHTML={{ __html: dataInfoDoctor?.Markdown.contentMarkdowmn }}
                        ></div>
                    )}
                </div>
            </div>
        </MetaData>
    );
}
