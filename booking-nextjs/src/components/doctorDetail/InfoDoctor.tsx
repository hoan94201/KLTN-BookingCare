'use client';
import { InforDoctorData } from '@/interfaces/common';
import { formatVND } from '@/utils';
import React, { useState } from 'react';

type Props = {
    DoctorInfor?: InforDoctorData;
};

export default function InfoDoctor({ DoctorInfor }: Props) {
    const [isShow, setShowDetail] = useState<boolean>(false);
    return (
        <>
            <div className="border-b  border-solid pb-3">
                <p className="uppercase text-sm font-bold text-[#666]">Địa chỉ khám : </p>
                <p className="font-bold text-xs mt-2">{DoctorInfor?.DoctorInfor.nameClinic} </p>
                <p className="text-xs mt-2"> {DoctorInfor?.DoctorInfor.addressClinic} </p>
            </div>
            <div className="mt-3 flex gap-2 items-center text-sm">
                <p className="uppercase text-sm  text-[#666]">GIÁ KHÁM: </p>
                <p>
                    {DoctorInfor?.DoctorInfor.priceData &&
                        formatVND(parseInt(DoctorInfor?.DoctorInfor.priceData?.valueVi))}{' '}
                    .
                </p>
                {!isShow && (
                    <p
                        onClick={() => setShowDetail(!isShow)}
                        className="text-[#45c3d2] cursor-pointer hover:opacity-80"
                    >
                        Xem chi tiết
                    </p>
                )}
            </div>
            {isShow && (
                <div className="mt-2">
                    <p className="uppercase text-sm font-bold text-[#45c3d2]">
                        {DoctorInfor?.DoctorInfor.specialtyData.name}
                    </p>
                    <p className="uppercase text-sm font-bold text-[#666]">GIÁ KHÁM: </p>
                    <div className="border border-solid px-1 pt-1 text-xs bg-[#f8f8f8]">
                        <div className="flex justify-between ">
                            <p className="uppercase text-sm ">GIÁ KHÁM </p>

                            {DoctorInfor?.DoctorInfor.priceData ? (
                                <div>
                                    <p className="text-xs">
                                        {formatVND(parseInt(DoctorInfor?.DoctorInfor.priceData?.valueVi))} -{' '}
                                        {formatVND(parseInt(DoctorInfor?.DoctorInfor.priceData?.valueVi) * 2)}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                        {DoctorInfor?.DoctorInfor.priceData && (
                            <p>
                                Giá tư vấn 15 phút : {formatVND(parseInt(DoctorInfor?.DoctorInfor.priceData?.valueVi))}{' '}
                            </p>
                        )}
                        {DoctorInfor?.DoctorInfor.priceData && (
                            <p>
                                Giá tư vấn 30 phút :{' '}
                                {formatVND(parseInt(DoctorInfor?.DoctorInfor.priceData?.valueVi) * 2)}{' '}
                            </p>
                        )}
                        <div className="border-t text-sm border-solid border-[#ddd] pt-2 pb-1 bg-[#EEEEEE]">
                            Phòng khám có phương thưc thanh toán bằng {DoctorInfor?.DoctorInfor.paymentData?.valueVi}
                        </div>
                    </div>
                    <p
                        onClick={() => setShowDetail(!isShow)}
                        className="text-[#45c3d2] cursor-pointer hover:opacity-80 mt-2"
                    >
                        {' '}
                        Ẩn bảng giá{' '}
                    </p>
                </div>
            )}
        </>
    );
}
