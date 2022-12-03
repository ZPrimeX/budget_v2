import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import dashboardSlice from "./features/dashboardSlice";
import transactionSlice from "./features/transactionSlice";
import walletSlice from "./features/walletSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wallet: walletSlice,
    category: categorySlice,
    transaction: transactionSlice,
    dashboard: dashboardSlice,
  },
});
