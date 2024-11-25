import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserLogin } from "../features/authSlide";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const resultAction = await dispatch(fetchUserLogin({ username, password, role: "doctor" })).unwrap();
            if (resultAction.isSuccess) {
                console.log("Login success");
                navigate("/doctor");
            } else {
                console.log("Login failed");
                toast.error(resultAction.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex items-center h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Đăng nhập vào <span className="text-primary">BOOKING</span>
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Tài khoản <span className="text-red-300">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    onInput={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Mật khẩu <span className="text-red-300">*</span>
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-primary hover:text-indigo-500">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    onInput={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default DoctorLogin;
