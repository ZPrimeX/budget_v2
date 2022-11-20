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

export const editCategory = createAsyncThunk("category/editCategory", async ({ id, body }) => {
  const res = await req.patch(`category/${id}`, body);
  return res.data;
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id) => {
  const res = await req.delete(`category/${id}`);
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
    //* --- CREATE ---
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = [...state.categories, action.payload.body];
        toast.success("Created!");
      })
      .addCase(createCategory.rejected, (state) => {
        state.status = "rejected";
      });

    //* --- FETCH ---
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

    //? --- EDIT ---
    builder
      .addCase(editCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = state.categories.map((category) => {
          if (category.id === action.payload.body.id) {
            return (category = action.payload.body);
          }
          return category;
        });
        toast.success("Saved!");
      })
      .addCase(editCategory.rejected, (state) => {
        state.status = "rejected";
        toast.error("Something went wrong!");
      });

    //! --- DELETE  ---
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.categories = state.categories.filter((category) => category.id !== action.payload.body);
        toast.success("Success!");
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.status = "rejected";
        toast.error("Something went wrong!");
      });
  },
});

export default categorySlice.reducer;
export const selectCategory = (state) => state.category.categories;
