'use client';
import React, { useContext, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { LoadingContext } from '../contexts/Loading';
import { SpecialData } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters, pageRouters } from '../constants/router';
import Link from 'next/link';

type Props = {};

export default function Specialty({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isTotal, setTotal] = useState<number>(0);
    const slider = useRef<Slider>(null);
    // ACTION GET ALL SPECIAL
    const getListSpecial = async (): Promise<SpecialData[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_SPECIAL}`);
        return data.data;
    };
    const { data: listSpecial, refetch: refetchGetListSpecial } = useQuery('getListSpecial', getListSpecial, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
            setTotal(res.length);
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },

        refetchOnMount: true,
    });
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                },
            },
        ],
    };
    const next = () => {
        if (slider.current) {
            slider.current.slickNext();
            setCurrentSlide(currentSlide + 1);
        }
    };
    const Prev = () => {
        if (slider.current) {
            slider.current.slickPrev();
            setCurrentSlide(currentSlide - 1);
        }
    };
    return (
        <div className="w-full max-w-6xl mt-5">
            <h2 className=" font-semibold text-2xl ">Chuyên khoa</h2>
            <div className="flex justify-end">
                <Link
                    href={pageRouters.SPECIAL}
                    className="text-xl hover:opacity-70 font-semibold text-[#34929e] bg-[#daf3f6] py-[10px] px-2 rounded-lg"
                >
                    Xem thêm
                </Link>
            </div>
            <div className="mt-4 relative">
                <Slider {...settings} ref={slider}>
                    {listSpecial?.map((item) => {
                        return (
                            <Link href={pageRouters.SPECIAL_DETAIL(item.id)} key={item.id}>
                                <div className="w-[90%] rounded-2xl border-[2px] border-[#f1f1f1] p-5">
                                    <Image
                                        width={500}
                                        height={500}
                                        className="w-full h-[200px] object-cover rounded-2xl"
                                        src={item.image}
                                        alt={item.id + 'special'}
                                    />
                                    <p className="text-center mt-5 text-lg font-semibold">{item.name}</p>
                                </div>
                            </Link>
                        );
                    })}
                </Slider>
                <div
                    onClick={Prev}
                    className={`
                    ${currentSlide === 0 ? 'hidden' : ''}
                    shadow-md left-[-18px] flex items-center justify-center transition-none duration-0 w-10 h-10 absolute top-[35%] 
  rounded-md border cursor-pointer  border-[#b5e7ed] bg-white right-full/2`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        preserveAspectRatio="none"
                        width="12"
                        height="24"
                        fill="#34929E"
                    >
                        <path d="m166.5 424.5-143.1-152a23.94 23.94 0 0 1-6.562-16.5 23.94 23.94 0 0 1 6.562-16.5l143.1-152c9.125-9.625 24.31-10.03 33.93-.938 9.688 9.126 10.03 24.38.938 33.94l-128.4 135.5 128.4 135.5c9.094 9.562 8.75 24.75-.938 33.94-9.53 9.058-24.73 8.658-33.93-.942z"></path>
                    </svg>
                </div>
                <div
                    onClick={next}
                    className={`
                    ${currentSlide === isTotal - 3 ? 'hidden' : ''}
                    shadow-md right-[20px] flex items-center justify-center transition-none duration-0 w-10 h-10 absolute top-[35%] 
  rounded-md border cursor-pointer  border-[#b5e7ed] bg-white right-full/2`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 512"
                        preserveAspectRatio="none"
                        width="12"
                        height="24"
                        fill="#34929E"
                    >
                        <path d="m89.45 87.5 143.1 152a23.94 23.94 0 0 1 6.562 16.5 23.96 23.96 0 0 1-6.562 16.5l-143.1 152c-9.12 9.6-24.31 10-33.93.9-9.688-9.125-10.03-24.38-.938-33.94l128.4-135.5-128.4-135.5c-9.092-9.56-8.752-24.71.938-33.9 9.62-9.09 24.81-8.69 33.93.94z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}
