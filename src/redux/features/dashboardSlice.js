import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { el } from "date-fns/locale";
import dayjs from "dayjs";
import { req } from "../../utils/Axios";

export const fetchSummary = createAsyncThunk("dashboard/fetchSummary", async () => {
  const res = await req.get("dashboard/summary");
  return res.data;
});

export const fetchBarChart = createAsyncThunk("dashboard/fetchBarChart", async () => {
  const res = await req.get("dashboard/bar-chart");
  return res.data;
});

export const fetchExpenses = createAsyncThunk("dashboard/fetchExpenses", async () => {
  const res = await req.get("dashboard/expenses");
  return res.data;
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: {
      balance: 0,
      expense: 0,
      income: 0,
    },
    barChart: {},
    expenses: {},
    status: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    //? Fetch Bar-Chart
    builder
      .addCase(fetchBarChart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBarChart.fulfilled, (state, action) => {
        state.status = "success";
        state.barChart["income"] = action.payload.body.data.map((i) => {
          return i.income._sum.amount || 0;
        });
        state.barChart["expense"] = action.payload.body.data.map((e) => {
          return e.expense._sum.amount || 0;
        });
        state.barChart["labels"] = action.payload.body.data.map((d) => {
          // 11122022
          // 5122022
          // new Date(d.date).toDateString() => "Wed Dec 31 1969";
          return d.date;
        });
      })
      .addCase(fetchBarChart.rejected, (state) => {
        state.status = "rejected";
      });
    //? Fetch Summary
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.status = "success";
        state.summary.balance = action.payload.body._sum.balance || 0;
        state.summary.income = action.payload.body._sum.income || 0;
        state.summary.expense = action.payload.body._sum.expense || 0;
      })
      .addCase(fetchSummary.rejected, (state) => {
        state.status = "rejected";
      });
    //? Fetch Expenses
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "success";
        state.expenses = action.payload.body;
      })
      .addCase(fetchExpenses.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default dashboardSlice.reducer;
export const selectSummary = (state) => state.dashboard.summary;
export const selectBarChart = (state) => state.dashboard.barChart;
export const selectExpenses = (state) => state.dashboard.expenses;
