import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Container from "./pages/Container.jsx";
import MedicalFacilityContainer from "./pages/MedicalFacitity.jsx";
import MedicalService from "./pages/MedicalService.jsx";
import ListMedicalServices, {
    HealthExaminationPackage,
    ListDoctorService,
    MedicalAtHome,
    PaymentOfHospitalFees,
    ScheduleATest,
    ScheduleVaccination,
    VideoMedicalExaminationConsulation,
} from "./components/MedicalServiceComponents.jsx";
import HealthCheckForBusiness from "./pages/HealthCheckForBusiness.jsx";
import News from "./pages/News.jsx";
import { MainNewsPage } from "./pages/MainNewsPage.jsx";
import NewsServicePage from "./pages/NewsServicePage.jsx";
import MedicalNewsPage from "./pages/MedicalNewsPage.jsx";
import CommonSenseMedicineNewPage from "./pages/CommonSenseMedicineNewPage.jsx";
import AdminContainer from "./pages/AdminContainer.jsx";
import ClinicManageContainer, { Clinicmanagement } from "./pages/ClinicManage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import "react-toastify/dist/ReactToastify.css";
import DoctorContainer from "./pages/DoctorContainer.jsx";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import { ListDoctor, ListMedicalPakage, ListSpecialty, MedicalBookingForm, SelectPatientProfile } from "./components/MedicalComponents.jsx";
import DoctorManageSpecialty from "./pages/DoctorManageSpecialty.jsx";
import DoctorManagePakage from "./pages/DoctorManagePakage.jsx";
import DoctorManageSchedule from "./pages/DoctorManageSchedule.jsx";
import DoctorManagePatient from "./pages/DoctorManagePatient.jsx";
import DoctorManageStaff from "./pages/DoctorManageStaff.jsx";
import DoctorChat from "./pages/DoctorChat.jsx";
import DoctorAnalysis from "./pages/DoctorAnalysis.jsx";
import ViewDetailClinic from "./pages/ViewDetailClinic.jsx";
import AddNewProfilePatient from "./pages/AddNewProfilePatient.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Container />,
        children: [
            {
                path: "/",
                index: true,
                element: <HomePage />,
            },
            {
                path: "them-ho-so-benh-nhan",
                element: <ProtectedRoute component={AddNewProfilePatient} navigate="/" />,
            },
            {
                path: "chi-tiet-phong-kham",
                element: <ViewDetailClinic />,
            },
            {
                path: "co-so-y-te",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "benh-vien-cong",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "benh-vien-tu",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "phong-kham",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "phong-mach",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "xet-nghiem",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "y-te-tai-nha",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "tiem-chung",
                element: <MedicalFacilityContainer />,
            },
            {
                path: "dich-vu-y-te",
                element: <MedicalService />,
                children: [
                    {
                        path: "dat-kham-theo-bac-si",
                        element: <ListDoctorService />,
                    },
                    {
                        path: "tu-van-kham-benh-tu-xa",
                        element: <VideoMedicalExaminationConsulation />,
                    },
                    {
                        path: "dat-lich-xet-nghiem",
                        element: <ScheduleATest />,
                    },
                    {
                        path: "goi-kham-suc-khoe",
                        element: <HealthExaminationPackage />,
                    },
                    {
                        path: "dat-lich-tiem-chung",
                        element: <ScheduleVaccination />,
                    },
                    {
                        path: "y-te-tai-nha",
                        element: <MedicalAtHome />,
                    },
                    {
                        path: "thanh-toan-vien-phi",
                        element: <PaymentOfHospitalFees />,
                    },
                ],
            },
            {
                path: "hinh-thuc-dat-kham",
                element: <MedicalBookingForm />,
            },
            {
                path: "chon-ho-so",
                element: <SelectPatientProfile />,
            },
            {
                path: "dat-kham-theo-chuyen-khoa",
                element: <ListSpecialty />,
            },
            {
                path: "dat-kham-theo-bac-si",
                element: <ListDoctor />,
            },
            {
                path: "dat-kham-theo-goi-kham",
                element: <ListMedicalPakage />,
            },
            {
                path: "kham-suc-khoe-doanh-nghiep",
                element: <HealthCheckForBusiness />,
            },
            {
                path: "tin-tuc",
                element: <News />,
                children: [
                    {
                        index: true,
                        element: <MainNewsPage />,
                    },
                    {
                        path: "tin-dich-vu",
                        element: <NewsServicePage />,
                    },
                    {
                        path: "tin-y-te",
                        element: <MedicalNewsPage />,
                    },
                    {
                        path: "y-hoc-thuong-thuc",
                        element: <CommonSenseMedicineNewPage />,
                    },
                ],
            },
            {
                path: "huong-dan",
                children: [
                    {
                        index: true,
                        path: "cai-dat-ung-dung",
                    },
                    {
                        path: "dat-lich-kham",
                    },
                    {
                        path: "tu-van-kham-benh-qua-video",
                    },
                    {
                        path: "quy-trinh-hoan-phi",
                    },
                    {
                        path: "cau-hoi-thuong-gap",
                    },
                    {
                        path: "quy-trinh-di-kham",
                    },
                ],
            },
            {
                path: "lien-he-hop-tac",
            },
            {
                path: "hop-tac-quang-cao",
            },
            {
                path: "gioi-thieu",
            },
            {
                path: "tuyen-dung",
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/admin",
        element: <ProtectedRoute component={AdminContainer} navigate="/admin/login" />,
        children: [
            {
                index: true,
            },
            {
                path: "clinic-management",
                element: <ClinicManageContainer />,
                children: [
                    {
                        index: true,
                        element: <Clinicmanagement />,
                    },
                    {
                        path: "contract",
                    },
                ],
            },
            {
                path: "doctor-management",
            },
            {
                path: "service-management",
            },
            {
                path: "chat",
            },
            {
                path: "news-management",
            },
        ],
    },
    {
        path: "/doctor",
        element: <ProtectedRoute component={DoctorContainer} navigate="/doctor/login" />,
        children: [
            {
                index: true,
                element: <DoctorAnalysis />,
            },
            {
                path: "schedule",
                element: <DoctorManageSchedule />,
            },
            {
                path: "chat",
                element: <DoctorChat />,
            },
            {
                path: "specialty",
                element: <DoctorManageSpecialty />,
            },
            {
                path: "package",
                element: <DoctorManagePakage />,
            },
            {
                path: "staff",
                element: <DoctorManageStaff />,
            },
            {
                path: "patient",
                element: <DoctorManagePatient />,
            },
        ],
    },
    {
        path: "/doctor/login",
        element: <DoctorLogin />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
