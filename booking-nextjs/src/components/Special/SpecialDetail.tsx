'use client';
import React, { useContext, useEffect } from 'react';
import { LoadingContext } from '../contexts/Loading';
import api from '@/services/api';
import { apiRouters } from '../constants/router';
import { useQuery } from 'react-query';
import { IDataDoctorForSpecial } from '@/interfaces/common';
import DoctorSpecial from '../doctorDetail/DoctorSpecial';
import { useParams } from 'next/navigation';
import { MetaData } from '../MetaData/MetaData';

type Props = {};

export default function SpecialDetail({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const { id } = useParams();

    // ACTION GET ALL SPECIAL
    const getDoctorSpecial = async (): Promise<IDataDoctorForSpecial> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_DOCTOR_FOR_SPECIAL(parseInt(id as string))}`);
        return data.data;
    };
    const { data: listDoctorSpecial, refetch: refetchGetDoctorSpecial } = useQuery(
        `getDoctorSpecial${id}`,
        getDoctorSpecial,
        {
            staleTime: Infinity,
            enabled: false,
            retry: 0,
            onSuccess: (res) => {},
            onError: () => {},
            onSettled: () => {
                setIsLoading(false);
            },

            refetchOnMount: true,
        },
    );
    useEffect(() => {
        refetchGetDoctorSpecial();
    }, [id]);
    return (
        <MetaData title={`${listDoctorSpecial?.name} - BookingCare`} className={''}>
            <div>
                <div className="w-full max-w-6xl mx-auto mt-3 custom-scrollbar max-h-[200px] overflow-scroll">
                    {listDoctorSpecial && (
                        <div dangerouslySetInnerHTML={{ __html: listDoctorSpecial?.descriptionMarkdown }}></div>
                    )}
                </div>
                <div className="w-full bg-[#EEEEEE]">
                    <div className="w-full max-w-6xl mx-auto">
                        {listDoctorSpecial?.doctorSpecialty.map((item) => {
                            return <DoctorSpecial key={item.doctorId} idDoctor={item.doctorId} />;
                        })}
                    </div>
                </div>
            </div>
        </MetaData>
    );
}
