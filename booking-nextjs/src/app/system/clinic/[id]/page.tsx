'use client';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { MetaData } from '@/components/MetaData/MetaData';
import { IDoctorClinics } from '@/interfaces/common';
import api from '@/services/api';
import { formatDateTime } from '@/utils';

type Props = {};

export default function Page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const { id } = useParams();

    // ACTION GET DOCTOR FOR CLINIC
    const getListDoctorClinic = async (): Promise<IDoctorClinics[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.DOCTOR_CLINIC(parseInt(id as string))}`);
        return data.data.data;
    };
    const { data: ListDoctorClinic, refetch: refetchGetListDoctorClinic } = useQuery(
        'getListDoctorClinic',
        getListDoctorClinic,
        {
            staleTime: Infinity,
            enabled: true,
            retry: 0,
            onSuccess: (res) => {},
            onError: () => {
                setIsLoading(false);
            },
            onSettled: () => {
                setIsLoading(false);
            },
            refetchOnMount: true,
        },
    );
    useEffect(() => {
        refetchGetListDoctorClinic();
    }, [id]);

    return (
        <MetaData title={'Manager Clinic Detail - BookingCare'} className={''}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Docctor for clinic</h1>
                        <p className="mt-2 text-sm text-gray-700">List of doctors belonging to this facility</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Update doctor
                        </button>
                    </div>
                </div>
                <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Image
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Position
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Date
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Phone number
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Select</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ListDoctorClinic?.map((plan, planIdx) => (
                                <tr key={plan.id}>
                                    <td
                                        className={`relative py-4 pl-4 pr-3 text-sm sm:pl-6 ${
                                            planIdx === 0 ? '' : 'border-t border-transparent'
                                        }`}
                                    >
                                        <div className="font-medium text-gray-900">
                                            {plan.User.firstName + plan.User.lastName}
                                        </div>
                                    </td>
                                    <td
                                        className={`hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell ${
                                            planIdx === 0 ? '' : 'border-t border-gray-200'
                                        }`}
                                    >
                                        <Image src={plan.User.image} width={50} height={50} alt={''} />
                                    </td>
                                    <td
                                        className={`hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell ${
                                            planIdx === 0 ? '' : 'border-t border-gray-200'
                                        }`}
                                    >
                                        {plan.User.positionData?.valueVi}
                                    </td>
                                    <td
                                        className={`hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell ${
                                            planIdx === 0 ? '' : 'border-t border-gray-200'
                                        }`}
                                    >
                                        {formatDateTime(plan.User.createdAt)}
                                    </td>
                                    <td
                                        className={`px-3 py-3.5 text-sm text-gray-500 ${
                                            planIdx === 0 ? '' : 'border-t border-gray-200'
                                        }`}
                                    >
                                        {plan.User.phoneNumber}
                                    </td>
                                    <td
                                        className={`relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 ${
                                            planIdx === 0 ? '' : 'border-t border-transparent'
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MetaData>
    );
}
