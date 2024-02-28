import { InputHTMLAttributes, ReactNode, useCallback, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';

import ErrorMessage from '../ErrorMessage';

export type InputSize = 'sm' | 'md' | 'lg';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	sz?: InputSize;
	label?: string;
	type?: string;
	full?: boolean;
	icon?: string;
	error?: ReactNode;
	required?: boolean;
	register?: UseFormRegisterReturn;
	labelName?: string;
};

const Input = ({
	sz = 'md',
	label,
	type = 'text',
	full,
	className,
	labelName,
	required,
	error,
	icon,
	register,
	...props
}: InputProps) => {
	const inputPassword = `password-${Math.random()}`;
	let sizeClasses = '';

	switch (sz) {
		case 'sm':
			sizeClasses = 'leading-4 text-sm h-9 px-3.5 py-2';
			break;
		case 'lg':
			sizeClasses = 'leading-5 p-4 h-14';
			break;
		default:
			sizeClasses = 'leading-4 h-10 px-2.5 py-2';
			break;
	}

	const isPassword = type === 'password';

	return (
        <div className="w-full">
            {label && (
                <label className={`${labelName} block font-normal text-sm text-[#374151] `}>
                    {label}
                    {required && <span className="text-danger align-super">*</span>}
                </label>
            )}
            <div className="relative flex items-center">
                {icon && <Image src={icon} alt="Icon" width={18} height={18} className="absolute left-3" />}

                <input
                    type={type}
                    className={`border-gray-300 focus:border-primary bg-[#F9FAFB] focus:ring-primary rounded-md shadow-sm mt-1 block w-full  ${className} `}
                    {...register}
                    {...props}
                />
            </div>

            <ErrorMessage error={error} />
        </div>
    );
};

export default Input;
