// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
};

// Асинхронный thunk для входа
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) throw new Error("Ошибка входа");
      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 🔹 Асинхронный thunk для выхода
export const logout = createAsyncThunk("auth/logout", async () => {
  await fetch("https://norma.nomoreparties.space/api/auth/logout", {
    method: "POST",
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

// **Функция проверки авторизации**
export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return { isAuthenticated: true };
  }
  return { isAuthenticated: false };
});

const authSlice = createSlice({
  name: "auth", //Имя
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export default authSlice.reducer;
