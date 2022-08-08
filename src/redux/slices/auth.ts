import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";
import { UserType } from "../../models";
import { RootState } from "../store";

type AuthStateType = {
  data: UserType | null;
  status: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
};

export type RegisterParamsType = {
  fullName: string;
  email: string;
  password: string;
};

export const fetchAuth = createAsyncThunk<UserType, LoginParamsType>(
  "auth/fetchAuth",
  async (params) => {
    const { data } = await axios.post<UserType>("/auth/login", params);

    return data;
  }
);

export const fetchRegister = createAsyncThunk<UserType, RegisterParamsType>(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);

    return data as UserType;
  }
);

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async () => {
  const { data } = await axios.get("/auth/me");

  return data as UserType;
});

const initialState: AuthStateType = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
