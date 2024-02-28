'use client'
import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Modal from '../Modal/index';
import Button from '../Button';
import Input from '../Input';
import { ConfirmIcon } from '@/components/images/icons';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import api from '@/services/api';
import { ResponseError } from '@/interfaces/response';
import { fieldRules } from '@/utils/Validatetor';
import { useSession } from 'next-auth/react';
type Props = {
    open: boolean;
    variant?: 'Category' | 'Tag' | 'Author' | 'Post';
    data?: string;
    onConfirm: () => void;
    onClose: () => void;
};
type IConfirmPassword = {
    password: string,
    email : string
}
const ConfirmPassword = ({ onClose, variant, onConfirm, open, data }: Props) => {
    const { setIsLoading } = useContext(LoadingContext);
        const { data: session } = useSession();

      const {
          register,
          handleSubmit,
          reset,
          trigger,
          setValue,
          setError,
          formState: { errors },
          watch,
      } = useForm<IConfirmPassword>();
      const handleConfirmPassword = async (data: IConfirmPassword): Promise<any> => {
          return await api.post(apiRouters.CONFIRM_PASSWORD, data);
      };
      const { mutate: confirmPassword } = useMutation(handleConfirmPassword, {
          onSuccess: (response, data) => {
              reset();
              onConfirm();
              onClose()
          },
          onError: ({ response }: ResponseError<any>) => {
              setError('password', {
                  type: 'validate',
                  message: "Password is wrong",
              });
              setIsLoading(false);
          },
          onSettled() {},
      });
   const onSubmit: SubmitHandler<IConfirmPassword> = (data) => {
       confirmPassword({
           ...data,
           email: session?.user.email
       });
   };

    return (
        <Modal open={open} onClose={onClose} className="w-[480px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-start gap-5">
                    <Image className="" alt="Warning delete" src={ConfirmIcon} width={32} height={32} />
                    <div className="flex flex-col gap-2 w-full">
                        <p className="font-bold text-lg">Please confirm your password</p>
                        <Input
                            type="password"
                            register={register('password', fieldRules(true))}
                            error={errors.password?.message}
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-center gap-8 px-10 pt-5 pb-2">
                    <Button className="h-10 w-[7.5rem]" onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="h-10 w-[7.5rem]">
                        Confirm
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
export default ConfirmPassword;
