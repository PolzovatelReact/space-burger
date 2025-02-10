import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import orderReducer from "./slices/orderSlice";
import registerReducer from "./slices/registerSlice";
const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    register: registerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
