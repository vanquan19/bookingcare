import { Button } from "../components/Button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import banner from "../assets/images/banner_home.webp";
import { Card } from "../components/Card";
import { useEffect, useRef, useState } from "react";
import { Paragraph } from "./Text";

const ListHospital = () => {
    const listHospitalRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isScrollReverse, setIsScrollReverse] = useState(false);
    const intervalRef = useRef(null);

    const scrollLeft = () => {
        if (listHospitalRef.current) {
            listHospitalRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
        setIsScrolling(true);
    };

    const scrollRight = () => {
        if (listHospitalRef.current) {
            listHospitalRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
        setIsScrolling(true);
    };

    const handleScroll = () => {
        intervalRef.current = setInterval(() => {
            if (listHospitalRef.current) {
                if (listHospitalRef.current.scrollLeft + listHospitalRef.current.clientWidth + 5 >= listHospitalRef.current.scrollWidth) setIsScrollReverse(true);
                else if (listHospitalRef.current.scrollLeft <= 0) setIsScrollReverse(false);

                listHospitalRef.current.scrollBy({ left: !isScrollReverse ? 300 : -300, behavior: "smooth" });
            }
        }, 2000);
    };

    useEffect(() => {
        if (!isScrolling) {
            handleScroll();
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isScrolling, isScrollReverse]);
    return (
        <div className="w-full relative">
            <Button onClick={scrollLeft} className="absolute z-30 left-0 top-1/3  -translate-y-1/2 rounded-[100%] p-2 border-gray-600 hover:bg-primary hover:border-primary group transition-all">
                <GrFormPrevious className="stroke-gray-600 size-6 group-hover:stroke-white transition-all" />
            </Button>
            <Button onClick={scrollRight} className="absolute z-30 right-0 top-1/3 -translate-y-1/2 rounded-[100%] p-2 border-gray-600 hover:bg-primary hover:border-primary transition-all group">
                <GrFormNext className="stroke-gray-600 size-6 group-hover:stroke-white transition-all" />
            </Button>
            <div ref={listHospitalRef} className="flex gap-12 my-12 whitespace-nowrap w-full overflow-x-scroll no-scrollbar relative">
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
                <Card className="max-w-80 w-full md:cursor-pointer items-center shadow-none bg-none group">
                    <div className="rounded-xl overflow-hidden">
                        <img className="group-hover:scale-110 transition-all" src={banner} alt="" />
                    </div>
                    <Button size="md" className="w-full mt-6 mb-2 rounded-full bg-gradient-to-r from-primary-2 to-primary text-white text-xl border-none">
                        Bệnh viện đại học Y Dược 2
                    </Button>
                    <Paragraph className="text-gray-500 text-lg">Hồ Chí Minh</Paragraph>
                </Card>
            </div>
        </div>
    );
};
export default ListHospital;
