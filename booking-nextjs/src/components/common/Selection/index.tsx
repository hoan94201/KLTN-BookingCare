import { CreateUser, PositionType, ProvinceType } from '@/interfaces/common';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    label: string;
    listItem?: ProvinceType[] | undefined;
    listType?: PositionType[];
    register: UseFormRegister<CreateUser>;
    textForm: typeRegister;
};

type typeRegister =
    | 'image'
    | 'email'
    | 'password'
    | 'firstName'
    | 'lastName'
    | 'phoneNumber'
    | 'gender'
    | 'roleId'
    | 'positionId'
    | 'city'
    | "district"
    ;

export default function Selection({ listItem, listType, label, textForm, register }: Props) {
    return (
        <>
            <label htmlFor="City" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                {label}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary sm:max-w-xs sm:text-sm sm:leading-6"
                    {...register(textForm)}
                >
                    {listItem?.map((item, index) => {
                        return (
                            <option key={index} value={item.name}>
                                {' '}
                                {item.name}
                            </option>
                        );
                    })}
                    {listType?.map((item, index) => {
                        return (
                            <option key={index} value={item.keyMap}>
                                {' '}
                                {item.valueVi}
                            </option>
                        );
                    })}
                </select>
            </div>
        </>
    );
}
