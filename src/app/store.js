import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/categorySlice";
import dashboardSlice from "../features/dashboardSlice";
import globalSlice from "../features/globalSlice";
import receiptSlice from "../features/receiptSlice";
import viewSlice from "../features/viewSlice";

export default configureStore({
  reducer: {
    global: globalSlice,
    receipt: receiptSlice,
    categories: categorySlice,
    view: viewSlice,
    dashboard: dashboardSlice,
  },
});
