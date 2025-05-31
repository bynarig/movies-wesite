import {Outlet} from 'react-router';
import Navbar from "@/components/Navbar.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Toaster/>
        </>
    );
};

export default MainLayout;