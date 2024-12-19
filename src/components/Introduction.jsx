import { Heading1, Heading3, Paragraph } from "./Text";
import ImageTimes from "../assets/images/card_vithoigianlavogia.webp";
import { Button } from "./Button";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";

const Introduction = () => {
    return (
        <div className="relative grid grid-cols-3  bg-white p-12 rounded-3xl shadow-md gap-x-20 gap-y-12">
            <div className="ml-6">
                <Heading1 className="text-primary">Booking</Heading1>
                <Heading1>Đặt khám nhanh</Heading1>
            </div>
            <Paragraph className="col-span-2 ml-6">
                <span className="font-bold text-black">Booking</span> cung cấp dịch vụ đặt lịch khám bệnh và chăm sóc sức khỏe trực tuyến tại các bệnh viện hàng đầu Việt Nam như Bệnh viện Đại học Y
                Dược TP.HCM, Bệnh viện Chợ Rẫy và Bệnh viện Nhi Đồng, giúp người dùng tự lựa chọn dịch vụ và bác sĩ theo nhu cầu của mình.
            </Paragraph>
            <Link to="/co-so-y-te">
                <div className="hover:bg-white hover:shadow-md rounded-lg p-6 transition-all">
                    <img className="w-full h-44" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IZHlwoYPX4Wj5pt2M2PI2U9vkZCMjqVf-w&s' alt="vì thời gian là vô giá" />
                    <Heading3>Tiện lợi và nhanh chóng</Heading3>
                    <Paragraph className="py-2 line-clamp-3">Chỉ cần sử dụng điện thoại hoặc máy tính kết nối Internet, người dùng có thể đặt lịch khám mà không cần đến trực tiếp bệnh viện.</Paragraph>
                    <Button className="px-8 rounded-full border-primary text-primary my-4 mx-auto hover:bg-primary transition-all hover:text-white group">
                    Đặt khán ngay <GrFormNextLink className="stroke-primary ml-2 size-6 group-hover:stroke-white" />
                    </Button>
                </div>
            </Link>
            <Link to="/co-so-y-te">
                <div className="hover:bg-white hover:shadow-md rounded-lg p-6 transition-all">
                    <img className="w-full h-44" src='https://e.khoahoc.tv/photos/image/2014/06/18/tiet-kiem-thoi-gian.jpg' alt="vì thời gian là vô giá" />
                    <Heading3>Giảm thời gian chờ đợi</Heading3>
                    <Paragraph className="py-2 line-clamp-3">Bệnh nhân có thể biết trước thời gian khám cụ thể, giúp giảm thiểu tình trạng xếp hàng và chờ đợi lâu.</Paragraph>
                    <Button className="px-8 rounded-full border-primary text-primary my-4 mx-auto hover:bg-primary transition-all hover:text-white group">
                    Đặt khán ngay <GrFormNextLink className="stroke-primary ml-2 size-6 group-hover:stroke-white" />
                    </Button>
                </div>
            </Link>
            <Link to="/co-so-y-te">
                <div className="hover:bg-white hover:shadow-md rounded-lg p-6 transition-all">
                    <img className="w-full h-44" src="https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2024/Nau-Cubgbfubc/2016/Minh-bach-thong-tin/2/11_AULJ.jpg" alt="vì thời gian là vô giá" />
                    <Heading3>Minh bạch và rõ ràng</Heading3>
                    <Paragraph className="py-2 line-clamp-3">Người dùng có thể xem rõ ràng giá khám, quy trình khám và thời gian dự kiến.</Paragraph>
                    <Button className="px-8 rounded-full border-primary text-primary my-4 mx-auto hover:bg-primary transition-all hover:text-white group">
                    Đặt khán ngay <GrFormNextLink className="stroke-primary ml-2 size-6 group-hover:stroke-white" />
                    </Button>
                </div>
            </Link>
        </div>
    );
};
export default Introduction;
