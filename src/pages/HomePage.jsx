import Navbar from "../components/Navbar";
import Banner from "../components/Banner1";
import Banner2 from "../components/Banner2";
import { Heading1, Paragraph } from "../components/Text";
import Introduction from "../components/Introduction";
import AchieveGoal from "../components/AchieveGoal";
import ListHospital from "../components/IntrodureListHospital";
import DownLoadApp from "../components/DownloadApp";
import MediaTalkAbout from "../components/MediaTalkAbout";
import NewsList from "../components/NewsList";



const HomePage = () => {
    return (
        <>
            <div className="max-h-screen h-screen flex flex-col justify-between">
                <div className="h-full">
                    <Banner />
                </div>
            </div>
            <main className="bg-[#e9f2f7] py-20 2lg:px-40 flex flex-col gap-y-16">
                <Introduction />
                <AchieveGoal />
            </main>
            <div className="bg-white flex flex-col items-center p-8 ">
                <Heading1 className="text-center text-primary font-extrabold">Bệnh viện tiêu biểu</Heading1>
                <Paragraph className="text-lg text-gray-500 font-semibold">Đặt lịch khám với hơn 70 bệnh viện trên khắp cả nước</Paragraph>
                <ListHospital />
            </div>
            <div>
                <Banner2 />
                {/* <DownLoadApp /> */}
                <MediaTalkAbout />
                <NewsList />
            </div>
        </>
    );
};

export default HomePage;
