import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { getData } from "../utils/fetchData";
import { FaChevronDown } from "react-icons/fa6";

const QuestionAndAnwser = () => {
    const [question_and_answer, setQuestionAndAnswer] = useState([]);
    const [search, setSearch] = useState("");
    const [debauceSearch, setDebauceSearch] = useState("");
    const [type, setType] = useState("genaral");
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDebauceSearch(search);
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [search]);

    useEffect(() => {
        // Fetch instructions from the server
        const getInstructions = async () => {
            const response = await getData(`/question-and-answer/get-all?search=${debauceSearch}&type=${type}`);
            if (!response.isSuccess) return toast.error(response.message);
            setQuestionAndAnswer(response.data);
        };
        getInstructions();
    }, [debauceSearch, type]);

    return (
        <div className="w-full h-screen pt-32 overflow-x-scroll no-scrollbar pb-8 px-12">
            <div className=" pt-3 mt-4 rounded">
                <div className="flex justify-end mb-4 px-3 items-center bg-white py-2 rounded-md">
                    <div className="flex border border-gray-300 px-2 py-2 rounded items-center gap-2 w-1/2">
                        <CiSearch className=" text-gray-300 fill-gray-600" size={20} />
                        <input type="text" placeholder="Tìm kiếm câu hỏi" className="outline-none" onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                        <div className="bg-white p-4 rounded-md">
                            <div className="flex items-center p-2 mb-2 rounded-md w-full bg-gradient-to-r from-primary-2 to-primary font-medium text-white gap-2">Danh sách câu hỏi</div>
                            <button
                                onClick={() => setType("genaral")}
                                className={`flex items-center p-2 mb-2 rounded-md w-full ${
                                    type == "genaral" ? "bg-gradient-to-r from-primary-2 to-primary text-white" : "bg-gray-200 text-gray-700"
                                } font-medium gap-2 hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary hover:text-white duration-150 transition-all group`}>
                                <FaChevronRight className={`group-hover:fill-white ${type == "genaral" ? "fill-white" : ""}`} />
                                Vấn đề chung
                            </button>
                            <button
                                onClick={() => setType("account")}
                                className={`flex items-center p-2 mb-2 rounded-md w-full ${
                                    type == "account" ? "bg-gradient-to-r from-primary-2 to-primary text-white" : "bg-gray-200 text-gray-700"
                                } font-medium gap-2 hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary hover:text-white duration-150 transition-all group`}>
                                <FaChevronRight className={`group-hover:fill-white ${type == "account" ? "fill-white" : ""}`} />
                                Vấn đề tài khoản
                            </button>
                            <button
                                onClick={() => setType("booking")}
                                className={`flex items-center p-2 mb-2 rounded-md w-full ${
                                    type == "booking" ? "bg-gradient-to-r from-primary-2 to-primary text-white" : "bg-gray-200 text-gray-700"
                                } font-medium gap-2 hover:bg-gradient-to-r hover:from-primary-2 hover:to-primary hover:text-white duration-150 transition-all group`}>
                                <FaChevronRight className={`group-hover:fill-white ${type == "booking" ? "fill-white" : ""}`} />
                                Vấn đề về quy trình đặt khám
                            </button>
                        </div>
                    </div>
                    <ul className="flex flex-col gap-2 col-span-2">
                        {question_and_answer.map((QA, index) => (
                            <li key={QA.id} className="bg-white rounded-lg shadow-sm md:cursor-pointer">
                                <div className="relative ">
                                    <h2
                                        className="font-medium border-b p-2"
                                        onClick={() =>
                                            setActiveIndex(() => {
                                                if (activeIndex === index) return null;
                                                return index;
                                            })
                                        }>
                                        {QA.question}
                                    </h2>
                                    {activeIndex === index ? (
                                        <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 fill-gray-600 size-3" />
                                    ) : (
                                        <FaChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 fill-gray-600 size-3" />
                                    )}
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{ __html: QA.answer }}
                                    className={`${activeIndex === index ? "block" : "hidden"} mt-2 text-gray-600 set_innerHTML px-4 pb-2 animate-scroll-down overflow-hidden`}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default QuestionAndAnwser;
