'use client';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingContext } from '@/components/contexts/Loading';
import { ServerStatusCode } from '@/components/constants/enum';
import { ResponseError } from '@/interfaces/response';
import Input from '@/components/common/Input';
import PrimaryButton from '@/components/common/Button/PrimaryButton';
import { emailRules } from '@/utils/Validatetor';
import api from '@/services/api';
import { apiRouters } from '@/components/constants/router';

type SentMailForm = {
    email: string;
};
export default function Page() {
    const { setIsLoading } = useContext(LoadingContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<SentMailForm>({
        mode: 'onSubmit',
    });
    const [message, setMessage] = useState('');
    const [errMessage, setErrorMessage] = useState('');
    const postSentMailResetPassword = async ({ email }: SentMailForm) => {
        const { data } = await api.post(apiRouters.RESET_PASSWORD, email);
        return data;
    };
    const { mutate: sentMailResetPassword } = useMutation(postSentMailResetPassword, {
        onSuccess: () => {
            reset();
        },
        onError: ({ response }: ResponseError<{ message: string }>) => {
            // setErrorMessage(`We can't find a user with that email address.`);
            if (response?.status === ServerStatusCode.BAD_REQUEST) {
                setError('email', {
                    type: 'validate',
                    message: response.data.message,
                });
            }
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });
    const onSubmit: SubmitHandler<SentMailForm> = (values) => {
        setIsLoading(true);
        setTimeout(() => {
            sentMailResetPassword(values);
        }, 0);
    };

    return (
        <>
            <div className="bg-background h-[100vh]">
                <div className="sm:w-[400px] w-[350px] min-h-[400px] max-h-[450px] m-auto absolute bg-white rounded-[10px] top-0 left-0 bottom-0 right-0">
                    <div className="mt-20 px-4">
                        <h2 className="text-lg font-bold text-gray-900 ">Forgot your password?</h2>

                        <p className="mt-2 text-sm text-gray-700">
                            Forgot your password? No problem. Just let us know your email address and we will email you
                            a password reset link that will allow you to choose a new one.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-10 grid px-4 grid-cols-1 gap-y-8  max-w-md md:w-96 md:max-w-sm "
                    >
                        <Input
                            defaultValue=""
                            label={'Email'}
                            sz="lg"
                            full
                            labelName="text-xl font-medium mb-3 !text-[#707070]"
                            error={errors.email?.message}
                            register={register('email', emailRules(true))}
                            autoComplete="off"
                        />
                        {errMessage && <div className="mb-4 text-sm text-red-600 mt-2">{errMessage}</div>}

                        <div className="flex items-center justify-end ">
                            <PrimaryButton
                                className="w-full items-center !bg-button flex justify-center !rounded-3xl hover:opacity-80 h-10"
                                type="submit"
                            >
                                Reset
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
