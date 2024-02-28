'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Form from '@/components/common/form/form';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import { MetaData } from '@/components/MetaData/MetaData';
import { UserRes } from '@/interfaces/common';
import api from '@/services/api';

type Props = {};

export default function Page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const queryClient = useQueryClient();

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
    // ACTION DELETE USER
    const deleteUser = async (id: number): Promise<any> => {
        setIsLoading(true);
        return await api.delete(apiRouters.DELETE_USER(id));
    };
    const { mutate: userDeleteRequest } = useMutation('userDeleteRequest', deleteUser, {
        onSuccess: async () => {
            await queryClient.refetchQueries(['getListUsers']);
            toast.error('🦄 The account has been successfully deleted!', {
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
            setIsLoading(false);
        },
        onSettled: () => {},
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
        if (isPage > 0) {
            setPage(isPage - 1);
        }
    };
    const handleDeleteUser = (id: number) => {
        userDeleteRequest(id);
    };
    return (
        <MetaData title={'Manager Account - BookingCare'} className={''}>
            <div>
                <Form />
                <Table handleDeleteUser={handleDeleteUser} listUsers={listUsers ? listUsers.users.data : []} />
                <Pagination
                    isPage={isPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    totalPage={listUsers?.users.totalPages ? listUsers?.users.totalPages : 0}
                />
                <ToastContainer icon={false} />
            </div>
        </MetaData>
    );
}
