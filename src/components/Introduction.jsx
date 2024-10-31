import { Heading1, Heading3, Paragraph } from "./Text";
import ImageTimes from "../assets/images/card_vithoigianlavogia.webp";
import { Button } from "./Button";
import { GrFormNextLink } from "react-icons/gr";

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
            <div className="hover:bg-white hover:shadow-md rounded-lg p-6 transition-all">
                <img src={ImageTimes} alt="vì thời gian là vô giá" />
                <Heading3>Vì thời gian là vô giá</Heading3>
                <Paragraph className="py-2">Bệnh nhân chủ động chọn thông tin đặt khám(ngày khám và giờ khám)</Paragraph>
                <Button className="px-8 rounded-full border-primary text-primary my-4 mx-auto hover:bg-primary transition-all hover:text-white group">
                    Xem thêm <GrFormNextLink className="stroke-primary ml-2 size-6 group-hover:stroke-white" />
                </Button>
            </div>
            <div className="hover:bg-white hover:shadow-md rounded-lg p-6 transition-all">
                <img src={ImageTimes} alt="vì thời gian là vô giá" />
                <Heading3>Vì thời gian là vô giá</Heading3>
                <Paragraph className="py-2">Bệnh nhân chủ động chọn thông tin đặt khám(ngày khám và giờ khám)</Paragraph>
                <Button className="px-8 rounded-full border-primary text-primary my-4 mx-auto hover:bg-primary transition-all hover:text-white group">
                    Xem thêm <GrFormNextLink className="stroke-primary ml-2 size-6 group-hover:stroke-white" />
                </Button>
            </div>
            <div className="hover:bg-white hover:shadow-md rounded-lg p-6 transition-all">
                <img src={ImageTimes} alt="vì thời gian là vô giá" />
                <Heading3>Vì thời gian là vô giá</Heading3>
                <Paragraph className="py-2">Bệnh nhân chủ động chọn thông tin đặt khám(ngày khám và giờ khám)</Paragraph>
                <Button className="px-8 rounded-full border-primary text-primary my-4 mx-auto hover:bg-primary transition-all hover:text-white group">
                    Xem thêm <GrFormNextLink className="stroke-primary ml-2 size-6 group-hover:stroke-white" />
                </Button>
            </div>
        </div>
    );
};
export default Introduction;
