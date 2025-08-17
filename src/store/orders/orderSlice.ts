import { createSlice } from "@reduxjs/toolkit";
import { isString, TLoading, TOrderItem } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";
interface IOrderSlice {
  orderList: TOrderItem[],
  loading: TLoading,
  error: string | null,

}
const initialState: IOrderSlice = {
  orderList: [],
  loading: "idle",
  error: null

}
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle"
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // place order
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) { //gard return boolean
        state.error = action.payload;
      }
    });
    // Get orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) { //gard return boolean
        state.error = action.payload;
      }
    });
  }
})
export default orderSlice.reducer
export const { resetOrderStatus } = orderSlice.actions
export { actGetOrders, actPlaceOrder }