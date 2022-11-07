import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { req } from "../../utils/Axios";

export const createTransaction = createAsyncThunk("transaction/createTransaction", async (data) => {
  const res = await req.post("/transaction/new", data);
  return res.data;
});

export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async () => {
  const res = await req.get("/transaction/all");
  return res.data;
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    status: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    // ---Create Transaction---
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.transactions = [...state.transactions, action.payload.body];
        toast.success("Success!");
      })
      .addCase(createTransaction.rejected, (state) => {
        state.status = "rejected";
        toast.error("Error!");
      });

    // --- Fetching Transactions ---

    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.transactions = action.payload.body;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default transactionSlice.reducer;
export const selectTransaction = (state) => state.transaction;
