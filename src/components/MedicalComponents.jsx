import { FaChevronRight, FaHospitalAlt, FaSearch, FaUserPlus } from "react-icons/fa";
import { Heading1, Heading3, Heading4, Heading5, Paragraph, Span } from "./Text";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Button, GroupButton } from "./Button";
import { LuCalendarHeart, LuMapPin } from "react-icons/lu";
import { Star } from "./Star";
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { CiClock2 } from "react-icons/ci";
import { getData, setData } from "../utils/fetchData";
import { CLIENTLIMIT } from "../configs/constance";
import Paginate from "./Paginate";
import { toast } from "react-toastify";
import imgSpecialty from "../assets/images/Icon_DatKhamTaiCoSo.webp";
import imgMedicalPackage from "../assets/images/Icon_GoiKhamSucKhoe.webp";
import imgDoctor from "../assets/images/Icon_DatKhamTheoBacSi.webp";
import { DatePicker } from "./DatePicker";
import { useSelector } from "react-redux";
import { AiOutlineRollback } from "react-icons/ai";

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
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    const [result, setResult] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/search-clinic?search=${debouncedQuery}&page=1&limit=5&sort=createdAt`);
            setResult(response.data);
        };
        fetchData();
    }, [debouncedQuery]);

    return (
        <>
            <div className="w-full h-full bg-white flex ">
                <div className="mx-auto text-center flex flex-col gap-4 my-12 relative">
                    <Heading1 className="text-primary">Cơ sở y tế</Heading1>
                    <Span>Với những cơ sở Y Tế hàng đầu sẽ giúp trải nghiệm khám, chữa bệnh của bạn tốt hơn</Span>
                    <div className="relative flex items-center bg-white rounded-lg overflow-hidden px-4 w-full border border-gray-300 focus-within:border-primary-3 transition-all">
                        <IoSearchOutline className=" top-4 left-4 fill-gray-500" />
                        <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Tìm kiếm cơ sở y tế" className="w-full p-4  outline-none " />
                    </div>
                    {result.length > 0 && (
                        <div className="flex flex-col gap-4 p-4 absolute top-full w-full bg-white rounded-lg z-50 shadow-md left-1/2 -translate-x-1/2">
                            {result.map((clinic, index) => (
                                <div
                                    onClick={() => navigate(`/chi-tiet-phong-kham?id=${clinic.id}`)}
                                    key={index}
                                    className="flex items-center text-left md:cursor-pointer hover:bg-gray-200 p-2 rounded-lg  gap-4">
                                    <img src={clinic.image} className="w-12 h-12" />
                                    <div>
                                        <Heading5 className="line-clamp-1">{clinic.name}</Heading5>
                                        <Paragraph className="line-clamp-1">{clinic.address}</Paragraph>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
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
        // {
        //     name: "Phòng mạch",
        //     link: "/phong-mach",
        // },
        // {
        //     name: "Xét nghiệm",
        //     link: "/xet-nghiem",
        // },
        // {
        //     name: "Y tế tại nhà",
        //     link: "/y-te-tai-nha",
        // },
        // {
        //     name: "Tiêm chủng",
        //     link: "/tiem-chung",
        // },
    ];
    return (
        <ul className="flex justify-center gap-4 border-t border-gray-300 py-4 bg-white px-16">
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
                        onClick={() => navigate(`/chi-tiet-phong-kham?id=${id}`)}
                        size="sm"
                        className="bg-white font-semibold border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 transition-all w-52 rounded-full">
                        Xem chi tiết
                    </Button>
                    <Button
                        onClick={() => navigate(`/hinh-thuc-dat-kham?id=${id}`)}
                        size="sm"
                        className="bg-gradient-to-r font-semibold from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white w-52 rounded-full p-[9px]">
                        Đặt lịch khám
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
    const location = useLocation();
    const [indexFacility, setIndexFacility] = useState(0);
    const [search, setSearch] = useState("");
    const [medicalFacilities, setMedicalFacilities] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pathname, setPathname] = useState("");

    //listen to change url

    useEffect(() => {
        setPathname(location.pathname);
    }, [location.pathname]);

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
            console.log(response);
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

export const MedicalBookingForm = (props) => {
    const clinicId = new URLSearchParams(window.location.search).get("id");
    const [specialty, setSpecialty] = useState([]);
    const [packageMedical, setPackageMedical] = useState([]);
    const [clinicName, setClinicName] = useState("");
    useEffect(() => {
        //get all specialty of clinic
        const getSpecialty = async () => {
            //call Api to get specialty
            const response = await getData(`/clinic/specialty/read-public?clinicId=${clinicId}`);
            //call Api to get packageMedical
            const responsePackageMedical = await getData(`/clinic/medical-package/read-public?clinicId=${clinicId}`);
            //get clinic
            const responseClinic = await getData(`/clinic/read?id=${clinicId}`);
            if (!response.isSuccess || !responsePackageMedical.isSuccess || !responseClinic.isSuccess) {
                toast.error(response.message);
                return;
            }
            console.log(response, responsePackageMedical, responseClinic);

            setSpecialty(response.data);
            setPackageMedical(responsePackageMedical.data);
            setClinicName(responseClinic.data.name);
        };
        getSpecialty();
    }, [clinicId]);
    return (
        <div className="pt-32 px-8 my-4">
            <div className="font-semibold text-primary text-xl">
                {clinicName} {" > "}
                <span className="font-medium text-lg text-gray-700">Các hình thức đặt khám</span>
            </div>
            <div className="my-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl text-primary font-bold mb-0">Hình thức đặt khám</h1>
                <span className="font-thin text-base">Đặt khám nhanh chóng, không phải chờ đợi với nhiều cơ sở y tế trên khắp các tỉnh thành</span>
                <div className="mt-8 flex gap-8">
                    {specialty?.length > 0 && (
                        <Link to={`/dat-kham-theo-chuyen-khoa?id=${clinicId}`}>
                            <div className="bg-white p-4 rounded-md text-base font-semibold text-gray-700 flex items-center gap-4">
                                <img src={imgSpecialty} alt="logo chuyen khoa" className="h-10 w-10" />
                                Đặt khám theo chuyên khoa
                            </div>
                        </Link>
                    )}
                    {packageMedical?.length > 0 && (
                        <Link to={`/dat-kham-theo-goi-kham?id=${clinicId}`}>
                            <div className="bg-white p-4 rounded-md text-base font-semibold text-gray-700 flex items-center gap-4">
                                <img src={imgMedicalPackage} alt="logo goi kham" className="h-10 w-10" />
                                Đặt khám theo gói khám
                            </div>
                        </Link>
                    )}

                    {specialty?.length === 0 && packageMedical?.length === 0 && (
                        <div className="bg-white p-4 rounded-md text-base font-semibold text-gray-700 flex items-center gap-4">Không có hình thức đặt khám</div>
                    )}
                </div>
            </div>
        </div>
    );
};

//booking component for booking care

export const BookingContainer = () => {
    const clinicId = new URLSearchParams(window.location.search).get("id");
    const [clinic, setClinic] = useState({});
    const [data, setData] = useState({});

    const handleUpdateData = (data) => {
        setData((prev) => ({ ...prev, ...data }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/read?id=${clinicId}`);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setClinic(response.data);
            handleUpdateData({ clinicId: clinicId });
        };
        fetchData();
    }, [clinicId]);

    return (
        <div className={`pt-32 mb-8 flex flex-col px-8 lg:px-16`}>
            <div className="font-semibold text-primary text-xl my-4">
                <Link to={`/chi-tiet-phong-kham?id=${clinic.id}`}>{clinic.name}</Link> {" > "}
                <Link to={`/hinh-thuc-dat-kham?id=${clinic.id}`} className="font-medium text-lg text-gray-700">
                    Các hình thức đặt khám
                </Link>
                {" > "}
                <span className="font-medium text-lg text-gray-700">Đặt lịch khám</span>
            </div>
            <div className="grid grid-cols-7 px-16 lg:px-32 gap-8">
                <div className="col-span-2">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Thông tin cơ sở y tế</h2>
                        <div className="p-4 flex gap-2">
                            <FaHospitalAlt size={35} />
                            <div>
                                <h3 className="font-medium text-gray-800">{clinic.name}</h3>
                                <span className="font-medium text-gray-500 text-sm">{clinic.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet context={{ data, handleUpdateData }} />
            </div>
        </div>
    );
};

export const ListSpecialty = () => {
    const clinicId = new URLSearchParams(window.location.search).get("id");
    const [specialty, setSpecialty] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    //data for booking care
    const { handleUpdateData, data } = useOutletContext();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const timmer = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);
        return () => {
            clearTimeout(timmer);
        };
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/specialty/read-public?clinicId=${clinicId}&search=${debouncedQuery}`);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setSpecialty(response.data);
        };
        fetchData();
    }, [clinicId, debouncedQuery]);

    const handleChooseSpecialty = (specialtyId) => {
        handleUpdateData({ specialtyId: specialtyId });
        navigate(`/dat-kham-theo-chuyen-khoa/chon-bac-si?id=${data.clinicId}`);
    };

    return (
        <div className="col-span-5 bg-white shadow rounded-lg overflow-hidden">
            <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Vui lòng chọn chuyên khoa</h2>
            <div className=" m-4 relative">
                <input placeholder="Tìm kiếm nhanh chuyên khoa" className="border outline-none border-gray-400 rounded p-3 w-full" type="search" onChange={(e) => setSearch(e.target.value)} />
                <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 " />
            </div>
            <hr className="mx-4 my-2 bg-gray-300 h-[2px]" />
            <div className="p-4 pt-0 flex flex-col max-h-80 overflow-scroll no-scrollbar">
                {specialty.length > 0 ? (
                    specialty.map((item, index) => (
                        <div key={index} className="text-gray-800 p-2  border-b border-gray-400 hover:text-primary transition-all duration-300 group">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium group-hover:text-primary transition-all duration-300">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleChooseSpecialty(item.id)}
                                        className="p-2 text-white bg-primary font-medium text-base rounded-lg hover:bg-primary-2 transition-all duration-300">
                                        Đặt khám ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center font-medium text-gray-500">Không có gói khám nào</div>
                )}
            </div>
        </div>
    );
};

export const ListDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    const { handleUpdateData, data } = useOutletContext();
    //data for booking care
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const timmer = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);
        return () => {
            clearTimeout(timmer);
        };
    }, [search]);

    //get data from API follow specialtyId
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/doctor/read-public?clinicId=${data.clinicId}&search=${debouncedQuery}&specialtyId=${data.specialtyId}`);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setDoctors(response.data);
        };
        fetchData();
    }, [data.clinicId, debouncedQuery]);

    const handleChoseDoctor = (doctorId) => {
        handleUpdateData({ doctorId: doctorId });
        navigate(`/dat-kham-theo-chuyen-khoa/chon-ngay?id=${data.clinicId}`);
    };

    return (
        <div className="col-span-5 bg-white shadow rounded-lg overflow-hidden">
            <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Vui lòng chọn bác sĩ</h2>
            <div className=" m-4 relative">
                <input placeholder="Tìm kiếm bác sĩ" className="border outline-none border-gray-400 rounded p-3 w-full" type="search" onChange={(e) => setSearch(e.target.value)} />
                <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 " />
            </div>
            <hr className="mx-4 my-2 bg-gray-300 h-[2px]" />
            <div className="p-4 pt-0 flex flex-col max-h-80 overflow-scroll no-scrollbar">
                {doctors?.length > 0 ? (
                    doctors.map((item, index) => (
                        <div key={index} className="text-gray-800 p-2  border-b border-gray-400 hover:text-primary transition-all duration-300 group">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium group-hover:text-primary transition-all duration-300">{item.firstname + " " + item.lastname}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-600 text-base">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</span>
                                    <button
                                        onClick={() => handleChoseDoctor(item.id)}
                                        className="p-2 text-white bg-primary font-medium text-base rounded-lg hover:bg-primary-2 transition-all duration-300">
                                        Đặt khám ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center font-medium text-gray-500">Không có gói khám nào</div>
                )}
            </div>
        </div>
    );
};

export const BookingPackage = () => {
    const clinicId = new URLSearchParams(window.location.search).get("id");
    const [clinic, setClinic] = useState({});
    const [data, setData] = useState({});

    const handleUpdateData = (data) => {
        setData((prev) => ({ ...prev, ...data }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/read?id=${clinicId}`);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setClinic(response.data);
            handleUpdateData({ clinicId: clinicId });
        };
        fetchData();
    }, [clinicId]);

    return (
        <div className={`pt-32 mb-8 flex flex-col px-8 lg:px-16`}>
            <div className="font-semibold text-primary text-xl my-4">
                <Link to={`/chi-tiet-phong-kham?id=${clinic.id}`}>{clinic.name}</Link> {" > "}
                <Link to={`/hinh-thuc-dat-kham?id=${clinic.id}`} className="font-medium text-lg text-gray-700">
                    Các hình thức đặt khám
                </Link>
                {" > "}
                <span className="font-medium text-lg text-gray-700">Đặt lịch khám</span>
            </div>
            <div className="grid grid-cols-7 px-16 lg:px-32 gap-8">
                <div className="col-span-2">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Thông tin cơ sở y tế</h2>
                        <div className="p-4 flex gap-2">
                            <FaHospitalAlt size={35} />
                            <div>
                                <h3 className="font-medium text-gray-800">{clinic.name}</h3>
                                <span className="font-medium text-gray-500 text-sm">{clinic.address}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Outlet context={{ data, handleUpdateData }} />
            </div>
        </div>
    );
};

export const ListMedicalPakage = () => {
    const clinicId = new URLSearchParams(window.location.search).get("id");
    const [medicalPackage, setMedicalPackage] = useState([]);
    const [clinic, setClinic] = useState({});
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);

    //data for booking care
    const { handleUpdateData, data } = useOutletContext();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const timmer = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);
        return () => {
            clearTimeout(timmer);
        };
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/medical-package/read-public?clinicId=${clinicId}&search=${debouncedQuery}`);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            console.log(response);

            setMedicalPackage(response.data);
        };
        fetchData();
    }, [clinicId, debouncedQuery]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/read?id=${clinicId}`);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setClinic(response.data);
            handleUpdateData({ clinicId: clinicId });
        };
        fetchData();
    }, [data.clinicId]);

    const handleChosePackage = (packageId, doctorId) => {
        handleUpdateData({ packageId: packageId, doctorId: doctorId });
        navigate(`/dat-kham-theo-goi-kham/chon-ngay?id=${data.clinicId}`);
    };

    return (
        <div className="col-span-5 bg-white shadow rounded-lg overflow-hidden">
            <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Vui lòng gói khám</h2>
            <div className=" m-4 relative">
                <input placeholder="Tìm kiếm gói khám" className="border outline-none border-gray-400 rounded p-3 w-full" type="search" onChange={(e) => setSearch(e.target.value)} />
                <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 " />
            </div>
            <hr className="mx-4 my-2 bg-gray-300 h-[2px]" />
            <div className="p-4 pt-0 flex flex-col max-h-80 overflow-scroll no-scrollbar">
                {medicalPackage.length > 0 ? (
                    medicalPackage.map((item, index) => (
                        <div className="text-gray-800 p-2  border-b border-gray-400 hover:text-primary transition-all duration-300 group">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium group-hover:text-primary transition-all duration-300">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-600 text-base">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</span>
                                    <button
                                        onClick={() => handleChosePackage(item.id, item.doctorId)}
                                        className="p-2 text-white bg-primary font-medium text-base rounded-lg hover:bg-primary-2 transition-all duration-300">
                                        Đặt khám ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center font-medium text-gray-500">Không có gói khám nào</div>
                )}
            </div>
        </div>
    );
};

export const PickerDate = () => {
    const { handleUpdateData, data } = useOutletContext();
    const navigate = useNavigate();
    const [isOpenPickerTime, setIsOpenPickerTime] = useState(false);
    const [listTime, setListTime] = useState(["8:00 - 9:30", "10:00 - 11:30", "14:00 - 15:30", "16:00 - 17:30"]);

    useEffect(() => {
        if (data.date) {
            setIsOpenPickerTime(true);
        }
    }, [data.date, data.month, data.year]);

    const handleChoseTime = (time) => {
        handleUpdateData({ time: time });
        navigate(`/${data.specialtyId ? "dat-kham-theo-chuyen-khoa" : "dat-kham-theo-goi-kham"}/chon-ho-so?id=${data.clinicId}`);
    };

    return (
        <div className="col-span-5 bg-white shadow rounded-lg overflow-hidden ">
            <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Vui lòng chọn lịch khám</h2>
            <div className="p-4 pt-0 flex flex-col ">
                <DatePicker
                    clinicId={data.clinicId}
                    doctorId={data.doctorId}
                    setListTime={setListTime}
                    onPicker={(datePicker) =>
                        handleUpdateData({
                            date: datePicker.date(),
                            month: datePicker.month(),
                            year: datePicker.year(),
                        })
                    }
                />
                {isOpenPickerTime && (
                    <div className="p-4 pt-0 flex flex-col ">
                        <h2 className="font-normal text-lg text-primary">
                            Ngày khám đã chọn: <span className="font-normal text-base">{listTime.length < 1 ? "Vui lòng chọn ngày khám." : `${data.date}/${data.month + 1}/${data.year}`}</span>
                        </h2>
                        <hr className="my-4 bg-gray-400 h-[2px]" />
                        <div>
                            <h2 className="text-xl font-bold text-primary text-center mb-4">Chọn giờ khám</h2>

                            <div className="flex gap-2">
                                {listTime.map((time, index) => (
                                    <button
                                        key={index}
                                        onClick={(e) => handleChoseTime(e.target.innerText)}
                                        className="px-3 py-2 border border-orange-200 rounded hover:bg-orange-100 hover:text-white transition-all duration-200 font-medium">
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const SelectPatientProfile = () => {
    const [profiles, setProfiles] = useState([]);
    const { handleUpdateData, data } = useOutletContext();
    const navigate = useNavigate();
    //get token from redux
    const token = useSelector((state) => state.auth.accessToken);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/get-patient-profile?date=${data.date}&month${data.month}&year=${data.year}`, token);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setProfiles(response.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!data.profileId) {
            toast.error("Vui lòng chọn hồ sơ bệnh nhân");
            return;
        }
        const response = await setData(`/create-history-booking`, "POST", data, "application/json", token);
        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }
        toast.success(response.message);
        navigate("/lich-su-kham-benh?key=bills");
    };

    return (
        <div className="col-span-5 bg-white shadow rounded-lg overflow-hidden">
            <h2 className="text-center bg-primary p-3 text-xl font-semibold text-white">Chọn hồ sơ bệnh nhân</h2>
            {profiles.length > 0 ? (
                <ul className="flex flex-col max-h-80 overflow-scroll no-scrollbar border-b bg-gray-200">
                    {profiles?.map((profile, index) => (
                        <li key={index} className="flex gap-4 border-b md:cursor-pointer w-full justify-between items-center hover:bg-white transition-all">
                            <label htmlFor={profile.id} className="w-full  px-4  py-2">
                                <div className="flex gap-1 flex-col">
                                    <div>
                                        <span className="text-gray-800 font-medium ">Họ và tên: </span>
                                        <span className=" uppercase font-medium text-primary">{profile.fullname}</span>
                                    </div>
                                    <div>
                                        <div>
                                            <span className="text-gray-800 font-medium ">Ngày sinh: </span>
                                            <span className="text-gray-900">{profile.birthday}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-gray-800 font-medium ">SĐT: </span>
                                        <span className="text-gray-900">{profile.phone}</span>
                                    </div>
                                </div>
                            </label>
                            <input id={profile.id} type="radio" name="profile" className="mr-4 size-5" onChange={() => handleUpdateData({ profileId: profile.id })} />
                        </li>
                    ))}
                </ul>
            ) : (
                <>
                    <h3 className="text-center font-medium text-gray-600 z-30">Bạn chưa có hồ sơ bệnh nhân, vui lòng thêm hồ sơ để được đặt khám.</h3>
                </>
            )}
            <div className="flex gap-2 my-2 mx-4 justify-end">
                <button onClick={() => window.history.back()} className="flex items-center font-medium gap-2 py-2 px-4 text rounded-md hover:bg-gray-400  transition-all duration-150">
                    Quay lại
                    <AiOutlineRollback className="size-5" />
                </button>
                <Link
                    to="/them-ho-so-benh-nhan"
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-3 to-primary-2 hover:from-primary-2 hover:to-primary transition-all duration-150 py-2 px-4 rounded-md text-white font-medium text-base">
                    <FaUserPlus className="fill-white" />
                    Thêm hồ sơ
                </Link>
                {profiles.length > 0 && (
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-primary-2 to-primary px-4 py-2 rounded-md font-medium text-white transition-all duration-300  hover:from-primary-3 hover:to-primary-2">
                        Xác nhận đặt khám
                    </button>
                )}
            </div>
        </div>
    );
};
