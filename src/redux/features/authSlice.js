import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/Axios";

export const fetchUserData = createAsyncThunk("auth/fetchUserData", async () => {
  const res = await req.get("user/profile");
  return res.data;
});

export const signup = createAsyncThunk("auth/signup", async ({ email, password, first_name, last_name }) => {
  const res = await req.post("user/sign-up", { email, password, first_name, last_name });
  return res.data;
});

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  const res = await req.post("user/login", { email, password });
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    first_name: "",
    last_name: "",
    email: "",
    isAuth: false,
    avatar: "",
  },
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.isAuth = true;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "rejected";
        localStorage.removeItem("token");
        window.location.href = "/login";
      });

    // -------------SIGNUP---------------

    builder
      .addCase(signup.pending, (state) => {
        state.status = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.isAuth = true;
        localStorage.setItem("token", action.payload.body.token);
      })
      .addCase(signup.rejected, (state) => {
        state.status = "rejected";
        toast.error("Something went wrong! Try again later.");
      });

    // -------------LOGIN---------------

    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.isAuth = true;
        localStorage.setItem("token", action.payload.body.token);
      })
      .addCase(login.rejected, (state) => {
        state.status = "rejected";
        toast.error("Wrong credentials");
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const selectUser = (state) => state.auth;
