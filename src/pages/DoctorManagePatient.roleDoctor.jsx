import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { CiViewBoard, CiCircleCheck, CiTrash } from "react-icons/ci";
import { getData, setData } from "../utils/fetchData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import socket from "../configs/socket.io";
import { ModalViewPatient } from "./DoctorManagePatient";

const RoleDoctorManagePatient = () => {
    const [showModalView, setShowModalView] = useState(false);
    const [showModalRefuse, setShowModalRefuse] = useState(false);
    const [load, setLoad] = useState(false);
    const [patientsSearch, setPatientsSearch] = useState([]);
    const [status, setStatus] = useState(1);
    const [amountStatus, setAmountStatus] = useState([]);
    const [targetPatient, setTargetPatient] = useState({});
    //status: 1: Chờ duyệt, 2: Đã duyệt, 3: Đang khám, 4: Đã khám, 5: Đã từ chối , 0: Đã hủy
    const [patients, setPatients] = useState([]);
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getData(`/get-amount-booking-by-status?clinicId=${user.data.clinicId}&doctorId=${user.data.doctorId}`, user.accessToken);
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
                const response = await getData(`/get-history-by-doctor?status=${status}&doctorId=${user.data.doctorId}`, user.accessToken);
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
                    status: status + 1,
                },
                null,
                user.accessToken
            );
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            setStatus(status + 1);
            toast.success(response.message);
            socket.emit("accept-booking", { senderId: user.data.clinicId, reciverId: patient.patientId, senderName: user.data.clinicName });
        }
    };

    //handle delete patient

    const handleRefusepatient = async (patient) => {
        setShowModalRefuse(true);
        setTargetPatient(patient);
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

    const handleViewPatient = (patient) => {
        setTargetPatient(patient);
        setShowModalView(true);
    };

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
                                                    onClick={() => handleViewPatient(patient)}
                                                    className="text-blue-200 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                    <CiViewBoard className="fill-blue-200" />
                                                    Xem chi tiết
                                                </button>
                                                {status <= 3 && status >= 1 && (
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
            {showModalRefuse && <ModalRefusePatient patient={targetPatient} setStatus={setStatus} show={showModalRefuse} setShow={setShowModalRefuse} />}
            {showModalView && <ModalViewPatient patient={targetPatient} show={showModalView} setShow={setShowModalView} />}
        </div>
    );
};

const ModalRefusePatient = ({ patient, show, setShow, setStatus }) => {
    const [message, setMessage] = useState("");
    const user = useSelector((state) => state.auth);
    const handleRefusePatient = async () => {
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
    };
    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50`}>
            <div className="bg-white p-4 w-96 rounded-lg  animate-fadeIn transition-all">
                <h1 className="text-xl font-medium">Lý do từ chối</h1>
                <textarea onChange={(e) => setMessage(e.target.value)} className="w-full h-32 border border-gray-300 rounded-lg p-2 mt-2"></textarea>
                <div className="flex gap-4 justify-end mt-4">
                    <button onClick={() => setShow(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-gray-900 font-medium">
                        Hủy
                    </button>
                    <button onClick={handleRefusePatient} className="px-4 py-2 bg-primary rounded-lg text-white font-medium">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleDoctorManagePatient;
