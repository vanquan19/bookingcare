import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData, { setData } from "../utils/fetchData.js";

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
    console.log(response);

    return response;
});

export const fetchUserRegister = createAsyncThunk("register", async (data, thunkAPI) => {
    const response = await setData("/create-patient", "POST", data);
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
        patientLogin(state, action) {
            state.isAuthenticated = action.payload.isSuccess;
            state.data = action.payload.data;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.message = action.payload.message;
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
        builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
            console.log(action.payload);

            state.isAuthenticated = action.payload.isSuccess;
            state.message = action.payload.message;
            if (action.payload.data) state.data = action.payload.data;
            if (action.payload.accessToken) state.accessToken = action.payload.accessToken;
            if (action.payload.refreshToken) state.refreshToken = action.payload.refreshToken;
            console.log("ckech state after register", state);
        });
    },
});
export const { login, logout, patientLogin } = authReducer.actions;
export default authReducer.reducer;
