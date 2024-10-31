import { FaChevronRight } from "react-icons/fa";
import { Heading1, Heading3, Heading4, Heading5, Paragraph, Span } from "./Text";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button, GroupButton } from "./Button";
import { LuMapPin } from "react-icons/lu";
import { Star } from "./Star";
import { Link, useNavigate } from "react-router-dom";
import { CiClock2 } from "react-icons/ci";
import { getData } from "../utils/fetchData";
import { CLIENTLIMIT } from "../configs/constance";
import Paginate from "./Paginate";

export const Directory = () => {
    //page will be get from local storage
    let page = {
        "co-so-y-te": "Cơ sở y tế",
        "benh-vien-cong": "Bệnh viện công",
        "benh-vien-tu": "Bệnh viện tư",
        "phong-kham": "Phòng khám",
        "phong-mach": "Phòng mạch",
        "xet-nghiem": "Xét nghiệm",
        "y-te-tai-nha": "Y tế tại nhà",
        "tiem-chung": "Tiêm chủng",
    }[window.location.pathname.split("/")[1]];

    return (
        <div className="flex items-center gap-2 bg-white">
            <Heading5>
                <Link to="/">Trang chủ</Link>
            </Heading5>
            <FaChevronRight className="size-3" /> <Heading5 className="text-primary">{page}</Heading5>
        </div>
    );
};

export const SearchMedicalFacility = ({ value, onChange }) => {
    return (
        <div className="w-full h-full bg-white flex">
            <div className="mx-auto text-center flex flex-col gap-4 my-12 ">
                <Heading1 className="text-primary">Cơ sở y tế</Heading1>
                <Span>Với những cơ sở Y Tế hàng đầu sẽ giúp trải nghiệm khám, chữa bệnh của bạn tốt hơn</Span>
                <div className="relative flex items-center bg-white rounded-lg overflow-hidden px-4 w-full border border-gray-300 focus-within:border-primary-3 transition-all">
                    <IoSearchOutline className=" top-4 left-4 fill-gray-500" />
                    <input type="search" placeholder="Tìm kiếm cơ sở y tế" className="w-full p-4  outline-none " />
                </div>
            </div>
        </div>
    );
};

const OptionList = ({ title, children }) => {
    //option will be call from API
    const options = [
        {
            name: "Bệnh viện công",
            link: "/benh-vien-cong",
        },
        {
            name: "Bệnh viện tư",
            link: "/benh-vien-tu",
        },
        {
            name: "Phòng khám",
            link: "/phong-kham",
        },
        {
            name: "Phòng mạch",
            link: "/phong-mach",
        },
        {
            name: "Xét nghiệm",
            link: "/xet-nghiem",
        },
        {
            name: "Y tế tại nhà",
            link: "/y-te-tai-nha",
        },
        {
            name: "Tiêm chủng",
            link: "/tiem-chung",
        },
    ];
    return (
        <ul className="flex justify-around border-t border-gray-300 py-4 bg-white px-16">
            {options.map((option, index) => (
                <Link key={index} to={option.link}>
                    <li key={index} className="py-2 px-4  bg-primary/10  text-primary-2  text-lg font-semibold rounded-full  ">
                        {option.name}
                    </li>
                </Link>
            ))}
        </ul>
    );
};
const MedicalFacilityCard = ({ id, name, address, image, schedule, star, description, index, indexFacility, setIndexFacility }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => setIndexFacility(index)}
            className={`flex gap-4 bg-white p-4 rounded-2xl shadow-md border-2 hover:border-primary transition-all md:cursor-pointer ${
                index !== indexFacility ? "border-transparent" : "border-primary"
            }`}>
            <div className="w-1/4 overflow-hidden p-2">
                <img src={image} />
            </div>
            <div className="w-full">
                <Heading3 className="w-[40ch]">{name}</Heading3>
                <div className="flex gap-1 items-center">
                    <LuMapPin />
                    <Paragraph>{address}</Paragraph>
                </div>
                <Star star={star} />
                <GroupButton className="justify-center">
                    <Button
                        onClick={() => navigate(`/medical-facility?id=${id}`)}
                        size="sm"
                        className="bg-white font-semibold border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 transition-all w-52 rounded-full">
                        Xem chi tiết
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-52 rounded-full p-[9px]">
                        Đặt lịch
                    </Button>
                </GroupButton>
            </div>
        </div>
    );
};

const MedicalFacilityDesription = ({ medicalFacility }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex w-full items-center justify-center">
                <img src={medicalFacility.image} className="my-4 size-52 object-cover" />
            </div>
            <Heading4 className="text-primary">{medicalFacility.name}</Heading4>
            <div className="flex items-center justify-center gap-2 border-b border-gray-400 pb-6">
                <CiClock2 className="fill-orange-coral" /> {medicalFacility.schedule}
            </div>
            <Paragraph>{medicalFacility.description}</Paragraph>
            <Heading3 className="text-left my-2">Bản đồ</Heading3>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.006831241276!2d106.66469961480081!3d10.759821992336197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8a8b2d5c5d%3A0x4b7b8f2b3f7c6f1!2zQ-G6p3UgVmnhu4d0IE3hu5l0IFRQLkhDTQ!5e0!3m2!1svi!2s!4v1632091294004!5m2!1svi!2s"
                className="w-full rounded-md"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"></iframe>
        </div>
    );
};

const MedicalFacilityList = () => {
    const [indexFacility, setIndexFacility] = useState(0);
    const [search, setSearch] = useState("");
    const [medicalFacilities, setMedicalFacilities] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pathname, setPathname] = useState(window.location.pathname);

    //listen to change url
    useEffect(() => {
        setPathname(window.location.pathname);
    }, [window.location.pathname]);
    //get id from url
    useEffect(() => {
        switch (pathname) {
            case "/benh-vien-cong":
                setSearch("C2");
                break;
            case "/benh-vien-tu":
                setSearch("C1");
                break;
            case "/phong-kham":
                setSearch("C3");
                break;
            case "/phong-mach":
                setSearch("C4");
                break;
            case "/xet-nghiem":
                setSearch("C5");
                break;
            case "/y-te-tai-nha":
                setSearch("C6");
                break;
            case "/tiem-chung":
                setSearch("C7");
                break;
            default:
                setSearch("all");
                break;
        }
    }, [pathname]);

    //get medicalFacilities follow search
    useEffect(() => {
        //call Api to get medicalFacilities follow endPoint
        const getMedicalFacilities = async () => {
            const response = await getData(`/clinic/read-follow-type?search=${search}&page=${page}&limit=${CLIENTLIMIT}`);
            setMedicalFacilities(response.data);
            console.log(response.totalPages);
            setTotal(response.totalPages);
        };
        getMedicalFacilities();
    }, [search, page]);

    return (
        <>
            <div className="flex gap-8 p-12 pb-8 justify-between">
                <div className="flex flex-col gap-4 w-full">
                    {medicalFacilities.length > 0 ? (
                        medicalFacilities.map((medicalFacility, index) => (
                            <MedicalFacilityCard setIndexFacility={setIndexFacility} key={index} index={index} indexFacility={indexFacility} {...medicalFacility} />
                        ))
                    ) : (
                        <div>Không có cơ sở y tế nào</div>
                    )}
                </div>
                <div className="w-2/3">{medicalFacilities.length > 0 && <MedicalFacilityDesription medicalFacility={medicalFacilities[indexFacility]} />}</div>
            </div>
            {total > 1 && (
                <div className="w-full flex items-center justify-center mb-8">
                    <Paginate total={total} currentPage={page} setPage={setPage} />
                </div>
            )}
        </>
    );
};

export const MedicalFacility = () => {
    return (
        <>
            <SearchMedicalFacility />
            <OptionList />
            <div className="flex flex-col gap-4">
                <MedicalFacilityList />
            </div>
        </>
    );
};
