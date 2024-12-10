import { useEffect, useState } from "react";
import { CiEdit, CiFilter, CiSearch, CiTrash, CiViewBoard } from "react-icons/ci";
import { FaAngleRight, FaChevronRight, FaPlus } from "react-icons/fa";
import { GrDocumentPpt } from "react-icons/gr";
import { IoMdMore } from "react-icons/io";
import { useSelector } from "react-redux";
import Validate from "../utils/Validate";
import { toast } from "react-toastify";
import { getData, setData } from "../utils/fetchData";
import ReactQuill from "react-quill";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ManageQuestionAndAnwser = () => {
    const [question_and_answer, setQuestionAndAnswer] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState("");
    const [debauceSearch, setDebauceSearch] = useState("");
    const [question, setQuestion] = useState({});
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
    }, [debauceSearch, load, type]);

    const handleCreateInstruction = () => {
        setModalType("create");
        setShowModal(true);
    };

    const handleEditInstruction = (question) => {
        setQuestion(question);
        setModalType("edit");
        setShowModal(true);
    };

    const handleDeleteInstruction = (question) => {
        setQuestion(question);
        setModalType("delete");
        setShowModal(true);
    };

    return (
        <div className="w-full h-screen pt-20 overflow-x-scroll no-scrollbar pb-8 px-12">
            <div className="bg-white w-full rounded p-3">
                <ul className="flex gap-8 items-center">
                    <Link to="/admin/instruction">
                        <li className="flex gap-2 items-center  text-gray-800 font-medium bg-blue-200/35 p-2 rounded-lg">Hướng dẫn đặt khám</li>
                    </Link>
                    <li className="flex gap-2 items-center  font-medium bg-primary text-white p-2 rounded-lg relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                        Câu hỏi thường gặp
                    </li>
                </ul>
            </div>
            <div className=" pt-3 mt-4 rounded">
                <div className="flex justify-end mb-4 px-3 items-center bg-white py-2 rounded-md">
                    <div className="gap-3 flex">
                        <div className="flex border border-gray-300 px-2 py-2 rounded items-center gap-2">
                            <CiSearch className=" text-gray-300 fill-gray-600" size={20} />
                            <input type="text" placeholder="Tìm kiếm câu hỏi" className="outline-none" onChange={(e) => setSearch(e.target.value)} />
                        </div>

                        <button
                            onClick={() => {
                                handleCreateInstruction();
                            }}
                            className="bg-primary text-white px-2 py-2 outline-none rounded flex items-center gap-2 hover:bg-primary-2 transition-all duration-200">
                            <FaPlus className="fill-white" size={20} /> Thêm câu hỏi
                        </button>
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
                                        }
                                        onDoubleClick={() => handleEditInstruction(QA)}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            handleDeleteInstruction(QA);
                                        }}>
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
            {showModal && <Modal type={modalType} onClose={() => setShowModal(false)} question={question} questionId={question.id} load={load} setLoad={setLoad} />}
        </div>
    );
};

const Modal = ({ type, onClose, question, questionId, load, setLoad }) => {
    const [questionData, setQuestionData] = useState(question?.question || "");
    const [answerData, setAnswerData] = useState(question?.answer || "");
    const [typeData, setTypeData] = useState(question?.type || "");
    const [error, setError] = useState({});
    const user = useSelector((state) => state.auth);

    const handleCreateQA = async () => {
        // Handle form submission
        const validateError = {};
        //check if the form is valid

        if (!Validate.validateName(questionData)) {
            validateError.question = "Câu hỏi không được để trống";
        }
        if (!Validate.validateName(answerData)) {
            validateError.answer = "Câu trả lời không được để trống";
        }
        if (!Validate.validateName(typeData)) {
            validateError.type = "Vấn đề không được để trống";
        }
        //check from not valid
        if (Object.keys(validateError).length > 0) {
            setError(validateError);
            return;
        }
        //if form is valid
        //call api to create question and answer
        const response = await setData("/question-and-answer/create", "POST", { question: questionData, answer: answerData, type: typeData }, null, user.accessToken);
        if (!response.isSuccess) return toast.error("Có lỗi xảy ra khi tạo câu hỏi");
        // Close the modal
        toast.success("Tạo câu hỏi thành công!");
        setError({});
        onClose();
        setLoad(!load);
    };

    const handleEditQA = async () => {
        // Handle form submission
        //check if the form is valid
        const validateError = {};
        if (!Validate.validateName(questionData)) {
            validateError.question = "Câu hỏi không được để trống";
        }
        if (!Validate.validateName(answerData)) {
            validateError.answer = "Câu trả lời không được để trống";
        }
        if (!Validate.validateName(typeData)) {
            validateError.type = "Vấn đề không được để trống";
        }

        //check from not valid
        if (Object.keys(validateError).length > 0) {
            setError(validateError);
            return;
        }

        if (questionData === question.question && answerData === question.answer && typeData === question.type) {
            toast.error("Không có gì thay đổi");
            return;
        }
        //if form is valid
        //call api to create question and answer
        const response = await setData(`/question-and-answer/update`, "POST", { question: questionData, answer: answerData, type: typeData, id: question.id }, null, user.accessToken);
        if (!response.isSuccess) return toast.error(response.message);
        // Close the modal
        toast.success("Sửa câu hỏi thành công!");
        setError({});
        onClose();
        setLoad(!load);
    };

    const handleDeleteQA = async () => {
        //call api to delete question and answer
        const response = await setData(`/question-and-answer/delete/${questionId}`, "DELETE", null, null, user.accessToken);
        if (!response.isSuccess) return toast.error("Có lỗi xảy ra khi xóa câu hỏi");
        // Close the modal
        toast.success("Xóa câu hỏi thành công!");
        onClose();
        setLoad(!load);
    };

    return (
        <div>
            <div>
                {type === "create" && (
                    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-400/5 bg-opacity-5  backdrop-blur-sm transition-opacity duration-300">
                        <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm animate-fadeIn transition-all duration-300`}>
                            <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Tạo câu hỏi mới</div>

                            <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                                <div className="flex flex-col gap-2 relative mb-2">
                                    <label htmlFor="instruction" className="text-gray-600">
                                        Câu hỏi
                                    </label>
                                    <input onChange={(e) => setQuestionData(e.target.value)} type="text" id="instruction" className="border border-gray-300 rounded-md p-2 outline-none" />
                                    <span className="text-red-200 absolute top-full">{error.question || ""}</span>
                                </div>
                                <div className="flex flex-col gap-2 relative mb-2">
                                    <label htmlFor="answer" className="text-gray-600">
                                        Câu trả lời
                                    </label>
                                    <ReactQuill onChange={setAnswerData} theme="snow" id="answer" className="" />
                                    <span className="text-red-200 absolute top-full">{error.answer || ""}</span>
                                </div>
                                <div className="flex flex-col gap-2 relative mb-2">
                                    <label htmlFor="type" className="text-gray-600">
                                        Vấn đề
                                    </label>
                                    <select onChange={(e) => setTypeData(e.target.value)} id="type" className="border border-gray-300 rounded-md p-2 outline-none">
                                        <option value="">--Chọn vấn đề--</option>
                                        <option value="genaral">Vấn đề chung</option>
                                        <option value="account">Vấn đề tài khoản</option>
                                        <option value="booking">Vấn đề đặt khám</option>
                                    </select>
                                    <span className="text-red-200 absolute top-full">{error.type || ""}</span>
                                </div>
                            </form>

                            <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                                <button
                                    onClick={onClose}
                                    className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Hủy bỏ
                                </button>

                                <button
                                    onClick={handleCreateQA}
                                    className="rounded-md font-semibold bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-2 focus:shadow-none active:bg-primary-2 hover:bg-primary-2 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                    type="button">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {type === "edit" && (
                    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-400/5 bg-opacity-5  backdrop-blur-sm transition-opacity duration-300">
                        <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm animate-fadeIn transition-all duration-300`}>
                            <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Sửa câu hỏi</div>

                            <form action="" className="flex flex-col gap-4 max-h-96 overflow-y-scroll no-scrollbar ">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="instruction" className="text-gray-600">
                                        Câu hỏi
                                    </label>
                                    <input
                                        defaultValue={questionData}
                                        onChange={(e) => setQuestionData(e.target.value)}
                                        type="text"
                                        id="instruction"
                                        className="border border-gray-300 rounded-md p-2 outline-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="answer" className="text-gray-600">
                                        Câu trả lời
                                    </label>

                                    <ReactQuill onChange={setAnswerData} theme="snow" id="answer" className="" defaultValue={answerData} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="type" className="text-gray-600">
                                        Vấn đề
                                    </label>
                                    <select defaultValue={typeData} onChange={(e) => setTypeData(e.target.value)} id="type" className="border border-gray-300 rounded-md p-2 outline-none">
                                        <option value="">--Chọn vấn đề--</option>
                                        <option value="genaral">Vấn đề chung</option>
                                        <option value="account">Vấn đề tài khoản</option>
                                        <option value="booking">Vấn đề đặt khám</option>
                                    </select>
                                </div>
                            </form>

                            <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                                <button
                                    onClick={onClose}
                                    className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Hủy bỏ
                                </button>

                                <button
                                    onClick={handleEditQA}
                                    className="rounded-md font-semibold bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-2 focus:shadow-none active:bg-primary-2 hover:bg-primary-2 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                    type="button">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {type === "delete" && (
                    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-gray-400/5 bg-opacity-5  backdrop-blur-sm transition-opacity duration-300">
                        <div className={`relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm animate-fadeIn transition-all duration-300`}>
                            <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">Xóa câu hỏi</div>
                            <div className="text-gray-600">Bạn có chắc chắn muốn xóa câu hỏi này?</div>
                            <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                                <button
                                    onClick={onClose}
                                    className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Hủy bỏ
                                </button>

                                <button
                                    onClick={handleDeleteQA}
                                    className="rounded-md font-semibold bg-red-400 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-500 focus:shadow-none active:bg-red-500 hover:bg-red-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                    type="button">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageQuestionAndAnwser;
