import React from 'react';
import { MetaData } from '@/components/MetaData/MetaData';
import FormDoctor from '@/components/common/formDoctor/formDoctor';

type Props = {};

export default function Doctor({}: Props) {
    return (
        <MetaData title={'Manager Doctor - BookingCare'} className={''}>
            <div>
                <FormDoctor />
            </div>
        </MetaData>
    );
}
