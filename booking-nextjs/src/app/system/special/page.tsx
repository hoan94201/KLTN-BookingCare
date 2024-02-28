import React from 'react';
import { MetaData } from '@/components/MetaData/MetaData';
import TableSpecial from '@/components/Special/TableSpecial';

type Props = {};

export default function Page({}: Props) {
    return (
        <MetaData title={'Manager Special - BookingCare'} className={''}>
            <div>
                <TableSpecial />
            </div>
        </MetaData>
    );
}
