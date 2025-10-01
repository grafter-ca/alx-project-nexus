import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice"


export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

// ✅ Types for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
