import Footer from '@/Layouts/Footer';
import GuestHeader from '@/Layouts/GuestHeader';
import Blogs from '@/components/Blog/Blogs';
import Clinics from '@/components/Clinic/Clinics';
import Specialty from '@/components/Special/Specialty';
import TopDoctor from '@/components/TopDoctor/TopDoctor';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between  ">
            <GuestHeader />
            <Specialty />
            <Clinics />
            <TopDoctor />
            <Blogs />
            <Footer />
        </main>
    );
}
