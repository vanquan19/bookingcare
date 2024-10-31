import { Outlet } from "react-router-dom";
import { Directory, MedicalFacility, SearchMedicalFacility } from "../components/MedicalComponents";

const MedicalFacilityContainer = ({ endPoint }) => {
    return (
        <div className="mt-32 ">
            <Directory endPoint={endPoint} />
            {/* <Outlet /> */}
            <MedicalFacility />
        </div>
    );
};
export default MedicalFacilityContainer;
