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
    toggleNoData: (state, action) => {
      state.noData = action.payload;
    },
    setPieData: (state, action) => {
      state.noData = false;
      state.pieData = action.payload.data;
      state.pieLabel = action.payload.labels;
      state.pieColors = action.payload.colors;
      state.pieReady = true;
      console.log(`pie-chart data is set: ${action.payload}`);
    },
    setLineData: (state, action) => {
      state.noData = false;
      state.lineData = action.payload.values;
      state.lineLabel = action.payload.labels;
      state.lineReady = true;
      console.log(`line-graph data is set: ${action.payload}`);
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
