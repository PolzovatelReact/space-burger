import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants/constants";

interface LoginState {
  user: { email: string; name: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasError: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  hasError: false,
  error: null,
};

// **Функция логина**
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return data;
      } else {
        return rejectWithValue(data.message || "Ошибка авторизации");
      }
    } catch (error) {
      return rejectWithValue("Ошибка авторизации");
    }
  }
);

// **Функция проверки авторизации**
export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return { isAuthenticated: true };
  }
  return { isAuthenticated: false };
});

const userLogin = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      });
  },
});

export const { logoutUser } = userLogin.actions;
export default userLogin.reducer;
