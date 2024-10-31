import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../utils/fetchData.js";

export const fetchUserLogin = createAsyncThunk("login", async (data, thunkAPI) => {
    console.log(data);

    const fromData = new URLSearchParams();
    if (!data.username) {
        return { isSuccess: false, message: "Tài khoản không hợp lệ!" };
    }
    if (!data.password) {
        return { isSuccess: false, message: "Mật khẩu không hợp lệ!" };
    }
    if (!data.role) {
        return { isSuccess: false, message: "Role không hợp lệ!" };
    }
    fromData.append("username", data.username);
    fromData.append("password", data.password);
    fromData.append("role", data.role);
    const response = await fetchData("/admin/login", "POST", fromData, "application/x-www-form-urlencoded");
    return response;
});

const initialState = {
    isAuthenticated: false,
    message: "",
    data: {},
    accessToken: "",
    refreshToken: "",
};
export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.data = {};
            state.accessToken = "";
            state.refreshToken = "";
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
            console.log("check state before", state);
            state.isAuthenticated = action.payload.isSuccess;
            state.message = action.payload.message;
            if (action.payload.data) state.data = action.payload.data;
            if (action.payload.accessToken) state.accessToken = action.payload.accessToken;
            if (action.payload.refreshToken) state.refreshToken = action.payload.refreshToken;
            console.log("ckech state after login", state);
        });
    },
});
export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
