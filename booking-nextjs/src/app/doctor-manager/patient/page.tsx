'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import moment from 'moment';
import { DayPicker } from 'react-day-picker';
import Link from 'next/link';
import SelectDoctor from '@/components/common/Selection/SelectDoctor';
import { apiRouters, pageRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { IDataPatient, ScheduleDoctor } from '@/interfaces/common';
import Pagination from '@/components/common/Pagination';
import api from '@/services/api';
import { formatDateTime } from '@/utils';
import ConfirmPatient from '@/components/common/Modal/ConfirmPatient';
import { MetaData } from '@/components/MetaData/MetaData';

type Props = {};

export default function page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const [selected, setSelected] = useState<Date | undefined>();
    const [isPage, setPage] = useState<number>(0);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isPatient, setPatient] = useState<IDataPatient>();

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

    // ACTION GET ALL DOCTOR
    const getListPatient = async (): Promise<IDataPatient[]> => {
        setIsLoading(true);
        const isDate = selected
            ? moment(selected).valueOf()
            : moment(new Date()).add(0, 'days').startOf('day').valueOf();
        const { data } = await api.get(`${apiRouters.LIST_PATIENT(getValues('doctorId'), isDate, 'S2')}`);
        return data.data.data;
    };
    const { data: ListPatient, refetch: refetchGetListPatient } = useQuery('getListPatient', getListPatient, {
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
    useEffect(() => {
        refetchGetListPatient();
    }, [watch('doctorId'), selected]);

    let footer = <p className="mt-5 pl-2 text-red-300 text-xs">Please pick a day.</p>;
    if (selected) {
        footer = (
            <p className="mt-5 pl-2 text-xs">
                You picked : <span className="text-primary"> {format(selected, 'PP')}</span>.
            </p>
        );
    }

    return (
        <MetaData title={'List Patient - BookingCare'} className={''}>
            <div>
                <div className="flex justify-end">
                    <Link
                        href={pageRouters.MANAGER_HISTORY}
                        className="text-primary text-right cursor-pointer hover:opacity-70 hover:text-red-400"
                    >
                        Danh sách các bệnh nhân đã khám
                    </Link>
                </div>
                <div className=" flex justify-between">
                    <SelectDoctor register={register('doctorId')} />
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
                <div>
                    <div className="mt-8 flow-root overflow-hidden">
                        <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                            <table className="w-full text-left">
                                <thead className="bg-white">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Full Name
                                            <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                                            <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden  px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                        >
                                            Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden  px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Ngày Tạo
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3">
                                            <span className="sr-only">Confirm</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ListPatient?.map((person) => (
                                        <tr key={person.id}>
                                            <td className="relative truncate max-w-[150px] py-4 pr-3 text-sm font-medium text-gray-900">
                                                {person.patientData.firstName}
                                            </td>
                                            <td className="hidden  px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                                {person.timeTypeDataPatient.valueVi}
                                            </td>
                                            <td className="hidden truncate px-3 py-4 text-sm text-gray-500 md:table-cell">
                                                {person.patientData.email}
                                            </td>
                                            <td className="px-3 truncate max-w-[250px] py-4 text-sm text-gray-500">
                                                {person.patientData.address}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500">
                                                {formatDateTime(person.updatedAt)}
                                            </td>
                                            <td className="relative py-4 pl-3 text-right text-sm font-medium">
                                                <span
                                                    onClick={() => {
                                                        setPatient(person);
                                                        setOpen(true);
                                                    }}
                                                    className="text-indigo-600 cursor-pointer hover:text-indigo-900"
                                                >
                                                    Confirm<span className="sr-only">, {person.id}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                isPage={isPage}
                                handleNextPage={() => {}}
                                handlePrevPage={() => {}}
                                totalPage={0}
                            />
                        </div>
                    </div>
                </div>
                <ConfirmPatient isPatient={isPatient} open={isOpen} setOpen={() => setOpen(false)} />
            </div>
        </MetaData>
    );
}
