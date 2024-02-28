import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { UseFormGetValues, UseFormWatch } from 'react-hook-form';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import calendarIcon from '@/components/images/calendar24.png';
import { AllDataDoctor, detailScheduleData } from '@/interfaces/common';
import api from '@/services/api';
import { getArrDays } from '@/utils';
import Modal from '../common/Modal/Booking';

type Props = {
    dataInfoDoctor: AllDataDoctor;
};

export default function ScheduleDoctor({ dataInfoDoctor }: Props) {
    const today = moment(new Date()).valueOf();
        const arrDay = getArrDays();

    const { setIsLoading } = useContext(LoadingContext);
    const [isSelectDay, SetSelectDay] = useState<number>(arrDay[0].value);
    const { id } = useParams();
    const [isChooseDay, setChooseDay] = useState<string>('');
    const [isTimeType, setIsTimeType] = useState<string>('');
    const [open, setOpen] = useState(false);

    // ACTION GET DETAIL SCHEDULE
    const GetScheduleDoctor = async (): Promise<detailScheduleData[]> => {
        setIsLoading(true);
        const { data } = await api.get(
            `${apiRouters.DETAIL_SCHEDULE_DOCTOR(parseInt(`${dataInfoDoctor.id}`), isSelectDay)}`,
        );
        return data.infor.data;
    };
    const { data: dataScheduleDoctor, refetch: refetchGetDetailSchedule } = useQuery(
        'getScheduleDoctor',
        GetScheduleDoctor,
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
        if (id) {
            refetchGetDetailSchedule();
        }
    }, [id, isSelectDay]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        SetSelectDay(parseInt(e.target.value));
    };

    return (
        <div>
            <div className="flex gap-4 items-center">
                <select
                    onChange={(e) => handleSelect(e)}
                    className="px-3 cursor-pointer rounded-xl py-3 text-[#45c3d2] font-semibold underline outline-none"
                >
                    {arrDay.map((item, i) => {
                        return (
                            <option key={i} className="cursor-pointer" value={item.value}>
                                {item.label}
                            </option>
                        );
                    })}
                </select>
                <span>
                    <Image src={calendarIcon} width={30} height={30} alt="calendar" />
                </span>
            </div>
            <div className="mt-3 min-h-[150px]">
                {dataScheduleDoctor && dataScheduleDoctor.length > 0 ? (
                    <>
                        {dataScheduleDoctor.map((item) => {
                            return (
                                <button
                                    onClick={() => {
                                        setChooseDay(item.timeTypeData.valueVi);
                                        setOpen(true);
                                        setIsTimeType(item.timeType);
                                    }}
                                    disabled={item.currentNumber > 0}
                                    key={item.timeType}
                                    className={`                         
                                    text py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 bg-background disabled:text-white disabled:opacity-60 disabled:bg-slate-800 disabled:bg-none
                                        `}
                                    type="button"
                                >
                                    {item.timeTypeData.valueVi}
                                </button>
                            );
                        })}
                    </>
                ) : (
                    <p>Lịch bạn đang trống </p>
                )}
            </div>
            <Modal
                dataInfoDoctor={dataInfoDoctor}
                isChooseDay={isChooseDay}
                open={open}
                setOpen={setOpen}
                isSelectDay={isSelectDay}
                isTimeType={isTimeType}
            />
        </div>
    );
}
