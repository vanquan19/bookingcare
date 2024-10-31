import { useEffect, useState } from "react";
import { Card, DownloadAppCard } from "./Card";
import { Star } from "./Star";
import { Heading3, Heading4, Heading5, Paragraph } from "./Text";
import { LuMapPin, LuStar, LuUser } from "react-icons/lu";
import { Button, GroupButton } from "./Button";
import { SearchInput } from "./Form";
import { Link } from "react-router-dom";
import { FaStar, FaUser } from "react-icons/fa";
import { CiMedicalClipboard, CiMedicalCross, CiWallet } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";

const ListMedicalServices = () => {
    const [indexPage, setIndexPage] = useState(0);
    const medicalServices = [
        {
            id: 1,
            name: "Đặt khám theo bác sĩ",
            address: "Bukit Merad, Central Region, Singapore",
            star: 4.7,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            description: "This is a description of the hospital",
        },
        {
            id: 2,
            name: "Đặt khám theo bác sĩ",
            address: "Bukit Merad, Central Region, Singapore",
            star: 4.7,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            description: "This is a description of the hospital",
        },
        {
            id: 3,
            name: "Đặt khám theo bác sĩ",
            address: "Bukit Merad, Central Region, Singapore",
            star: 4.7,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            description: "This is a description of the hospital",
        },
        {
            id: 4,
            name: "Đặt khám theo bác sĩ",
            address: "Bukit Merad, Central Region, Singapore",
            star: 4.7,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            description: "This is a description of the hospital",
        },
        {
            id: 5,
            name: "Đặt khám theo bác sĩ",
            address: "Bukit Merad, Central Region, Singapore",
            star: 4.7,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            description: "This is a description of the hospital",
        },
    ];
    const options = ["Tất cả", "Bệnh viện", "Phòng khám/Phòng mạch/Xét nghiệm/Khác"];

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" placeholder="Tìm kiếm cơ sở y tế" className="" rounded="lg" />
            </div>
            <ul className="flex gap-4 justify-center py-4 mb-4 px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 px-4 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <ul className="grid grid-cols-2 gap-4 w-3/4">
                {medicalServices.map((service, index) => (
                    <li key={service.id}>
                        <div className={`flex gap-4  bg-white p-4 rounded-2xl shadow-md border-2 hover:border-primary transition-all md:cursor-pointer`}>
                            <div className="min-w-32 overflow-hidden p-2">
                                <img src={service.image} />
                            </div>
                            <div className="w-full">
                                <Heading3>{service.name}</Heading3>
                                <div className="flex gap-1 items-center">
                                    <LuMapPin />
                                    <Paragraph>{service.address}</Paragraph>
                                </div>
                                <Star star={service.star} />
                                <GroupButton className="justify-center">
                                    <Button
                                        onClick={() => navigate(`/medical-facility?id=${id}`)}
                                        size="sm"
                                        className="bg-white font-semibold border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 transition-all w-32 rounded-full">
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-32 rounded-full p-[9px]">
                                        Đặt lịch
                                    </Button>
                                </GroupButton>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

const ListDoctorService = () => {
    const [indexPage, setIndexPage] = useState(0);
    const options = ["Bác sĩ", "Cơ sở y tế"];
    const doctorServices = [
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Lê Ngọc Ánh",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            specialize: "Đang cập nhật...",
            clinic: {
                name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
                address: "Bukit Merad, Central Region, Singapore",
            },
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",

            name: "Lê Ngọc Ánh",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            specialize: "Đang cập nhật...",
            clinic: {
                name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
                address: "Bukit Merad, Central Region, Singapore",
            },
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",

            name: "Lê Ngọc Ánh",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            specialize: "Đang cập nhật...",
            clinic: {
                name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
                address: "Bukit Merad, Central Region, Singapore",
            },
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",

            name: "Lê Ngọc Ánh",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            specialize: "Đang cập nhật...",
            clinic: {
                name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
                address: "Bukit Merad, Central Region, Singapore",
            },
        },
    ];

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" placeholder="Tìm kiếm bác sĩ" className="" rounded="lg" />
            </div>
            <ul className="flex gap-4 justify-center mb-4  py-4  px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 w-48 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex justify-between gap-4 w-3/4">
                <ul className="grid grid-cols-1 gap-4 w-full">
                    {doctorServices.map((doctor, index) => (
                        <li key={doctor.id}>
                            <div className="border-2 border-transparent rounded-2xl overflow-hidden hover:border-primary  md:cursor-pointer shadow-md  transition-all">
                                <div className={`flex gap-4  bg-white p-4 `}>
                                    <div className="min-w-32 overflow-hidden p-2">
                                        <img src={doctor.image} />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Heading3>
                                            {doctor.position} {doctor.name}
                                        </Heading3>
                                        <div className="flex gap-2 text-lg items-center">
                                            <span className="font-semibold">Chuyên trị:</span>
                                            <Paragraph>{doctor.specialize}</Paragraph>
                                        </div>
                                        <div className="flex gap-2 text-lg">
                                            <span className="font-semibold">Lịch khám:</span>
                                            <Paragraph>{doctor.schedule}</Paragraph>
                                        </div>
                                        <div className="flex gap-2 text-lg">
                                            <span className="font-semibold">Giá Khám:</span>
                                            <Paragraph>{doctor.price}Đ</Paragraph>
                                        </div>
                                    </div>
                                </div>
                                <GroupButton className="bg-gray-400 p-3 justify-between">
                                    <div className="">
                                        <Paragraph>{doctor.clinic.name}</Paragraph>
                                        <div className="flex gap-1 items-center">
                                            <LuMapPin />
                                            <Paragraph>{doctor.clinic.address}</Paragraph>
                                        </div>
                                    </div>

                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-48 rounded-full">
                                        Đặt lịch
                                    </Button>
                                </GroupButton>
                            </div>
                        </li>
                    ))}
                </ul>
                <section className="w-1/2 bg-white rounded-2xl h-fit">
                    <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fsalebooking.png&w=384&q=75" alt="banner" />
                </section>
            </div>
        </>
    );
};

const VideoMedicalExaminationConsulation = () => {
    const [indexPage, setIndexPage] = useState(0);
    const medicalServices = [
        {
            id: 1,
            name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
            specialize: "Tư vấn trực tiếp với bệnh viện",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            star: 4.7,
            iUser: 89,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
        },
        {
            id: 2,
            name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
            specialize: "Tư vấn trực tiếp với bệnh viện",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            star: 4.7,
            iUser: 89,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
        },
        {
            id: 3,
            name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
            specialize: "Tư vấn trực tiếp với bệnh viện",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            star: 4.7,
            iUser: 89,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
        },
        {
            id: 4,
            name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
            specialize: "Tư vấn trực tiếp với bệnh viện",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            star: 4.7,
            iUser: 89,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
        },
        {
            id: 5,
            name: "Bệnh viện Đa khoa Quốc tế Thu Cúc",
            specialize: "Tư vấn trực tiếp với bệnh viện",
            position: "Bác sĩ chuyên khoa",
            schedule: "Thứ 2 - Thứ 6: 8:00 - 17:00",
            price: "500.000",
            star: 4.7,
            iUser: 89,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
        },
    ];
    const options = ["Tư vấn ngay", "Đặt lịch hẹn"];

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" placeholder="Tìm kiếm cơ sở y tế, Bác sĩ, Chuyên khoa" rounded="lg" />
            </div>
            <ul className="flex gap-4 justify-center py-4 mb-4 px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 w-48 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <ul className="grid grid-cols-2 gap-4 w-3/4">
                {medicalServices.map((service, index) => (
                    <li key={service.id}>
                        <div className={`flex flex-col gap-4  bg-white p-4 rounded-2xl shadow-md border-2 hover:border-primary transition-all md:cursor-pointer`}>
                            <div className="flex">
                                <div className="min-w-32 overflow-hidden p-2 flex flex-col justify-between items-center">
                                    <img src={service.image} />
                                    <GroupButton className="justify-center gap-0 border rounded-lg border-primary relative my-0 px-0 w-fit">
                                        <Button size="sm" className="gap-1 text-primary border-none py-1 px-2">
                                            {service.star}
                                            <FaStar className="fill-yellow-500" />
                                        </Button>
                                        <div className="h-2/3 w-[1px] bg-primary absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2"></div>
                                        <Button size="sm" className="gap-2 text-primary border-none py-1 px-2">
                                            {service.iUser}
                                            <FaUser className="fill-yellow-500" />
                                        </Button>
                                    </GroupButton>
                                </div>
                                <div className="w-full">
                                    <Heading3 className="border-b border-gray-500">{service.name}</Heading3>
                                    <div className="flex gap-2 text-lg items-center">
                                        <CiMedicalCross />
                                        <Paragraph className="whitespace-nowrap">Chuyên Khoa: {service.position}</Paragraph>
                                    </div>
                                    <div className="flex gap-2 text-lg items-center">
                                        <CiMedicalClipboard />
                                        <Paragraph className="whitespace-nowrap">Chuyên trị: {service.specialize}</Paragraph>
                                    </div>
                                    <div className="flex gap-2 text-lg">
                                        <IoCalendarOutline />
                                        <Paragraph className="whitespace-nowrap">Lịch khám: {service.schedule}</Paragraph>
                                    </div>
                                    <div className="flex gap-2 text-lg">
                                        <CiWallet />
                                        <Paragraph className="whitespace-nowrap">Giá Khám: {service.price}Đ</Paragraph>
                                    </div>
                                </div>
                            </div>
                            <GroupButton className="justify-center">
                                <Button
                                    size="sm"
                                    className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-1/2 rounded-full p-[9px]">
                                    Đặt lịch
                                </Button>
                            </GroupButton>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

const ScheduleATest = () => {
    const [indexPage, setIndexPage] = useState(0);
    const options = ["Dịch vụ", "Cơ sở y tế"];
    const testServices = [
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm và chuẩn đoán y khoa Diag - Quận gò vấp",
            price: "500.000",
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm và chuẩn đoán y khoa Diag - Quận gò vấp",
            price: "500.000",
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm và chuẩn đoán y khoa Diag - Quận gò vấp",
            price: "500.000",
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm và chuẩn đoán y khoa Diag - Quận gò vấp",
            price: "500.000",
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm và chuẩn đoán y khoa Diag - Quận gò vấp",
            price: "500.000",
        },
        {
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm và chuẩn đoán y khoa Diag - Quận gò vấp",
            price: "500.000",
        },
    ];

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" className="" rounded="lg" placeholder="tìm kiếm dịch vụ" />
            </div>
            <ul className="flex gap-4 justify-center mb-4 py-4 px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 w-48 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex justify-between gap-4 w-3/4">
                <ul className="grid grid-cols-1 gap-4 w-full">
                    {testServices.map((test, index) => (
                        <li key={test.id}>
                            <div
                                className={`border-2  rounded-2xl overflow-hidden hover:border-primary  md:cursor-pointer shadow-md  transition-all ${
                                    index === indexPage ? "border-primary" : "border-transparent"
                                }`}>
                                <div className={`flex gap-4  bg-white p-4 `}>
                                    <div className="min-w-32 overflow-hidden p-2">
                                        <img src={test.image} />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Heading3>{test.name}</Heading3>
                                        <div className="flex gap-1 text-lg">
                                            <LuMapPin className="mt-1" />
                                            <Paragraph>{test.address}</Paragraph>
                                        </div>
                                        <GroupButton className="flex justify-between ">
                                            <div className="flex gap-2 text-lg items-center">
                                                <Heading4 className="text-yellow-900">Giá:</Heading4>
                                                <Heading4 className="text-yellow-700">{test.price}Đ</Heading4>
                                            </div>

                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-48 rounded-full">
                                                Đặt khám ngay
                                            </Button>
                                        </GroupButton>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <section className="w-1/2 bg-white rounded-2xl h-fit">
                    <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fsalebooking.png&w=384&q=75" alt="banner" />
                </section>
            </div>
        </>
    );
};
const HealthExaminationPackage = () => {
    const [indexPage, setIndexPage] = useState(0);
    const [indexObject, setIndexObject] = useState({});
    const options = ["Dịch vụ", "Cơ sở y tế"];
    const healthPackageService = [
        {
            id: 1,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            discount: 10,
            star: 4.7,
        },
        {
            id: 2,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            discount: 10,
            star: 4.7,
        },
        {
            id: 3,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            discount: 10,
            star: 4.7,
        },
        {
            id: 4,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            discount: 10,
            star: 4.7,
        },
        {
            id: 5,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            discount: 10,
            star: 4.7,
        },
        {
            id: 6,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            discount: 10,
            star: 4.7,
        },
    ];

    useEffect(() => {
        setIndexObject(healthPackageService[0]);
    }, []);

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" className="" rounded="lg" placeholder="tìm kiếm dịch vụ" />
            </div>
            <ul className="flex gap-4 justify-center mb-4  py-4  px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 w-48 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex justify-between gap-4 w-3/4">
                <ul className="grid grid-cols-1 gap-4 w-full">
                    {healthPackageService.map((service, index) => (
                        <li key={service.id}>
                            <div
                                onClick={() => setIndexObject(service)}
                                className={`border-2  rounded-2xl overflow-hidden hover:border-primary  md:cursor-pointer shadow-md  transition-all ${
                                    service.id === indexObject.id ? "border-primary" : "border-transparent"
                                }`}>
                                <div className={`flex gap-4  bg-white p-4 `}>
                                    <div className="min-w-32 overflow-hidden p-2">
                                        <img src={service.image} />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Heading3>{service.name}</Heading3>
                                        <div className="flex gap-1 text-lg">
                                            <LuMapPin className="mt-1" />
                                            <Paragraph>{service.address}</Paragraph>
                                        </div>
                                        <GroupButton className="flex justify-between mt-3 ">
                                            <div className="flex gap-2 text-lg items-center">
                                                <Heading4 className="text-yellow-900">Giá:</Heading4>
                                                <Heading4 className="text-yellow-700">
                                                    {service.price.toLocaleString()}Đ{" "}
                                                    {service.discount && <del className="text-gray-600">{Math.ceil((service.price * 100) / (100 - service.discount)).toLocaleString()}Đ</del>}
                                                </Heading4>
                                            </div>

                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-48 rounded-full">
                                                Đặt khám ngay
                                            </Button>
                                        </GroupButton>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <section className="w-1/2  rounded-2xl h-fit  flex flex-col gap-8">
                    <div className=" p-6 rounded-lg shadow-md text-center bg-white">
                        <div className="flex w-full items-center justify-center ">
                            <img src={indexObject.image} className="my-4 size-52 object-cover rounded-full" />
                        </div>
                        <div>
                            <Heading3 className="text-primary">{indexObject.name}</Heading3>
                            <div className="flex text-lg text-left gap-1">
                                <LuMapPin className="mt-1" />
                                <Paragraph>{indexObject.address}</Paragraph>
                            </div>
                            <div className="text-yellow-500 font-bold flex items-center gap-3 text-lg">
                                ({indexObject.star}){indexObject.star && <Star star={indexObject.star} />}
                            </div>
                        </div>
                    </div>
                    <DownloadAppCard />
                </section>
            </div>
        </>
    );
};
const ScheduleVaccination = () => {
    const [indexPage, setIndexPage] = useState(0);
    const [indexObject, setIndexObject] = useState({});
    const options = ["Dịch vụ", "Cơ sở y tế"];
    const healthPackageService = [
        {
            id: 1,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 0,
            star: 4.7,
        },
        {
            id: 2,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            star: 4.7,
        },
        {
            id: 3,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 0,
            star: 4.7,
        },
        {
            id: 4,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            star: 4.7,
        },
        {
            id: 5,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói khám sức khỏe tại nhà",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            star: 4.7,
        },
        {
            id: 6,
            image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
            name: "Gói NX bệnh lây nhiễm qua đường tình dục (16 test)",
            address: "Trung tâm xet nghiệm Medlatic Nình Phước",
            price: 500000,
            star: 4.7,
        },
    ];

    useEffect(() => {
        setIndexObject(healthPackageService[0]);
    }, []);

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" className="" rounded="lg" placeholder="tìm kiếm dịch vụ" />
            </div>
            <ul className="flex gap-4 justify-center  mb-4 py-4  px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 w-48 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex justify-between gap-4 w-3/4">
                <ul className="grid grid-cols-1 gap-4 w-full">
                    {healthPackageService.map((service, index) => (
                        <li key={service.id}>
                            <div
                                onClick={() => setIndexObject(service)}
                                className={`border-2  rounded-2xl overflow-hidden hover:border-primary  md:cursor-pointer shadow-md  transition-all ${
                                    service.id === indexObject.id ? "border-primary" : "border-transparent"
                                }`}>
                                <div className={`flex gap-4  bg-white p-4 `}>
                                    <div className="min-w-32 overflow-hidden p-2">
                                        <img src={service.image} />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <Heading3>{service.name}</Heading3>
                                        <div className="flex gap-1 text-lg">
                                            <LuMapPin className="mt-1" />
                                            <Paragraph>{service.address}</Paragraph>
                                        </div>
                                        <GroupButton className="flex justify-between mt-3 ">
                                            <div className="flex gap-2 text-lg items-center">
                                                <Heading4 className="text-yellow-900">Giá:</Heading4>
                                                <Heading4 className="text-yellow-700">{service.price ? service.price.toLocaleString() + "Đ" : "Thanh toán tại cơ sở"} </Heading4>
                                            </div>

                                            <Button
                                                size="sm"
                                                className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-48 rounded-full">
                                                Đặt khám ngay
                                            </Button>
                                        </GroupButton>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <section className="w-1/2  rounded-2xl h-fit  flex flex-col gap-8">
                    <div className=" p-6 rounded-lg shadow-md text-center bg-white">
                        <div className="flex w-full items-center justify-center ">
                            <img src={indexObject.image} className="my-4 size-52 object-cover rounded-full" />
                        </div>
                        <div>
                            <Heading3 className="text-primary">{indexObject.name}</Heading3>
                            <div className="flex text-lg text-left gap-1">
                                <LuMapPin className="mt-1" />
                                <Paragraph>{indexObject.address}</Paragraph>
                            </div>
                            <div className="text-yellow-500 font-bold flex items-center gap-3 text-lg">
                                ({indexObject.star}){indexObject.star && <Star star={indexObject.star} />}
                            </div>
                        </div>
                    </div>
                    <DownloadAppCard />
                </section>
            </div>
        </>
    );
};

const MedicalAtHome = () => {
    const [indexPage, setIndexPage] = useState(0);
    const medicalServices = [
        {
            id: 1,
            name: "Bệnh viện 199",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F6dde1ac9-153a-49b2-9502-bf9542cbd960-199_logo.png&w=1920&q=75",
        },
        {
            id: 2,
            name: "Bệnh viện 199",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F6dde1ac9-153a-49b2-9502-bf9542cbd960-199_logo.png&w=1920&q=75",
        },
        {
            id: 3,
            name: "Bệnh viện 199",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F6dde1ac9-153a-49b2-9502-bf9542cbd960-199_logo.png&w=1920&q=75",
        },
        {
            id: 4,
            name: "Bệnh viện 199",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F6dde1ac9-153a-49b2-9502-bf9542cbd960-199_logo.png&w=1920&q=75",
        },
        {
            id: 5,
            name: "Bệnh viện 199",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fprod-partner.s3-hcm-r1.longvan.net%2F6dde1ac9-153a-49b2-9502-bf9542cbd960-199_logo.png&w=1920&q=75",
        },
    ];
    const options = ["Tất cả", "Bệnh viện", "Phòng khám/Phòng mạch/Xét nghiệm/Khác"];

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="md" className="" />
            </div>
            <ul className="flex gap-4 justify-center py-4 mb-4 px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 px-4 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <ul className="grid grid-cols-2 gap-4 w-3/4">
                {medicalServices.map((service, index) => (
                    <li key={service.id}>
                        <div className={`flex gap-4  bg-white p-4 rounded-2xl shadow-md border-2 hover:border-primary transition-all md:cursor-pointer`}>
                            <div className="min-w-32 overflow-hidden p-2">
                                <img src={service.image} />
                            </div>
                            <div className="w-full">
                                <Heading3>{service.name}</Heading3>
                                <div className="flex gap-1 ">
                                    <LuMapPin className="size-6 mt-1" />
                                    <Paragraph>{service.address}</Paragraph>
                                </div>
                                <Star star={service.star} />
                                <GroupButton className="justify-center">
                                    <Button
                                        onClick={() => navigate(`/medical-facility?id=${id}`)}
                                        size="sm"
                                        className="bg-white font-semibold border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 transition-all w-32 rounded-full">
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-32 rounded-full p-[9px]">
                                        Đặt lịch
                                    </Button>
                                </GroupButton>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
const PaymentOfHospitalFees = () => {
    const [indexPage, setIndexPage] = useState(0);
    const medicalServices = [
        {
            id: 1,
            name: "Bệnh viện chợ rẫy",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fchoray%2Fweb%2Flogo.png%3Ft%3D22222222&w=1920&q=75",
        },
        {
            id: 2,
            name: "Bệnh viện chợ rẫy",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fchoray%2Fweb%2Flogo.png%3Ft%3D22222222&w=1920&q=75",
        },
        {
            id: 3,
            name: "Bệnh viện chợ rẫy",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fchoray%2Fweb%2Flogo.png%3Ft%3D22222222&w=1920&q=75",
        },
        {
            id: 4,
            name: "Bệnh viện chợ rẫy",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fchoray%2Fweb%2Flogo.png%3Ft%3D22222222&w=1920&q=75",
        },
        {
            id: 5,
            name: "Bệnh viện chợ rẫy",
            address: "216 Nguyễn Công Trứ, Phường Nguyễn Thái Bình, Quận 1, TP.HCM",
            star: 4.7,
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%3A5000%2Fstatic%2Fimages%2Fchoray%2Fweb%2Flogo.png%3Ft%3D22222222&w=1920&q=75",
        },
    ];
    const options = ["Tất cả", "Bệnh viện", "Phòng khám/Phòng mạch/Xét nghiệm/Khác"];

    return (
        <>
            <div className="w-1/2">
                <SearchInput size="lg" className="" rounded="lg" placeholder="tìm kiếm dịch vụ" />
            </div>
            <ul className="flex gap-4 justify-center py-4 mb-4 px-16">
                {options.map((option, index) => (
                    <Link key={index} href="#">
                        <li
                            key={index}
                            className={`py-3 px-4 text-center   text-lg font-semibold rounded-full ${
                                index === indexPage ? "bg-primary-2 text-white" : "bg-white text-primary-2 transition-all"
                            } hover:bg-primary-2 hover:text-white `}>
                            {option}
                        </li>
                    </Link>
                ))}
            </ul>
            <ul className="grid grid-cols-2 gap-4 w-3/4">
                {medicalServices.map((service, index) => (
                    <li key={service.id}>
                        <div className={`flex gap-4  bg-white p-4 rounded-2xl shadow-md border-2 hover:border-primary transition-all md:cursor-pointer`}>
                            <div className="min-w-32 overflow-hidden p-2">
                                <img src={service.image} />
                            </div>
                            <div className="w-full">
                                <Heading3>{service.name}</Heading3>
                                <div className="flex gap-1 ">
                                    <LuMapPin className="size-6 mt-1" />
                                    <Paragraph>{service.address}</Paragraph>
                                </div>
                                <Star star={service.star} />
                                <GroupButton className="justify-center">
                                    <Button
                                        onClick={() => navigate(`/medical-facility?id=${id}`)}
                                        size="sm"
                                        className="bg-white font-semibold border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 transition-all w-32 rounded-full">
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-32 rounded-full p-[9px]">
                                        Đặt lịch
                                    </Button>
                                </GroupButton>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
export { ListDoctorService, VideoMedicalExaminationConsulation, ScheduleATest, HealthExaminationPackage, ScheduleVaccination, MedicalAtHome, PaymentOfHospitalFees };

export default ListMedicalServices;
