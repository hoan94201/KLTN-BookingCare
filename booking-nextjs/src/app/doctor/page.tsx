import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import HeaderBreadcrumb from '@/Layouts/HeaderBreadcrumb';
import ListDoctor from '@/components/TopDoctor/ListDoctor';

type Props = {};

export default async function page({}: Props) {

    return (
        <div>
            <HeaderBreadcrumb />  
            <ListDoctor />
            <ToastContainer icon={true} />
        </div>
    );
}
