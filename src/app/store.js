import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/categorySlice";
import dashboardSlice from "../features/dashboardSlice";
import globalSlice from "../features/globalSlice";
import receiptSlice from "../features/receiptSlice";
import viewSlice from "../features/viewSlice";
import reportSlice from "../features/reportSlice";

export default configureStore({
  reducer: {
    global: globalSlice,
    receipt: receiptSlice,
    category: categorySlice,
    view: viewSlice,
    dashboard: dashboardSlice,
    report: reportSlice,
  },
});
