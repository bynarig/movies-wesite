import Navbar from "@/components/Navbar.tsx";
import SignInForm from "@/components/SignInForm.tsx";

export default function SignInPage() {
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