import { useState } from "react";
import { FaHospital, FaPhone } from "react-icons/fa";
import { setData } from "../utils/fetchData";
import { toast } from "react-toastify";

const Coorperation = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validate = {};
        if (!name) {
            validate.name = "Vui lòng nhập họ và tên";
        }
        if (!email) {
            validate.email = "Vui lòng nhập email";
        }
        if (!phone) {
            validate.phone = "Vui lòng nhập số điện thoại";
        }
        if (!description) {
            validate.description = "Vui lòng nhập ghi chú";
        }
        if (Object.keys(validate).length > 0) {
            setError(validate);
            return;
        }
        const data = {
            name,
            email,
            phone,
            description,
        };

        const response = await setData("/contacts/create", "POST", data);

        if (!response.isSuccess) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message);

        setError({});
    };

    return (
        <div className="pt-32">
            <div className="flex p-8 bg-white my-8 mx-16 rounded-lg">
                <div className="flex flex-col gap-4 w-full bg-whit">
                    <h1 className="font-bold m-2 text-xl uppercase text-gray-600">Thông tin chi tiết</h1>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <FaHospital size={30} className="fill-primary" />
                            <div className="flex flex-col">
                                <h2 className="font-bold text-lg">BOOKING - ĐẶT LỊCH KHÁM BỆNH</h2>
                                <p className="text-base text-gray-600">236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM</p>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhone size={30} className="fill-primary" />
                            <div className="flex flex-col ">
                                <h2 className="font-bold text-lg">HỖ TRỢ ĐẶT KHÁM</h2>
                                <p className="text-base text-gray-600">1900 2115</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} className="w-full gap-3 flex flex-col">
                    <div className="gap-2 flex flex-col relative mb-3">
                        <label className="font-medium text-gray-700" for="name">
                            Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input onChange={(e) => setName(e.target.value)} className="border border-gray-600 p-3 rounded-lg w-full outline-none" id="name" type="text" placeholder="Nhập họ và tên" />
                        <span className="absolute top-full text-red-300">{error.name}</span>
                    </div>
                    <div className="gap-2 flex flex-col relative mb-3">
                        <label className="font-medium text-gray-700" for="email">
                            Nhập email <span className="text-red-500">*</span>
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} className="border border-gray-600 p-3 rounded-lg w-full outline-none" id="email" type="text" placeholder="Nhập email" />
                        <span className="absolute top-full text-red-300">{error.email}</span>
                    </div>
                    <div className="gap-2 flex flex-col relative mb-3">
                        <label className="font-medium text-gray-700" for="sdt">
                            Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input onChange={(e) => setPhone(e.target.value)} className="border border-gray-600 p-3 rounded-lg w-full outline-none" id="std" type="text" placeholder="Nhập số điện thoại" />
                        <span className="absolute top-full text-red-300">{error.phone}</span>
                    </div>
                    <div className="gap-2 flex flex-col relative mb-3">
                        <label className="font-medium text-gray-700" for="ghichu">
                            Ghi chú <span className="text-red-500">*</span>
                        </label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="border border-gray-600 p-3 rounded-lg w-full size-40 outline-none" id="ghichu"></textarea>
                        <span className="absolute top-full text-red-300">{error.description}</span>
                    </div>
                    <button type="submit" className="ml-auto font-bold text-white bg-gradient-to-r from-primary-2 to-primary py-2 px-4 rounded-lg">
                        Đăng kí ngay
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Coorperation;
