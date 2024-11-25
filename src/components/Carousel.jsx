import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export function CarouselSetUp({ children: slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const handleNext = () => {
        setCurrentSlide((currentSlide) => (currentSlide === slides.length - 1 ? 0 : currentSlide + 1));
    };
    const handlePrev = () => {
        setCurrentSlide((currentSlide) => (currentSlide === 0 ? slides.length - 1 : currentSlide - 1));
    };

    return (
        <div className="overflow-hidden relative h-full w-full">
            <div className="flex h-full w-full" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: "transform 0.5s" }}>
                {slides}
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
                <button onClick={handlePrev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-whites ">
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button onClick={handleNext} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-whites ">
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}

export function CarouselDefault({ listImage }) {
    return (
        <Carousel className="rounded-xl">
            {listImage.map((src, index) => (
                <img src={src} alt="image 1" className="h-full w-full object-cover" />
            ))}
        </Carousel>
    );
}
export function CarouselCustomArrows({ listImage }) {
    return (
        <Carousel
            className="rounded-xl"
            prevArrow={({ handlePrev }) => (
                <IconButton variant="text" color="white" size="lg" onClick={handlePrev} className="!absolute top-2/4 left-4 -translate-y-2/4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </IconButton>
            )}
            nextArrow={({ handleNext }) => (
                <IconButton variant="text" color="white" size="lg" onClick={handleNext} className="!absolute top-2/4 !right-4 -translate-y-2/4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </IconButton>
            )}>
            {listImage.map((src, index) => (
                <img src={src || listImage[0]} alt="image 1" className="h-full w-full object-cover rounded-xl" />
            ))}
        </Carousel>
    );
}
