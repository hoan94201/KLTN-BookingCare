'use client';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { apiRouters, pageRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { IBlogs } from '@/interfaces/common';
import api from '@/services/api';

type Props = {};

export default function Page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    // ACTION GET ALL BLOGS

    const getListAllBlogs = async (): Promise<IBlogs[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_BLOG}`);
        return data.data;
    };
    const { data: listAllBlogs, refetch: refetchGetListAllBlogs } = useQuery('getListAllBlogs', getListAllBlogs, {
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
    return (
        <div>
        
            <div className="">
                <div className=" ml-20 mt-20">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold">List of featured articles</h1>
                        <p className="mt-5">
                            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập
                            trình web.
                        </p>
                    </div>

                    {listAllBlogs?.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className={`${item.accept === 0 && 'hidden'} border-solid hover:opacity-60 border-2 border-[#e8e8e8] rounded-xl mb-5`}
                            >
                                <Link
                                    href={pageRouters.DETAIL_BLOG(item.id)}
                                    className="p-10 mt-3 cursor-pointer block"
                                >
                                    <div className="flex justify-between mb-5">
                                        <div className="left flex">
                                            <img
                                                className="rounded-full h-6 min-w-[50px] min-h-[50px]"
                                                src={item.User.image}
                                                alt=""
                                            />
                                            <h3 className="font-semibold name ml-2">
                                                {item.User.firstName} {item.User.lastName}
                                            </h3>
                                        </div>
                                        <div className="">
                                            <i className="px-2 py-1 fa-regular fa-bookmark"></i>
                                            <i className="px-2 py-1 fa-sharp fa-solid fa-ellipsis"></i>
                                        </div>
                                    </div>

                                    <div className="flex justify-between gap-x-5">
                                        <div className="w-full">
                                            <h1 className="text-2xl font-bold">{item.title}</h1>

                                            <div
                                                className="mt-2 line-clamp-2 font-[200]"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.descriptionMarkdown,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="w-[20%]">
                                            <img className="rounded-xl w-[200px] h-[120px]" src={item.thumb} alt="" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
