import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { req } from "../../utils/Axios";

export const createTransaction = createAsyncThunk("transaction/createTransaction", async (data) => {
  const res = await req.post("/transaction/new", data);
  return res.data;
});

export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async (id) => {
  const res = await req.get(`/transaction/get/${id}`);
  return res.data;
});

export const editTransaction = createAsyncThunk("transaction/editTransaction", async ({ id, data }) => {
  const res = await req.patch(`/transaction/${id}`, data);
  return res.data;
});

export const deleteTransaction = createAsyncThunk("transaction/deleteTransaction", async (id) => {
  const res = await req.delete(`/transaction/${id}`);
  return res.data;
});

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    status: "idle",
  },
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers(builder) {
    // ---Create Transaction---
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.transactions = [...state.transactions, action.payload.body];
        toast.success("Created!");
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

    //? --- EDIT ---
    builder
      .addCase(editTransaction.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.transactions = state.transactions.map((transaction) => {
          if (transaction.id === action.payload.body.id) {
            return (transaction = action.payload.body);
          }
          return transaction;
        });
        toast.success("Saved!");
      })
      .addCase(editTransaction.rejected, (state) => {
        state.status = "rejected";
        toast.error("Something went wrong!");
      });

    //! --- DELETE  ---
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload.body);
        toast.success("Success!");
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.status = "rejected";
        toast.error("Category is used in transactions!");
      });
  },
});

export default transactionSlice.reducer;
export const selectTransaction = (state) => state.transaction.transactions;
export const { clearTransactions } = transactionSlice.actions;
