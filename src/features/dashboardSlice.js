import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async (id) => {
    // https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() - 1; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstday = new Date(curr.setDate(first));
    firstday.setUTCHours(0, 0, 0, 0);
    const lastday = new Date(curr.setDate(last));
    lastday.setUTCHours(23, 59, 59, 999);

    const params = {
      startDate: firstday.toUTCString(),
      endDate: lastday.toUTCString(),
    };
    const mostSpentCategory = await axios.get(`/dashboard/budget/${id}`, {
      params,
    });

    const spending = await axios.get(`/dashboard/category/${id}`, {
      params,
    });
    return { ...mostSpentCategory.data, ...spending.data };
  }
);

const dashboardSlice = createSlice({
  name: "global",
  initialState: {
    mostSpentCategory: "",
    spentForWeek: 0,
    mostSpentCategorySpending: 0,
    isLoading: false,
    notificationCheck: true,
  },
  reducers: {
    updateNotificationState: (state, action) => {
      state.notificationCheck = action.payload;
    },
  },
  extraReducers: {
    [fetchSummary.fulfilled]: (state, action) => {
      state.spentForWeek = action.payload.spent || 0;
      state.mostSpentCategory = action.payload.name || "None yet!";
      state.mostSpentCategorySpending = action.payload.total || 0;
      state.isLoading = false;
      state.notificationCheck = false;
    },
    [fetchSummary.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSummary.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { updateNotificationState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
