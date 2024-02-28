import HeaderBreadcrumb from '@/Layouts/HeaderBreadcrumb';
import ListClinic from '@/components/Clinic/ListClinic';
import React from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {};

export default function page({}: Props) {
    return (
        <div>
            <HeaderBreadcrumb />
            <ListClinic />
            <ToastContainer icon={true} />
        </div>
    );
}
