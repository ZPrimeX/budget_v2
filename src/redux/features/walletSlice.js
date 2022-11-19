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

export const editWallet = createAsyncThunk("wallet/editWallet", async ({ id, body }) => {
  const res = await req.patch(`category/${id}`, body);
  return res.data;
});

export const deleteWallet = createAsyncThunk("wallet/deleteWallet", async ({ id }) => {
  const res = await req.delete(`wallet/${id}`);
  return res.data;
});

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    wallets: [],
    current: null,
    status: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    //* --- CREATE ---
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

    //* --- FETCH ---

    builder
      .addCase(fetchWallets.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.wallets = action.payload.body;
        state.current = action.payload.body.at(0);
      })
      .addCase(fetchWallets.rejected, (state) => {
        state.status = "rejected";
      });

    //? --- EDIT ---
    builder
      .addCase(editWallet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editWallet.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.wallets = state.wallets.map((wallet) => {
          if (wallet.id === action.payload.body.id) {
            return (wallet.title = action.payload.body.title);
          }
          return wallet;
        });
        toast.success("Saved!");
      })
      .addCase(editWallet.rejected, (state) => {
        state.status = "rejected";
        toast.error("Something went wrong!");
      });

    //! --- DELETE ---
    builder
      .addCase(deleteWallet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.wallets = state.wallets.filter((wallet) => {
          wallet.id !== action.payload.body;
        });
        toast.success("Success");
      })
      .addCase(deleteWallet.rejected, (state) => {
        state.status = "rejected";
        toast.error("Something went wrong!");
      });
  },
});

export default walletSlice.reducer;
export const selectWallet = (state) => state.wallet.wallets;
export const selectCurrentWallet = (state) => state.wallet.current;
