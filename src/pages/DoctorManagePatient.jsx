import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getData, setData } from "../utils/fetchData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoMdClose, IoMdMore } from "react-icons/io";
import { CiCircleCheck, CiEdit, CiTrash, CiViewBoard } from "react-icons/ci";
import socket from "../configs/socket.io";

const DoctorManagePatient = () => {
    const [showModalView, setShowModalView] = useState(false);
    const [load, setLoad] = useState(false);
    const [patientsSearch, setPatientsSearch] = useState([]);
    const [status, setStatus] = useState(1);
    const [amountStatus, setAmountStatus] = useState([]);
    //status: 1: Chờ duyệt, 2: Đã duyệt, 3: Đang khám, 4: Đã khám, 5: Đã từ chối , 0: Đã hủy
    const [patients, setPatients] = useState([]);
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getData(`/get-amount-booking-by-status?clinicId=${user.data.clinicId}`, user.accessToken);
                if (!response.isSuccess) {
                    toast.error(response.message);
                    return;
                }
                setAmountStatus(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPatients();
    }, [load, status]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getData(`/get-history-booking-by-status?status=${status}&clinicId=${user.data.clinicId}`, user.accessToken);
                if (!response.isSuccess) {
                    toast.error(response.message);
                    return;
                }
                setPatients(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPatients();
    }, [status, load]);

    //handle accept patient
    const handleAcceptPatient = async (patient) => {
        const result = window.confirm("Bạn có chắc chắn muốn xác nhận bệnh nhân này?");
        if (result) {
            //handle accept patient
            const response = await setData(
                `/update-status-history-booking`,
                "POST",
                {
                    id: patient.id,
                    status: 2,
                },
                null,
                user.accessToken
            );
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setStatus(2);
            toast.success(response.message);
        }
    };

    //handle delete patient

    const handleRefusepatient = async (patient) => {
        const result = window.confirm("Bạn có chắc chắn muốn từ chối bệnh nhân này?");
        if (result) {
            //handle delete patient
            const response = await setData(
                `/update-status-history-booking`,
                "POST",
                {
                    id: patient.id,
                    status: 5,
                },
                null,
                user.accessToken
            );
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setStatus(5);
            toast.success(response.message);
        }
    };

    useEffect(() => {
        if (status === 1) {
            socket.emit("view-bookings", { clinicId: user.data.clinicId });
            console.log("view-notify");
        }
    }, [status, load]);

    useEffect(() => {
        socket.on(`new-booking-${user.data.clinicId}`, (data) => {
            setLoad(!load);
        });
    }, [socket]);

    return (
        <div>
            <div className="flex justify-between mb-4 gap-4 items-center">
                <h1 className="font-medium text-xl">Danh sách bệnh nhân</h1>
            </div>
            <div className="flex justify-between gap-4 mb-4">
                {amountStatus.map((amount) => (
                    <button
                        onClick={() => setStatus(amount.status)}
                        className={`w-full text-center ${
                            status === amount.status ? "bg-primary text-white" : "bg-blue-100/15 text-gray-900"
                        } p-2 rounded-lg text-base font-medium transition-all duration-200`}>
                        {amount.name} ({amount.amount})
                    </button>
                ))}
            </div>
            <div class="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Tên đầy đủ</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Ngày sinh</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Địa chỉ</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Số điện thoại</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Ngày đặt lịch</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Đặt khám</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient.id}>
                                <td className="text-left px-2 py-2 border border-gray-300 items-center">
                                    <div className="flex gap-3 items-center">
                                        <span className="line-clamp-2">{patient.fullname}</span>
                                    </div>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{patient.birthday ? new Date(patient.birthday).toLocaleDateString() : "Chưa cập nhật"}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{patient.commune + ", " + patient.district + ", " + patient.province}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{patient.phone}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{patient.date + "/" + patient.month + "/" + patient.year + " - " + patient.time}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{patient.type}</span>
                                </td>

                                <td className="text-left px-2 py-2 border border-gray-300 relative">
                                    <div className="flex gap-2 items-center justify-center">
                                        <div className="text-white hover:bg-gray-200 transition-all px-2 py-2 outline-none rounded relative group">
                                            <IoMdMore />
                                            <div className="absolute top-full hidden group-hover:flex shadow rounded -right-2 z-20 p-3 min-w-32 flex-col bg-white gap-2 animate-fadeIn transition-all">
                                                <button
                                                    onClick={() => setShowModalView(true)}
                                                    className="text-blue-200 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                    <CiViewBoard className="fill-blue-200" />
                                                    Xem chi tiết
                                                </button>
                                                {status === 1 && (
                                                    <>
                                                        <button
                                                            onClick={() => handleAcceptPatient(patient)}
                                                            className="text-green-400 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                            <CiCircleCheck className="fill-green-400" /> Xác nhận
                                                        </button>
                                                        <button
                                                            onClick={() => handleRefusepatient(patient)}
                                                            className="text-red-300 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start">
                                                            <CiTrash className="fill-red-300" />
                                                            Từ chối
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {showModalView && <ModalViewPatient patient={patient} show={showModalView} setShow={setShowModalView} />}
                                </td>
                            </tr>
                        ))}
                        {
                            // Empty data
                            patients.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        <span className="text-gray-600">Không có dữ liệu</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ModalViewPatient = ({ patient, show, setShow }) => {
    console.log(patient);

    return (
        <div className="fixed z-30 h-screen w-screen top-0 left-0 bg-gray-500/30 transition-all duration-300">
            <div className="p-4 fixed right-5 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-lg animate-slide-from-right ">
                <div className="flex flex-col relative">
                    <h1 className="text-xl font-medium">Thông tin bệnh nhân</h1>
                    <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-gray-500">
                        <IoMdClose size={20} />
                    </button>
                    <div className="flex gap-4 mt-4">
                        <ul className="min-w-64">
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Họ và tên: </span>
                                <span className="uppercase">{patient.fullname}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Ngày sinh: </span>
                                <span>{new Date(patient.birthday).toLocaleDateString()}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Giới tính: </span>
                                <span>{patient.sex === 1 ? "Nam" : "Nữ"}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Số điện thoại: </span>
                                <span>{patient.phone}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Email: </span>
                                <span>{patient.email}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Địa chỉ: </span>
                                <span>{patient.commune + ", " + patient.district + ", " + patient.province}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Nghề nghiệp: </span>
                                <span>{patient.career}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Dân tộc: </span>
                                <span>{patient.nation}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Số CMND: </span>
                                <span>{patient.identify}</span>
                            </li>
                            <li className="py-2  flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Địa chỉ hiện tại: </span>
                                <span>{patient.address}</span>
                            </li>
                        </ul>
                    </div>
                    <hr className="h-1 bg-gray-400" />
                    <div className="flex flex-col relative">
                        <h1 className="text-xl font-medium my-2">Thông tin đặt khám</h1>
                        <ul>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Ngày đặt lịch: </span>
                                <span>{patient.date + "/" + patient.month + "/" + patient.year + " - " + patient.time}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Loại đặt lịch: </span>
                                <span>{patient.type}</span>
                            </li>
                            <li className="py-2 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Chuyên khoa: </span>
                                <span>{patient.specialty.name || ""}</span>
                            </li>
                            <li className="py-2 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Giá khám: </span>
                                <span>{patient.specialty.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" || ""}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModalAcceptPatient = ({ patient, show, setShow }) => {
    return (
        <div className="fixed z-30 h-screen w-screen top-0 left-0 bg-gray-500/30 transition-all duration-300">
            <div className="p-4 fixed left-1/2 top-5 -translate-x-1/2 bg-white shadow-md rounded-lg animate-slide-from-top ">
                <div className="flex flex-col relative">
                    <h1 className="text-xl font-medium"></h1>
                    <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-gray-500">
                        <IoMdClose size={20} />
                    </button>
                    <div className="flex gap-4 mt-4">
                        <div className="min-w-64 mt-5 flex flex-col gap-3">
                            <span>Để xác nhận bệnh nhân vui lòng chọn bác sĩ phụ trách!</span>
                            <select name="" id="" className=" border border-gray-400 p-2 rounded-lg outline-none">
                                <option value="">Bác sĩ 1</option>
                                <option value="">Bác sĩ 2</option>
                                <option value="">Bác sĩ 3</option>
                            </select>

                            <button className="bg-primary text-white p-2 rounded-lg text-base font-medium transition-all duration-200">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoctorManagePatient;
