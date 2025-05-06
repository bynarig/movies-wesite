import Navbar from "@/components/Navbar.tsx";
import {CarouselRecomendation} from "@/components/CarouselRecomendation.tsx";

export default function Main() {
    return (
        <>
            <Navbar/>
            <div className='w-full flex flex-col items-center'>
                <p className=" text-3xl mt-[20px] md:text-5xl md:mt-[40px] mb-[20px]">Today`s recommendations</p>
                <CarouselRecomendation/>

            </div>
        </>
    )
}