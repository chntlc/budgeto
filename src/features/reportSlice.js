import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    reportReady: false,
    pieReady: false,
    lineReady: false,
    pieData: [],
    pieLabel: [],
    pieColors: [],
    lineData: [],
    lineLabel: [],
    noData: false,
  },
  reducers: {
    toggleReportReady: (state, action) => {
      state.reportReady = action.payload;
    },
    togglePieReady: (state, action) => {
      state.pieReady = action.payload;
    },
    toggleLineReady: (state, action) => {
      state.lineReady = action.payload;
    },
    toggleNoData: (state, action) => {
      state.noData = action.payload;
    },
    setPieData: (state, action) => {
      state.noData = false;
      state.pieData = action.payload.data;
      state.pieLabel = action.payload.labels;
      state.pieColors = action.payload.colors;
      state.pieReady = true;
    },
    setLineData: (state, action) => {
      state.noData = false;
      state.lineData = action.payload.values;
      state.lineLabel = action.payload.labels;
      state.lineReady = true;
    },
  },
});

export const {
  toggleReportReady,
  togglePieReady,
  toggleLineReady,
  toggleNoData,
  setPieData,
  setLineData,
} = reportSlice.actions;

export default reportSlice.reducer;
