import TableClinic from '@/components/Clinic/TableClinic';
import { MetaData } from '@/components/MetaData/MetaData';
import React from 'react';

type Props = {};

export default function page({}: Props) {
    return (
        <MetaData title={'Manager Clinic - BookingCare'} className={''}>
            <div>
                <TableClinic />
            </div>
        </MetaData>
    );
}
