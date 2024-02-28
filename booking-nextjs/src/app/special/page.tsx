import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import HeaderBreadcrumb from '@/Layouts/HeaderBreadcrumb';
import ListSpecial from '@/components/Special/ListSpecial';

type Props = {};

export default async function page({}: Props) {
    return (
        <div>
            <HeaderBreadcrumb />
            <ListSpecial />
            <ToastContainer icon={true} />
        </div>
    );
}
