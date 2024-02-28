'use client';
import React, { useContext } from 'react';
import { LoadingContext } from '../contexts/Loading';
import api from '@/services/api';
import { apiRouters, pageRouters } from '../constants/router';
import { useQuery } from 'react-query';
import { SpecialData } from '@/interfaces/common';
import Link from 'next/link';

type Props = {};

export default function ListSpecial({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    // ACTION GET ALL SPECIAL
    const getListSpecial = async (): Promise<SpecialData[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_SPECIAL}`);
        return data.data;
    };
    const { data: listSpecial, refetch: refetchGetListSpecial } = useQuery('getListSpecial', getListSpecial, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {},
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });

    return (
        <div className="w-full flex justify-center pt-5 ">
            <div className="max-w-6xl w-full ">
                <div className="w-full">
                    <h2>Danh sách chuyên khoa khám</h2>
                    <div className=" font-bold">
                        {listSpecial?.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Link
                                        href={pageRouters.SPECIAL_DETAIL(item.id)}
                                        className="hover:opacity-70 border-b-[1px] border-gray-200 cursor-pointer py-4 block"
                                    >
                                        <div className="flex gap-x-4 my-4">
                                            <img className="w-[100px] h-[67px]" src={item.image} />
                                            <div>
                                                <div className="font-normal"></div>
                                                <div className="font-light">{item.name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
