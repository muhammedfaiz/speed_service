import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService.js";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  isSuccess: false,
  error: null,
  token: localStorage.getItem("access_token") || null,
};

export const register = createAsyncThunk(
  "user/register",
  async (user, thunkApi) => {
    try {
      return await userService.register(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (data, thunkApi) => {
    try {
      return await userService.verifyOtp(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk("user/login", async (user, thunkApi) => {
  try {
    return await userService.login(user);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const resendOtp = createAsyncThunk(
  "user/resendOtp",
  async (user, thunkApi) => {
    try {
      return await userService.resendOtp(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkApi) => {
  try {
    return await userService.logout();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.error = null;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access_token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = null;
        state.user = action.payload.user;
        state.token=action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("access_token", action.payload.token);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = null;
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
      })
      .addCase(logout.rejected,(state,action)=>{
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;
      })
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
