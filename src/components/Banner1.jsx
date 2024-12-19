import banner from "../assets/images/banner_home.webp";
import IconBookFollowFacility from "../assets/images/Icon_DatKhamTaiCoSo.webp";
import IconBookFollowDoctor from "../assets/images/Icon_DatKhamTheoBacSi.webp";
import IconTest from "../assets/images/Icon_DatLichXetNghiem.webp";
import IconHealthCheck from "../assets/images/Icon_GoiKhamSucKhoe.webp";
import IconVaccination from "../assets/images/Icon_DatLichTiemChung.webp";
import IconVideoConsultation from "../assets/images/Icon_TuVanQuaVideo.webp";
import { SearchInput } from "./Form";
import { Heading1, Heading3, Heading5, Heading6, Paragraph } from "./Text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../utils/fetchData";

const Banner = () => {
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
        <div className="relative w-full h-full bg-cover bg-center flex" style={{ backgroundImage: `url(${banner})` }}>
            <div className="m-auto text-center">
                <Heading3 className="uppercase font-mono text-primary">Nền tảng công nghệ số</Heading3>
                <Heading1>Kết nối người dân với Cơ Sở - Dịch vụ Y tế</Heading1>
                <div className="relative">
                    <SearchInput onChange={(e) => setSearch(e.target.value)} rounded="full"/>
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
                <Heading5 className="">Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa</Heading5>
            </div>
            <div className="absolute top-full -translate-y-3/4 flex gap-8 left-1/2 -translate-x-1/2 ">
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconBookFollowFacility} alt="Đặt khám theo cơ sở" />
                    <Heading6 className="py-0">Đặt khám tại cơ sở</Heading6>
                </div>
          
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconTest} alt="Đặt lịch xét nghiệm" />
                    <Heading6 className="py-0">Đặt lịch xét nghiệm</Heading6>
                </div>
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconHealthCheck} alt="Gói khám sức khỏe" />
                    <Heading6 className="py-0">Gói khám sức khỏe</Heading6>
                </div>
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconVaccination} alt="Đặt lịch tiêm chủng" />
                    <Heading6 className="py-0">Đặt lịch tiêm chủng</Heading6>
                </div>
            </div>
        </div>
    );
};

export default Banner;
