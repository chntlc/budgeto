import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import axios from 'axios'

// https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-current-week-in-javascript
const curr = new Date(); // get current date
const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
const last = first + 6; // last day is the first day + 6

const firstday = new Date(curr.setDate(first)).toUTCString();
const lastday = new Date(curr.setDate(last)).toUTCString();


export const fetchSpending = createAsyncThunk('dashboard/fetchSpending', async (id) => {
  const params = {
    startDate: firstday,
    endDate: lastday
  }
  const response = await axios.get(`http://localhost:3001/dashboard/budget/${id}`, {
    params
  })
  console.log({ response })
  return response.data
})

export const fetchMostSpentCategory = createAsyncThunk('dashboard/fetchMostSpentCategory', async (id) => {
  const params = {
    startDate: firstday,
    endDate: lastday
  }
  const response = await axios.get(`http://localhost:3001/dashboard/category/${id}`, {
    params
  })
  console.log({ response })
  return response.data
})

const dashboardSlice = createSlice({
  name: 'global',
  initialState: {
    mostSpentCategory: '',
    spentForWeek: 0,
    mostSpentCategorySpending: 0,
  },
  extraReducers: {
    [fetchSpending.fulfilled]: (state, action) => {
      console.log(current(state), { action })
      state.spentForWeek = action.payload.total
    },
    [fetchMostSpentCategory.fulfilled]: (state, action) => {
      console.log(current(state), { action })
      state.mostSpentCategory = action.payload.name
      state.mostSpentCategorySpending = action.payload.total
    }
  }
})


export const { userLogin, userSignup, userLogout, updateUser, toggleLoginModal, toggleSettingsModal } = dashboardSlice.actions

export default dashboardSlice.reducer
