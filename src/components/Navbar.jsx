import headerLogo from "../assets/images/header_logo.png";
import { Button, GroupButton } from "./Button";
import { VscTriangleDown } from "react-icons/vsc";
import { FaFacebookF, FaYoutube, FaUser } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { useEffect, useState } from "react";
import { Item, List } from "./List";
// import { Link } from "./Text";
import { Link } from "react-router-dom";

const Navbar = () => {
    //state for navbar sticky
    const [scroll, setScroll] = useState(false);

    //handle navbar sticky
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > lastScrollY) {
                setScroll(true);
            } else if (scrollY < lastScrollY) {
                setScroll(false);
            }
            lastScrollY = scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <nav className={`${scroll ? "left-0 max-h-16" : "max-h-32 "} fixed top-0 z-40  bg-white flex shadow-md transition-all`}>
            <div className="w-1/5 lg:p-0 p-4 flex">
                <a href="/" className="h-full w-full">
                    <img className="h-full w-full object-cover" src={headerLogo} alt="Logo" />
                </a>
            </div>
            <div className="flex flex-col justify-between w-full">
                <div className={` ${scroll && "hidden"} h-full w-full xl:w-5/6  flex justify-between p-2`}>
                    <ul className="flex gap-4 my-auto">
                        <li>
                            <div className="flex gap-2 font-semibold items-center px-2 md:cursor-pointer border-l-2 border-solid border-text-primary group">
                                <FaFacebookF size={16} className="text-current group-hover:fill-primary transition-all" />
                                <a href="https://www.facebook.com/" className="text-current group-hover:text-primary transition-all">
                                    Facebook
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex gap-2 font-semibold items-center px-2 md:cursor-pointer  border-l-2 border-solid border-text-primary  group">
                                <AiFillInstagram size={16} className="text-current group-hover:fill-primary transition-all" />
                                <a href="https://www.instagram.com" className="text-current group-hover:text-primary transition-all">
                                    Instagram
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="flex gap-2 font-semibold items-center px-2 md:cursor-pointer border-l-2 border-solid border-text-primary group">
                                <FaYoutube size={16} className="text-current group-hover:fill-primary transition-all" />
                                <a href="https://youtube.com" className="text-current group-hover:text-primary transition-all">
                                    Youtube
                                </a>
                            </div>
                        </li>
                    </ul>
                    <GroupButton>
                        <a href="http://localhost:5173/#download-app">
                            <Button className="gap-2 rounded-full px-6 bg-orange-100 border-orange-100 hover:bg-orange-200 hover:border-orange-200 transition-all text-white font-semibold group">
                                <IoPhonePortraitOutline className="stroke-white" />
                                Tải ứng dụng
                            </Button>
                        </a>
                        <Link to="/login">
                            <Button className="gap-2 rounded-full px-6 border-primary text-primary font-semibold hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary hover:text-white transition-all group">
                                <FaUser className="fill-primary group-hover:fill-white transition-all" />
                                Tài khoản
                            </Button>
                        </Link>
                    </GroupButton>
                </div>
                <div className="2lg:flex hidden gap-8 h-full w-full border-solid border-t border-gray-300 px-4 nav_sticky">
                    <div className="my-auto">
                        <div className="flex items-center gap-2">
                            <IoIosCall className="fill-red-200" size={30} />
                            <div>
                                <div className="font-bold uppercase text-gray-600 text-sm">Hỗ trợ</div>
                                <div className="font-semibold text-primary whitespace-nowrap">1900 1234</div>
                            </div>
                        </div>
                    </div>
                    <ul className="flex  h-full w-full px-4 font-xl font-semibold">
                        <li>
                            <div className="px-4 relative flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="/co-so-y-te">Cơ sở y tế</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Item>
                                        <Link to="/benh-vien-cong">Bệnh viện công</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/benh-vien-tu">Bệnh viện tư</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/phong-kham">Phòng khám</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/phong-mach">Phòng mạch</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/xet-nghiem">Xét nghiệm</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/y-te-tai-nha">Y Tế tại nhà</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/tiem-chung">Tiêm chủng</Link>
                                    </Item>
                                </List>
                            </div>
                        </li>
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="#">Dịch vụ khám bệnh</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Link to="/dich-vu-y-te/dat-kham-tai-co-so">
                                        <Item>Đặt khám tại cơ sở</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/dat-kham-theo-bac-si">
                                        <Item>Đặt khám theo bác sĩ</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/tu-van-kham-benh-tu-xa">
                                        <Item>Tư vấn khám qua video</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/dat-lich-xet-nghiem">
                                        <Item>Đặt lịch xét nghiệm</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/goi-kham-suc-khoe">
                                        <Item>Gói khám sức khỏe</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/dat-lich-tiem-chung">
                                        <Item>Đặt lịch tiêm chủng</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/y-te-tai-nha">
                                        <Item>Đặt lịch khám tại nhà</Item>
                                    </Link>
                                    <Link to="/dich-vu-y-te/thanh-toan-vien-phi">
                                        <Item>Thanh toán viện phí</Item>
                                    </Link>
                                </List>
                            </div>
                        </li>
                        <li>
                            <div className="px-4 flex items-center border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all">
                                <Link to="/kham-suc-khoe-doanh-nghiep">Khám sức khỏe doanh nghiệp</Link>
                            </div>
                        </li>
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link t="/tin-tuc">Tin tức</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Item>
                                        <Link to="/tin-tuc/tin-dich-vu">Tin dịch vụ</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/tin-tuc/tin-y-te">Tin y tế</Link>
                                    </Item>
                                    <Item>
                                        <Link to="/tin-tuc/y-hoc-thuong-thuc">Y học thường thức</Link>
                                    </Item>
                                </List>
                            </div>
                        </li>
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="/huong-dan">Hướng dẫn</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Item>Cài đặt ứng dụng</Item>
                                    <Item>Đặt lịch khám</Item>
                                    <Item>Tư vấn khám qua video</Item>
                                    <Item>Quy trình hoàn phí</Item>
                                    <Item>Câu hỏi thường găp</Item>
                                    <Item>Quy trình đi khám</Item>
                                </List>
                            </div>
                        </li>
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="/contact">Liên hệ hợp tác</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Item>Tham gia Booking</Item>
                                    <Item>Quảng cáo</Item>
                                    <Item>Tuyển dụng</Item>
                                    <Item>Về Booking</Item>
                                </List>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
