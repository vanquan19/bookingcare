import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { getData, setData } from "../utils/fetchData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaBuilding, FaCalendar, FaDollarSign, FaIdCard, FaMailBulk, FaOpencart, FaTrashAlt, FaUserCircle, FaUserGraduate, FaUsers } from "react-icons/fa";
import { CiEdit, CiMail, CiTrash, CiViewBoard } from "react-icons/ci";
import { FaCakeCandles, FaMapPin, FaPhone } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { apiGetDistrict, apiGetProvince, apiGetWard } from "../utils/location";
import socket from "../configs/socket.io";

const HistoryBooking = () => {
    const [key, setKey] = useState("records");
    const [status, setStatus] = useState(1);
    const [listPatientProfile, setListPatientProfile] = useState([]);
    const [listBills, setListBills] = useState([]);
    const [listAmount, setListAmount] = useState([]);
    const [listNotify, setListNotify] = useState([]);
    const [load, setLoad] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [targetProfile, setTargetProfile] = useState({});
    const [openAlertDelete, setOpenAlertDelete] = useState(false);
    const [openModalCancelBills, setOpenModalCancelBills] = useState(false);
    const location = useLocation();
    const selector = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const search = new URLSearchParams(location.search);

        setKey(search.get("key"));
        if (search.get("key") === null) {
            setKey("records");
        }
        if (search.get("key") === "records") {
            // fetch list patient profile
            const fetchData = async () => {
                try {
                    const response = await getData("/get-patient-profile", selector.accessToken);
                    if (!response.isSuccess) {
                        toast.error(response.message);
                        return;
                    }
                    console.log(response.data);

                    setListPatientProfile(response.data);
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            };
            fetchData();
            return;
        }
        if (search.get("key") === "bills") {
            // fetch list bills
            const fetchData = async () => {
                try {
                    const response = await getData(`/get-history-booking?status=${status}`, selector.accessToken);
                    if (!response.isSuccess) {
                        toast.error(response.message);
                        return;
                    }
                    console.log("check", response.data);
                    setListBills(response.data);
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            };
            fetchData();
            return;
        }
        if (search.get("key") === "notify") {
            const fetchData = async () => {
                try {
                    const response = await getData(`/get-notify?reciverId=${selector.data.id}&limit=20`);
                    if (!response.isSuccess) {
                        toast.error(response.message);
                        return;
                    }
                    console.log(response.data);
                    setListNotify(response.data);
                    await setData("/update-notify", "POST", { reciverId: selector.data.id }, null, selector.accessToken);
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            };
            fetchData();
            return;
        }
    }, [location.search, load, status]);

    useEffect(() => {
        if (key === "bills") {
            const fetchData = async () => {
                try {
                    const response = await getData("/get-amount-history-booking", selector.accessToken);
                    if (!response.isSuccess) {
                        toast.error(response.message);
                        return;
                    }
                    console.log(response.data);
                    setListAmount(response.data);
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            };
            fetchData();
            return;
        }
    }, [location.search, key, load]);

    useEffect(() => {
        socket.on("confirm_booking", (data) => {
            setLoad(!load);
            console.log(data);
        });
        socket.on("refuse_booking", (data) => {
            setLoad((prev) => !prev);
            console.log(data);
        });
        return () => {
            socket.off("confirm_booking");
            socket.off("refuse_booking");
        };
    }, [socket]);

    const handleOpenModal = (profile) => {
        setTargetProfile(profile);
        setOpenModal(true);
    };

    const handleOpenAlertDelete = (profile) => {
        setOpenAlertDelete(true);
        setTargetProfile(profile);
    };

    const handleOpenModalCalcel = (profile) => {
        setTargetProfile(profile);
        setOpenModalCancelBills(true);
    };

    const isCancelable = (time, date, month, year) => {
        const currentDate = new Date();
        const bookingDate = new Date(year, month - 1, date, time.split(":")[0]);
        
        if (bookingDate.getTime() - currentDate.getTime() > 60 * 60 * 1000) {
            return true;
        }
        return false;
    };

    return (
        <>
            <div className="mt-32 lg:px-32 py-8">
                <div className="flex items-center gap-2">
                    <Link to="/" className="font-bold text-lg">
                        Trang chủ
                    </Link>
                    <ChevronRightIcon className="h-4 w-4" />
                    <span className="font-bold text-primary">Phiếu khám bệnh</span>
                </div>
                <div className="flex mt-8">
                    <aside className="px-8 border-r-2 border-primary ">
                        <ul className="flex flex-col gap-2 w-full ">
                            <li className={`text-lg font-medium rounded-lg min-w-96 hover:cursor-pointer border-transparent border-2 transition-all duration-300 hover:border-l-primary`}>
                                <Link to="/them-ho-so-benh-nhan" className="px-4 py-2 block">
                                    Thêm hồ sơ
                                </Link>
                            </li>
                            <li
                                className={`text-lg font-medium rounded-lg min-w-96 hover:cursor-pointer border-transparent border-2 transition-all duration-300 hover:border-l-primary ${
                                    key === "records" ? "bg-gradient-to-r from-primary to-primary-2 text-white" : ""
                                }`}>
                                <Link to="/lich-su-kham-benh?key=records" className="px-4 py-2 block">
                                    Hồ sơ bệnh nhân
                                </Link>
                            </li>
                            <li
                                className={`text-lg font-medium rounded-lg min-w-96 hover:cursor-pointer border-transparent border-2 transition-all duration-300 hover:border-l-primary ${
                                    key === "bills" ? "bg-gradient-to-r from-primary to-primary-2 text-white" : ""
                                }`}>
                                <Link to="/lich-su-kham-benh?key=bills" className="px-4 py-2 block">
                                    Phiếu khám bệnh
                                </Link>
                            </li>
                            <li
                                className={`text-lg font-medium rounded-lg min-w-96 hover:cursor-pointer border-transparent border-2 transition-all duration-300 hover:border-l-primary ${
                                    key === "notify" ? "bg-gradient-to-r from-primary to-primary-2 text-white" : ""
                                }`}>
                                <Link to="/lich-su-kham-benh?key=notify" className="px-4 py-2 block">
                                    Thông báo
                                </Link>
                            </li>
                        </ul>
                    </aside>
                    <div className="px-8 w-full">
                        {key === "records" && (
                            <div className="w-full">
                                <h1 className="font-semibold text-xl text-gray-800 mb-4">Danh sách hồ sơ bệnh nhân</h1>
                                <ul className="flex flex-col gap-4  w-full min-h-72 ">
                                    {listPatientProfile.length === 0 ? (
                                        <div className="text-lg text-gray-500 text-center h-full w-full flex items-center justify-center">Không có hồ sơ bệnh nhân nào</div>
                                    ) : (
                                        <>
                                            {listPatientProfile.map((item, index) => (
                                                <li key={index} className="text-lg font-semibold w-full overflow-hidden pt-4 bg-white rounded-lg">
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUserCircle className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Họ và tên:</span>
                                                        <span className="font-semibold text-base uppercase text-primary">{item.fullname}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaCakeCandles className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Ngày sinh:</span>
                                                        <span className="text-base text-gray-900 font-medium">{new Intl.DateTimeFormat("vi-VN").format(new Date(item.birthday || "1999/1/1"))}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaPhone className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Số điện thoại:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUserGraduate className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Giới tính:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.sex ? "Nam" : "Nữ"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUserCircle className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Địa chỉ thường trú:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.commune + ", " + item.district + ", " + item.province}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaMapPin className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Nơi ở hiện tại:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.curentAddress}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUsers className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Dân tộc:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.nation}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 p-2 bg-[#f5f5f5] justify-end ">
                                                        <button onClick={() => handleOpenAlertDelete(item)} className="flex gap-1 items-center text-base text-red-300 py-1 px-3 rounded-lg">
                                                            <CiTrash className="w-5 h-5 fill-red-300" />
                                                            Xóa hồ sơ
                                                        </button>
                                                        <button
                                                            onClick={() => navigate("/sua-ho-so-benh-nhan?id=" + item.id)}
                                                            className="flex gap-1 items-center text-base text-primary py-1 px-3 rounded-lg">
                                                            <CiEdit className="w-5 h-5 fill-primary" />
                                                            Sửa hồ sơ
                                                        </button>
                                                        <button onClick={() => handleOpenModal(item)} className="flex gap-1 items-center text-base text-black py-1 px-3 rounded-lg">
                                                            <CiViewBoard className="w-5 h-5 fill-black" />
                                                            Chi tiết
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                                {openModal && <ModalViewDetail open={openModal} setOpen={setOpenModal} profile={targetProfile} />}
                                {openAlertDelete && <ModalAlertDelete open={openAlertDelete} setOpen={setOpenAlertDelete} profile={targetProfile} setLoad={setLoad} />}
                            </div>
                        )}
                        {key === "bills" && (
                            <div className="w-full ">
                                <h1 className="font-semibold text-xl text-gray-800 mb-4">Danh sách phiếu khám bệnh</h1>
                                <div className="grid grid-cols-4 gap-4 ">
                                    {listAmount.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setStatus(item.status)}
                                            className={`py-2 px-3 font-medium text-gray-700 rounded-full whitespace-nowrap min-w-fit ${
                                                status === item.status ? "bg-gradient-to-r from-primary-2 to-primary text-white" : "bg-[#f5f5f5]"
                                            } hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary transition-all duration-200 hover:text-white group`}>
                                            {item.name}
                                            <span className={`mx-2 ${status === item.status ? "text-white" : "text-primary "} group-hover:text-white transition-all duration-200`}>
                                                ({item.amount})
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                <ul className="flex flex-col gap-4 min-h-72 h-full w-full mt-4">
                                    {listBills.length === 0 ? (
                                        <div className="text-lg text-gray-500 text-center h-full w-full flex items-center justify-center">Không có phiêu khám bệnh nào</div>
                                    ) : (
                                        <>
                                            {listBills.map((item, index) => (
                                                <li key={index} className="text-lg font-semibold w-full overflow-hidden pt-4 bg-white rounded-lg">
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUserCircle className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Họ và tên:</span>
                                                        <span className="font-semibold text-base uppercase text-primary">{item.fullname}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaCakeCandles className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Ngày sinh:</span>
                                                        <span className="text-base text-gray-900 font-medium">{new Intl.DateTimeFormat("vi-VN").format(new Date(item.birthday || "1999/1/1"))}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaPhone className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Số điện thoại:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.phone}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUserGraduate className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Giới tính:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.sex ? "Nam" : "Nữ"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaUserCircle className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Địa chỉ thường trú:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.commune + ", " + item.district + ", " + item.province}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaMapPin className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Nơi ở hiện tại:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.curentAddress}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaCalendar className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Ngày khám:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.time + " " + item.date + "/" + item.month + "/" + item.year}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaOpencart className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Hình thức đặt khám:</span>
                                                        <span className="text-base text-gray-900 font-medium">
                                                            {item.type + " - " + ((item.specialtyId && item.specialty.name) || (item.packageId && item.package.name))}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mb-1 px-4">
                                                        <FaOpencart className="size-4 fill-gray-500" />
                                                        <span className="font-normal text-base">Bác sĩ phụ trách:</span>
                                                        <span className="text-base text-gray-900 font-medium">{item.doctorId && item.doctor.firstname + " " + item.doctor.lastname}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 p-2 bg-[#f5f5f5] justify-end ">
                                                        {isCancelable(item.time, item.date, item.month, item.year) && status <= 2 && status >=1  && (
                                                            <button onClick={() => handleOpenModalCalcel(item)} className="flex gap-1 items-center text-base text-red-300 py-1 px-3 rounded-lg">
                                                                <CiTrash className="w-5 h-5 fill-red-300" />
                                                                Hủy phiếu khám
                                                            </button>
                                                        )}
                                                        <button onClick={() => handleOpenModal(item)} className="flex gap-1 items-center text-base text-black py-1 px-3 rounded-lg">
                                                            <CiViewBoard className="w-5 h-5 fill-black" />
                                                            Chi tiết
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                                {openModal && <ModalViewDetail open={openModal} setOpen={setOpenModal} profile={targetProfile} keyHistory={key} />}
                                {openModalCancelBills && <ModalCancelBills open={openModalCancelBills} setOpen={setOpenModalCancelBills} profile={targetProfile} setLoad={setLoad} />}
                                {openAlertDelete && <ModalAlertDelete open={openAlertDelete} setOpen={setOpenAlertDelete} profile={targetProfile} setLoad={setLoad} />}
                            </div>
                        )}
                        {key === "notify" && (
                            <div className="w-full ">
                                <h1 className="font-semibold text-xl text-gray-800 mb-4">Thông báo</h1>

                                <ul className="flex flex-col gap-4 min-h-72 h-full w-full mt-4">
                                    {listNotify.length === 0 ? (
                                        <div className="text-lg text-gray-500 text-center h-full w-full flex items-center justify-center">Không có thông báo nào</div>
                                    ) : (
                                        <>
                                            {listNotify.map((item, index) => (
                                                <li key={index} className="text-lg font-semibold w-full overflow-hidden py-2 bg-white rounded-lg flex items-center gap-2 px-4">
                                                    <div className="relative">
                                                        <CiMail className="size-10 fill-gray-500" />
                                                        {item.isRead === 0 && <div className="absolute top-0 -right-1 w-3 h-3 bg-red-300 rounded-full"></div>}
                                                    </div>

                                                    <div className="flex flex-col mb-1 px-4">
                                                        <span>{item.message}</span>
                                                        <span className="font-normal text-base text-gray-700 flex items-center gap-2">
                                                            <div className=" w-2 h-2 bg-green-400 rounded-full"></div>
                                                            {new Intl.DateTimeFormat("vi-VN").format(new Date(item.createdAt))} {new Date(item.createdAt).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const ModalViewDetail = ({ open, setOpen, profile, keyHistory }) => {
    return (
        <div className="absolute top-1/4 animate-fadeIn bg-white shadow-lg p-4 rounded-lg transition-all duration-300">
            <h1 className="mb-2 font-medium text-lg text-primary uppercase">Chi tiết hồ sơ</h1>
            <button onClick={() => setOpen(false)} className="absolute top-2 p-2 right-2">
                <IoClose className="w-6 h-6 fill-gray-500" />
            </button>
            <div className="">
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaUserCircle className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Họ và tên:</span>
                    <span className="font-semibold text-base uppercase text-primary">{profile.fullname}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaCakeCandles className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Ngày sinh:</span>
                    <span className="text-base text-gray-900 font-medium">{new Intl.DateTimeFormat("vi-VN").format(new Date(profile.birthday || "1999/1/1"))}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaPhone className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Số điện thoại:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaUserGraduate className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Giới tính:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.sex ? "Nam" : "Nữ"}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaIdCard className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">CCCD:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.identify}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaMailBulk className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Email:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaBuilding className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Nghề nghiệp:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.career}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaUsers className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Quốc tịch:</span>
                    <span className="text-base text-gray-900 font-medium">Việt Nam</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaUserCircle className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Địa chỉ thường trú:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.commune + ", " + profile.district + ", " + profile.province}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaMapPin className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Nơi ở hiện tại:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.curentAddress}</span>
                </div>
                <div className="flex items-center gap-2 mb-2 px-4">
                    <FaUsers className="size-4 fill-gray-500" />
                    <span className="font-normal text-base">Dân tộc:</span>
                    <span className="text-base text-gray-900 font-medium">{profile.nation}</span>
                </div>
                {keyHistory === "bills" && (
                    <>
                        <div className="flex items-center gap-2 mb-2 px-4">
                            <FaCalendar className="size-4 fill-gray-500" />
                            <span className="font-normal text-base">Ngày khám:</span>
                            <span className="text-base text-gray-900 font-medium">{profile.time + " " + profile.date + "/" + profile.month + "/" + profile.year}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 px-4">
                            <FaOpencart className="size-4 fill-gray-500" />
                            <span className="font-normal text-base">Hình thức đặt khám:</span>
                            <span className="text-base text-gray-900 font-medium">
                                {profile.type + " - " + ((profile.specialtyId && profile.specialty.name) || (profile.packageId && profile?.package.name))}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1 px-4">
                            <FaOpencart className="size-4 fill-gray-500" />
                            <span className="font-normal text-base">Bác sĩ phụ trách:</span>
                            <span className="text-base text-gray-900 font-medium">{profile.doctorId && profile.doctor.firstname + " " + profile.doctor.lastname}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 px-4">
                            <FaDollarSign className="size-4 fill-gray-500" />
                            <span className="font-normal text-base">Giá khám:</span>
                            <span className="text-base text-gray-900 font-medium">
                                {(profile.specialtyId &&
                                    profile.doctor.price
                                        .toString()
                                        .replace(/\D/g, "")
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")) ||
                                    (profile.packageId &&
                                        profile.package.price
                                            .toString()
                                            .replace(/\D/g, "")
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, "."))}{" "}
                                VNĐ
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const ModalAlertDelete = ({ open, setOpen, profile, setLoad }) => {
    const selector = useSelector((state) => state.auth);
    const handleDeleteProfile = async () => {
        if (!profile.id) return;
        console.log("Delete profile", profile.id);
        const response = await setData("/delete-patient-profile", "DELETE", { id: profile.id }, null, selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }
        setOpen(false);
        toast.success(response.message);
        setLoad((prev) => !prev);
    };
    return (
        <div className="fixed top-1/4 animate-fadeIn bg-white shadow-lg overflow-hidden rounded-lg transition-all duration-300 ">
            <div className="flex justify-end bg-blue-400">
                <button onClick={() => setOpen(false)} className="p-2">
                    <IoClose className="w-6 h-6 fill-white" />
                </button>
            </div>
            <span className="font-normal block p-4 text-base">Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân này?</span>
            <div className="flex justify-around px-4 pb-4 gap-4">
                <button onClick={() => setOpen(false)} className="flex gap-1 items-center text-base text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                    <CiViewBoard className="w-5 h-5 fill-gray-700" />
                    Hủy bỏ
                </button>
                <button onClick={handleDeleteProfile} className="flex gap-1 items-center text-base text-red-300 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                    <CiTrash className="w-5 h-5 fill-red-300" />
                    Xóa hồ sơ
                </button>
            </div>
        </div>
    );
};
const ModalCancelBills = ({ open, setOpen, profile, setLoad }) => {
    const selector = useSelector((state) => state.auth);
    const handleCancelBills = async () => {
        if (!profile.id) return;
        console.log("Delete profile", profile.id);
        const response = await setData("/update-status-history-booking", "POST", { id: profile.id, status: 0, clinicId: profile.clinicId, fullname: profile.fullname }, null, selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }
        setOpen(false);
        toast.success("Hủy phiếu khám thành công!");
        setLoad((prev) => !prev);
    };
    return (
        <div className="fixed top-1/4 animate-fadeIn bg-white shadow-lg overflow-hidden rounded-lg transition-all duration-300 ">
            <div className="flex justify-end bg-blue-400">
                <button onClick={() => setOpen(false)} className="p-2">
                    <IoClose className="w-6 h-6 fill-white" />
                </button>
            </div>
            <span className="font-normal block p-4 text-base">Bạn có chắc chắn muốn hủy phiếu khám này không này?</span>
            <div className="flex justify-around px-4 pb-4 gap-4">
                <button onClick={() => setOpen(false)} className="flex gap-1 items-center text-base text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                    <CiViewBoard className="w-5 h-5 fill-gray-700" />
                    Hủy bỏ
                </button>
                <button onClick={handleCancelBills} className="flex gap-1 items-center text-base text-red-300 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all">
                    <CiTrash className="w-5 h-5 fill-red-300" />
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

const EditPatientProfile = () => {
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listWard, setListWard] = useState([]);
    const listEthnic = [
        "Kinh",
        "Tày",
        "Thái",
        "Mường",
        "Khmer",
        "HMông",
        "Nùng",
        "Hoa",
        "Dao",
        "Gia Rai",
        "Ê Đê",
        "Ba Na",
        "Sán Chay",
        "Chăm",
        "Xơ Đăng",
        "Sán Dìu",
        "Hrê",
        "Ra Glai",
        "Mnông",
        "Thổ",
        "Xtiêng",
        "Khơ Mú",
        "Bru - Vân Kiều",
        "Giáy",
        "Cơ Ho",
        "Ta Ôi",
        "Mạ",
        "Co",
        "Chơ Ro",
        "Ha Nhì",
        "Cờ Lao",
        "La Chí",
        "Phù Lá",
        "La Hủ",
        "Lự",
        "Lào",
        "Chứt",
        "Mảng",
        "Pà Thẻn",
        "Co Lao",
        "Bố Y",
        "Cống",
        "Ngái",
        "Si La",
        "Pu Péo",
        "Brâu",
        "Rơ Măm",
        "Ơ Đu",
        "Chứt",
        "Lô Lô",
        "Cống",
        "Cơ Lao",
        "Xinh Mun",
        "Kháng",
    ];

    //get id from url
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");

    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    //// State data user
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [sex, setSex] = useState("");
    const [identify, setIdentify] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [ethnic, setEthnic] = useState("");
    const [provinceName, setProvinceName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [wardName, setWardName] = useState("");
    const [address, setAddress] = useState("");

    //get token
    const token = useSelector((state) => state.auth.accessToken);
    //get data user
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData("/get-patient-profile-by-id?id=" + id, token);
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            const data = response.data;
            setName(data.fullname);
            setBirthday(data.birthday);
            setPhone(data.phone);
            setSex(data.sex);
            setIdentify(data.identify);
            setEmail(data.email);
            setJob(data.career);
            setEthnic(data.nation);
            setProvinceName(data.province);
            setDistrictName(data.district);
            setWardName(data.commune);
            setAddress(data.curentAddress);
        };
        fetchData();
    }, [id, token]);

    //
    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const results = await apiGetProvince();
                setListProvince(results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        const fetchDistrict = async () => {
            const results = await apiGetDistrict(province);
            setListDistrict(results);
        };
        fetchDistrict();
    }, [province]);

    useEffect(() => {
        const fetchWard = async () => {
            try {
                const result = await apiGetWard(district);
                setListWard(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchWard();
    }, [district]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !birthday || !phone || !sex || !identify || !email || !job || !ethnic || !provinceName || !districtName || !wardName || !address) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const data = {
            id,
            name,
            birthday,
            phone,
            sex,
            identify,
            email,
            job,
            ethnic,
            province: provinceName,
            district: districtName,
            ward: wardName,
            address,
        };

        const response = await setData("/update-patient-profile", "PUT", data, "application/json", token);

        if (response.isSuccess) {
            toast.success("cập nhật thành công");
            window.history.back();
        } else {
            toast.error(response.message);
        }
    };

    return (
        <div className="mt-32 p-8 flex flex-col gap-2">
            <h1 className="text-2xl font-medium text-center text-gray-800">Nhập thông tin bệnh nhân</h1>
            <div className="text-left p-4 rounded-lg bg-primary/30 border border-gray-600 w-2/3 mx-auto">
                Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất. Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại, việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt
                khám.
            </div>
            <form onSubmit={handleSubmit} className="mx-auto w-2/3">
                <h2 className="text-red-200 my-2 font-medium">(*) Thông tin bắt buộc nhập</h2>
                <div className="flex-col flex gap-4">
                    <div className="justify-between flex gap-4">
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="name">
                                Họ và tên <span className="text-red-200">*</span>
                            </label>
                            <input
                                className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="Nguyễn Văn A"
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="birthday">
                                Ngày sinh <span className="text-red-200">*</span>
                            </label>
                            <div className="w-full flex flex-col">
                                <input
                                    className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="justify-between flex gap-4">
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="phone">
                                Số điện thoại <span className="text-red-200">*</span>
                            </label>
                            <input
                                className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="0122344556"
                                type="text"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="sex">
                                Giới tính <span className="text-red-200">*</span>
                            </label>
                            <div className="w-full ">
                                <select
                                    id="sex"
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                    className="py-2 px-4 pe-9 block w-full outline-none rounded-lg text-base border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none ">
                                    <option value="">--Chọn giới tính--</option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="justify-between flex gap-4">
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="job">
                                Nghề nghiệp <span className="text-red-200">*</span>
                            </label>
                            <input
                                className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="Giáo viên"
                                type="text"
                                id="job"
                                name="job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="identify">
                                CCCD/Hộ chiếu <span className="text-red-200">*</span>
                            </label>
                            <div className="w-full flex flex-col">
                                <input
                                    className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                    type="text"
                                    id="identify"
                                    name="identify"
                                    placeholder="012203000000"
                                    value={identify}
                                    onChange={(e) => setIdentify(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="justify-between flex gap-4">
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="email">
                                Email <span className="text-red-200">*</span>
                            </label>
                            <input
                                className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="abc@gmail.com"
                                type="text"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="ethnic">
                                Dân tộc <span className="text-red-200">*</span>
                            </label>

                            <div className="w-full ">
                                <select
                                    id="ethnic"
                                    value={ethnic}
                                    onChange={(e) => setEthnic(e.target.value)}
                                    className="py-2 px-4 pe-9 block w-full outline-none rounded-lg text-base border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none ">
                                    <option value="">--Chọn dân tộc--</option>
                                    {listEthnic.map((ethnic, index) => (
                                        <option key={index} value={ethnic}>
                                            {ethnic}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="justify-between flex gap-4">
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="province">
                                Tỉnh/TP <span className="text-red-200">*</span>
                            </label>

                            <div className="w-full ">
                                <select
                                    id="province"
                                    value={province}
                                    onChange={(e) => {
                                        setProvince(e.target.value);
                                        setProvinceName(e.target.options[e.target.selectedIndex].text);
                                    }}
                                    className="py-2 px-4 pe-9 block w-full outline-none rounded-lg text-base border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none ">
                                    <option value="">--chọn tỉnh/TP--</option>
                                    {listProvince?.map((province) => (
                                        <option key={province["province_id"]} value={province["province_id"]}>
                                            {province["province_name"]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="district">
                                Quận/Huyện <span className="text-red-200">*</span>
                            </label>

                            <div className="w-full ">
                                <select
                                    id="district"
                                    value={district}
                                    onChange={(e) => {
                                        setDistrict(e.target.value);
                                        setDistrictName(e.target.options[e.target.selectedIndex].text);
                                    }}
                                    className="py-2 px-4 pe-9 block w-full outline-none rounded-lg text-base border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none ">
                                    <option value="">--chọn quận/huyện--</option>
                                    {listDistrict?.map((district) => (
                                        <option key={district["district_id"]} value={district["district_id"]}>
                                            {district["district_name"]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="justify-between flex gap-4">
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="ward">
                                Phường/xã <span className="text-red-200">*</span>
                            </label>

                            <div className="w-full ">
                                <select
                                    id="ward"
                                    value={ward}
                                    onChange={(e) => {
                                        setWard(e.target.value);
                                        setWardName(e.target.options[e.target.selectedIndex].text);
                                    }}
                                    className="py-2 px-4 pe-9 block w-full outline-none rounded-lg text-base border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none ">
                                    <option value="">--Phường/xã--</option>
                                    {listWard?.map((ward) => (
                                        <option key={ward["ward_id"]} value={ward["ward_id"]}>
                                            {ward["ward_name"]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="address">
                                Địa chỉ hiện tại <span className="text-red-200">*</span>
                            </label>

                            <input
                                className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="số 1 ngõ 2 phố 3"
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 pl-2 flex gap-4 justify-between ml-auto">
                        <button type="button" onClick={() => window.history.back()} className="w-1/2 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200">
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-2 px-4 rounded-lg bg-gradient-to-r from-primary-2 to-primary text-white font-medium hover:from-primary-3 hover:to-primary-2 transition-all duration-200">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export { HistoryBooking, EditPatientProfile };
export default HistoryBooking;
