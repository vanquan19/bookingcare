import { useEffect, useState } from "react";
import { getData, setData } from "../utils/fetchData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoMdClose, IoMdMore } from "react-icons/io";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import socket from "../configs/socket.io";

const ManageContact = () => {
    const [showModalView, setShowModalView] = useState(false);
    const [load, setLoad] = useState(false);
    const [status, setStatus] = useState(1);
    const [amountStatus, setAmountStatus] = useState([]);
    const [targetContact, setTargetContact] = useState({});
    //status: 1: Chờ duyệt, 2: Đã duyệt, 3: Đang khám, 4: Đã khám, 5: Đã từ chối , 0: Đã hủy
    const [contacts, setContact] = useState([]);
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getData(`/contacts/get-amount`);
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
                const response = await getData(`/contacts/get?status=${status}`);
                if (!response.isSuccess) {
                    toast.error(response.message);
                    return;
                }
                setContact(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPatients();
    }, [status, load]);

    const handleViewPatient = (contact) => {
        setTargetContact(contact);
        setShowModalView(true);
    };

    const handleUpdate = async (status) => {
        console.log(status);

        try {
            const response = await setData(`/contacts/update`, "PUT", { id: targetContact.id, status });
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            setShowModalView(false);
            setLoad(!load);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pt-20 px-12">
            <div className="flex justify-between gap-4 mb-4">
                {amountStatus.map((amount) => (
                    <button
                        onClick={() => setStatus(amount.status)}
                        className={`w-full text-center ${
                            status === amount.status ? "bg-primary text-white" : "bg-blue-100/15 text-gray-900"
                        } p-2 rounded-lg text-base font-medium transition-all duration-200`}>
                        {amount.name} ({amount.total})
                    </button>
                ))}
            </div>
            <div class="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">STT</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Họ và tên</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Email</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">SĐT</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Ghi chú</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={contact.id}>
                                <td className="text-left px-2 py-2 border border-gray-300 items-center">
                                    <span className="line-clamp-2">{index + 1}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{contact.name}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{contact.email}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{contact.phone}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{contact.description}</span>
                                </td>

                                <td className="text-left px-2 py-2 border border-gray-300 relative">
                                    <div className="flex gap-2 items-center justify-center">
                                        <div className="text-white hover:bg-gray-200 transition-all px-2 py-2 outline-none rounded relative group">
                                            <IoMdMore />
                                            <div className="absolute top-full hidden group-hover:flex shadow rounded -right-2 z-20 p-3 min-w-32 flex-col bg-white gap-2 animate-fadeIn transition-all">
                                                <button
                                                    onClick={() => handleViewPatient(contact)}
                                                    className="text-blue-200 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                    <CiViewBoard className="fill-blue-200" />
                                                    Xem chi tiết
                                                </button>
                                                <button
                                                    onClick={() => handleUpdate(1)}
                                                    className="text-gray-600 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                    <CiEdit className="fill-gray-600" />
                                                    Chưa liên hệ
                                                </button>
                                                <button
                                                    onClick={() => handleUpdate(2)}
                                                    className="text-green-400 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                    <CiEdit className="fill-green-400" />
                                                    Đã liên hệ
                                                </button>
                                                <button
                                                    onClick={() => handleUpdate(3)}
                                                    className="text-red-400 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-start whitespace-nowrap">
                                                    <CiEdit className="fill-red-400" />
                                                    Không liên hệ được
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {
                            // Empty data
                            contacts.length === 0 && (
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
            {showModalView && <ModalViewContact onUpdate={handleUpdate} contact={targetContact} show={showModalView} setShow={setShowModalView} />}
        </div>
    );
};

export const ModalViewContact = ({ onUpdate = (status) => status, contact, setShow }) => {
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
                                <span className="uppercase">{contact.name}</span>
                            </li>

                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Số điện thoại: </span>
                                <span>{contact.phone}</span>
                            </li>
                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Email: </span>
                                <span>{contact.email}</span>
                            </li>

                            <li className="py-2 border-b border-gray-300 flex items-center gap-3 pr-3">
                                <span className="text-base text-gray-900 font-medium">Ghi chú: </span>
                                <span>{contact.description}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={() => setShow(false)} className="bg-gray-200 font-medium text-gray-900 px-4 py-2 rounded-lg mt-4 hover:bg-gray-300 transition-all">
                            Đóng
                        </button>
                        <button onClick={() => onUpdate(3)} className="bg-red-200 text-white font-medium px-4 py-2 rounded-lg mt-4 hover:bg-red-300 transition-all">
                            Không thể liên hệ
                        </button>
                        <button onClick={() => onUpdate(2)} className="bg-primary text-white font-medium px-4 py-2 rounded-lg mt-4 hover:bg-primary-dark transition-all">
                            Đã liên hệ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageContact;
