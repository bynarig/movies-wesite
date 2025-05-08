import Navbar from "@/components/Navbar.tsx";
import SignUpForm from "@/components/SignUpForm.tsx";
import {useUserStore} from "@/store/userStore.ts";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export default function SignUpPage() {
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
                <SignUpForm/>
            </div>
        </>
    )
}