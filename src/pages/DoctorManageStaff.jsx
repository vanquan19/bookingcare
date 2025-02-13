import { useNavigate } from "react-router-dom";
import { GrDocumentPpt } from "react-icons/gr";
import { FaAngleRight, FaPlus } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { CiEdit, CiFilter, CiSearch, CiTrash, CiViewBoard } from "react-icons/ci";
import Paginate from "../components/Paginate";
import { useEffect, useState } from "react";
import Validate from "../utils/Validate";
import { useSelector } from "react-redux";
import { getData, setData } from "../utils/fetchData";
import { toast } from "react-toastify";
import { LIMIT } from "../configs/constance";

const DoctorManageStaff = () => {
    const [isOpenAddNewDoctor, setIsOpenAddNewDoctor] = useState(false);
    const [isOpenEditDoctor, setIsOpenEditDoctor] = useState(false);
    const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [iDoctor, setiDoctor] = useState(0);
    const [iPublicDoctor, setIPublicDoctor] = useState(0);
    const [iPrivateDoctor, setIPrivateDoctor] = useState(0);
    const [DoctorTarget, setDoctorTarget] = useState({});
    const [load, setLoad] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("createdAt-desc");
    //handle search
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    //get user infomation from store
    const auth = useSelector((state) => state.auth);

    //get data from server
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/doctor/read?clinicId=${auth.data.clinicId}&page=${page}&limit=${LIMIT}&sort=${sort}&search=${debouncedQuery}`, auth.accessToken);
            if (!response.isSuccess) {
                console.log(response.message);
                return;
            }
            console.log(response);

            setiDoctor(response.count);
            setIPublicDoctor(response.public);
            setIPrivateDoctor(response.private);
            setTotalPages(response.totalPages);
            setRowData(response.data);
        };
        fetchData();
    }, [debouncedQuery, page, sort, load]);

    //handle debaunce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    const handlePublish = async (e, Doctor) => {
        console.log(Doctor);

        const accessToken = auth.accessToken;
        const response = await setData(`/doctor/set-public`, "POST", { doctorId: Doctor.id, isPublic: e.target.checked }, null, accessToken);
        if (!response.isSuccess) {
            console.log(response.message);
            return;
        }
        setLoad(!load);
    };

    const handleEditDoctor = (Doctor) => {
        setDoctorTarget(Doctor);
        setIsOpenEditDoctor(true);
    };

    const handleDeleteDoctor = (Doctor) => {
        setDoctorTarget(Doctor);
        setIsOpenAlertDelete(true);
    };

    return (
        <>
            <div className="w-full">
                <div className="bg-white w-full rounded p-3">
                    <ul className="flex gap-8 items-center">
                        <li className="flex gap-2 items-center  text-gray-600 font-normal">
                            <GrDocumentPpt className="stroke-gray-700" /> Tổng bác sĩ<span className="font-semibold text-gray-600 bg-gray-200 px-1 rounded">{iPublicDoctor + iPrivateDoctor}</span>
                        </li>
                        <li className="flex gap-2 items-center text-gray-600 font-normal relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            <GrDocumentPpt className="stroke-gray-700" /> Nhận đặt khám
                            <span className="font-semibold text-green-200 bg-blue-100/15 px-1 rounded flex items-center gap-2">
                                {iPublicDoctor} <FaAngleRight className="fill-blue-200 size-3" />
                            </span>
                        </li>
                        <li className="flex gap-2 items-center text-gray-600 font-normal relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            <GrDocumentPpt className="stroke-gray-700" /> Không nhận đặt khám
                            <span className="font-semibold text-orange-200 bg-orange-200/15 px-1 rounded flex items-center gap-2">
                                {iPrivateDoctor} <FaAngleRight className="fill-orange-200 size-3" />
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white pt-3 mt-4 rounded">
                    <div className="flex justify-between mb-4 px-3 items-center">
                        <h1 className="text-xl font-semibold text-gray-800">Danh sách nhân viên</h1>
                        <div className="gap-3 flex">
                            <div className="flex border border-gray-300 px-2 py-2 rounded items-center gap-2">
                                <CiSearch className=" text-gray-300 fill-gray-600" size={20} />
                                <input type="text" placeholder="Tìm kiếm bác sĩ" className="outline-none border-none" onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="relative">
                                <CiFilter className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-300 fill-gray-600" size={20} />
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-gray-500 text-base border border-gray-300 rounded pl-9 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 appearance-none cursor-pointer">
                                    <option value="createdAt-desc">Sắp xếp theo ngày</option>
                                    <option value="name-asc">Sắp xếp theo tên khám</option>
                                    <option value="price-asc">Sắp xếp theo giá khám</option>
                                    <option value="position-asc">Sắp xếp theo chức vụ</option>
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
                                    setIsOpenAddNewDoctor(true);
                                }}
                                className="bg-primary text-white px-4 py-2 outline-none rounded flex items-center gap-2 hover:bg-primary-2 transition-all duration-200">
                                <FaPlus className="fill-white" size={20} /> Thêm bác sĩ
                            </button>
                        </div>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-center border border-gray-300 whitespace-nowrap">
                                    <input type="checkbox" />
                                </th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Họ và tên</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Email</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Số điện thoại</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Chức vụ</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Chuyên khoa</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Giá khám</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData?.map((Doctor, index) => (
                                <tr key={Doctor.id}>
                                    <td className="text-center border border-gray-300 px-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300 items-center">
                                        <div className="flex gap-3 items-center">
                                            <span className="line-clamp-2">{Doctor.firstname + " " + Doctor.lastname}</span>
                                        </div>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{Doctor.email}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{Doctor.phone}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{Doctor.position === "doctor" ? "Bác sĩ" : "Quản lý"}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{Doctor.specialtyName || "Không thuộc chuyên khoa nào"}</span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">
                                            {Doctor.price && Doctor.isPublic
                                                ? Doctor.price
                                                      .toString()
                                                      .replace(/\D/g, "")
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
                                                : "Không đặt khám"}
                                        </span>
                                    </td>

                                    <td className="text-left px-2 py-2 border border-gray-300 relative">
                                        <div className="flex gap-2 items-center">
                                            {Doctor.price && (
                                                <>
                                                    <span className="inline-block w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">{Doctor.isPublic ? "Mở" : "Đóng"}</span>
                                                    <label className="relative inline-flex cursor-pointer items-center">
                                                        <input type="checkbox" checked={Doctor.isPublic} className="peer sr-only" onChange={(e) => handlePublish(e, Doctor)} />
                                                        <div className="h-6 w-11 rounded-full border-gray-200 bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                                    </label>
                                                </>
                                            )}
                                            <div className="text-white mx-auto hover:bg-gray-200 transition-all px-2 py-2 outline-none rounded relative group">
                                                <IoMdMore className="" />
                                                <div className="absolute top-full hidden group-hover:flex shadow rounded -right-2 z-20 p-3 min-w-32 flex-col bg-white gap-2 animate-fadeIn transition-all">
                                                    <button
                                                        onClick={() => handleEditDoctor(Doctor)}
                                                        className="text-orange-200 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-center">
                                                        <CiEdit className="fill-orange-200" /> Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteDoctor(Doctor)}
                                                        className="text-red-300 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-center">
                                                        <CiTrash className="fill-red-300" />
                                                        Xóa
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {
                                // Empty data
                                rowData?.length === 0 && (
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
                isOpenAddNewDoctor && <ModalAddNewDoctor load={load} setLoad={setLoad} isOpenAddNewDoctor={isOpenAddNewDoctor} setIsOpenAddNewDoctor={setIsOpenAddNewDoctor} />
            }
            {
                //edit clinic
                isOpenEditDoctor && <ModalEditDoctor rowData={rowData} setRowData={setRowData} isOpenEditDoctor={isOpenEditDoctor} setIsOpenEditDoctor={setIsOpenEditDoctor} Doctor={DoctorTarget} />
            }
            {
                //delete clinic
                isOpenAlertDelete && (
                    <ModalAlertDelete
                        load={load}
                        setLoad={setLoad}
                        isOpenAlertDelete={isOpenAlertDelete}
                        setIsOpenAlertDelete={setIsOpenAlertDelete}
                        id={DoctorTarget.id}
                        firstname={DoctorTarget.firstname}
                        lastname={DoctorTarget.lastname}
                    />
                )
            }
        </>
    );
};

const ModalAddNewDoctor = ({ isOpenAddNewDoctor, setIsOpenAddNewDoctor, load, setLoad }) => {
    const [DoctorFirstname, setDoctorFirstname] = useState("");
    const [DoctorLastname, setDoctorLastname] = useState("");
    const [DoctorPosition, setDoctorPosition] = useState("");
    const [DoctorSpecialize, setDoctorSpecialize] = useState("");
    const [DoctorEmail, setDoctorEmail] = useState("");
    const [DoctorPhone, setDoctorPhone] = useState("");
    const [DoctorPrice, setDoctorPrice] = useState("");
    const [listPosition, setListPosition] = useState([
        {
            id: "manager",
            name: "Quản lý",
        },
        {
            id: "doctor",
            name: "Bác sĩ",
        },
    ]);
    const [listSpecialize, setListSpecialize] = useState([]);

    const [errors, setErrors] = useState({
        doctorFirstname: "",
        doctorLastname: "",
        position: "",
        specialize: "",
        doctorEmail: "",
        doctorPhone: "",
    });
    const selector = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData("/clinic/specialty/read?clinicId=" + selector.data.clinicId);
            if (!response.isSuccess) {
                console.log(response.message);
                return;
            }
            setListSpecialize(response.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        let validationErrors = {};

        if (!Validate.validateName(DoctorFirstname)) {
            validationErrors.doctorFirstname = "Tên chuyên khoa không được để trống";
        }
        if (!Validate.validateName(DoctorLastname)) {
            validationErrors.doctorLastname = "Tên chuyên khoa không được để trống";
        }
        if (!Validate.validateEmail(DoctorEmail)) {
            validationErrors.doctorEmail = "Email không hợp lệ";
        }
        if (!Validate.validatePhone(DoctorPhone)) {
            validationErrors.doctorPhone = "Số điện thoại không hợp lệ";
        }
        if (!DoctorPosition) {
            validationErrors.position = "Chức vụ không được để trống";
        }
        if (!DoctorSpecialize) {
            validationErrors.specialize = "Chuyên khoa không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const data = {
            clinicId: selector.data.clinicId,
            firstname: DoctorFirstname,
            lastname: DoctorLastname,
            position: DoctorPosition,
            specialize: DoctorSpecialize,
            email: DoctorEmail,
            phone: DoctorPhone,
            price: +DoctorPrice.replace(/\./g, "") || 0,
        };

        //fetch data

        const response = await setData("/doctor/create", "POST", data, "application/json", selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }
        toast.success("Thêm bác sĩ thành công!");
        setIsOpenAddNewDoctor(false);
        setTimeout(() => {
            setLoad(!load);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm ${isOpenAddNewDoctor ? "animate-fadeIn" : "animate-fadeOut"} transition-all duration-300`}>
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Thêm bác sĩ</div>
                <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Họ <span className="text-red-300">*</span>
                                </label>
                                <input type="text" id="Doctor-name" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setDoctorFirstname(e.target.value)} />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorFirstname}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Tên <span className="text-red-300">*</span>
                                </label>
                                <input type="text" id="Doctor-name" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setDoctorLastname(e.target.value)} />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorLastname}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Email <span className="text-red-300">*</span>
                                </label>
                                <input type="text" id="Doctor-email" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setDoctorEmail(e.target.value)} />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorEmail}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Phone <span className="text-red-300">*</span>
                                </label>
                                <input type="text" id="Doctor-phoine" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setDoctorPhone(e.target.value)} />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorPhone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-position" className="text-sm text-gray-600">
                                    chức vụ <span className="text-red-300">*</span>
                                </label>
                                <select
                                    onChange={(e) => setDoctorPosition(e.target.value)}
                                    name="doctor-position"
                                    id="Doctor-position"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none ">
                                    <option value="">--Chọn chức vụ--</option>
                                    {listPosition.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-red-300 text-sm absolute top-full">{errors.position}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-specialty" className="text-sm text-gray-600">
                                    Chuyên khoa <span className="text-red-300">*</span>
                                </label>
                                <select
                                    onChange={(e) => setDoctorSpecialize(e.target.value)}
                                    name="doctor-specialty"
                                    id="Doctor-specialty"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none ">
                                    <option value="">--Chọn chuyên khoa--</option>
                                    {listSpecialize.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>{" "}
                                <span className="text-red-300 text-sm absolute top-full">{errors.specialize}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="price_Doctor" className="text-sm text-gray-600">
                                    Giá khám (VND)
                                </label>
                                <input
                                    value={
                                        DoctorPrice.toString()
                                            .replace(/\D/g, "")
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") || ""
                                    }
                                    type="text"
                                    id="price_Doctor"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setDoctorPrice(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.DoctorPrice}</span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => {
                            setIsOpenAddNewDoctor(false);
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

const ModalEditDoctor = ({ isOpenEditDoctor, setIsOpenEditDoctor, Doctor, setRowData, rowData }) => {
    const [DoctorFirstname, setDoctorFirstname] = useState(Doctor.firstname);
    const [DoctorLastname, setDoctorLastname] = useState(Doctor.lastname);
    const [DoctorPosition, setDoctorPosition] = useState(Doctor.position);
    const [DoctorSpecialize, setDoctorSpecialize] = useState(Doctor.specialize);
    const [DoctorEmail, setDoctorEmail] = useState(Doctor.email);
    const [DoctorPhone, setDoctorPhone] = useState(Doctor.phone);
    const [DoctorPrice, setDoctorPrice] = useState("" + Doctor.price || "");
    const [listPosition, setListPosition] = useState([
        {
            id: "manager",
            name: "Quản lý",
        },
        {
            id: "doctor",
            name: "Bác sĩ",
        },
    ]);
    const [listSpecialize, setListSpecialize] = useState([]);
    const [errors, setErrors] = useState({
        doctorFirstname: "",
        doctorLastname: "",
        position: "",
        specialize: "",
        doctorEmail: "",
        doctorPhone: "",
    });
    const selector = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData("/clinic/specialty/read?clinicId=" + selector.data.clinicId);
            if (!response.isSuccess) {
                console.log(response.message);
                return;
            }
            setListSpecialize(response.data);
        };
        fetchData();
    }, []);
    const handleSubmit = async () => {
        let validationErrors = {};

        if (!Validate.validateName(DoctorFirstname)) {
            validationErrors.doctorFirstname = "Tên chuyên bác sĩ được để trống";
        }
        if (!Validate.validateName(DoctorLastname)) {
            validationErrors.doctorLastname = "Tên chuyên bác sĩ được để trống";
        }
        if (!Validate.validateEmail(DoctorEmail)) {
            validationErrors.doctorEmail = "Email không hợp lệ";
        }
        if (!Validate.validatePhone(DoctorPhone)) {
            validationErrors.doctorPhone = "Số điện thoại không hợp lệ";
        }
        if (!DoctorPosition) {
            validationErrors.position = "Chức vụ không được để trống";
        }
        if (!DoctorSpecialize) {
            validationErrors.specialize = "Chuyên bác sĩ được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (
            DoctorFirstname === Doctor.firstname &&
            DoctorLastname === Doctor.lastname &&
            DoctorPosition === Doctor.position &&
            DoctorSpecialize === Doctor.specialize &&
            DoctorEmail === Doctor.email &&
            DoctorPhone === Doctor.phone &&
            DoctorPrice === Doctor.price
        ) {
            toast.error("Không có gì thay đổi!");
            return;
        }
        setErrors({});

        const data = {
            id: Doctor.id,
            firstname: DoctorFirstname,
            lastname: DoctorLastname,
            position: DoctorPosition,
            specialize: DoctorSpecialize,
            email: DoctorEmail,
            phone: DoctorPhone,
            price: +DoctorPrice.replace(/\./g, "") || 0,
        };

        //fetch data
        console.log(data);

        const response = await setData("/doctor/update", "PUT", data, "application/json", selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }
        toast.success("Thông tin đã được cập nhật!");
        setIsOpenEditDoctor(false);
        const newData = rowData.map((item) => {
            if (item.id === Doctor.id) {
                return { ...data };
            }
            return item;
        });
        setRowData(newData);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm ${isOpenEditDoctor ? "animate-fadeIn" : "animate-fadeOut"} transition-all duration-300`}>
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Sửa thông bác sĩ</div>
                <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Họ <span className="text-red-300">*</span>
                                </label>
                                <input
                                    defaultValue={DoctorFirstname}
                                    type="text"
                                    id="Doctor-name"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setDoctorFirstname(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorFirstname}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Tên <span className="text-red-300">*</span>
                                </label>
                                <input
                                    defaultValue={DoctorLastname}
                                    type="text"
                                    id="Doctor-name"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setDoctorLastname(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorLastname}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Email <span className="text-red-300">*</span>
                                </label>
                                <input
                                    defaultValue={DoctorEmail}
                                    type="text"
                                    id="Doctor-email"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setDoctorEmail(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorEmail}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-name" className="text-sm text-gray-600">
                                    Phone <span className="text-red-300">*</span>
                                </label>
                                <input
                                    defaultValue={Doctor.phone}
                                    type="text"
                                    id="Doctor-phoine"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setDoctorPhone(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.doctorPhone}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-position" className="text-sm text-gray-600">
                                    chức vụ <span className="text-red-300">*</span>
                                </label>
                                <select
                                    onChange={(e) => setDoctorPosition(e.target.value)}
                                    defaultValue={Doctor.position}
                                    name="doctor-position"
                                    id="Doctor-position"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none ">
                                    <option value="">--Chọn chức vụ--</option>
                                    {listPosition.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-red-300 text-sm absolute top-full">{errors.position}</span>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="Doctor-specialty" className="text-sm text-gray-600">
                                    Chuyên khoa <span className="text-red-300">*</span>
                                </label>
                                <select
                                    value={DoctorSpecialize}
                                    onChange={(e) => setDoctorSpecialize(e.target.value)}
                                    name="doctor-specialty"
                                    id="Doctor-specialty"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none ">
                                    <option value="">--Chọn chuyên khoa--</option>
                                    {listSpecialize.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>{" "}
                                <span className="text-red-300 text-sm absolute top-full">{errors.specialize}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="price_Doctor" className="text-sm text-gray-600">
                                    Giá khám (VND)
                                </label>
                                <input
                                    value={
                                        DoctorPrice.toString()
                                            .replace(/\D/g, "")
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") || ""
                                    }
                                    type="text"
                                    id="price_Doctor"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setDoctorPrice(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.DoctorPrice}</span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => {
                            setIsOpenEditDoctor(false);
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

const ModalAlertDelete = ({ isOpenAlertDelete, setIsOpenAlertDelete, id, firstname, lastname, setLoad, load }) => {
    const selector = useSelector((state) => state.auth);
    const handleDelete = async () => {
        const response = await setData(`/doctor/delete?id=${id}&firstname=${firstname}&lastname=${lastname}`, "DELETE", null, "application/json", selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            setIsOpenAlertDelete(false);
            return;
        }
        setIsOpenAlertDelete(false);
        toast.success("Xóa bác sĩ thành công!");
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

export default DoctorManageStaff;
