'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { IdataTime } from '@/interfaces/common';
import api from '@/services/api';

type Props = {
    dataTime: IdataTime[] | undefined;
    setDataTime: React.Dispatch<React.SetStateAction<IdataTime[] | undefined>>;
};


export default function FormSchedule({ dataTime, setDataTime }: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    // ACTION GET ALL TIME
    const getListTime = async (): Promise<IdataTime[]> => {
        setIsLoading(true);
        const type = 'TIME';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listTime, refetch: refetchGetListTime } = useQuery('getListTime', getListTime, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            const newData = res.map((item) => ({ ...item, isSelected: false }));
            setDataTime(newData);
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    useEffect(()=>{
        refetchGetListTime()
    },[])

    const handleClickBtnTime = (time: IdataTime) => {
        const newData = dataTime?.map((item: IdataTime) => {
            if (item.id === time.id) item.isSelected = !item.isSelected;
            return item;
        });
        setDataTime(newData);
    };
    return (
        <div className="flex flex-wrap mt-10">
            {dataTime?.map((item) => {
                return (
                    <button
                        onClick={() => handleClickBtnTime(item)}
                        className={`text py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ${
                            item.isSelected ? 'bg-background' : 'bg-white'
                        }`}
                        type="button"
                        key={item.keyMap}
                    >
                        {item.valueVi}{' '}
                    </button>
                );
            })}
        </div>
    );
}
