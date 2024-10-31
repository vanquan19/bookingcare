import { useState } from "react";
import bgLogin from "../assets/images/bg-login.jpg";
import { Form, GroupItem, Input, Label } from "../components/Form";
import logo from "../assets/images/header_logo.png";
import { Button, GroupButton } from "../components/Button";
import { Link } from "../components/Text";
const Login = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
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
        // Login logic here
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

    return (
        <div className="flex justify-between">
            <div className="w-full h-screen flex">
                <div className="md:w-1/2 sm:w-2/3 w-full sm:px-none px-4  m-auto">
                    <Link href="/">
                        <div className="h-20 overflow-hidden">
                            <img src={logo} alt="logo" className="h-full w-full object-cover" />
                        </div>
                    </Link>
                    <Form onSubmit={handleSubmit} className="flex flex-col lg:gap-14 gap-8">
                        <GroupItem className="text-center gap-8">
                            <Label>Vui lòng nhập số điện thoại để tiếp tục</Label>
                            <div className="relative">
                                <div className={`flex items-center border rounded text-left pl-4  transition-all ${error ? "border-red-300 " : "border-gray-500 focus-within:border-primary"}`}>
                                    <span className="font-semibold">VI</span> +84
                                    <Input onChange={handleInputPhoneNumber} className="border-0 rounded-l-none px-1 w-full appearance-none" type="text" maxLength={15} />
                                </div>
                                {error && <p className="text-red-300 text-sm absolute top-full left-0">{error}</p>}
                            </div>

                            <Button size="md" type="submit" className=" bg-primary-2 hover:bg-primary-3 transition-all text-white font-semibold">
                                Tiếp tục
                            </Button>
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
    );
};
export default Login;
