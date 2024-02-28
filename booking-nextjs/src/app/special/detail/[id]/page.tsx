import React from 'react'
import HeaderBreadcrumb from '@/Layouts/HeaderBreadcrumb';
import SpecialDetail from '@/components/Special/SpecialDetail';

type Props = {}

export default function page({}: Props) {
  return (
      <div>
      <HeaderBreadcrumb />
      <SpecialDetail />
      </div>
  );
}