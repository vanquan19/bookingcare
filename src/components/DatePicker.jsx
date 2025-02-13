import { useEffect, useState } from "react";
import { generateDate } from "../utils/calendar";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";
import dayjs from "dayjs";
import { FaDotCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { getData } from "../utils/fetchData";

const DatePicker = ({ clinicId, doctorId, setListTime, onPicker = (selectDate) => selectDate }) => {
    const today = dayjs();
    const [date, setDate] = useState(today);
    const [selectDate, setSelectDate] = useState(today);
    const [data, setData] = useState([]);
    useEffect(() => {
        onPicker(selectDate);
    }, [selectDate]);

    useEffect(() => {
        const generateDate = async () => {
            const response = await getData(`/schedule/calendar?clinicId=${clinicId}&doctorId=${doctorId}&amount=3&month=${date.month()}&year=${date.year()}`);
            console.log(response);

            if (!response.isSuccess) {
                return console.log(response.message);
            }
            setData(response.data);
            const listTime = response.data.find((date) => dayjs(date.date).date() == today.date() && dayjs(date.date).month() == today.month() && dayjs(date.date).year() == today.year());

            setListTime(listTime.listTime);
        };
        generateDate();
    }, [date]);

    return (
        <div className="flex flex-col p-4 gap-2">
            <div className="flex gap-3 items-center mx-auto">
                <button disabled={today.month() >= date.month()} onClick={() => setDate(date.month(date.month() - 1))}>
                    <IoChevronBackCircleOutline size={30} className={`${today.month() >= date.month() ? "stroke-gray-500" : "stroke-primary"}`} />
                </button>
                <h2 className="text-lg font-bold text-primary">
                    Tháng {date.month() + 1} - {date.year()}
                </h2>
                <button disabled={date.month() >= today.month() + 1} onClick={() => setDate(date.month(date.month() + 1))}>
                    <IoChevronForwardCircleOutline size={30} className={`${date.month() >= today.month() + 1 ? "stroke-gray-500" : "stroke-primary"}`} />
                </button>
            </div>
            <div className="grid grid-cols-7 text-center border-t border-l border-gray-400">
                <div className="py-3 border-b border-r border-gray-400 font-semibold text-red-400">CN</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Hai</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Ba</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Tư</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Năm</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Sáu</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold text-orange-coral">Bảy</div>
                {data.map((date, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectDate(dayjs(date.date));
                                setListTime(date.listTime);
                            }}
                            className={`p-2 md:cursor-pointer border-b border-r border-gray-400 font-semibold ${date.isCurrentMonth ? "text-gray-800" : "text-gray-500"} ${
                                date.listTime.length < 1 || (date.isPrefixDate && "pointer-events-none")
                            } group`}>
                            <button
                                disabled={date.isPrefixDate || date.listTime.length < 1}
                                className={`size-11 rounded-full  ${date.today && "bg-primary text-white group-hover:bg-primary-2"} ${
                                    date.isPrefixDate ? "text-gray-500" : "group-hover:bg-gray-200"
                                }  ${new Date(selectDate).toDateString() === new Date(date.date).toDateString() && "bg-orange-100 group-hover:bg-orange-100"} transition-all duration-150`}>
                                {new Date(date.date).getDate()}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Calendar = ({ schedules, setMonth, setYear, onPicker = (selectDate) => selectDate }) => {
    const today = dayjs();
    const [date, setDate] = useState(today);
    const [selectDate, setSelectDate] = useState(today);
    useEffect(() => {
        onPicker(selectDate);
    }, [selectDate]);

    useEffect(() => {
        setMonth(date.month());
        setYear(date.year());
    }, [date]);
    return (
        <div className="flex flex-col p-4 gap-2">
            <div className="flex gap-3 items-center mx-auto">
                <button disabled={today.month() >= date.month()} onClick={() => setDate(date.month(date.month() - 1))}>
                    <IoChevronBackCircleOutline size={30} className={`${today.month() >= date.month() ? "stroke-gray-500" : "stroke-primary"}`} />
                </button>
                <h2 className="text-lg font-bold text-primary">
                    Tháng {date.month() + 1} - {date.year()}
                </h2>
                <button disabled={date.month() >= today.month() + 1} onClick={() => setDate(date.month(date.month() + 1))}>
                    <IoChevronForwardCircleOutline size={30} className={`${date.month() >= today.month() + 1 ? "stroke-gray-500" : "stroke-primary"}`} />
                </button>
            </div>
            <div className="grid grid-cols-7 text-center border-t border-l border-gray-400">
                <div className="py-3 border-b border-r border-gray-400 font-semibold text-red-400">CN</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Hai</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Ba</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Tư</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Năm</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold">Sáu</div>
                <div className="py-3 border-b border-r border-gray-400 font-semibold text-orange-coral">Bảy</div>
                {schedules.map((date, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setSelectDate(date)}
                            className={`p-2 relative md:cursor-pointer border-b border-r border-gray-400 font-semibold ${date.isCurrentMonth ? "text-gray-800" : "text-gray-500"} group`}>
                            <button
                                className={`size-11 rounded-full  ${
                                    date.today && "bg-primary text-white group-hover:bg-primary-2"
                                } hover:bg-gray-200 focus:bg-orange-100 focus:text-white transition-all duration-150`}>
                                {new Date(date.date).getDate()}
                            </button>
                            <div className="flex p-2 absolute top-0 right-0">
                                {date.listProfile &&
                                    date.listProfile.map((profile, index) => (
                                        <span key={index}>
                                            <GoDotFill className="fill-red-300/75" />
                                        </span>
                                    ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { DatePicker, Calendar };
