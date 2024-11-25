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

const DoctorManageSpecialty = () => {
    const [isOpenAddNewSpecialty, setIsOpenAddNewSpecialty] = useState(false);
    const [isOpenEditSpecialty, setIsOpenEditSpecialty] = useState(false);
    const [isOpenAlertDelete, setIsOpenAlertDelete] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [iSpecialty, setiSpecialty] = useState(0);
    const [iPublicSpecialty, setIPublicSpecialty] = useState(0);
    const [iPrivateSpecialty, setIPrivateSpecialty] = useState(0);
    const [specialtyTarget, setSpecialtyTarget] = useState({});
    const [load, setLoad] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("createdAt");
    //handle search
    const [search, setSearch] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    //get user infomation from store
    const auth = useSelector((state) => state.auth);

    //get data from server
    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`/clinic/specialty/read?clinicId=${auth.data.clinicId}&page=${page}&limit=${LIMIT}&sort=${sort}&search=${debouncedQuery}`, auth.accessToken);
            if (!response.isSuccess) {
                console.log(response.message);
                return;
            }
            setiSpecialty(response.count);
            setIPublicSpecialty(response.public);
            setIPrivateSpecialty(response.private);
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

    const handlePublish = async (e, specialty) => {
        const accessToken = auth.accessToken;
        const response = await setData(`/clinic/specialty/set-public`, "POST", { id: specialty.id, isPublic: e.target.checked }, null, accessToken);
        if (!response.isSuccess) {
            console.log(response.message);
            return;
        }
        setLoad(!load);
    };

    const handleEditSpecialty = (specialty) => {
        setSpecialtyTarget(specialty);
        setIsOpenEditSpecialty(true);
    };

    const handleDeleteSpecialty = (specialty) => {
        setSpecialtyTarget(specialty);
        setIsOpenAlertDelete(true);
    };

    return (
        <>
            <div className="w-full">
                <div className="bg-white w-full rounded p-3">
                    <ul className="flex gap-8 items-center">
                        <li className="flex gap-2 items-center  text-gray-600 font-normal">
                            <GrDocumentPpt className="stroke-gray-700" /> Tổng chuyên khoa<span className="font-semibold text-gray-600 bg-gray-200 px-1 rounded">{iSpecialty}</span>
                        </li>
                        <li className="flex gap-2 items-center text-gray-600 font-normal relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            <GrDocumentPpt className="stroke-gray-700" /> Đang công khai
                            <span className="font-semibold text-green-200 bg-blue-100/15 px-1 rounded flex items-center gap-2">
                                {iPublicSpecialty} <FaAngleRight className="fill-blue-200 size-3" />
                            </span>
                        </li>
                        <li className="flex gap-2 items-center text-gray-600 font-normal relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            <GrDocumentPpt className="stroke-gray-700" /> Chưa công khai
                            <span className="font-semibold text-orange-200 bg-orange-200/15 px-1 rounded flex items-center gap-2">
                                {iPrivateSpecialty} <FaAngleRight className="fill-orange-200 size-3" />
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="bg-white pt-3 mt-4 rounded">
                    <div className="flex justify-between mb-4 px-3 items-center">
                        <h1 className="text-xl font-semibold text-gray-800">Danh sách chuyên khoa</h1>
                        <div className="gap-3 flex">
                            <div className="flex border border-gray-300 px-2 py-2 rounded items-center gap-2">
                                <CiSearch className=" text-gray-300 fill-gray-600" size={20} />
                                <input type="text" placeholder="Tìm kiếm chuyên khoa" className="outline-none border-none" onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="relative">
                                <CiFilter className="absolute top-1/2 -translate-y-1/2 left-2.5 text-gray-300 fill-gray-600" size={20} />
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-gray-500 text-base border border-gray-300 rounded pl-9 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 appearance-none cursor-pointer">
                                    <option value="createdAt">Sắp xếp theo ngày</option>
                                    <option value="name">Sắp xếp theo tên khám</option>
                                    <option value="price">Sắp xếp theo giá khám</option>
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
                                    setIsOpenAddNewSpecialty(true);
                                }}
                                className="bg-primary text-white px-2 py-2 outline-none rounded flex items-center gap-2 hover:bg-primary-2 transition-all duration-200">
                                <FaPlus className="fill-white" size={20} /> Thêm chuyên khoa
                            </button>
                        </div>
                    </div>
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-center border border-gray-300 whitespace-nowrap">
                                    <input type="checkbox" />
                                </th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Tên chuyên khoa</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Giá khám</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Giảm giá</th>
                                <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map((specialty, index) => (
                                <tr key={specialty.id}>
                                    <td className="text-center border border-gray-300 px-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300 items-center">
                                        <div className="flex gap-3 items-center">
                                            <span className="line-clamp-2">{specialty.name}</span>
                                        </div>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">
                                            {specialty.price
                                                .toString()
                                                .replace(/\D/g, "")
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                            đ
                                        </span>
                                    </td>
                                    <td className="text-left px-2 py-2 border border-gray-300">
                                        <span className="line-clamp-2">{specialty.discount}%</span>
                                    </td>

                                    <td className="text-left px-2 py-2 border border-gray-300 relative">
                                        <div className="flex gap-2 items-center">
                                            <span className="inline-block w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">{specialty.isPublic ? "Mở" : "Đóng"}</span>
                                            <label className="relative inline-flex cursor-pointer items-center">
                                                <input type="checkbox" checked={specialty.isPublic} className="peer sr-only" onChange={(e) => handlePublish(e, specialty)} />
                                                <div className="h-6 w-11 rounded-full border-gray-200 bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                            </label>
                                            <button className="text-white hover:bg-gray-200 transition-all px-2 py-2 outline-none rounded relative group">
                                                <IoMdMore />
                                                <div className="absolute top-full hidden group-hover:flex shadow rounded -right-2 z-20 p-3 min-w-32 flex-col bg-white gap-2 animate-fadeIn transition-all">
                                                    <button
                                                        onClick={() => handleEditSpecialty(specialty)}
                                                        className="text-orange-200 px-2 py-1 hover:bg-gray-200 outline-none rounded flex items-center gap-3 justify-center">
                                                        <CiEdit className="fill-orange-200" /> Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteSpecialty(specialty)}
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
                isOpenAddNewSpecialty && <ModalAddNewSpecialty load={load} setLoad={setLoad} isOpenAddNewSpecialty={isOpenAddNewSpecialty} setIsOpenAddNewSpecialty={setIsOpenAddNewSpecialty} />
            }
            {
                //edit clinic
                isOpenEditSpecialty && (
                    <ModalEditSpecialty
                        rowData={rowData}
                        setRowData={setRowData}
                        isOpenEditSpecialty={isOpenEditSpecialty}
                        setIsOpenEditSpecialty={setIsOpenEditSpecialty}
                        specialty={specialtyTarget}
                    />
                )
            }
            {
                //delete clinic
                isOpenAlertDelete && (
                    <ModalAlertDelete
                        load={load}
                        setLoad={setLoad}
                        isOpenAlertDelete={isOpenAlertDelete}
                        setIsOpenAlertDelete={setIsOpenAlertDelete}
                        id={specialtyTarget.id}
                        name={specialtyTarget.name}
                    />
                )
            }
        </>
    );
};

const ModalAddNewSpecialty = ({ isOpenAddNewSpecialty, setIsOpenAddNewSpecialty, load, setLoad }) => {
    const [specialtyName, setSpecialtyName] = useState("");
    const [specialtyPrice, setSpecialtyPrice] = useState("");
    const [specialtyDiscount, setSpecialtyDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({
        specialtyName: "",
    });
    const selector = useSelector((state) => state.auth);
    const handleSubmit = async () => {
        let validationErrors = {};

        if (!Validate.validateName(specialtyName)) {
            validationErrors.specialtyName = "Tên chuyên khoa không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        const data = {
            clinicId: selector.data.clinicId,
            name: specialtyName,
            price: +specialtyPrice.replace(/\./g, "") || 0,
            description: description,
            discount: +specialtyDiscount || 0,
        };

        //fetch data
        console.log(selector.accessToken);

        const response = await setData("/clinic/specialty/create", "POST", data, "application/json", selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }
        toast.success("Thêm phòng khám thành công!");
        setIsOpenAddNewSpecialty(false);
        setTimeout(() => {
            setLoad(!load);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm ${isOpenAddNewSpecialty ? "animate-fadeIn" : "animate-fadeOut"} transition-all duration-300`}>
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Thêm chuyên khoa</div>
                <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                    <div className="flex flex-col gap-2 relative ">
                        <label htmlFor="specialty-name" className="text-sm text-gray-600">
                            Tên chuyên khoa <span className="text-red-300">*</span>
                        </label>
                        <input type="text" id="specialty-name" className="border border-gray-300 rounded px-2 py-2 outline-none" onChange={(e) => setSpecialtyName(e.target.value)} />
                        <span className="text-red-300 text-sm absolute top-full">{errors.specialtyName}</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative ">
                                <label htmlFor="price_specialty" className="text-sm text-gray-600">
                                    Giá khám (VND)
                                </label>
                                <input
                                    value={
                                        specialtyPrice
                                            .toString()
                                            .replace(/\D/g, "")
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") || ""
                                    }
                                    type="text"
                                    id="price_specialty"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setSpecialtyPrice(e.target.value)}
                                />
                                <span className="text-red-300 text-sm absolute top-full">{errors.specialtyPrice}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="medicalPackage-discount" className="text-sm text-gray-600">
                                Giảm giá (%)
                            </label>
                            <input
                                id="medicalPackage-discount"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                className="border border-gray-300 rounded px-2 py-2 outline-none"
                                onChange={(e) => setSpecialtyDiscount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="specialty-description" className="text-sm text-gray-600">
                            Mô tả
                        </label>
                        <textarea
                            name=""
                            id="specialty-description"
                            cols="30"
                            rows="10"
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => {
                            setIsOpenAddNewSpecialty(false);
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

const ModalEditSpecialty = ({ isOpenEditSpecialty, setIsOpenEditSpecialty, specialty, setRowData, rowData }) => {
    const [specialtyName, setSpecialtyName] = useState(specialty.name);
    const [specialtyPrice, setSpecialtyPrice] = useState(specialty.price);
    const [specialtyDiscount, setSpecialtyDiscount] = useState(specialty.discount);
    const [description, setDescription] = useState(specialty.description);
    const [listType, setListType] = useState([]);
    const [errors, setErrors] = useState({
        specialtyName: "",
    });
    const selector = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        let validationErrors = {};

        if (!Validate.validateName(specialtyName)) {
            validationErrors.specialtyName = "Tên phòng khám không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (specialtyName === specialty.name && specialtyPrice === specialty.price && description === specialty.description && specialtyDiscount === specialty.discount) {
            toast.info("Không có gì thay đổi!");
            setIsOpenEditSpecialty(false);
            return;
        }
        setErrors({});
        const data = {
            id: specialty.id,
            name: specialtyName,
            price: +specialtyPrice.replace(/\./g, "") || 0,
            description: description,
            discount: specialtyDiscount,
        };

        //fetch data
        const response = await setData("/clinic/specialty/update", "PUT", data, "application/json", selector.accessToken);
        if (!response.isSuccess) {
            console.log(response.message);
            toast.error(response.message);
        }
        toast.success("Thông tin đã được cập nhật!");
        setIsOpenEditSpecialty(false);
        const newData = rowData.map((item) => {
            if (item.id === specialty.id) {
                return { ...data };
            }
            return item;
        });
        setRowData(newData);
    };

    return (
        <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60  backdrop-blur-sm transition-opacity duration-300">
            <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm ${isOpenEditSpecialty ? "animate-fadeIn" : "animate-fadeOut"} transition-all duration-300`}>
                <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Thêm phòng khám</div>
                <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                    <div className="flex flex-col gap-2 relative mb-5">
                        <label htmlFor="specialty-name" className="text-sm text-gray-600">
                            Tên chuyên khoa <span className="text-red-300">*</span>
                        </label>
                        <input
                            defaultValue={specialtyName}
                            type="text"
                            id="specialty-name"
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setSpecialtyName(e.target.value)}
                        />
                        <span className="text-red-300 text-sm absolute top-full">{errors.specialtyName}</span>
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="w-full">
                            <div className="flex flex-col gap-2 relative mb-2">
                                <label htmlFor="price_specialty" className="text-sm text-gray-600">
                                    Giá khám
                                </label>
                                <input
                                    type="text"
                                    value={
                                        specialtyPrice
                                            .toString()
                                            .replace(/\D/g, "")
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") || ""
                                    }
                                    id="price_specialty"
                                    className="border border-gray-300 rounded px-2 py-2 outline-none"
                                    onChange={(e) => setSpecialtyPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="medicalPackage-discount" className="text-sm text-gray-600">
                                Giảm giá (%)
                            </label>
                            <input
                                id="medicalPackage-discount"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                defaultValue={specialtyDiscount}
                                className="border border-gray-300 rounded px-2 py-2 outline-none"
                                onChange={(e) => setSpecialtyDiscount(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 relative mb-2">
                        <label htmlFor="specialty-description" className="text-sm text-gray-600">
                            Mô tả
                        </label>
                        <textarea
                            name=""
                            id="specialty-description"
                            cols="30"
                            rows="10"
                            className="border border-gray-300 rounded px-2 py-2 outline-none"
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => {
                            setIsOpenEditSpecialty(false);
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
        const response = await setData(`/clinic/specialty/delete?id=${id}&name=${name}`, "DELETE", null, "application/json", selector.accessToken);
        if (!response.isSuccess) {
            toast.error(response.message);
            setIsOpenAlertDelete(false);
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

export default DoctorManageSpecialty;
