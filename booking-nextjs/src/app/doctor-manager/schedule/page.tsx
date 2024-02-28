'use client';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { useMutation, useQueryClient } from 'react-query';
import { format } from 'date-fns';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingContext } from '@/components/contexts/Loading';
import FormSchedule from '@/components/common/formSchedule/formSchedule';
import { IdataTime, ScheduleDoctor } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters } from '@/components/constants/router';
import DemoDoctor from '@/components/common/DemoDoctor/DemoDoctor';
import DetailSchedule from '@/components/common/Schedule/DetailSchedule';
import { useSession } from 'next-auth/react';
import { MetaData } from '@/components/MetaData/MetaData';

type Props = {};

export default function Schedule({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const [dataTime, setDataTime] = useState<IdataTime[]>();
    const { data: session } = useSession();

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
    } = useForm<ScheduleDoctor>();
    const [selected, setSelected] = useState<Date | undefined>();

    let footer = <p className="mt-5 pl-2 text-red-300 text-xs">Please pick a day.</p>;
    if (selected) {
        footer = (
            <p className="mt-5 pl-2 text-xs">
                You picked : <span className="text-primary"> {format(selected, 'PP')}</span>.
            </p>
        );
    }
    // ACTION CREATE SCHEDULE
    const userCreateSchedule = async (data: any): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.SAVE_SCHEDULE, data);
    };
    const { mutate: userCreateScheduleRequest, isLoading } = useMutation(
        'userCreateScheduleRequest',
        userCreateSchedule,
        {
            onSuccess: async (response) => {
                await queryClient.refetchQueries(['getScheduleDoctor']);

                toast.success('The medical examination plan has been saved successfully !', {
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
                toast.error('The medical examination plan has been saved fail !', {
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
        },
    );
    useEffect(() => {
        if (session?.user.id) {
            setValue('doctorId', session.user.id);
        }
    }, [session?.user.id]);
    const onSubmit: SubmitHandler<ScheduleDoctor> = (data) => {
        if (!data.doctorId) {
            toast.error('Please select the doctor you need to schedule !', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            return;
        }
        let result: { doctorId: number; date: number; timeType: string }[] = [];
        let selectedTime = dataTime?.filter((item) => item.isSelected === true);
        if (selectedTime && selectedTime.length > 0) {
            selectedTime.map((time) => {
                let object = {
                    doctorId: NaN,
                    date: NaN,
                    timeType: '',
                };
                object.doctorId = data.doctorId;
                object.date = selected ? moment(selected).valueOf() : moment(new Date()).valueOf();
                object.timeType = time.keyMap;
                result.push(object);
            });
        } else {
            console.log('lỗi rồi');
        }
        const newDate = {
            arrSchedule: result,
            doctorId: data.doctorId,
            date: selected ? moment(selected).valueOf() : moment(new Date()).valueOf(),
        };
        userCreateScheduleRequest(newDate);
    };
    return (
        <MetaData title={'My Schedule - BookingCare'} className={''}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p>MY SCHEDULE</p>
                <div className=" mt-10 max-w-7xl flex gap-32">
                    <div>
                        <div className="ml-10">
                            <DayPicker
                                disabled={(date) => date < new Date()}
                                showOutsideDays
                                mode="single"
                                selected={selected}
                                onSelect={setSelected}
                                footer={footer}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        {getValues('doctorId') && <DemoDoctor getValues={getValues} watch={watch} />}
                    </div>
                </div>
                <div>
                    <FormSchedule dataTime={dataTime} setDataTime={setDataTime} />
                </div>
                <button
                    type="submit"
                    className="rounded-md mt-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
                <div className="mt-10">
                    {getValues('doctorId') && <DetailSchedule getValues={getValues} watch={watch} />}
                </div>
                <ToastContainer icon={true} />
            </form>
        </MetaData>
    );
}
