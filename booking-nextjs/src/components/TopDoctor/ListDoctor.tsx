'use client';
import React, { useContext, useEffect, useState } from 'react';
import useDebounce from '../Hook/useDebounce';
import { LoadingContext } from '../contexts/Loading';
import { AllDoctor, UserRes } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters, pageRouters } from '../constants/router';
import { useQuery } from 'react-query';
import Link from 'next/link';

type Props = {};

export default function ListDoctor({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    const [isKey, SetIsKey] = useState<string>('');
    const debouncedSearchTerm = useDebounce<string>(isKey, 1000);

    // ACTION GET ALL DOCTOR
    const getListDoctor = async (): Promise<AllDoctor[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_DOCTOR}`);
        return data.data;
    };
    const { data: listDoctor, refetch: refetchGetListDoctor } = useQuery('getListDoctor', getListDoctor, {
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

    // ACTION SEARCH DOCTOR
    const getListUsers = async (): Promise<UserRes> => {
        setIsLoading(true);
        const size = 10;
        const { data } = await api.get(`${apiRouters.LIST_USERS(0, size, 'DOCTOR', debouncedSearchTerm)}`);
        return data;
    };
    const { data: listUsers, refetch: refetchGetListUsers } = useQuery('getListUsers', getListUsers, {
        staleTime: Infinity,
        enabled: false,
        retry: 0,
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    useEffect(() => {
        if (isKey) {
            refetchGetListUsers();
        }
    }, [debouncedSearchTerm]);

    return (
        <div className="w-full flex justify-center pt-5 ">
            <div className="max-w-6xl w-full ">
                <div className="w-full">
                    <input
                        placeholder="Tìm kiếm bác sĩ "
                        onChange={(e) => SetIsKey(e.target.value)}
                        className="text-lg block w-full p-2 text-gray-900 border focus:border-primary focus:ring-primary border-gray-300 rounded-lg bg-gray-50 sm:text-xs"
                    />
                </div>
                {listUsers && listUsers.users.data.length > 0 && (
                    <div className="w-full mt-3">
                        <h4 className="font-bold">Kết quả tìm kiếm</h4>
                        <div className="border-b-[1px] border-gray-200 cursor-pointer">
                            {listUsers?.users.data.map((item) => {
                                return (
                                    <Link
                                        key={item.id}
                                        href={pageRouters.DOCTOR_DETAIL(`${item.id}`)}
                                        className="flex gap-x-4 my-4"
                                    >
                                        <img className="w-[50px] h-[50px] rounded-[50%]" src={item.image} />
                                        <div>
                                            <div className="font-normal">
                                                {item.positionData?.valueVi} :{item.firstName} {item.lastName}
                                            </div>
                                      <div className="font-light text-xs">{item.email}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
                {listUsers && listUsers.users.data.length === 0 && isKey.length > 0 && (
                    <div>
                        <h4 className="font-bold">Kết quả tìm kiếm</h4>
                        <p> Không tìm thấy thông tin</p>
                    </div>
                )}
                <div className="w-full mt-3">
                    <h4 className="font-bold "> Bác sĩ nổi bật </h4>
                    <div className="border-b-[1px] border-gray-200 cursor-pointer">
                        {listDoctor?.map((item) => {
                            return (
                                <Link
                                    key={item.id}
                                    href={pageRouters.DOCTOR_DETAIL(`${item.id}`)}
                                    className="flex gap-x-4 my-4 hover:opacity-70"
                                >
                                    <img className="w-[50px] h-[50px] rounded-[50%]" src={item.image} />
                                    <div>
                                        <div className="font-normal">
                                            {item.positionData?.valueVi} : {item.firstName} {item.lastName}
                                        </div>
                                        <div className="font-light text-xs">
                                            Chuyên Khoa : {item.DoctorInfor.specialtyData.name}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
