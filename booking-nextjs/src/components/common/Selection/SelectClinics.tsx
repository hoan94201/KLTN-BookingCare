import React, { useContext } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useQuery } from 'react-query';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { DoctorInforData, SpecialData } from '@/interfaces/common';
import api from '@/services/api';

type Props = {
    register: UseFormRegister<DoctorInforData>;
    setValue: UseFormSetValue<DoctorInforData>;
};

export default function SelectClinics({ register, setValue }: Props) {
    const { setIsLoading } = useContext(LoadingContext);

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
        onSuccess: (res) => {
            setValue('clinicId' , res[0].id)
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    return (
        <div className="sm:col-span-3">
            <label htmlFor="special" className="block text-sm font-medium leading-6 text-gray-900">
                Clinics
            </label>
            <div className="mt-2">
                <select
                    {...register('clinicId')}
                    id="special"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {listClinic?.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
