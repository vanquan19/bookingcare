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

const news = [
    {
        title: "Bệnh viện mắt TP.HCM chính thức ra mắt ứng dụng đặt lịch",
        description: "Bệnh viện mắt TP.HCM ",
        image: "https://medpro.vn/_next/static/media/thanh-nien-logo.e8e27f62.png",
        link: "https://thanhnien.vn/benh-vien-mat-tphcm-chinh-thuc-ra-mat-ung-dung-dat-lich-1851509686.htm",
    },
    {
        title: "Chuyển đổi số ngành y tế cần bắt đầu từ việc đăng ký khám chữa bệnh",
        description: "Chuyển đổi số ngà",
        image: "https://medpro.vn/_next/static/media/tuoi-tre-logo.96edf351.png",
        link: "https://tuoitre.vn/chuyen-doi-so-nganh-y-te-can-bat-dau-tu-viec-dang-ky-kham-chua-benh-20230216172403962.htm",
    },
    {
        title: "Ra mắt phần mềm MedPro hỗ trợ đăng ký tiêm chủng vaccine",
        description: "Ra mắt phần mềm Med",
        image: "https://medpro.vn/_next/static/media/bao-nhan-dan.0a666fdb.webp",
        link: "https://nhandan.vn/ra-mat-phan-mem-medpro-ho-tro-dang-ky-tiem-chung-vaccine-post651550.html",
    },
    {
        title: "Không còn cảnh chờ đợi khi đi khám tại bệnh viện mắt TP.HCM",
        description: "Không còn cảnh chờ ",
        image: "https://medpro.vn/_next/static/media/nguoi-lao-dong-logo.2ebb5615.png",
        link: "https://nld.com.vn/suc-khoe/khong-con-canh-cho-doi-khi-di-kham-tai-benh-vien-mat-tp-hcm-20221014113328896.htm",
    },
    {
        title: "HTV - Bệnh viện mắt TP.HCM ra mắt ứng dụng đặt lịch khám trực tuyến",
        description: "HTV - Bệnh viện mắt ",
        image: "https://medpro.vn/_next/static/media/htv.e0154343.png",
        link: "https://www.youtube.com/watch?v=glMog0sSvAM",
    },
];

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
                <NewsList news={news} />
            </div>
        </>
    );
};

export default HomePage;
