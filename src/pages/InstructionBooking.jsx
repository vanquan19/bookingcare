import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData } from "../utils/fetchData";
import { toast } from "react-toastify";

const InstructionBooking = () => {
    const [instructions, setInstructions] = useState("");

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
    }, []);

    return (
        <div className="w-full  pt-32 overflow-x-scroll pb-8 no-scrollbar px-12">
            <div className=" pt-3 mt-4 rounded">
                {instructions ? (
                    <div dangerouslySetInnerHTML={{ __html: instructions }} className="bg-white p-4 rounded-lg relative cursor-pointer set_innerHTML" />
                ) : (
                    <div className="flex justify-center flex-col items-center h-96">
                        <h2 className="">Chưa có hướng dẫn đặt khám</h2>
                    </div>
                )}
            </div>
        </div>
    );
};
export default InstructionBooking;
