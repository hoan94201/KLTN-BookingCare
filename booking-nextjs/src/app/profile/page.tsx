import { ToastContainer } from 'react-toastify';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {}

export default async function Page({ }: Props) {
       const session = await getServerSession();
       if (!session || !session.user) {
           redirect('/auth/login');
       }
  return (
      <div>
      </div>
  );
}