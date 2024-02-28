'use client';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import { apiRouters, pageRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import Pagination from '@/components/common/Pagination';
import { IBlogs } from '@/interfaces/common';
import api from '@/services/api';
import { formatDateTime } from '@/utils';

export default function Page() {
    const { setIsLoading } = useContext(LoadingContext);
    const { data: session } = useSession();
    const [isChosen, setChosen] = useState<number>();

    // ACTION GET ALL BLOGS

    const getListAllBlogs = async (): Promise<IBlogs[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_BLOG}`);
        return data.data;
    };
    const { data: listAllBlogs, refetch: refetchGetListAllBlogs } = useQuery('getListAllBlogs', getListAllBlogs, {
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
    // ACTION CONFIRM
    const userConfirmBlog = async (data : any): Promise<any> => {
        setIsLoading(true);
        return await api.get(apiRouters.CONFIRM_BLOG(data.id,  data.value));
    };
    const { mutate: userConfirmRequest, isLoading } = useMutation('userConfirmBlog', userConfirmBlog, {
        onSuccess: async () => {
            toast.success('🦄 User action blog successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            refetchGetListAllBlogs();
        },
        onError: () => {
            toast.error('🦄 User action delete blog fail!', {
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
    });

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Handbooks</h1>
                    <p className="mt-2 text-sm text-gray-700">This is a list of system-wide handbooks .</p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full max-w-[1240px] divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        User
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Topic
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Date created
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Date updated
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 max-w-[1440px] bg-white">
                                {listAllBlogs?.map((person) => (
                                    <tr key={person.id}>
                                        <td className="whitespace-nowrap max-w-[250px] truncate py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center flex-col justify-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img
                                                        className="h-11 w-11 rounded-full"
                                                        src={person.User.image}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="">
                                                    <div className="font-medium text-primary">
                                                        {person.User.firstName} {person.User.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap max-w-[250px] truncate py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center flex-col justify-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11 rounded-full" src={person.thumb} alt="" />
                                                </div>
                                                <div className="">
                                                    <div className="font-medium text-gray-900">{person.topic}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="max-w-[300px]  px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">{person.title}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {person.accept === 1 ? (
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    Publish
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                                    Private
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {formatDateTime(person.createdAt)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {formatDateTime(person.updatedAt)}
                                        </td>
                                        <td className="  py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <div className="">
                                                {person.accept === 1 ? (
                                                    <span
                                                        onClick={() => {
                                                            userConfirmRequest({
                                                                id: person.id,
                                                                value: 0,
                                                            });
                                                        }}
                                                        className="text-red-600 cursor-pointer hover:text-red-900"
                                                    >
                                                        Disable
                                                    </span>
                                                ) : (
                                                    <span
                                                        onClick={() => {
                                                            userConfirmRequest({
                                                                id: person.id,
                                                                value: 1,
                                                            });
                                                        }}
                                                        className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                                                    >
                                                        Confirm
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            totalPage={0}
                            handleNextPage={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                            handlePrevPage={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                            isPage={0}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer icon={true} />
        </div>
    );
}
