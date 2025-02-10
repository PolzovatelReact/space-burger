import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/productTypes"; //Данные объекта Product
import { v4 as uuidv4 } from "uuid"; // Импорт uuid

interface OrderState {
  order: Product[];
  orderNumber: string | null; //Уникальный номер заказа
  totalPrice: number; // Формируем стоимость
  totalCalories: number; // Формируем калории
}

const initialState: OrderState = {
  order: [],
  orderNumber: null, // Изначально ноль
  totalPrice: 0, // Начальная стоимость 0
  totalCalories: 0, // Изначально 0
};
const orderSlice = createSlice({
  name: "order",
  initialState, // Изнчальное состояние
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.order.push(action.payload); //Добавляем ингредиент
      state.totalPrice += action.payload.price; // += присвоение - добавление стоимости.  price берем из объекта Product
      state.totalCalories += action.payload.calories; //  Доавление калорий
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.order = state.order.filter((_, index) => index !== action.payload); //Удаляем ингредиент по индексу
    },
    createOrder: (state) => {
      state.orderNumber = uuidv4(); // Генерируем id
      state.order = []; // Очищаем заказ после оформления
      state.totalPrice = 0; // Сбраасываем стоимость после оформления
      state.totalCalories = 0; // Сброс калорий
    },
    clearOrder: (state) => {
      state.order = [];
      state.orderNumber = null;
      state.totalPrice = 0;
      state.totalCalories = 0;
    }, // очищаем заказ
  },
});

export const { addProduct, removeProduct, createOrder, clearOrder } =
  orderSlice.actions; // Импортируем слайсы
export default orderSlice.reducer;
