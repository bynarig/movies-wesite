import {NavLink} from "react-router";
import {Button} from "@/components/ui/button.tsx";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className=" text-[100px] md:text-[300px]">404</p>
            <Button ><NavLink to="/">Go to Home</NavLink></Button>
        </div>
    )
}