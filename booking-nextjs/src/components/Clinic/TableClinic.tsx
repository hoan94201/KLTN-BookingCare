'use client';

import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { LoadingContext } from '../contexts/Loading';
import { SpecialData } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters, pageRouters } from '../constants/router';
import { formatDateTime } from '@/utils';
import CreateClinic from '../common/Modal/CreateClinic';
import Link from 'next/link';

export default function TableClinic() {
    const { setIsLoading } = useContext(LoadingContext);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isDataEdit, setDataEdit] = useState<SpecialData>();

    // ACTION GET ALL CLINICS
    const getListClinic = async (): Promise<SpecialData[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_CLINIC}`);
        return data.data;
    };
    const { data: listClinic, refetch: refetchGetListClinic } = useQuery('getListClinic', getListClinic, {
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
    // DELETE CLINIC
    const userDeleteClinic = async (id: number): Promise<any> => {
        setIsLoading(true);
        return await api.delete(apiRouters.DELETE_CLINIC(id));
    };
    const { mutate: userDeleteClinicRequest, isLoading } = useMutation('userDeleteClinicRequest', userDeleteClinic, {
        onSuccess: async () => {
            refetchGetListClinic()
            toast.success('Delete a facility successfully!', {
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
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
    });

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Cơ sở</h1>
                    <p className="mt-2 text-sm text-gray-700">Đây là 1 list danh sách các cơ sơ trong hệ thống</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Thêm mới
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Ngày tạo
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Thumb
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {listClinic?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {item.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {formatDateTime(item.createdAt)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <Image
                                                    className="h-16 object-contain"
                                                    width={100}
                                                    height={100}
                                                    src={item.image}
                                                    alt="thumb-clinic"
                                                />
                                            </td>
                                            <td className=" whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                                                <div className="h-full flex items-center gap-3">
                                                    <p
                                                        onClick={() => {
                                                            setDataEdit(item);
                                                            setOpen(true);
                                                        }}
                                                        className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                                    >
                                                        Edit
                                                    </p>
                                                    <p
                                                        onClick={() => {
                                                            userDeleteClinicRequest(item.id);
                                                        }}
                                                        className="text-red-600 hover:text-indigo-900 cursor-pointer"
                                                    >
                                                        Delete
                                                    </p>
                                                    <Link className="hover:text-green-500" href={pageRouters.DOCTOR_CLINIC(`${item.id}`)} >
                                                        Detail
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CreateClinic isOpen={isOpen} isDataEdit={isDataEdit} setOpen={setOpen} />
        </div>
    );
}
