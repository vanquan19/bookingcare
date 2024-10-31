import { Heading1, Heading3, Paragraph } from "./Text";
import IconBookFollowFacility from "../assets/images/Icon_DatKhamTaiCoSo.webp";
import IconBookFollowDoctor from "../assets/images/Icon_DatKhamTheoBacSi.webp";
import IconTest from "../assets/images/Icon_DatLichXetNghiem.webp";
const AchieveGoal = () => {
    return (
        <div className="relative flex flex-col gap-y-4 bg-primary p-8 rounded-3xl shadow-md ">
            <Heading1 className="text-white font-extrabold col-span-3 text-center">Thống kê</Heading1>
            <div className="flex mx-auto gap-12 relative">
                <div className="text-center flex flex-col items-center">
                    <div className="bg-white p-4 size-20 rounded-full my-8">
                        <img className="" src={IconBookFollowDoctor} alt="" />
                    </div>
                    <Heading3 className="text-white font-extrabold">2.2M+</Heading3>
                    <Paragraph className="text-gray-300 font-semibold text-md">Lượt khám</Paragraph>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-white p-4 size-20 rounded-full my-8">
                        <img src={IconBookFollowFacility} alt="" />
                    </div>
                    <Heading3 className="text-white font-extrabold">40+</Heading3>
                    <Paragraph className="text-gray-300 font-semibold text-md">Bệnh viện</Paragraph>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-white p-4 size-20 rounded-full my-8">
                        <img src={IconBookFollowFacility} alt="" />
                    </div>
                    <Heading3 className="text-white font-extrabold">50+</Heading3>
                    <Paragraph className="text-gray-300 font-semibold text-md">Cơ sở y tế</Paragraph>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-white p-4 size-20 rounded-full my-8">
                        <img src={IconBookFollowDoctor} alt="" />
                    </div>
                    <Heading3 className="text-white font-extrabold">1000+</Heading3>
                    <Paragraph className="text-gray-300 font-semibold text-md">Bác sĩ</Paragraph>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-white p-4 size-20 rounded-full my-8">
                        <img src={IconTest} alt="" />
                    </div>
                    <Heading3 className="text-white font-extrabold">138k+</Heading3>
                    <Paragraph className="text-gray-300 font-semibold text-md">Lượt truy cập</Paragraph>
                </div>
                <div className="text-center flex flex-col items-center">
                    <div className="bg-white p-4 size-20 rounded-full my-8">
                        <img src={IconTest} alt="" />
                    </div>
                    <Heading3 className="text-white font-extrabold">4600+</Heading3>
                    <Paragraph className="text-gray-300 font-semibold text-md">Lượt truy cập trong ngày</Paragraph>
                </div>
            </div>
        </div>
    );
};

export default AchieveGoal;
