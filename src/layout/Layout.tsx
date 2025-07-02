import Footer from '@/shared/footer/Footer';
import Navbar from '@/shared/navbar/Navbar';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className='h-[90vh] max-w-5xl mx-auto'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;