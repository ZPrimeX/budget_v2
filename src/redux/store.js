import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import walletSlice from "./features/walletSlice";

export const store = configureStore({
  reducer: { auth: authSlice, wallet: walletSlice, category: categorySlice },
});
