import logo from "../assets/images/header_logo.png";
import { Item, List } from "./List";
import { Heading3, Link } from "./Text";

const Footer = () => {
    return (
        <footer>
            <div className="grid grid-cols-5 gap-y-4 lg:px-32 py-8 bg-white">
                <div className="col-span-2 row-span-2">
                    <div className="h-20 object-cover flex items-center">
                        <img src={logo} alt="logo" className="h-56 z-0" />
                    </div>
                    <p className="text-gray-500">Booking - Ứng dụng đặt lịch khám bệnh trực tuyến</p>
                    <ul>
                        <li>
                            <span className="font-semibold">Địa chỉ:</span> Viet Nam
                        </li>
                        <li>
                            <span className="font-semibold">Hotline:</span> 1900 1234
                        </li>
                        <li>
                            <span className="font-semibold">Email:</span> lovanquan788@gmail.com
                        </li>
                        <li>
                            <span className="font-semibold">Website:</span> https://booking.com
                        </li>
                    </ul>
                </div>

                <div>
                    <Heading3>Cơ sở y tế</Heading3>
                    <ul className="text-black ">
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Bệnh viện công</Link>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Bệnh viện tư</Link>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Phòng khám</Link>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Phòng mạch</Link>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Xét nghiệm</Link>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Y tế tại nhà</Link>
                        </li>
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Tiêm chủng</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Heading3>Hướng dẫn</Heading3>
                    <ul className="text-black ">
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Đặt lịch khám</Link>
                        </li>

                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link>Câu hỏi thường gặp</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <Heading3>Liên hệ hợp tác</Heading3>
                    <ul className="text-black ">
                        <li className="py-1 text-gray-500 hover:text-primary">
                            <Link href="/lien-he-hop-tac">Tham gia Booking</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-primary text-white text-center py-2">
                <p>© 2024 BOKING. All rights reserved</p>
            </div>
        </footer>
    );
};
export default Footer;
