import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Input } from "../components/Form";
import socket from "../configs/socket.io";
import { useSelector } from "react-redux";
const Container = () => {
    const [show, setShow] = useState(false);
    const user = useSelector((state) => state.auth.data);
    useEffect(() => {
        socket.emit("join_room", "user_" + user.id);
    }, [user]);
    return (
        <div className="bg-bg-main">
            <header>
                <Navbar />
            </header>
            <Outlet />
            <Footer />
            {/* {!show ? (
                <div onClick={() => setShow(true)} className="fixed bottom-0 right-0 rounded-t-lg py-1 px-4 bg-primary flex gap-2 w-1/5 text-white font-medium items-center md:cursor-pointer">
                    <CiMail className="size-5 fill-white" /> Tư vấn đặt khám trực tuyến
                </div>
            ) : (
                <div className="fixed bottom-4 right-0 rounded-t-lg  bg-primary  w-1/5 text-white font-medium items-center md:cursor-pointer z-40">
                    <header>DVKH Medpro</header>
                    <main>box chat</main>
                    <footer>
                        <Input placeholder="Nhập nội dung..." size="xl" />
                    </footer>
                </div>
            )} */}
            <div className="fixed bottom-20 right-5 rounded-full  bg-primary flex gap-2  text-white font-medium items-center ">
                <a href="tel:19001234" className="h-full w-full p-4">
                    <FaPhoneAlt className="size-8 fill-white" />
                </a>
            </div>
        </div>
    );
};
export default Container;
