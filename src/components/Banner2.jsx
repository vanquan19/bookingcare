import { SearchInput } from "./Form";
import { Heading1, Heading3, Heading5, Link } from "./Text";
import imgBanner from "../assets/images/bg-2.webp";
import ImgDoctor from "../assets/images/bg-doctor.webp";
import { Button } from "./Button";
const Banner = () => {
    return (
        <div className="relative flex w-full bg-no-repeat h-[608px] items-center justify-center" style={{ backgroundImage: `url(${imgBanner})`, backgroundPosition: "50%" }}>
            <div className="w-full max-w-[1180px] flex justify-between gap-56">
                <div className=" text-left px-8 flex flex-col gap-5">
                    <Heading1 className="text-primary">Đặt khám nhanh - Lấy số thứ tự trức tuyến</Heading1>
                    <Heading5 className="">
                        Bệnh nhân chủ động chọn thông tin đặt khám nhanh (ngày khám, giờ khám và cơ sở y tế). Bệnh nhân sẽ nhận lấy số thứ tự trực tuyến ngay trên phần mềm
                    </Heading5>
                    <Link href="#">
                        <Button size="xl" className="px-12 bg-gradient-to-r from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all border-none text-white rounded-full">
                            Đặt lịch ngay
                        </Button>
                    </Link>
                </div>
                <img src={ImgDoctor} alt="doctor" className="max-w-96" />
                <div className="absolute bottom-0 w-full h-36 bg-white-gradient-to-t left-0"></div>
            </div>
        </div>
    );
};
export default Banner;
