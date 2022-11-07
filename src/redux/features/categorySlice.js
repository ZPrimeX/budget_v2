import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { req } from "../../utils/Axios";

export const createCategory = createAsyncThunk("category/createCategory", async (data) => {
  const res = await req.post("category/new", data);
  return res.data;
});

export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  const res = await req.get("category/all");
  return res.data;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    status: "idle",
  },
  reducers: {},
  extraReducers(builder) {
    // --- Create category ---
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = [...state.categories, action.payload.body];
        toast.success("Success!");
      })
      .addCase(createCategory.rejected, (state) => {
        state.status = "rejected";
      });

    // --- Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = action.payload.body;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default categorySlice.reducer;
export const selectCategory = (state) => state.category.categories;
