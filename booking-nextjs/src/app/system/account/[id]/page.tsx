import EditForm from '@/components/common/form/editUser';
import React from 'react'


export default function Edit({ params }: { params: { id: number } }) {

  return (
      <div>
          <EditForm id={params.id} />
      </div>
  );
}