import HeaderBreadcrumb from '@/Layouts/HeaderBreadcrumb';
import DoctorDetail from '@/components/doctorDetail/DoctorDetail';
import React from 'react';

type Props = {};

export default function Page({ params }: { params: { slug: number } }) {
    return (
        <div>
            {' '}
            <HeaderBreadcrumb />
            <DoctorDetail  />
        </div>
    );
}
