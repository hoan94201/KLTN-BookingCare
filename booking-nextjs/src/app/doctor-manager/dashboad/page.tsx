import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Dashboard from '@/components/dashboard/dashboard';
import { MetaData } from '@/components/MetaData/MetaData';

type Props = {};

export default async function page({}: Props) {
    return (
        <MetaData title={'Dashboard - BookingCare'} className={''}>
            <div>
                <Dashboard />
                <ToastContainer icon={true} />
            </div>
        </MetaData>
    );
}
