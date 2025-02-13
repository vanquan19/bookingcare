import { useEffect, useState } from "react";
import { getData, setData } from "../utils/fetchData";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";

const InfomationClinic = () => {
    const [clinic, setClinic] = useState([]);
    const [show, setShow] = useState(false);
    const [load, setLoad] = useState(false);
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        // Call API
        const fetchData = async () => {
            const res = await getData(`/clinic/read?id=${auth.data.clinicId}`);
            if (!res.isSuccess) {
                return toast.error(res.message);
            }
            console.log(res.data);

            setClinic(res.data);
        };
        fetchData();
    }, [load]);

    return (
        <div>
            <div onDoubleClick={() => setShow(true)} dangerouslySetInnerHTML={{ __html: clinic.content || <span>Vui lòng thêm mô tả.</span> }} className="set_innerHTML" />
            {show && <ModalUpdateContent clinic={clinic} setShow={setShow} load={load} setLoad={setLoad} />}
        </div>
    );
};

const ModalUpdateContent = ({ clinic, setShow, load, setLoad }) => {
    const [content, setContent] = useState(clinic?.content);
    const auth = useSelector((state) => state.auth);
    const handleUpdateContent = async () => {
        if (content === clinic.content) {
            return toast.error("Nội dung không được trùng với nội dung cũ");
        }
        const response = await setData(`/clinic/set-content`, "POST", { id: clinic.id, content }, null, auth.accessToken);
        if (!response.isSuccess) {
            return toast.error(response.message);
        }
        setShow(false);
        toast.success(response.message);
        setLoad(!load);
    };
    return (
        <div className="fixed inset-0 z-[999] w-screen h-3/4 place-items-center bg-gray-400/5 bg-opacity-5  backdrop-blur-sm transition-all duration-300">
            <div className={`relative p-4 w-full min-w-[40%] rounded-lg bg-white shadow-sm animate-fadeIn transition-all duration-300`}>
                <ReactQuill onChange={setContent} theme="snow" className="h-[80vh] mb-12" id="answer" defaultValue={content} />

                <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button
                        onClick={() => setShow(false)}
                        className="rounded-md font-semibold border border-transparent py-2 px-4 text-center text-sm transition-all text-gray-600 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
                        Hủy bỏ
                    </button>

                    <button
                        onClick={handleUpdateContent}
                        className="rounded-md font-semibold bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-2 focus:shadow-none active:bg-primary-2 hover:bg-primary-2 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                        type="button">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};
export default InfomationClinic;
