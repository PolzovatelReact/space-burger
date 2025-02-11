import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredientsSlice";
import orderReducer from "./slices/orderSlice";
import registerReducer from "./slices/registerSlice";
import loginReducer from "./slices/loginSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    register: registerReducer,
    userLogin: loginReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
