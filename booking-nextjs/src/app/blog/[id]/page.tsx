'use client';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react';
import { LoadingContext } from '@/components/contexts/Loading';
import { IBlogs } from '@/interfaces/common';
import api from '@/services/api';
import { apiRouters } from '@/components/constants/router';
import { useQuery } from 'react-query';
import { formatDateTime } from '@/utils';
import { MetaData } from '@/components/MetaData/MetaData';

type Props = {};

export default function Page({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const { id } = useParams();

    // ACTION GET DETAIL BLOGS

    const getDetailBlogs = async (): Promise<IBlogs> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.DETAIL_BLOG(parseInt(id as string))}`);
        return data.blog;
    };
    const { data: DetailBlogs, refetch: refetchGetDetailBlogs } = useQuery('getDetailBlogs', getDetailBlogs, {
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
        <MetaData title={`${DetailBlogs?.title} - BookingCare`} className={''}>
            <div>
                <div className="px-[10%]">
                    <h1 className="text-3xl font-bold my-4 text-[#333]">{DetailBlogs?.title}</h1>
                    <div>
                        Product of <span className="text-[#45C3D5]">BookingCare</span>
                    </div>
                    <div>
                        Topic : <span className="text-[#45C3D5]">{DetailBlogs?.topic}</span>
                    </div>
                    <div>
                        Author :{' '}
                        <span className="text-[#45C3D5]">
                            {DetailBlogs?.User.firstName} {DetailBlogs?.User.lastName}
                        </span>
                    </div>
                    {DetailBlogs?.createdAt && DetailBlogs?.updatedAt && (
                        <div>
                            Publish : {formatDateTime(DetailBlogs?.createdAt)} <span className=""></span> , Last update
                            : {formatDateTime(DetailBlogs?.updatedAt)}
                        </div>
                    )}
                </div>
                {DetailBlogs?.descriptionMarkdown && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DetailBlogs?.descriptionMarkdown,
                        }}
                        className="bg-[#FCFAF6] px-[10%] mx-[10%] mt-20 comment-doctor list-disc pt-8"
                    ></div>
                )}
            </div>
        </MetaData>
    );
}
