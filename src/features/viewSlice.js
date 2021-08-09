import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    mode: "calendar",
    calendarMode: "month",
    selectedDate: moment().format("YYYY-MM-DD"),
    selectedMonth: moment().format("YYYY-MM-DD"),
    periodStart: "",
    periodEnd: "",
    reportBtnEnabled: false,
  },
  reducers: {
    toggleMode: (state, action) => {
      state.mode = action.payload;
    },
    toggleCalendarMode: (state, action) => {
      state.calendarMode = action.payload;
    },
    toggleReportBtn: (state, action) => {
      state.reportBtnEnabled = action.payload;
    },
    selectDay: (state, action) => {
      state.reportBtnEnabled = false;
      state.selectedDate = action.payload;
      state.periodStart = action.payload;
      state.periodEnd = action.payload;
    },
    selectMonth: (state, action) => {
      state.reportBtnEnabled = false;
      state.selectedMonth = action.payload;
      state.periodStart = action.payload.substring(0, 8) + "01";
      state.periodEnd = moment(action.payload)
        .endOf("month")
        .format("YYYY-MM-DD");
    },
    selectPeriodStart: (state, action) => {
      state.periodStart = action.payload;
    },
    selectPeriodEnd: (state, action) => {
      state.periodEnd = action.payload;
    },
  },
});

export const {
  toggleMode,
  toggleCalendarMode,
  toggleReportBtn,
  selectDay,
  selectMonth,
  selectPeriodStart,
  selectPeriodEnd,
} = viewSlice.actions;

export default viewSlice.reducer;
