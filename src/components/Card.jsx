import { Heading4 } from "./Text";

const Card = ({ children, className }) => {
    return <div className={`flex flex-col rounded shadow bg-white p-6 ${className}`}>{children}</div>;
};

const GroupCard = ({ children, className }) => {
    return <div className={`flex gap-4 ${className}`}>{children}</div>;
};

const DownloadAppCard = ({ children, className }) => {
    return (
        <div className={`bg-gradient-to-r from-primary-2 to-primary p-6 text-center rounded-lg flex flex-col items-center ${className}`}>
            <Heading4 className="text-white">Tải app để đặt lịch nhanh chóng</Heading4>
            <div className="flex gap-2 my-2 justify-center">
                <a href="https://apps.apple.com/us/app/id1481561748">
                    <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fios.30afde18.svg&w=256&q=75" alt="BookingCare App" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=vn.com.medpro">
                    <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fandroid.e1f7bfa8.svg&w=256&q=75" alt="BookingCare App" />
                </a>
            </div>
        </div>
    );
};

export { Card, DownloadAppCard };
