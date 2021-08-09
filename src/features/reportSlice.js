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
    setPieData: (state, action) => {
      state.pieData = action.payload;
    },
    setPieLabel: (state, action) => {
      state.pieLabel = action.payload;
    },
    setPieColors: (state, action) => {
      state.pieColors = action.payload;
    },
    setLineData: (state, action) => {
      state.lineData = action.payload;
    },
    setLineLabel: (state, action) => {
      state.lineLabel = action.payload;
    },
  },
});

export const {
  toggleReportReady,
  togglePieReady,
  toggleLineReady,
  setPieData,
  setPieLabel,
  setPieColors,
  setLineData,
  setLineLabel,
} = reportSlice.actions;

export default reportSlice.reducer;
