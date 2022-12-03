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
        state.barChart["labels_expense"] = action.payload.body.expenses.map((i) => {
          return i.raw_date;
        });
        state.barChart["labels_income"] = action.payload.body.incomes.map((i) => {
          return i.raw_date;
        });
      })
      .addCase(fetchBarChart.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default dashboardSlice.reducer;
export const selectSummary = (state) => state.dashboard.summary;
export const selectBarChart = (state) => state.dashboard.barChart;
