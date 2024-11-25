import { useEffect, useState } from "react";
import { generateDate } from "../utils/calendar";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";
import dayjs from "dayjs";

const DatePicker = ({ onPicker = (selectDate) => selectDate }) => {
    const today = dayjs();
    const [date, setDate] = useState(today);
    const [selectDate, setSelectDate] = useState(today);
    useEffect(() => {
        onPicker(selectDate);
    }, [selectDate]);
    return (
        <div className="flex flex-col p-4 gap-2">
            <div className="flex gap-3 items-center mx-auto">
                <button disabled={today.month() >= date.month()} onClick={() => setDate(date.month(date.month() - 1))}>
                    <IoChevronBackCircleOutline size={30} className={`${today.month() >= date.month() ? "stroke-gray-500" : "stroke-primary"}`} />
                </button>
                <h2 className="text-lg font-bold text-primary">
                    Tháng {date.month()} - {date.year()}
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
                {generateDate(date.month(), date.year()).map((date, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setSelectDate(date.date)}
                            className={`p-2 md:cursor-pointer border-b border-r border-gray-400 font-semibold ${date.isCurrentMonth ? "text-gray-800" : "text-gray-500"} group`}>
                            <button
                                disabled={date.isPrefixDate}
                                className={`size-11 rounded-full  ${date.today && "bg-primary text-white group-hover:bg-primary-2"} ${
                                    date.isPrefixDate ? "text-gray-500" : "group-hover:bg-gray-200"
                                } ${selectDate.toDate().toDateString() === date.date.toDate().toDateString() && "bg-orange-100 group-hover:bg-orange-100"} transition-all duration-150`}>
                                {date.date.date()}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { DatePicker };
