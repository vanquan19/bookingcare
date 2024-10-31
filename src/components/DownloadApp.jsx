import { Button } from "./Button";
import { Heading1, Heading2, Heading3, Heading5, Link, Paragraph } from "./Text";
import imgPhone from "../assets/images/bg-phone.webp";
import imgEllipse from "../assets/images/bg-ellipse.webp";
import imgAppStore from "../assets/images/icon_ios.svg";
import imgGooglePlay from "../assets/images/icon_google_play.svg";
import IconDoctor from "../assets/images/icon_doctor.svg";
import IconMessage from "../assets/images/icon_message.svg";
import IconPlus from "../assets/images/icon_plus.webp";
import IconWallet from "../assets/images/icon_wallet.svg";
import IconBag from "../assets/images/icon_bag.svg";
import IconHospital from "../assets/images/icon_hospital.svg";

const DownLoadApp = () => {
    return (
        <div id="download-app" className="relative flex flex-col gap-8 text-center w-full ">
            <Heading1 className="text-primary font-extrabold">Tải ứng dụng đặt khám ngay</Heading1>
            <div className="mx-auto flex gap-6">
                <Link href="https://apps.apple.com/us/app/medpro-%C4%91%E1%BA%B7t-l%E1%BB%8Bch-kh%C3%A1m-b%E1%BB%87nh/id1481561748">
                    <img src={imgAppStore} alt="app store" />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=vn.com.medpro&pli=1">
                    <img src={imgGooglePlay} alt="google play" />
                </Link>
            </div>
            <div className="w-full h-[585px] relative flex">
                <section className="flex justify-between px-40 my-auto w-full h-full">
                    <div className="text-end flex flex-col gap-20 max-w-96 justify-around">
                        <div className="flex gap-4">
                            <div className="">
                                <Heading3 className="pt-0 text-black font-extrabold">Lấy số thứ tự khám nhanh trực tuyến</Heading3>
                                <Paragraph className="text-gray-600 font-semibold">Đăng ký khám/tái khám nhanh theo ngày</Paragraph>
                                <Paragraph className="text-gray-600 font-semibold">Đăng ký khám theo bác sĩ chuyên khoa</Paragraph>
                                <Paragraph className="text-gray-600 font-semibold">Tái khám theo lịch hẹn</Paragraph>
                            </div>
                            <img src={IconDoctor} alt="doctor" className="size-12 my-2" />
                        </div>
                        <div className="mr-12 flex gap-4">
                            <div>
                                <Heading3 className="pt-0 text-black font-extrabold">Tư vấn sức khỏe từ xa</Heading3>
                                <Paragraph className="text-gray-600 font-semibold">Tư vấn sức khỏe từ xa, cuộc gọi video với các bác sĩ chuyên môn</Paragraph>
                            </div>
                            <img src={IconMessage} alt="message" className="size-12 my-2" />
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <Heading3 className="pt-0 text-black font-extrabold">Tra cứu kết quả cận lâm sàng</Heading3>
                                <Paragraph className="text-gray-600 font-semibold">Tra cứu kết quả cận lâm sàng trực tuyến dễ dàng và tiện lợi</Paragraph>
                                <Paragraph className="text-gray-600 font-semibold">Đăng ký khám theo bác sĩ chuyên khoa</Paragraph>
                                <Paragraph className="text-gray-600 font-semibold">Tái khám theo lịch hẹn</Paragraph>
                            </div>
                            <img src={IconPlus} alt="plus" className="size-12 my-2" />
                        </div>
                    </div>
                    <div className="text-left flex flex-col gap-20 max-w-96 justify-around">
                        <div className="flex gap-4 ">
                            <img src={IconWallet} alt="wallet" className="size-12 my-2" />
                            <div className="">
                                <Heading3 className="pt-0 text-black font-extrabold">Thanh toán viện phí</Heading3>
                                <Paragraph className="text-gray-600 font-semibold">Đa dạng hệ thống thanh toán trực tuyến</Paragraph>
                                <Paragraph className="text-gray-600 font-semibold">Hỗ trợ các ví điện tử thịnh hành hiện nay</Paragraph>
                            </div>
                        </div>
                        <div className="flex gap-4 ml-12">
                            <img src={IconBag} alt="bag" className="size-12 my-2" />
                            <div>
                                <Heading3 className="pt-0 text-black font-extrabold">Chăm sóc y tế tại nhà</Heading3>
                                <Paragraph className="text-gray-600 font-semibold">Dịch vụ Y tế tại nhà (điều dưỡng, xét nghiệm) chuyên nghiệp, đáp ứng các nhu cầu Y tế tại nhà phổ thông</Paragraph>
                            </div>
                        </div>
                        <div className="flex gap-4 ">
                            <img src={IconHospital} alt="hospital" className="size-12 my-2" />
                            <div>
                                <Heading3 className="pt-0 text-black font-extrabold">Mang lưới cơ sở hợp tác</Heading3>
                                <Paragraph className="text-gray-600 font-semibold">Mạng lưới kết nối với các bệnh viện, phòng khám, phòng mạch rộng khắp phủ sóng toàn quốc</Paragraph>
                            </div>
                        </div>
                    </div>
                </section>
                <img src={imgPhone} alt="doctor" className="absolute max-w-72 z-30 top-0 left-1/2 -translate-x-1/2" />
                <img src={imgEllipse} alt="ellipse" className="absolute max-w-96 z-20 top-1/2 -translate-y-1/2 left-1/2  -translate-x-1/2" />
            </div>
        </div>
    );
};
export default DownLoadApp;
