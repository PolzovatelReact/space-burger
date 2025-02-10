import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/productTypes";

interface IngredientsState {
  // Типизация изначального состояния
  ingredients: Product[];
  isLoading: boolean;
  hasError: boolean;
}

// Начальное состояние
const initialState: IngredientsState = {
  ingredients: [], // Список ингредиентов
  isLoading: false, // Флаг загрузки
  hasError: false, // Флаг ошибки
};

export const fetchIngredients = createAsyncThunk<Product[], void>(
  "ingredients/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://norma.nomoreparties.space/api/ingredients"
      ); // Отправляем запрос на сервер
      const data = await response.json(); // Получаем ответ в виде json
      return data.data as Product[]; // Возвращает массив ингредиентов/   1-я это объект JSON.  2я data - берется из структуры ответа API
    } catch (error) {
      return rejectWithValue("Ошибка загрузки ингредиентов"); // Ответ об ошибке
    }
  }
);

// export const fetchIngredients = createAsyncThunk(
//   "ingredients/fetchIngredients",
//   // Declare the type your function argument here:
//   async (userId: number) => {
//     const response = await fetch(
//       `https://norma.nomoreparties.space/api/ingredients`
//     );
//     // Inferred return type: Promise<MyData>
//     return (await response.json()) as Product[];
//   }
// );

const ingewdientsSlice = createSlice({
  name: "ingredients", // Определяет имя слайса в хранилеще редакс
  initialState, // Начальное состояние
  reducers: {}, // Здесь можно описать синхронные экшены
  extraReducers: (builder) => {
    // extraReducers описывает обработку асинхронных экшенов fetchIngredients
    builder
      .addCase(fetchIngredients.pending, (state) => {
        // pending  запрос отправлен
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        // fulfilled успешный ответ от сервера
        state.isLoading = false;
        state.ingredients = action.payload; // Этот оператор ?? (nullish coalescing) гарантирует, что если action.payload будет undefined, то присвоится пустой массив [].
      })
      .addCase(fetchIngredients.rejected, (state) => {
        // rejected запрос не удался
        state.isLoading = false;
        state.hasError = true;
      });
  },
});
export default ingewdientsSlice.reducer;
