import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/Axios";

export const fetchSummary = createAsyncThunk("dashboard/fetchSummary", async (id) => {
  const res = await req.get("dashboard/summary");
  return res.data;
});

export const fetchBarChart = createAsyncThunk("dashboard/fetchBarChart", async (id) => {
  const res = await req.get("dashboard/bar-chart");
  return res.data;
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    summary: {},
    barChart: {},
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
        state.barChart["income"] = action.payload.body.incomes.map((i) => {
          return i._sum.amount;
        });
        state.barChart["expense"] = action.payload.body.expenses.map((i) => {
          return i._sum.amount;
        });
        const date_set = new Set();
        action.payload.body.expenses.map((i) => {
          date_set.add(`${i.day},${i.month}, ${i.year} `);
        });
        action.payload.body.incomes.map((i) => {
          date_set.add(`${i.day},${i.month}, ${i.year} `);
        });

        state.barChart["labels"] = Array.from(date_set);
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
        state.summary.balance = action.payload.body._sum.balance;
        state.summary.income = action.payload.body._sum.income;
        state.summary.expense = action.payload.body._sum.expense;
      })
      .addCase(fetchSummary.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default dashboardSlice.reducer;
export const selectSummary = (state) => state.dashboard.summary;
export const selectBarChart = (state) => state.dashboard.barChart;
