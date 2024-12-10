import React, { useState, useRef } from "react";
import bgLogin from "../assets/images/bg-login.jpg";
import { Form, GroupItem, Input, Label } from "../components/Form";
import logo from "../assets/images/header_logo.png";
import { Button, GroupButton } from "../components/Button";
import { Link } from "../components/Text";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../configs/firebase.config";
import { getData, setData } from "../utils/fetchData";
import { useDispatch } from "react-redux";
import { fetchUserRegister, patientLogin } from "../features/authSlide";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isOpenOTP, setIsOpenOTP] = useState(false);
    const [OTP, setOTP] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalRegister, setShowModalRegister] = useState(false);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const dispath = useDispatch();

    const onRecaptchaVerify = () => {
        // Reset the RecaptchaVerifier if it exists and has expired
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear(); // Clear previous instance
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response) => {
                handleSendOTP();
            },
            "expired-callback": () => {
                console.log("Recaptcha expired. Please try again.");
            },
        });
    };

    const onSignUp = (e) => {
        e.preventDefault();
        //validate phone number
        if (!phone) {
            setError("Vui lòng nhập số điện thoại");
            return;
        }
        if (phone.length < 9) {
            setError("Số điện thoại không hợp lệ");
            return;
        }
        setLoading(true);
        onRecaptchaVerify();
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = "+84" + phone.replace(/\s/g, "");
        console.log("send OTP to: ", phoneNumber);

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setIsOpenOTP(true);
                toast.success("Mã OTP đã được gửi đến số điện thoại của bạn.");
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                if (error.code === "auth/too-many-requests") {
                    toast.error("Bạn đã yêu cầu OTP quá nhiều lần. Vui lòng thử lại sau.");
                } else {
                    toast.error(error.message);
                }
            });
    };

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        if (OTP.length < 6) {
            toast.error("Vui lòng nhập đủ 6 số OTP");
            return;
        }
        const code = OTP.join("");
        window.confirmationResult

            .confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;

                console.log("User signed in successfully: ", user);
                handleCheckUserExist();
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.error("Error while signing in: ", error);
                toast.error("Mã OTP không hợp lệ");
                // ...
            });
    };
    const handleCheckUserExist = async () => {
        // check user exist in database
        const response = await getData(`/check-phone?phone=${phone}`);

        // if exist => redirect to back page
        if (response.isSuccess) {
            toast.success("Đăng nhập thành công");

            // save user info to local storage
            dispath(patientLogin(response));
            // redirect to back page
            window.history.back();
        }
        // if not exist => redirect to register page
        else {
            setShowModalRegister(true);
        }
    };

    const handleInputPhoneNumber = (e) => {
        setError("");
        let value = e.target.value.replace(/\D/g, "");
        let newValue = "";

        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 3 === 0) {
                newValue += " ";
            }
            newValue += value[i];
        }

        e.target.value = newValue;
        setPhone(value);
    };
    const handleAddPatient = async () => {
        if (!fullname || !email || !address) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const data = {
            name: fullname,
            phone: phone,
            email: email,
            address: address,
        };
        const result = await dispath(fetchUserRegister(data)).unwrap();

        if (result.isSuccess) {
            toast.success("Đăng ký tài khoản thành công");
            setShowModalRegister(false);
            window.history.back();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <>
            <div className="flex justify-between">
                <div className="w-full h-screen flex">
                    <div id="recaptcha-container"></div>
                    <div className="md:w-1/2 sm:w-2/3 w-full sm:px-none px-4  m-auto">
                        <Link href="/">
                            <div className="h-20 overflow-hidden">
                                <img src={logo} alt="logo" className="h-full w-full object-cover" />
                            </div>
                        </Link>
                        <Form onSubmit={onSignUp} className="flex flex-col lg:gap-14 gap-8">
                            <GroupItem className="text-center gap-8">
                                <Label>Vui lòng nhập số điện thoại để tiếp tục</Label>
                                <div className="relative">
                                    <div className={`flex items-center border rounded text-left pl-4  transition-all ${error ? "border-red-300 " : "border-gray-500 focus-within:border-primary"}`}>
                                        <span className="font-semibold">VI</span> +84
                                        <Input onChange={handleInputPhoneNumber} className="border-0 rounded-l-none px-1 w-full appearance-none" type="text" maxLength={15} />
                                    </div>
                                    {error && <p className="text-red-300 text-sm absolute top-full left-0">{error}</p>}
                                </div>
                                {isOpenOTP && <OTPField setValue={setOTP} />}
                                <GroupButton className="flex-col gap-4">
                                    {isOpenOTP ? (
                                        <Button size="md" type="button" onClick={handleOTPSubmit} className="bg-primary-2 hover:bg-primary-3 transition-all text-white font-semibold">
                                            Xác nhận OTP
                                        </Button>
                                    ) : (
                                        <>
                                            {loading ? (
                                                <Button disable={true} size="md" type="button" className="bg-primary-2 hover:bg-primary-3 transition-all text-white font-semibold ">
                                                    Đang xử lý...
                                                </Button>
                                            ) : (
                                                <Button size="md" type="submit" className="bg-primary-2 hover:bg-primary-3 transition-all text-white font-semibold">
                                                    Gửi mã OTP
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </GroupButton>
                            </GroupItem>
                            <GroupButton className="flex-col text-center">
                                Hoặc đăng nhập bằng tài khoản
                                <Button
                                    type="button"
                                    className="bg-gradient-to-r from-orange-orangered to-orange-tomato border-none hover:from-orange-tomato hover:to-orange-coral text-white transition-all"
                                    size="2ms">
                                    Đăng nhập với Google
                                </Button>
                                <Button type="button" className="bg-gradient-to-r from-blue-300 to-blue-200 border-none hover:from-blue-400 hover:to-blue-300 text-white transition-all" size="2ms">
                                    Đăng nhập với Facebook
                                </Button>
                            </GroupButton>
                        </Form>
                    </div>
                </div>
                <div className="w-full h-screen bg-cover bg-center lg:block hidden" style={{ backgroundImage: `url(${bgLogin})` }}>
                    <div className="bg-white h-full w-12 clip-right"></div>
                </div>
            </div>
            {showModalRegister && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">
                    <div className="bg-white p-8 rounded-lg w-[40%] animate-fadeIn">
                        <h2 className="text-2xl font-semibold text-center">Đăng ký tài khoản</h2>
                        <p className="text-center text-gray-500">Số điện thoại của bạn chưa được đăng ký. Vui lòng hoàn tất thông tin đăng ký để đăng nhập.</p>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="fullname">
                                    Họ và tên <span className="text-red-300">*</span>
                                </label>
                                <input onChange={(e) => setFullname(e.target.value)} id="fullname" type="text" className="border border-gray-400 rounded-lg px-2 py-3 w-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">
                                    Email <span className="text-red-300">*</span>
                                </label>
                                <input onChange={(e) => setEmail(e.target.value)} id="email" type="text" className="border border-gray-400 rounded-lg px-2 py-3 w-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="address">
                                    Địa chỉ <span className="text-red-300">*</span>
                                </label>
                                <input onChange={(e) => setAddress(e.target.value)} id="address" type="text" className="border border-gray-400 rounded-lg px-2 py-3 w-full" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4 ">
                            <buton
                                type="button"
                                onClick={() => setShowModalRegister(false)}
                                className="md:cursor-pointer hover:bg-gray-200 transition-all text-gray-700 font-semibold px-4 py-3 rounded-lg">
                                Hủy
                            </buton>
                            <buton
                                onClick={() => handleAddPatient()}
                                type="button"
                                className="bg-primary-2 hover:bg-primary-3 transition-all text-white font-semibold px-4 py-3 rounded-lg md:cursor-pointer">
                                Đăng ký
                            </buton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const OTPField = ({ setValue }) => {
    const length = 6;
    const [otp, setOtp] = useState(Array(length).fill("")); // Array with 6 empty strings
    const inputRefs = useRef([]); // Array of refs for each input field

    const handleKeyDown = (e) => {
        if (!/^[0-9]{1}$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && !e.metaKey) {
            e.preventDefault();
        }

        if (e.key === "Delete" || e.key === "Backspace") {
            const index = inputRefs.current.indexOf(e.target);
            if (index > 0) {
                setOtp((prevOtp) => [...prevOtp.slice(0, index - 1), "", ...prevOtp.slice(index)]);
                setValue([...otp.slice(0, index - 1), "", ...otp.slice(index)]);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleInput = (e) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target);
        if (target.value) {
            setOtp((prevOtp) => [...prevOtp.slice(0, index), target.value, ...prevOtp.slice(index + 1)]);
            setValue([...otp.slice(0, index), target.value, ...otp.slice(index + 1)]);
            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
            return;
        }
        const digits = text.split("");
        setOtp(digits);
        setValue(digits);
    };
    return (
        <section className="bg-white dark:bg-dark w-full">
            <div className="container">
                <form id="otp-form" className={`grid grid-cols-${length || 6} gap-2`}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            onFocus={handleFocus}
                            onPaste={handlePaste}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="shadow-xs flex col-span-1  items-center justify-center rounded-lg border border-gray-400 bg-white p-2 text-center text-lg font-medium text-gray-700 outline-none sm:text-2xl dark:border-dark-3 dark:bg-white/5"
                        />
                    ))}
                    {/* You can conditionally render a submit button here based on otp length */}
                </form>
            </div>
        </section>
    );
};

export default Login;
