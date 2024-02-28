'use client';
import Breadcrumbs, { BreadcrumbsItem } from '@/components/Breadcrumbs';
import React, { useEffect, useState } from 'react';
import { breadcrumbsData } from '@/components/constants/breadcrumbs';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';



export default function HeaderBreadcrumb() {
    const query = useParams();
    const pathname = usePathname();
    const [breadcrumbs, setBreadCrumbs] = useState<BreadcrumbsItem[]>();

    console.log(query, pathname)
    useEffect(() => {
        const getBreadcrumbs = (pathname: string) => {
            const pathSegments = pathname.split('/').filter((segment: any) => segment !== '');
            const breadcrumbs: any = [];

            let accumulatedPath = '';
            pathSegments.forEach((segment: any) => {
                accumulatedPath += `/${segment}`;
                if (breadcrumbsData[accumulatedPath]) {
                    const breadcrumb = {
                        ...breadcrumbsData[accumulatedPath],
                        current: false,
                    };
                    let updatedHref = breadcrumb.href;
                    Object.keys(query).forEach((element) => {
                        updatedHref = updatedHref.replace(`[${element}]`, String(query[element]));
                    });
                    breadcrumb.href = updatedHref;
                    breadcrumbs.push(breadcrumb);
                }
            });

            if (breadcrumbs.length > 0) {
                breadcrumbs[breadcrumbs.length - 1].current = true;
            }
            return breadcrumbs;
        };

        setBreadCrumbs(getBreadcrumbs(pathname));
    }, [pathname, query, query.id, query.periodId]);
    return <div>{ breadcrumbs ? <Breadcrumbs pages={breadcrumbs} /> : ''}</div>;
}
