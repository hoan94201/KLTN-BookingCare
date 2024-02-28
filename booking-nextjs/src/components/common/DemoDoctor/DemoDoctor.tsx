import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import api from '@/services/api';
import { AllDataDoctor, InforDoctorData, ScheduleDoctor } from '@/interfaces/common';
import NoImg from '@/components/images/no-user-image.gif';

type Props = {
    getValues: UseFormGetValues<ScheduleDoctor>;
    watch: UseFormWatch<ScheduleDoctor>;
};

export default function DemoDoctor({ getValues, watch }: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    // ACTION GET ALL INFO DOCTOR
    const GetInfoDoctor = async (): Promise<AllDataDoctor> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.DETAIL_DOCTOR(getValues('doctorId'))}`);
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
    }, [watch('doctorId')]);
    return (
        <div>
            <div className="flex">
                <div className="w-1/2 flex justify-center">
                    <Image
                        className="w-32 h-32 object-cover rounded-full"
                        alt="image-doctor"
                        width={90}
                        height={90}
                        src={dataInfoDoctor ? dataInfoDoctor.image : NoImg}
                    />
                </div>
                <div className="w-1/2">
                    <p className="text-sm  font-normal italic">{dataInfoDoctor?.Markdown.description}</p>
                </div>
            </div>
            <div className="mt-3">
                {dataInfoDoctor?.Markdown.contentMarkdowmn && (
                    <div
                        className="max-h-[435px] font-fangsong overflow-y-scroll custom-scrollbar "
                        dangerouslySetInnerHTML={{ __html: dataInfoDoctor?.Markdown.contentMarkdowmn }}
                    ></div>
                )}
            </div>
        </div>
    );
}
