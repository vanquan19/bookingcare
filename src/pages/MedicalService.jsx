import { Link, Outlet } from "react-router-dom";
import { Heading1, Heading3, Heading4, Heading5, Paragraph } from "../components/Text";
import { SearchInput } from "../components/Form";
import ListMedicalServices from "../components/MedicalServiceComponents";

const MedicalService = () => {
    const endPoint = window.location.pathname.split("/").pop();

    const page = {
        "dat-kham-tai-co-so": {
            title: "Đặt khám tại cơ sở",
            content: "Đặt khám nhanh chóng, tiết kiệm thời gian, an toàn tiện lợi",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Fd53ed2b9-dcae-4509-90be-8ecd11cdc628-dat-kham-co-so.webp&w=1200&q=75",
        },
        "dat-kham-theo-bac-si": {
            title: "Đặt khám theo bác sĩ",
            content: "Chủ động chọn bác sĩ mà bạn tin tưởng, an tâm khám bệnh",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9a085fa0-374e-4aca-9ffe-6e6d2c5c03e7-dat-kham-theo-bac-si.webp&w=1920&q=75",
        },
        "tu-van-kham-benh-tu-xa": {
            title: "Tư vấn khám bệnh qua video",
            content: "Chăm sóc sức khoẻ từ xa kết nối với Bác sĩ qua cuộc gọi Video và Nhắn Tin mọi lúc mọi nơi",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F5249549a-4d7c-4be8-95a7-ed7569d6bc59-tu-van-kham-benh-qua-video.webp&w=1920&q=75",
        },
        "dat-lich-xet-nghiem": {
            title: "Đặt lịch xét nghiệm",
            content: "Lựa chọn linh hoạt, tiện lợi: Xét nghiệm y tế tại cơ sở và tại nhà bạn, đảm bảo kết quả chính xác",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F7b36c2a1-513f-43e0-b35f-1e3ade5e72ac-dat-lich-xet-nghiem.webp&w=1920&q=75",
        },
        "dat-lich-tiem-chung": {
            title: "Đặt lịch tiêm chủng",
            content: "Hẹn lịch tiêm chủng dễ dàng với các cơ sở uy tín hàng đầu",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F46b37410-c3f1-494e-a7c4-9f74db2a6eec-dat-lich-tiem-chung.webp&w=1920&q=75",
        },
        "goi-kham-suc-khoe": {
            title: "Gói khám sức khỏe",
            content: "Khám sức khỏe toàn diện, từ cơ bản đến chuyên sâu với gói dịch vụ đa dạng tại Medpro",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F75c4c8e1-7fd3-492a-afc1-49926e9c7458-goi-kham-suc-khoe.webp&w=1920&q=75",
        },
        "y-te-tai-nha": {
            title: "y tế tại nhà",
            content: "Chăm sóc sức khỏe chuyên nghiệp ngay tại nhà",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2Ffb51bd32-6d14-4f80-ad60-8a31c9f0e063-y-te-tai-nha.webp&w=1920&q=75",
        },
        "thanh-toan-vien-phi": {
            title: "Thanh toán viện phí",
            content: "Tiện lợi và an toàn, tránh những rủi ro thất thoát khi đến bệnh viện",
            image: "https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F82178030-8044-40a3-9006-57f6b8ffc807-thanh-toan-vien-phi.webp&w=1920&q=75",
        },
    }[endPoint];

    return (
        <div className="mt-32">
            <div className="flex min-h-80 px-32 relative bg-gradient-to-r from-[#f4feff] to-[#caeaf9] ">
                <img src={page.image} alt="booking at facility" className="h-72 rounded-lg absolute right-0 bottom-0" />
                <div className="p-12 bg-white rounded-3xl my-auto z-10 shadow w-3/5">
                    <Heading1 className="text-primary text-[2.7rem] mb-2 uppercase">{page.title}</Heading1>
                    <Paragraph className="text-[1.8rem] text-gray-700 leading-9">{page.content}</Paragraph>
                </div>
            </div>
            <div className="flex flex-col items-center bg-[[#e9f2f7]] p-8">
                <Outlet />
            </div>
        </div>
    );
};
export default MedicalService;
