import headerLogo from "../assets/images/header_logo.png";
import { Button, GroupButton } from "./Button";
import { VscTriangleDown } from "react-icons/vsc";
import { FaFacebookF, FaYoutube, FaUser, FaRegBell } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { useEffect, useState } from "react";
import { Item, List } from "./List";
// import { Link } from "./Text";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { RiFileList2Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { logout } from "../features/authSlide";
import socket from "../configs/socket.io";

const Navbar = () => {
    //state for navbar sticky
    const [scroll, setScroll] = useState(false);
    const user = useSelector((state) => state.auth.data);
    const username = user.name || "";
    const dispath = useDispatch();
    const { navigate } = useNavigate();
    const [isShow, setIsShow] = useState(false);
    const [notify, setNotify] = useState([]);
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

    useEffect(() => {
        const event = `recive-notify-accept-${user.id}`;

        const handleNotify = (data) => {
            setNotify((prev) => [...prev, data]);
        };

        // Đăng ký sự kiện
        socket.on(event, handleNotify);

        return () => {
            socket.off(event, handleNotify);
        };
    }, [socket, user.id]);

    const hanldeLogout = () => {
        dispath(logout());
        navigate("/");
    };
    console.log(notify);

    return (
        <nav className={`${scroll ? "left-0 max-h-16" : "max-h-32 "} fixed top-0 z-40 w-full bg-white flex shadow-md transition-all`}>
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
                        <div className="flex relative group">
                            <button className="p-2 mr-4 relative">
                                <FaRegBell size={20} className="text-primary" />
                                {notify.length > 0 && (
                                    <span className="absolute top-0 -right-1 bg-red-300 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-semibold">{notify.length}</span>
                                )}
                            </button>
                            <div className="p-4 right-0 absolute top-full bg-white shadow-md rounded-lg z-40 group-hover:flex group-hover:flex-col gap-2 items-center hidden animate-fadeIn min-w-64">
                                {notify.length > 0 ? (
                                    notify.map((item, index) => (
                                        <div key={index} className="flex min-w-96  pb-2 border-b border-gray-400">
                                            <h3 className="font-medium w-full line-clamp-2">
                                                {item.senderName} <span className="lowercase font-normal">thông báo {item.message}</span>
                                            </h3>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex text-gray-500 font-medium text-md justify-center h-full w-full min-h-32 items-center">Không có thông báo mới</div>
                                )}
                            </div>
                        </div>
                        {!username ? (
                            <Link to="/login">
                                <Button className="gap-2 rounded-full px-6 border-primary text-primary font-semibold hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary hover:text-white transition-all group">
                                    <FaUser className="fill-primary group-hover:fill-white transition-all" />
                                    Tài khoản
                                </Button>
                            </Link>
                        ) : (
                            <div className="relative ">
                                <Button
                                    onClick={() => setIsShow(!isShow)}
                                    className="gap-2 rounded-full px-6 border-primary text-primary font-semibold hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary hover:text-white transition-all group">
                                    <FaUser className="fill-primary group-hover:fill-white transition-all" />
                                    {username}
                                </Button>
                                <div className={`absolute min-w-64 top-full right-0 bg-white p-4 rounded-lg z-40 shadow-lg transition-all animate-fadeIn ${isShow ? "block" : "hidden"}`}>
                                    <div className="flex items-center gap-4">
                                        <img src="https://www.svgrepo.com/show/452030/avatar-default.svg" alt="avatar" className="size-6 rounded-full" />
                                        <div>
                                            <span className="text-gray-600 text-base">Hi!</span>
                                            <h1 className="font-medium text-primary text-lg">{username}</h1>
                                        </div>
                                    </div>
                                    <ul className="mt-2">
                                        <li>
                                            <Link
                                                to="/lich-su-kham-benh?key=recoreds"
                                                className="py-2 px-4 hover:bg-gray-200 transition-all text-base font-medium rounded-lg flex items-center gap-2 group hover:text-primary">
                                                <BsFileEarmarkTextFill className="group-hover:animate-bounce group-hover:fill-primary  transition-all" />
                                                Hồ sơ bệnh nhân
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/lich-su-kham-benh?key=bills"
                                                className="py-2 px-4 hover:bg-gray-200 transition-all text-base font-medium rounded-lg flex items-center gap-2 group hover:text-primary">
                                                <RiFileList2Line className="group-hover:animate-bounce group-hover:fill-primary  transition-all" />
                                                Phiếu khám bệnh
                                            </Link>
                                        </li>
                                        <li className="border-y border-y-gray-500">
                                            <button
                                                onClick={hanldeLogout}
                                                className=" py-2 px-4 transition-all text-base font-medium text-red-300 rounded-lg flex items-center gap-2 group hover:text-red-300">
                                                <CiLogout className="group-hover:animate-bounce group-hover:fill-red-300  transition-all fill-red-600 size-5" />
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </GroupButton>
                </div>
                <div className="2lg:flex hidden gap-8 h-full w-full border-solid border-t border-gray-300 px-4 nav_sticky justify-center">
                    <div className="my-auto">
                        <div className="flex items-center gap-2">
                            <IoIosCall className="fill-red-200" size={30} />
                            <div>
                                <div className="font-bold uppercase text-gray-600 text-sm">Hỗ trợ</div>
                                <div className="font-semibold text-primary whitespace-nowrap">1900 1234</div>
                            </div>
                        </div>
                    </div>
                    <ul className="flex  h-full w-fit px-4 font-xl font-semibold">
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
                        {/* <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="#">Dịch vụ khám bệnh</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
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
                        </li> */}
                        {/* <li>
                            <div className="px-4 flex items-center border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all">
                                <Link to="/kham-suc-khoe-doanh-nghiep">Khám sức khỏe doanh nghiệp</Link>
                            </div>
                        </li> */}
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="/tin-tuc/tin-dich-vu">Tin tức</Link>
                                {/* <VscTriangleDown className="group-hover:fill-primary transition-all" />
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
                                </List> */}
                            </div>
                        </li>
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="/huong-dan/dat-lich-kham">Hướng dẫn</Link>
                                <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Link to="/huong-dan/dat-lich-kham">
                                        <Item>Đặt lịch khám</Item>
                                    </Link>
                                    <Link to="/huong-dan/hoi-dap">
                                        <Item>Câu hỏi thường gặp</Item>
                                    </Link>
                                </List>
                            </div>
                        </li>
                        <li>
                            <div className="relative px-4 flex items-center gap-1 border-b-2 border-transparent hover:border-primary hover:border-b-2 border-solid h-full hover:text-primary transition-all group">
                                <Link to="/lien-he-hop-tac">Liên hệ hợp tác</Link>
                                {/* <VscTriangleDown className="group-hover:fill-primary transition-all" />
                                <List className="hidden group-hover:block before:content-[''] before:absolute before:h-2 before:w-full before:-top-2 before:left-0 animate-fadeIn">
                                    <Link to="/lien-he-hop-tac">
                                        <Item>Tham gia Booking</Item>
                                    </Link>
                                    <Link to="/gioi-thieu">
                                        <Item>Về Booking</Item>
                                    </Link>
                                </List> */}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
