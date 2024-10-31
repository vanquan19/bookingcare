import { useState } from "react";
import { Form, GroupItem, Input, Label } from "../components/Form";
import { Heading1, Paragraph } from "../components/Text";
import { Button } from "../components/Button";

const HealthCheckForBusiness = () => {
    const [fullname, setFullname] = useState("");
    const [company, setCompany] = useState("");
    const [amount, setAmount] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState({});

    const listEtrodure = [
        {
            text: "Sở hữu mạng lưới hợp tác cơ sở y tế Công/Tư rộng khắp cả nước, Medpro đã và đang triển khai hiệu quả các chương trình khám sức khỏe định kỳ cho người lao động tại các doanh nghiệp.",
        },
        { text: "Đối tác của Medpro là những đơn vị y tế hàng đầu, uy tín, đảm bảo tiêu chuẩn chất lượng về trình độ chuyên môn và trang thiết bị y tế hiện đại, tiên tiến." },
        {
            text: "Trải nghiệm dịch vụ trên nền tảng, Quý doanh nghiệp/ tổ chức sẽ được thừa hưởng các tiện ích y tế tốt nhất, đi kèm nhiều lợi ích Medpro mang lại, bao gồm:",
            subText: [
                'Medpro cung cấp dịch vụ "Khám sức khỏe doanh nghiệp" toàn quốc phủ sóng từ Bắc chí Nam đáp ứng mọi nhu cầu cho từng chi nhánh',
                "Các hạng mục khám sức khỏe đa dạng, linh động đi từ cơ bản đến chuyên sâu, phù hợp với ngân sách và ngành nghề của mỗi doanh nghiệp.",
                "Thời gian khám linh động, hỗ trợ lấy mẫu xét nghiệm tận nơi.",
                'Chăm sóc sức khỏe sau khám cho cán bộ nhân viên qua hình thức Bác sĩ "Tư vấn khám bệnh qua video".',
                "Tư vấn với các cơ sở y tế/ bác sĩ chuyên trị đầu ngành đối với các bệnh lý cụ thể.",
            ],
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        //validate value
        const error = {};
        if (!fullname) {
            error.fullname = "Vui lòng nhập họ và tên";
            setError(error);
        }
        if (!company) {
            error.company = "Vui lòng nhập tên công ty";
            setError(error);
        }
        if (!amount) {
            error.amount = "Vui lòng nhập số lượng nhân viên";
            setError(error);
        }
        if (!phone) {
            error.phone = "Vui lòng nhập số điện thoại";
            setError(error);
        }

        if (phone.length < 9) {
            error.phone = "Số điện thoại không hợp lệ";
            setError(error);
        }
        if (Object.keys(error).length > 0) return;
        // Login logic here
    };

    const handleInputValue = (e) => {
        setError({});
        if (e.target.name === "fullname") {
            setFullname(e.target.value);
        } else if (e.target.name === "company") {
            setCompany(e.target.value);
        } else if (e.target.name === "amount") {
            handleInputPhoneNumber(e);
            setAmount(e.target.value);
        } else if (e.target.name === "phone") {
            handleInputPhoneNumber(e);
            setPhone(e.target.value);
        }
    };

    const handleInputPhoneNumber = (e) => {
        setError({});
        let value = e.target.value.replace(/\D/g, "");
        let newValue = "";
        //format phone number
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 3 === 0) {
                newValue += " ";
            }
            newValue += value[i];
        }
        e.target.value = newValue;
    };
    return (
        <section className="mt-32 w-full flex flex-col items-center ">
            <div className="text-center flex flex-col items-center gap-3 py-12 w-full bg-white">
                <Heading1 className="text-primary">Gói khám sức khỏe dành cho doanh nghiệp</Heading1>
                <Paragraph className="text-lg w-2/3">
                    Cung cấp các gói khám và dịch vụ chăm sóc sức khỏe dành cho nhân viên từ hơn 100 cơ sở y tế hàng đầu trên nền tảng Medpro với mức chiết khấu ưu đãi
                </Paragraph>
            </div>
            <div className="w-2/3 flex justify-between gap-6 m-12">
                <div className="w-full flex flex-col gap-2">
                    {listEtrodure.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2">
                            <div className="size-8 text-center rounded-full bg-primary text-lg font-bold text-white mt-2">{index + 1}</div>
                            <div className="col-span-11">
                                <Paragraph>{item.text}</Paragraph>
                                {item.subText && (
                                    <ul className="list-disc pl-6">
                                        {item.subText.map((subItem, subIndex) => (
                                            <li key={subIndex}>{subItem}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <Form onSubmit={handleSubmit} className="w-full">
                    <GroupItem>
                        <Label forID="fullname">
                            Họ và tên <span className="text-red-100">*</span>
                        </Label>
                        <Input size="md" id="fullname" name="fullname" placeholder="Nhập họ và tên" onChange={handleInputValue} />
                        {error.fullname && <p className="text-red-300 text-sm absolute top-full left-0">{error.fullname}</p>}
                    </GroupItem>
                    <GroupItem>
                        <Label forID="company">
                            Tên công ty <span className="text-red-100">*</span>
                        </Label>
                        <Input size="md" id="company" name="company" placeholder="Nhập tên công ty" onChange={handleInputValue} />
                        {error.company && <p className="text-red-300 text-sm absolute top-full left-0">{error.company}</p>}
                    </GroupItem>
                    <GroupItem>
                        <Label forID="amount">
                            Số lượng nhân viên <span className="text-red-100">*</span>
                        </Label>
                        <Input size="md" className="con" id="amount" name="amount" placeholder="Nhập số lượng nhân viên" onChange={handleInputValue} />
                        {error.amount && <p className="text-red-300 text-sm absolute top-full left-0">{error.amount}</p>}
                    </GroupItem>
                    <GroupItem>
                        <Label forID="phone">
                            Số điện thoại <span className="text-red-100">*</span>
                        </Label>
                        <Input size="md" id="phone" name="phone" placeholder="Nhập số điện thoại" onChange={handleInputValue} />
                        {error.phone && <p className="text-red-300 text-sm absolute top-full left-0">{error.phone}</p>}
                    </GroupItem>
                    <Button
                        type="submit"
                        size="2ms"
                        className="w-1/2 ml-auto border-none bg-gradient-to-r from-primary-2 to-primary hover:from-primary-3 hover:to-primary-2 transition-all text-white font-medium">
                        Đăng ký ngay
                    </Button>
                </Form>
            </div>
        </section>
    );
};
export default HealthCheckForBusiness;
