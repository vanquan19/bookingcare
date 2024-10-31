const fetchData = async (url, method, data, type, token) => {
    const response = await fetch("http://localhost:6060/api/v1" + url, {
        method,
        headers: {
            "Content-Type": type || "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: data ? data : JSON.stringify({}),
    });
    return response.json();
};

const setData = async (url, method, data, type, token) => {
    const response = await fetch("http://localhost:6060/api/v1" + url, {
        method,
        headers: {
            "Content-Type": type || "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
        body: data ? JSON.stringify(data) : JSON.stringify({}),
    });
    return response.json();
};

const getData = async (url, token) => {
    const response = await fetch("http://localhost:6060/api/v1" + url, {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    return response.json();
};
export default fetchData;
export { getData, setData };
