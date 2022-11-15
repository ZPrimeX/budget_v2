import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/Axios";
import { toast } from "react-toastify";

export const createWallet = createAsyncThunk("wallet/createWallet", async (data) => {
  const res = await req.post("/wallet/new", data);
  return res.data;
});

export const fetchWallets = createAsyncThunk("wallet/fetchWallets", async () => {
  const res = await req.get("/wallet/all");
  return res.data;
});

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallets: [],
    status: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    // ---Create Wallet---
    builder
      .addCase(createWallet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.wallets = [...state.wallets, action.payload.body];
        toast.success("Created!");
      })
      .addCase(createWallet.rejected, (state) => {
        state.status = "rejected";
        toast.error("Error!");
      });

    // --- Fetching Wallets ---

    builder
      .addCase(fetchWallets.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.wallets = action.payload.body;
      })
      .addCase(fetchWallets.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default walletSlice.reducer;
export const selectWallet = (state) => state.wallet.wallets;
