import { Heading1, Link, Paragraph } from "./Text";

const MediaTalkAbout = () => {
    return (
        <div className="lg:px-32 py-16 p-12 flex">
            <div className="relative m-auto bg-white rounded-3xl h-full w-full p-8 flex flex-col items-center">
                <Heading1 className="text-center text-primary font-extrabold">Truyền thông nói về chúng tôi</Heading1>
                <Paragraph className="text-lg text-gray-500 font-semibold text-center">Lợi ích của Ứng dụng đặt khám nhanh đã được ghi nhận rộng rãi</Paragraph>
                <div className="mt-8 grid grid-cols-4 gap-6 max-w-[600px] items-center">
                    <Link href="https://thanhnien.vn/benh-vien-mat-tphcm-chinh-thuc-ra-mat-ung-dung-dat-lich-1851509686.htm">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthanh-nien-logo.e8e27f62.png&w=1920&q=75" alt="news1" className="" />
                    </Link>
                    <Link href="https://tuoitre.vn/chuyen-doi-so-nganh-y-te-can-bat-dau-tu-viec-dang-ky-kham-chua-benh-20230216172403962.htm">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftuoi-tre-logo.96edf351.png&w=1920&q=75" alt="news2" className="" />
                    </Link>
                    <Link href="https://nhandan.vn/ra-mat-phan-mem-medpro-ho-tro-dang-ky-tiem-chung-vaccine-post651550.html">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbao-nhan-dan.0a666fdb.webp&w=1920&q=75" alt="news3" className="" />
                    </Link>
                    <Link href="https://nld.com.vn/suc-khoe/khong-con-canh-cho-doi-khi-di-kham-tai-benh-vien-mat-tp-hcm-20221014113328896.htm">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnguoi-lao-dong-logo.2ebb5615.png&w=1920&q=75" alt="news4" className="" />
                    </Link>
                    <Link href="https://www.youtube.com/watch?v=glMog0sSvAM">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhtv.e0154343.png&w=1920&q=75" alt="news5" className="" />
                    </Link>
                    <Link href="http://www.binhthuantv.vn/video/benh-vien-da-khoa-an-phuoc-phan-thiet-trien-khai-giai-phap-dat-kham-truc-tuyen-medpro/389">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbtv-logo.a5df191f.svg&w=1920&q=75" alt="news5" className="" />
                    </Link>
                    <Link>
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvtv1-logo.60a3a5d8.png&w=1920&q=75" alt="news5" className="" />
                    </Link>
                    <Link href="https://youtu.be/KUuEjKxHpcU">
                        <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthvl-logo.c30c70cd.png&w=1920&q=75" alt="news5" className="" />
                    </Link>
                </div>
                <div className="my-8">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/zfmhCJgWx8Y?si=xK4WqcJA6hU-rXC8"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
};
export default MediaTalkAbout;
