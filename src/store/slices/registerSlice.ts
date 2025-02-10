import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import checkResponse from "../../utils/checkResponse/checkResponse"; // Обработка ответа
import { BASE_URL } from "../../utils/constants/constants"; // API

interface UserState {
  user: {
    email: string;
    name: string;
  } | null;
  email: string | null;
  isLoading: boolean;
  hasError: boolean;
  error: string | null;
}
const initialState: UserState = {
  user: null,
  email: null,
  isLoading: false,
  hasError: false,
  error: null,
};
export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await checkResponse(res); // Ответ с сервера
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.email = action.payload.user.email; // Сохранение email
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.payload as string;
      });
  },
});
//export const { } = registerSlice.actions;
export default registerSlice.reducer;
