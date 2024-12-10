import { useEffect, useState } from "react";
import { Calendar } from "../components/DatePicker";
import { getData, setData } from "../utils/fetchData";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const DoctorManageSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [month, setMonth] = useState(dayjs().month());
    const [year, setYear] = useState(dayjs().year());
    const [selectDate, setSelectDate] = useState({});
    const [profiles, setProfiles] = useState([]);
    const selector = useSelector((state) => state.auth);

    useEffect(() => {
        // fetch profiles
        if (selectDate?.listProfile?.length > 0) {
            const fetchProfiles = async () => {
                try {
                    const response = await setData(`/history-booking-by-date`, "POST", { listProfile: selectDate.listProfile, doctorId: selector.data.doctorId }, null, selector.accessToken);
                    if (!response.isSuccess) {
                        console.log(response.message);
                        toast.error(response.message);
                        return;
                    }
                    console.log(response.data);
                    setProfiles(response.data);
                } catch (error) {
                    console.log(error);
                    toast.error("Internal server error");
                }
            };
            fetchProfiles();
        } else {
            setProfiles([]);
        }
    }, [selectDate]);

    useEffect(() => {
        // fetch schedules
        const fetchSchedules = async () => {
            try {
                const response = await getData(`/schedule?clinicId=${selector.data.clinicId}&doctorId=${selector.data.doctorId}&month=${month}&year=${year}`, selector.accessToken);
                if (!response.isSuccess) {
                    console.log(response.message);
                    toast.error(response.message);
                    return;
                }
                setSelectDate(response.currentDate || ((prev) => prev));
                setSchedules(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSchedules();
    }, [month, year]);
    return (
        <div>
            <Calendar onPicker={(selectDate) => setSelectDate(selectDate)} setMonth={setMonth} setYear={setYear} schedules={schedules} />
            <div className="p-4">
                <h1 className="font-medium text-xl text-primary text-center mb-2">
                    Lịch khám ngày {new Date(selectDate?.date).getDate() + " tháng " + (new Date(selectDate?.date).getMonth() + 1) + " năm " + new Date(selectDate?.date).getFullYear()}
                </h1>
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-center border border-gray-300 whitespace-nowrap">STT</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Họ và tên</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Email</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Số điện thoại</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Thời gian</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Loại hình khám</th>
                            <th className="text-left px-2 py-3 border border-gray-300 whitespace-nowrap">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles?.map((profile, index) => (
                            <tr key={profile.id}>
                                <td className="text-center border border-gray-300 px-2">{index + 1}</td>
                                <td className="text-left px-2 py-2 border border-gray-300 items-center">
                                    <div className="flex gap-3 items-center">
                                        <span className="line-clamp-2">{profile.fullname}</span>
                                    </div>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{profile.email}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{profile.phone}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{profile.time}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{profile.type}</span>
                                </td>
                                <td className="text-left px-2 py-2 border border-gray-300">
                                    <span className="line-clamp-2">{profile.status === 2 && <span className="text-orange-coral">Chưa khám</span>}</span>
                                    <span className="line-clamp-2">{profile.status === 3 && <span className="text-green-500">Đang khám</span>}</span>
                                </td>
                            </tr>
                        ))}
                        {
                            // Empty data
                            profiles?.length === 0 && (
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
export default DoctorManageSchedule;
