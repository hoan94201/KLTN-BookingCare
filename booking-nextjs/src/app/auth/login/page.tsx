'use client';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { signIn, useSession } from 'next-auth/react';

import PrimaryButton from '@/components/common/Button/PrimaryButton';
import Input from '@/components/common/Input';
import { apiRouters, pageRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { ServerStatusCode } from '@/components/constants/enum';
import { emailRules, passwordLoginRules } from '@/utils/Validatetor';
import api from '@/services/api';
import { ResponseError } from '@/interfaces/response';
import { WRONG_EMAIL, WRONG_PASSWORD } from '@/components/constants/message';
import Link from 'next/link';

type Props = {};

type LoginFormInputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};
export default function Page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const router = useRouter();
    const { data: session } = useSession();

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setError,
        getValues,
        formState: { errors },
        watch,
    } = useForm<LoginFormInputs>();

    // ACTION LOGIN
    const userCreateLogin = async (data: LoginFormInputs): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.USER_LOGIN, data);
    };
    const { mutate: userLoginRequest, isLoading } = useMutation('userLoginRequest', userCreateLogin, {
        onSuccess: async (response) => {
            if (response.status === ServerStatusCode.OK) {
                const res = await signIn('credentials', {
                    email: getValues('email'),
                    password: getValues('password'),
                    rememberMe: getValues('rememberMe'),
                    redirect: false,
                    callbackUrl: '/system',
                });
                if (res?.status === ServerStatusCode.OK) {
                    if (session?.user.roleId === 'R2') {
                        router.push('/doctor-manager/dashboad');
                    }
                    else { 
                        router.push('/system');
                    }  
                   
                }
            }
        },
        onError: ({ response }: ResponseError<any>) => {
            if (response?.status === ServerStatusCode.UNAUTHORIZED) {
                setError('password', {
                    type: 'validate',
                    message: WRONG_PASSWORD,
                });
            }
            if (response?.status === ServerStatusCode.BAD_REQUEST) {
                setError('email', {
                    type: 'validate',
                    message: WRONG_EMAIL,
                });
            }
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });
    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        userLoginRequest(data);
    };

    return (
        <div className="bg-background h-[100vh]">
            <div className="sm:w-[400px] w-[350px] min-h-[400px] max-h-[450px] m-auto absolute bg-white rounded-[10px] top-0 left-0 bottom-0 right-0">
                <form onSubmit={handleSubmit(onSubmit)} className="p-[15px] flex flex-wrap">
                    <div className="flex-col12 w-full text-center font-semibold text-2xl pt-2.5">Login</div>
                    <div className="my-[7px] flex-col12 w-full">
                        <Input
                            error={errors.email?.message}
                            register={register('email', emailRules(true))}
                            autoComplete="on"
                            label="Username"
                            placeholder="Username"
                            className="rounded-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-t-0 border-x-0 !border-b-2   appearance-none dark:text-white  focus:outline-none focus:ring-0 focus:border-primary peer"
                        />
                    </div>
                    <div className="my-[7px] flex-col12 w-full">
                        <div className="relative block w-full py-[0.375rem] font-normal leading-[1.5] text-[#212529] bg-white bg-clip-padding rounded-t">
                            <Input
                                error={errors.password?.message}
                                register={register('password', passwordLoginRules(true))}
                                type="password"
                                label="Password"
                                placeholder="Password"
                                className="rounded-none border-t-0 border-x-0 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="flex-col12 w-full">
                        <PrimaryButton type="submit" className="w-full">
                            Login
                        </PrimaryButton>
                    </div>
                    <div className="flex gap-2 items-center text-xs">
                        <input
                            aria-describedby="comments-description"
                            type="checkbox"
                            {...register('rememberMe')}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary "
                        />
                        Remember me
                    </div>
                    <div className="flex-col12 w-full mb-1"></div>
                    <div className="flex-col12 w-full">
                        <Link
                            href={pageRouters.FORGOT_PASSWORD}
                            className="text-[12px] outline-none list-none hover:opacity-60"
                        >
                            {' '}
                            Forgot your password{' '}
                        </Link>
                    </div>
                    <div className="flex-col12 w-full text-center">
                        <span className="text-center">Or Login with :</span>
                    </div>
                    <div className="flex-col12 w-full flex text-[45px] justify-center gap-2">
                        <span>
                            <svg
                                className="h-9 w-full"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
                                    fill="white"
                                ></path>
                                <path
                                    d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
                                    fill="#0075FA"
                                ></path>
                            </svg>
                        </span>
                        <span>
                            <svg
                                className="h-10 w-full"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
                                    fill="#4285F4"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
                                    fill="#34A853"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
                                    fill="#FBBC04"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
                                    fill="#EA4335"
                                ></path>
                            </svg>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}
