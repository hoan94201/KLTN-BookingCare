'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import type { Session } from 'next-auth';

type Props = {
	children: ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
	return <SessionProvider>{children}</SessionProvider>;
};
