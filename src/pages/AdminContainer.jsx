import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiClinic } from "react-icons/bi";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlide";
import logo from "../assets/images/header_logo.png";
import socket from "../configs/socket.io";

const initialNavigation = [
    // { name: "Phân tích", href: "/admin", current: true },
    { name: "Quản lý phòng khám", href: "/admin/clinic-management", current: false },
    { name: "Liên hệ hợp tác", href: "/admin/contract", current: false },
    { name: "Hướng dẫn & Hỏi đáp", href: "/admin/instruction", current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const AdminNavbar = () => {
    const [navigation, setNavigation] = useState(initialNavigation);
    const location = useLocation();
    const dispatch = useDispatch();

    // Update the 'current' field based on the current path
    useEffect(() => {
        const updatedNavigation = navigation.map((item) => ({
            ...item,
            current: item.href === location.pathname.split("/").slice(0, 3).join("/"),
        }));
        setNavigation(updatedNavigation);
    }, [location.pathname]); // Runs every time the path changes

    return (
        <Disclosure as="nav" className="dark:bg-gray-800 bg-white shadow-sm fixed w-full z-10">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 dark:hover:bg-gray-700 hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                        <div className="flex flex-shrink-0 items-center h-8 overflow-hidden">
                            <img alt="Your Company" src={logo} className="h-44" />
                        </div>
                        <div className="hidden lg:ml-6 lg:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? "page" : undefined}
                                        className={classNames(
                                            item.current
                                                ? "dark:bg-gray-900 bg-gray-200 dark:text-white text-primary"
                                                : "dark:text-gray-300 text-gray-900 dark:hover:bg-gray-700 hover:bg-gray-200 hover:text-primary",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                        <button
                            type="button"
                            className="relative rounded-full dark:bg-gray-800 bg-gray-200 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                <MenuItem>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Trang cá nhân
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                        Cài đặt
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/admin/login" onClick={() => dispatch(logout())} className="block px-4 py-2 text-sm text-red-300 data-[focus]:bg-gray-100">
                                        Đăng xuất
                                    </Link>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="lg:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current
                                    ? "dark:bg-gray-900 bg-gray-200 dark:text-white text-primary"
                                    : "dark:text-gray-300 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200 dark:hover:text-white hover:text-primary",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}>
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
};

export const SidebarAdmin = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [list, setList] = useState(props.list || []);
    const location = useLocation();
    useEffect(() => {
        const updatedList = list.map((item) => ({
            ...item,
            current: item.link === location.pathname,
        }));
        setList(updatedList);
    }, [location.pathname]);

    // Check if the screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);
    return (
        <>
            {isMobile ? (
                <div className="fixed flex items-center justify-center bottom-0 left-0 w-full p-2 bg-white drop-shadow">
                    <ul className="flex gap-6">
                        {list.map((item) => (
                            <Link to={item.link} key={item.link}>
                                <li className="bg-gray-200 p-2 rounded-full flex items-center hover:bg-gray-300 group">
                                    <BiClinic size={32} className={`group-hover:fill-primary transition-all ${item.current ? "fill-primary" : "fill-black"}`} />
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            ) : (
                // Sidebar for desktop
                <div className={`left-0 top-0 h-screen bg-white lg:block hidden w-content pt-16 z-0 transition-all duration-500 overflow-hidden ${isOpen ? "w-64" : "w-16"}`}>
                    <ul className="p-2 font-semibold text-md">
                        <li className="text-gray-700 py-2 px-3 cursor-pointer w-full hover:bg-gray-200 hover:text-primary transition-all rounded flex gap-2 group" onClick={() => setIsOpen(!isOpen)}>
                            {!isOpen ? <AiOutlineMenuUnfold size={24} className="group-hover:fill-primary" /> : <AiOutlineMenuFold size={24} className="group-hover:fill-primary" />}
                            {/* <span className="lg:block hidden">Menu</span> */}
                        </li>
                        {list.map((item) => (
                            <li key={item.link} className={`text-gray-700 py-2 px-3 cursor-pointer w-full hover:bg-gray-200 transition-all rounded group ${item.current ? "bg-gray-200" : ""}`}>
                                <Link to={item.link} className="flex gap-2 items-center">
                                    <BiClinic size={24} className={`group-hover:fill-primary min-w-6 transition-all ${item.current ? "fill-primary" : ""}`} />
                                    {isOpen && <span className={`group-hover:text-primary text-nowrap transition-all ${item.current ? "text-primary" : ""}`}>{item.title}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

const AdminContainer = () => {
    const admin = useSelector((state) => state.auth.data);
    useEffect(() => {
        socket.emit("join_room", "admin");
    }, [admin]);
    return (
        <div className="bg-bg-main">
            <AdminNavbar />
            <div className="flex flex-col h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminContainer;
