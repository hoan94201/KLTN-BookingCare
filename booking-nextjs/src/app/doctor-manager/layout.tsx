import Header from '@/Layouts/header';
import { LoadingProvider } from '@/components/contexts/Loading';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import { StatusComponent } from '@/components/constants/enum';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(options);

    if (!session || !session.user || session.user.roleId !== StatusComponent.DOCTOR) {
        redirect('/auth/login');
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <LoadingProvider>
                    <Header>{children}</Header>
                </LoadingProvider>
            </body>
        </html>
    );
}
