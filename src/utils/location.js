export const apiGetProvince = async () => {
    try {
        const response = await fetch("https://open.oapi.vn/location/provinces?page=0&size=63");

        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.log(error);
    }
};

export const apiGetDistrict = async (provinceId) => {
    try {
        const response = await fetch(`https://open.oapi.vn/location/districts/${provinceId}`);
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.log(error);
    }
};

export const apiGetWard = async (districtId) => {
    try {
        const response = await fetch(`https://open.oapi.vn/location/wards/${districtId}`);
        const data = await response.json();
        return data?.data || [];
    } catch (error) {
        console.log(error);
    }
};
