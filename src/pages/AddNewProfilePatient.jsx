import { useEffect, useState } from "react";
import { apiGetDistrict, apiGetProvince, apiGetWard } from "../utils/location";
import { toast } from "react-toastify";
import { setData } from "../utils/fetchData";
import { useSelector } from "react-redux";

const AddNewProfilePatient = () => {
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

        const response = await setData("/create-patient-profile", "POST", data, "application/json", token);

        if (response.isSuccess) {
            toast.success("Tạo hồ sơ thành công");
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
                                        <option key={province["id"]} value={province["id"]}>
                                            {province["name"]}
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
                                        <option key={district["id"]} value={district["id"]}>
                                            {district["name"]}
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
                                        <option key={ward["id"]} value={ward["id"]}>
                                            {ward["name"]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-base mb-2 font-medium" htmlFor="address">
                                Địa chỉ <span className="text-red-200">*</span>
                            </label>

                            <input
                                className="py-2 px-4 rounded-lg outline-none border border-gray-400 focus:border-green-300 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="số 1 ngõ 2 phố 3"
                                type="text"
                                id="address"
                                name="address"
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
export default AddNewProfilePatient;
