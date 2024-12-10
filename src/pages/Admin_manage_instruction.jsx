import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData, setData } from "../utils/fetchData";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const ManageInstruction = () => {
    const [instructions, setInstructions] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        // Fetch instructions
        const fetchInstructions = async () => {
            try {
                const response = await getData("/instruction/get");
                if (!response.isSuccess) {
                    return toast.error(response.message);
                }

                setInstructions(response.data || "");
            } catch (error) {
                console.error(error);
            }
        };
        fetchInstructions();
    }, [load]);

    const handleCreateInstruction = () => {
        setModalType("create");
        setShowModal(true);
    };

    const handleEditInstruction = (instruction) => {
        setModalType("edit");
        setShowModal(true);
    };

    const handleDeleteInstruction = (instructionId) => {
        setModalType("delete");
        setShowModal(true);
    };

    return (
        <div className="w-full h-screen pt-20 overflow-x-scroll no-scrollbar pb-8 px-12">
            <div className="bg-white w-full rounded p-3">
                <ul className="flex gap-8 items-center">
                    <li className="flex gap-2 items-center  bg-primary text-white font-medium bg-blue-200/35 p-2 rounded-lg">Hướng dẫn đặt khám</li>
                    <Link to="/admin/question&answer">
                        <li className="flex gap-2 items-center text-gray-800 font-medium bg-blue-200/35 p-2 rounded-lg relative before:content-[''] before:absolute before:-left-4 before:h-4 before:w-[2px] before:bg-gray-600">
                            Câu hỏi thường gặp
                        </li>
                    </Link>
                </ul>
            </div>
            <div className=" pt-3 mt-4 rounded">
                {instructions ? (
                    <div
                        dangerouslySetInnerHTML={{ __html: instructions }}
                        onDoubleClick={() => handleEditInstruction(instructions)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleDeleteInstruction();
                        }}
                        className="bg-white p-4 rounded-lg relative cursor-pointer set_innerHTML"
                    />
                ) : (
                    <div className="flex justify-center flex-col items-center h-96">
                        <h2 className="">Bạn chưa có hướng dẫn đặt khám. Hãy tạo hướng dẫn đặt khám đầu tiên của bạn.</h2>

                        <button onClick={handleCreateInstruction} className="bg-primary p-4 rounded-lg font-medium text-white mt-3 hover:bg-primary-2 transition-all">
                            Tạo hướng dẫn đặt khám
                        </button>
                    </div>
                )}
            </div>
            {showModal && <Modal type={modalType} onClose={() => setShowModal(false)} instruction={instructions} load={load} setLoad={setLoad} />}
        </div>
    );
};

const Modal = ({ type, onClose, instruction, load, setLoad }) => {
    const [content, setContent] = useState(instruction || "");
    const handleCreateInstruction = async () => {
        // Handle form submission
        if (!content) return toast.error("Nội dung hướng dẫn không được để trống");

        const response = await setData("/instruction/create", "POST", { content });
        if (!response.isSuccess) {
            return toast.error(response.message);
        }
        toast.success(response.message);
        onClose();
        setLoad(!load);
    };

    const handleEditInstruction = async () => {
        // Handle form submission
        if (!content) return toast.error("Nội dung hướng dẫn không được để trống");

        const response = await setData("/instruction/update", "POST", { content });
        if (!response.isSuccess) {
            return toast.error(response.message);
        }
        toast.success(response.message);
        onClose();
        setLoad(!load);
    };

    const handleDeleteInstruction = async () => {
        const response = await setData("/instruction/update", "POST", { content: "" });
        if (!response.isSuccess) {
            return toast.error(response.message);
        }
        toast.success(response.message);
        onClose();
        setLoad(!load);
    };
    return (
        <div>
            <div>
                {type === "create" && (
                    <div className="bg-white p-4 rounded-lg fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pt-20">
                        <ReactQuill className="h-5/6 relative mb-12" onChange={setContent} />
                        <div className="ml-auto">
                            <button onClick={onClose} className="bg-gray-200 py-2 px-4 rounded-lg text-gray-800 font-medium mt-3 hover:bg-gray-300 transition-all">
                                Hủy
                            </button>
                            <button onClick={handleCreateInstruction} className="bg-primary py-2 px-4 rounded-lg text-white font-medium mt-3 ml-3 hover:bg-primary-2 transition-all">
                                Lưu
                            </button>
                        </div>
                    </div>
                )}
                {type === "edit" && (
                    <div className="bg-white p-4 rounded-lg fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pt-20">
                        <ReactQuill className="h-5/6 relative mb-12" value={content} onChange={setContent} />
                        <div className="ml-auto">
                            <button onClick={onClose} className="bg-gray-200 py-2 px-4 rounded-lg text-gray-800 font-medium mt-3 hover:bg-gray-300 transition-all">
                                Hủy
                            </button>
                            <button onClick={handleEditInstruction} className="bg-primary py-2 px-4 rounded-lg text-white font-medium mt-3 ml-3 hover:bg-primary-2 transition-all">
                                Lưu
                            </button>
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
                                    onClick={handleDeleteInstruction}
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

export default ManageInstruction;
