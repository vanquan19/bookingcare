import banner from "../assets/images/banner_home.webp";
import IconBookFollowFacility from "../assets/images/Icon_DatKhamTaiCoSo.webp";
import IconBookFollowDoctor from "../assets/images/Icon_DatKhamTheoBacSi.webp";
import IconTest from "../assets/images/Icon_DatLichXetNghiem.webp";
import IconHealthCheck from "../assets/images/Icon_GoiKhamSucKhoe.webp";
import IconVaccination from "../assets/images/Icon_DatLichTiemChung.webp";
import IconVideoConsultation from "../assets/images/Icon_TuVanQuaVideo.webp";
import { SearchInput } from "./Form";
import { Heading1, Heading3, Heading5, Heading6, Paragraph } from "./Text";

const Banner = () => {
    return (
        <div className="relative w-full h-full bg-cover bg-center flex" style={{ backgroundImage: `url(${banner})` }}>
            <div className="m-auto text-center">
                <Heading3 className="uppercase font-mono text-primary">Nền tảng công nghệ số</Heading3>
                <Heading1>Kết nối người dân với Cơ Sở - Dịch vụ Y tế</Heading1>
                <SearchInput rounded="full" />
                <Heading5 className="">Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa</Heading5>
            </div>
            <div className="absolute top-full -translate-y-3/4 flex gap-8 left-1/2 -translate-x-1/2 ">
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconBookFollowFacility} alt="Đặt khám theo cơ sở" />
                    <Heading6 className="py-0">Đặt khám tại cơ sở</Heading6>
                </div>
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconBookFollowDoctor} alt="Đặt khám theo bác sĩ" />
                    <Heading6 className="py-0">Đặt khám theo bác sĩ</Heading6>
                </div>
                <div className="bg-white rounded-2xl size-40 text-center p-4 shadow-lg flex flex-col gap-2 justify-center">
                    <img className="mx-auto h-3/6" src={IconVideoConsultation} alt="Đặt lịch xét nghiệm" />
                    <Heading6 className="py-0">Tư vấn khám qua video</Heading6>
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
