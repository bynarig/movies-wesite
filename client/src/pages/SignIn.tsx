import Navbar from "@/components/Navbar.tsx";
import SignInForm from "@/components/SignInForm.tsx";
import {useEffect} from "react";
import {useUserStore} from "@/store/userStore.ts";
import {useNavigate} from "react-router";

export default function SignInPage() {
    const isSignedUp = useUserStore((state) => state.isSignedUp)
    let navigate = useNavigate();
    useEffect(() => {
        if (isSignedUp) {
            navigate('/')
        }
    }, [isSignedUp]);
    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className='max-w-90'>
                    <SignInForm/>
                </div>
            </div>
        </>
    )
}