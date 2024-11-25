import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../assets/images/header_logo.png";
import { LuArrowLeftFromLine, LuCalendar, LuLibrary, LuMessageCircle, LuPackage, LuPieChart, LuUser, LuUserPlus, LuUsers, LuUserX2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlide";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import socket from "../configs/socket.io";
const DoctorContainer = () => {
    const [newBooking, setNewBooking] = useState(0);
    const clinicName = useSelector((state) => state.auth.data.clinicName);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        Navigate("/doctor/login");
    };
    const clinicId = useSelector((state) => state.auth.data.clinicId);
    const user = useSelector((state) => state.auth.data);
    console.log(user);

    useEffect(() => {
        socket.on(`new-booking-${clinicId}`, (data) => {
            setNewBooking(data.unRead);
        });
        socket.on(`reset-notifications-${clinicId}`, (data) => {
            setNewBooking(data.unRead);
        });
    }, [socket]);

    return (
        <>
            {/* notyfication */}

            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            {user.position === "manager" ? (
                <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <a href="/doctor" className="flex items-center text-center ps-2.5 mb-5">
                            {/* <img src={logo} className="h-12 me-3 sm:h-7" alt="Flowbite Logo" /> */}
                            <span className="font-bold text-primary text-lg">{clinicName}</span>
                        </a>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/doctor" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuPieChart className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Thống kê</span>
                                </Link>
                            </li>
                            {/* <li>
                            <Link to="/doctor/schedule" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LuCalendar className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Quản lý lịch khám</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/doctor/chat" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LuMessageCircle className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Tin Nhắn</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    3
                                </span>
                            </Link>
                        </li> */}
                            <li>
                                <Link to="/doctor/patient" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Quản lý bệnh nhân</span>
                                    <span className="text-white bg-red-400 px-2 rounded-full animate-bounce">{newBooking ? newBooking : ""}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctor/specialty" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuLibrary className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Quản lý chuyên khoa</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctor/package" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuPackage className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Quản lý gói khám</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctor/staff" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuUser className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Quản lý nhân viên</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctor/infomation-clinic" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <HomeIcon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Thông tin phòng khám</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => handleLogout()} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuArrowLeftFromLine className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Đăng xuất</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
            ) : (
                <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <a href="/doctor" className="flex items-center text-center ps-2.5 mb-5">
                            {/* <img src={logo} className="h-12 me-3 sm:h-7" alt="Flowbite Logo" /> */}
                            <span className="font-bold text-primary text-lg">{clinicName}</span>
                        </a>
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/doctor" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Quản lý bệnh nhân</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/doctor/schedule" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <LuCalendar className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="flex-1 ms-3 whitespace-nowrap">Lịch khám</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            )}

            {/* content */}
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DoctorContainer;
