import { useEffect, useState } from "react";

const DoctorNotification = () => {
    const [notifications, setNotifications] = useState([]);

    return (
        <div>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <li key={notification._id}>
                            <p>{notification.content}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-center font-medium text-lg text-gray-500">Không có thông báo mới</p>
                )}
            </ul>
        </div>
    );
};

export default DoctorNotification;
