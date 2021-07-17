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
      console.log(`the report is ${action.payload ? "" : "not "}ready`);
    },
    togglePieReady: (state, action) => {
      state.pieReady = action.payload;
      console.log(`pie-chart is ${action.payload ? "" : "not "}ready`);
    },
    toggleLineReady: (state, action) => {
      state.lineReady = action.payload;
      console.log(`line-graph is ${action.payload ? "" : "not "}ready`);
    },
    setPieData: (state, action) => {
      state.pieData = action.payload;
      console.log(`pie-chart data is set: ${action.payload}`);
    },
    setPieLabel: (state, action) => {
      state.pieLabel = action.payload;
      console.log(`pie-chart labels are set: ${action.payload}`);
    },
    setPieColors: (state, action) => {
      state.pieColors = action.payload;
      console.log(`pie-chart colors are set: ${action.payload}`);
    },
    setLineData: (state, action) => {
      state.lineData = action.payload;
      console.log(`line-graph data is set: ${action.payload}`);
    },
    setLineLabel: (state, action) => {
      state.lineLabel = action.payload;
      console.log(`line-graph labels are set: ${action.payload}`);
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
