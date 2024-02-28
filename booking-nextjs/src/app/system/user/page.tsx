'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Table from '@/components/common/Table';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import { Fillter } from '@/components/common/Fillter';
import Pagination from '@/components/common/Pagination';
import api from '@/services/api';
import { UserList, UserRes } from '@/interfaces/common';
import { MetaData } from '@/components/MetaData/MetaData';

type Props = {};

export default function Page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    const [keySearch, setKeySearch] = useState<string>('');
    const [isOption, setOption] = useState<string>('ALL');
    const [isPage, setPage] = useState<number>(0);

    const getListUsers = async (): Promise<UserRes> => {
        setIsLoading(true);
        const size = 10;
        const { data } = await api.get(`${apiRouters.LIST_USERS(isPage, size, isOption, keySearch)}`);
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
        refetchGetListUsers();
    }, [refetchGetListUsers, isPage]);
    const handleSearch = () => {
        refetchGetListUsers();
    };
    const handleNextPage = () => {
        setPage(isPage + 1);
    };
    const handlePrevPage = () => {
        if(isPage > 0){
            setPage(isPage - 1);
        }
    };
    return (
        <>
            <MetaData title={'Manager User - BookingCare'}  className={''}>

            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add user
                        </button>
                    </div>
                </div>
                <Fillter setOption={setOption} setKeySearch={setKeySearch} handleSearch={handleSearch} />
                <Table
                    listUsers={listUsers ? listUsers.users.data : []}
                    handleDeleteUser={function (id: number): void {
                        throw new Error('Function not implemented.');
                    }}
                />
                <Pagination
                    isPage={isPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    totalPage={listUsers?.users.totalPages ? listUsers?.users.totalPages : 0}
                />
            </div>
            </MetaData>
        </>
    );
}
