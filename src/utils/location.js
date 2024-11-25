export const apiGetProvince = async () => {
    try {
        const response = await fetch("https://vapi.vnappmob.com/api/province/");
        const data = await response.json();
        return data?.results || [];
    } catch (error) {
        console.log(error);
    }
};

export const apiGetDistrict = async (provinceId) => {
    try {
        const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
        const data = await response.json();
        return data?.results || [];
    } catch (error) {
        console.log(error);
    }
};

export const apiGetWard = async (districtId) => {
    try {
        const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
        const data = await response.json();
        return data?.results || [];
    } catch (error) {
        console.log(error);
    }
};
