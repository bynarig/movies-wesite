import Navbar from "@/components/Navbar.tsx";
import SignUpForm from "@/components/SignUpForm.tsx";

export default function SignUpPage() {
    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <SignUpForm/>
            </div>
        </>
    )
}