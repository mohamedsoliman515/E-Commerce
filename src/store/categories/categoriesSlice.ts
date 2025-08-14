import { createSlice } from "@reduxjs/toolkit";

import { isString, TCategory, TLoading } from "@types";

import actGetCategories from "./act/actGetCategories";

interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRecordsCleanUp: (state) => {
      state.records = [];
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.loading = "failed";
        // gard 
        if (isString(action.payload)) {
          state.error = action.payload;
        }
        // or
        // state.error = action.payload as string
      });
  },
});
export const { categoriesRecordsCleanUp } = categoriesSlice.actions;
export { actGetCategories };
export default categoriesSlice.reducer;
