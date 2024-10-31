import { Outlet, useNavigate } from "react-router-dom";
import { SidebarAdmin } from "./AdminContainer";
import { GrDocumentPpt } from "react-icons/gr";
import { FaAngleRight, FaPlus } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { CiEdit, CiFilter, CiSearch, CiTrash, CiViewBoard } from "react-icons/ci";
import Paginate from "../components/Paginate";
import { useEffect, useState } from "react";
import Validate from "../utils/Validate";
import { useSelector } from "react-redux";
import { getData, setData } from "../utils/fetchData";
import { toast, useToast } from "react-toastify";
import { LIMIT } from "../configs/constance";

const ClinicManageContainer = () => {
    const sidebarList = [
        {
            title: "Quản lý phòng khám",
            link: "/admin/clinic-management",
            current: true,
        },
        {
            title: "Liên hệ hợp tác",
            link: "/admin/clinic-management/contract",
            current: false,
        },
    ];
    return (
        <div>
            <div className="flex">
                <SidebarAdmin list={sidebarList} />
                <div className="w-full px-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export const Clinicmanagement = () => {
    const [isOpenAddNewClinic, setIsOpenAddNewNlinic] = useState(false);
    const [isOpenEditClinic, setIsOpenEditClinic] = useState(false);
    const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [iClinic, setIClinic] = useState(0);
    const [iPublicClinic, setIPublicClinic] = useState(0);
    const [iPrivateClinic, setIPrivateClinic] = useState(0);
    const [clinicTarget, setClinicTarget] = useState({});
    const [load, setLoad] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("createdAt");
    //handle search
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    //token
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/number`);
            if (!response.success) {
                console.log(response.message);
                toast.error(response.message);
                return;
            }
            setIClinic(response.data.total);
            setIPublicClinic(response.data.public);
            setIPrivateClinic(response.data.private);
        };
        fetchData();
    }, [page, load]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/read?id=all&page=${page}&limit=${LIMIT}&sort=${sort}`);
            if (!response.success) {
                console.log(response.message);
                return;
            }
            setTotalPages(response.totalPages);
            setRowData(response.data);
        };
        fetchData();
    }, [page, load]);

    //sort
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/read?id=all&page=${page}&limit=${LIMIT}&sort=${sort}&search=${debouncedQuery}`);
            if (!response.success) {
                console.log(response.message);
                return;
            }
            setTotalPages(response.totalPages);
            setRowData(response.data);
        };
        fetchData();
    }, [sort]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(search);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/read?id=all&page=${page}&limit=${LIMIT}&sort=${sort}&search=${debouncedQuery}`);
            if (!response.success) {
                console.log(response.message);
                return;
            }
            setTotalPages(response.totalPages);
            setRowData(response.data);
        };
        fetchData();
    }, [debouncedQuery]);

    const handlePublish = async (e, clinic) => {
        const accessToken = auth.accessToken;
        const response = await setData(`/clinic/set-public`, "POST", { id: clinic.id, isPublic: e.target.checked }, null, accessToken);
        if (!response.success) {
            console.log(response.message);
            return;
        }
        setLoad(!load);
    };

    const handleEditClinic = (clinic) => {
        setClinicTarget(clinic);
        setIsOpenEditClinic(true);
    };

    const handleDeleteClinic = (clinic) => {
        setClinicTarget(clinic);
        setIsOpenAlertDelete(true);
    };

    return (
        <>
            <div className="w-full h-screen pt-20 overflow-x-scroll no-scrollbar pb-8">
                <div className="bg-white w-full rounded p-3">
                    <ul className="flex gap-8 items-center">
                        <li className="flex gap-2 items-center  text-gray-600 font-normal">
                            <GrDocumentPpt className="stroke-gray-700" /> Tổng phòng khám<span className="font-semibold text-gray-600 bg-gray-200 px-1 rounded">{iClinic}</span>
                        </li>
                        <li className="flex gap-2 items-center text-gray-600 font-normal relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            <GrDocumentPpt className="stroke-gray-700" /> Đang công khai
                            <span className="font-semibold text-blue-200 bg-blue-100/15 px-1 rounded flex items-center gap-2">
                                {iPublicClinic} <FaAngleRight className="fill-blue-200 size-3" />
                            </span>
                        </li>
                        <li className="flex gap-2 items-center text-gray-600 font-normal relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            <GrDocumentPpt className="stroke-gray-700" /> Chưa công khai
                            <span className="font-semibold text-orange-200 bg-orange-200/15 px-1 rounded flex items-center gap-2">
                                {iPrivateClinic} <FaAngleRight className="fill-orange-200 size-3" />
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white pt-3 mt-4 rounded">
                    <div className="flex justify-between mb-4 px-3 items-center">
                        <h1 className="text-xl font-semibold text-gray-800">Danh sách phòng khám</h1>
                        <div className="gap-3 flex">
                            <div className="flex border border-gray-300 px-2 py-2 rounded items-center gap-2">
                                <CiSearch className=" text-gray-300 fill-gray-600" size={20} />
                                <input type="text" placeholder="Tìm kiếm phòng khám" className="outline-none" onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="relative">
                                <CiFilter className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-300 fill-gray-600" size={20} />
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-gray-500 text-base border border-gray-300 rounded pl-9 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 appearance-none cursor-pointer">
                                    <option value="createdAt">Sắp xếp theo ngày</option>
                                    <option value="name">Sắp xếp theo tên</option>
                                </select>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.2"
                                    stroke="currentColor"
                                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-gray-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                </svg>
                            </div>

                            <button
                                onClick={() => {
                                    setIsOpenAddNewNlinic(true);
                                }}
                                className="bg-primary text-white px-2 py-2 outline-none rounded flex items-center gap-2 hover:bg-primary-2 transition-all duration-200">
                                <FaPlus className="fill-white" size={20} /> Thêm phòng khám
                            </button>
                        </div>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-center border border-gray-300 whitespace-nowrap">
                                    <input type="checkbox" />
                                </th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Tên phòng khám</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Địa chỉ</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Số điện thoại</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Email</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Loại phòng khám</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map((clinic, index) => (
                                <tr key={clinic.id}>
                                    <td className="text-center border border-gray-300 px-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300 items-center">
                                        <div className="flex gap-3 items-center">
                                            <img src={clinic.image} alt="logo" className="w-10 h-10 rounded-full" />
                                            <span className="line-clamp-2">{clinic.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{clinic.address}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{clinic.phone}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <a href="mailto:" className="line-clamp-2">
                                            {clinic.email}
                                        </a>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{clinic.type}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300 relative">
                                        <div className="flex gap-2 items-center">
                                            <span className="inline-block w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">{clinic.isPublic ? "Mở" : "Đóng"}</span>
                                            <label className="relative inline-flex cursor-pointer items-center">
                                                <input type="checkbox" checked={clinic.isPublic} className="peer sr-only" onChange={(e) => handlePublish(e, clinic)} />
                                                <div className="h-6 w-11 rounded-full border-gray-200 bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                            </label>
                                            <button className="text-white hover:bg-gray-200 transition-all px-2 py-2 outline-none rounded relative group">
                                                <IoMdMore />
                                                <div className="absolute top-full hidden group-hover:flex shadow rounded -right-2 z-20 p-3 min-w-32 flex-col bg-white gap-2 animate-fadeIn transition-all">
                                                    <button className="text-primary-2 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-center">
                                                        <CiViewBoard className="fill-primary-2" /> Xem
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditClinic(clinic)}
                                                        className="text-orange-200 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-center">
                                                        <CiEdit className="fill-orange-200" /> Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClinic(clinic)}
                                                        className="text-red-300 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-center">
                                                        <CiTrash className="fill-red-300" />
                                                        Xóa
                                                    </button>
                                                </div>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {
                                // Empty data
                                rowData.length === 0 && (
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
                {/* paginate */}
                {totalPages > 1 && (
                    <div className="w-full flex items-center justify-center mt-4">
                        <Paginate total={totalPages} currentPage={page} limit={5} setPage={setPage} />
                    </div>
                )}
            </div>
            {
                // Add new clinic
                isOpenAddNewClinic && <ModalAddNewClinic load={load} setLoad={setLoad} isOpenAddNewClinic={isOpenAddNewClinic} setIsOpenAddNewNlinic={setIsOpenAddNewNlinic} />
            }
            {
                //edit clinic
                isOpenEditClinic && <ModalEditClinic rowData={rowData} setRowData={setRowData} isOpenEditClinic={isOpenEditClinic} setIsOpenEditClinic={setIsOpenEditClinic} clinic={clinicTarget} />
            }
            {
                //delete clinic
                isOpenAlertDelete && (
                    <ModalAlertDelete load={load} setLoad={setLoad} isOpenAlertDelete={isOpenAlertDelete} setIsOpenAlertDelete={setIsOpenAlertDelete} id={clinicTarget.id} name={clinicTarget.name} />
                )
            }
        </>
    );
};

const ModalAddNewClinic = ({ isOpenAddNewClinic, setIsOpenAddNewNlinic, load, setLoad }) => {
    const [image, setImage] = useState(
        "data:image/png;base64,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"
    );
    const [clinicName, setClinicName] = useState("");
    const [clinicPhone, setClinicPhone] = useState("");
    const [clinicAddress, setClinicAddress] = useState("");
    const [clinicEmail, setClinicEmail] = useState("");
    const [clinicType, setClinicType] = useState("");
    const [description, setDescription] = useState("");
    const [listType, setListType] = useState([]);
    const [errors, setErrors] = useState({
        clinicName: "",
        clinicPhone: "",
        clinicAddress: "",
        clinicEmail: "",
        clinicType: "",
        image: "",
    });
    const selector = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData("/clinic/read-type");
            setListType(response.data);
        };
        fetchData();
    }, []);
    const handleSubmit = async () => {
        let validationErrors = {};

        if (!Validate.validateName(clinicName)) {
            validationErrors.clinicName = "Tên phòng khám không được để trống";
        }
        if (!Validate.validatePhone(clinicPhone)) {
            validationErrors.clinicPhone = "Số điện thoại không hợp lệ";
        }
        if (!Validate.validateEmail(clinicEmail)) {
            validationErrors.clinicEmail = "Email không hợp lệ";
        }
        if (!Validate.validateAddress(clinicAddress)) {
            validationErrors.clinicAddress = "Địa chỉ không được để trống";
        }
        if (!Validate.validateLength(clinicType, 1)) {
            validationErrors.clinicType = "Loại phòng khám không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const data = {
            image,
            name: clinicName,
            phone: clinicPhone,
            address: clinicAddress,
            email: clinicEmail,
            type: clinicType,
            description: description,
        };

        //fetch data
        console.log(selector.accessToken);

        const response = await setData("/clinic/create", "POST", data, "application/json", selector.accessToken);
        if (!response.success) {
            toast.error(response.message);
            return;
        }
        toast.success("Thêm phòng khám thành công!");
        setIsOpenAddNewNlinic(false);
        setTimeout(() => {
            setLoad(!load);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm ${isOpenAddNewClinic ? "animate-fadeIn" : "animate-fadeOut"} transition-all duration-300`}>
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Thêm phòng khám</div>
                <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                    <div className="flex gap-6 items-center">
                        <label htmlFor="imageFile" className="h-full min-w-32 cursor-pointer ">
                            <input
                                id="imageFile"
                                type="file"
                                className="sr-only"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                            <img
                                className="h-32 w-32 rounded-[100%] object-cover"
                                src={
                                    image
                                        ? image
                                        : "https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                                }
                                alt="ảnh đại diện phòng khám"
                            />
                        </label>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative mb-5">
                                <label htmlFor="clinic-name" className="text-sm text-gray-600">
                                    Tên phòng khám <span className="text-red-300">*</span>
                                </label>
                                <input type="text" id="clinic-name" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setClinicName(e.target.value)} />
                                <span className="text-red-300 text-sm absolute top-full">{errors.clinicName}</span>
                            </div>
                            <div className="flex flex-col gap-2 relative mb-2">
                                <label htmlFor="clinic-phone" className="text-sm text-gray-600">
                                    Số điện thoại <span className="text-red-300">*</span>
                                </label>
                                <input type="text" id="clinic-phone" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setClinicPhone(e.target.value)} />
                                <span className="text-red-300 text-sm absolute top-full">{errors.clinicPhone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-address" className="text-sm text-gray-600">
                            Địa chỉ <span className="text-red-300">*</span>
                        </label>
                        <input type="text" id="clinic-address" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setClinicAddress(e.target.value)} />
                        <span className="text-red-300 text-sm absolute top-full">{errors.clinicAddress}</span>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-email" className="text-sm text-gray-600">
                            Email <span className="text-red-300">*</span>
                        </label>
                        <input type="text" id="clinic-email" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setClinicEmail(e.target.value)} />
                        <span className="text-red-300 text-sm absolute top-full">{errors.clinicEmail}</span>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-type" className="text-sm text-gray-600">
                            Loại phòng khám <span className="text-red-300">*</span>
                        </label>
                        <select name="" id="clinic-type" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setClinicType(e.target.value)}>
                            <option value="">Chọn loại phòng khám</option>
                            {listType.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-red-300 text-sm absolute top-full">{errors.clinicType}</span>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-description" className="text-sm text-gray-600">
                            Mô tả
                        </label>
                        <textarea
                            name=""
                            id="clinic-description"
                            cols="30"
                            rows="10"
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => {
                            setIsOpenAddNewNlinic(false);
                        }}
                        className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-md font-semibold bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-2 focus:shadow-none active:bg-primary-2 hover:bg-primary-2 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="button">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModalEditClinic = ({ isOpenEditClinic, setIsOpenEditClinic, clinic, setRowData, rowData }) => {
    const [image, setImage] = useState(clinic.image);
    const [clinicName, setClinicName] = useState(clinic.name);
    const [clinicPhone, setClinicPhone] = useState(clinic.phone);
    const [clinicAddress, setClinicAddress] = useState(clinic.address);
    const [clinicEmail, setClinicEmail] = useState(clinic.email);
    const [clinicType, setClinicType] = useState(clinic.id_type);
    const [description, setDescription] = useState(clinic.description);
    const [listType, setListType] = useState([]);
    const [errors, setErrors] = useState({
        clinicName: "",
        clinicPhone: "",
        clinicAddress: "",
        clinicEmail: "",
        clinicType: "",
        image: "",
    });
    const selector = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData("/clinic/read-type");
            setListType(response.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        let validationErrors = {};

        if (!Validate.validateName(clinicName)) {
            validationErrors.clinicName = "Tên phòng khám không được để trống";
        }
        if (!Validate.validatePhone(clinicPhone)) {
            validationErrors.clinicPhone = "Số điện thoại không hợp lệ";
        }
        if (!Validate.validateEmail(clinicEmail)) {
            validationErrors.clinicEmail = "Email không hợp lệ";
        }
        if (!Validate.validateAddress(clinicAddress)) {
            validationErrors.clinicAddress = "Địa chỉ không được để trống";
        }
        if (!Validate.validateLength(clinicType, 1)) {
            validationErrors.clinicType = "Loại phòng khám không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (
            clinicName === clinic.name &&
            clinicPhone === clinic.phone &&
            clinicAddress === clinic.address &&
            clinicEmail === clinic.email &&
            clinicType === clinic.id_type &&
            description === clinic.description &&
            image === clinic.image
        ) {
            toast.info("Không có gì thay đổi!");
            setIsOpenEditClinic(false);
            return;
        }
        setErrors({});
        const data = {
            id: clinic.id,
            image,
            name: clinicName,
            phone: clinicPhone,
            address: clinicAddress,
            email: clinicEmail,
            type: clinicType,
            description: description,
        };

        //fetch data
        const response = await setData("/clinic/update", "PUT", data, "application/json", selector.accessToken);
        if (!response.success) {
            console.log(response.message);
            toast.error(response.message);
        }
        toast.success("Thông tin đã được cập nhật!");
        setIsOpenEditClinic(false);
        const newData = rowData.map((item) => {
            if (item.id === clinic.id) {
                return { ...data };
            }
            return item;
        });
        setRowData(newData);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-400/5 bg-opacity-5  backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm ${isOpenEditClinic ? "animate-fadeIn" : "animate-fadeOut"} transition-all duration-300`}>
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Sửa phòng khám</div>

                <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                    <div className="flex gap-6 items-center">
                        <label htmlFor="imageFile" className="h-full min-w-32 cursor-pointer ">
                            <input
                                id="imageFile"
                                type="file"
                                className="sr-only"
                                onChange={(e) => {
                                    const file = e.target.files[0];

                                    const reader = new FileReader();

                                    reader.onloadend = () => {
                                        setImage(reader.result);
                                    };

                                    reader.readAsDataURL(file);
                                }}
                            />

                            <img
                                className="h-32 w-32 rounded-[100%] object-cover"
                                src={
                                    image
                                        ? image
                                        : "https://media.istockphoto.com/id/1248723171/vector/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector.jpg?s=612x612&w=0&k=20&c=e-OBJ2jbB-W_vfEwNCip4PW4DqhHGXYMtC3K_mzOac0="
                                }
                                alt="ảnh đại diện phòng khám"
                            />
                        </label>

                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative mb-5">
                                <label htmlFor="clinic-name" className="text-sm text-gray-600">
                                    Tên phòng khám <span className="text-red-300">*</span>
                                </label>

                                <input
                                    type="text"
                                    id="clinic-name"
                                    defaultValue={clinicName}
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setClinicName(e.target.value)}
                                />

                                <span className="text-red-300 text-sm absolute top-full">{errors.clinicName}</span>
                            </div>

                            <div className="flex flex-col gap-2 relative mb-2">
                                <label htmlFor="clinic-phone" className="text-sm text-gray-600">
                                    Số điện thoại <span className="text-red-300">*</span>
                                </label>

                                <input
                                    type="text"
                                    id="clinic-phone"
                                    defaultValue={clinicPhone}
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setClinicPhone(e.target.value)}
                                />

                                <span className="text-red-300 text-sm absolute top-full">{errors.clinicPhone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-address" className="text-sm text-gray-600">
                            Địa chỉ <span className="text-red-300">*</span>
                        </label>

                        <input
                            type="text"
                            defaultValue={clinicAddress}
                            id="clinic-address"
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setClinicAddress(e.target.value)}
                        />

                        <span className="text-red-300 text-sm absolute top-full">{errors.clinicAddress}</span>
                    </div>

                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-email" className="text-sm text-gray-600">
                            Email <span className="text-red-300">*</span>
                        </label>

                        <input
                            type="text"
                            defaultValue={clinicEmail}
                            id="clinic-email"
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setClinicEmail(e.target.value)}
                        />

                        <span className="text-red-300 text-sm absolute top-full">{errors.clinicEmail}</span>
                    </div>

                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-type" className="text-sm text-gray-600">
                            Loại phòng khám <span className="text-red-300">*</span>
                        </label>

                        <select value={clinicType} name="" id="clinic-type" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setClinicType(e.target.value)}>
                            <option value="">Chọn loại phòng khám</option>

                            {listType.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        <span className="text-red-300 text-sm absolute top-full">{errors.clinicType}</span>
                    </div>

                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="clinic-description" className="text-sm text-gray-600">
                            Mô tả
                        </label>

                        <textarea
                            name=""
                            id="clinic-description"
                            cols="30"
                            rows="10"
                            defaultValue={clinic.description}
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => {
                            setIsOpenEditClinic(false);
                        }}
                        className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Hủy bỏ
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="rounded-md font-semibold bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-2 focus:shadow-none active:bg-primary-2 hover:bg-primary-2 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="button">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModalAlertDelete = ({ isOpenAlertDelete, setIsOpenAlertDelete, id, name, setLoad, load }) => {
    const selector = useSelector((state) => state.auth);
    const handleDelete = async () => {
        const response = await setData(`/clinic/delete?id=${id}&name=${name}`, "DELETE", null, "application/json", selector.accessToken);
        if (!response.success) {
            toast.error(response.message);
            return;
        }
        setIsOpenAlertDelete(false);
        toast.success("Xóa phòng khám thành công!");
        setLoad(!load);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-400/5 bg-opacity-5  backdrop-blur-sm transition-opacity duration-300">
            <div className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm animate-fadeIn transition-all duration-300">
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Xác nhận</div>
                <div className="flex flex-col gap-4">
                    <div className="text-gray-600">Bạn có chắc chắn muốn xóa phòng khám này không?</div>
                    <div className="flex shrink-0 flex-wrap items-center justify-end">
                        <button
                            onClick={() => {
                                setIsOpenAlertDelete(false);
                            }}
                            className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            Hủy bỏ
                        </button>
                        <button
                            onClick={() => handleDelete()}
                            className="rounded-md font-semibold bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-2 focus:shadow-none active:bg-primary-2 hover:bg-primary-2 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button">
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicManageContainer;
