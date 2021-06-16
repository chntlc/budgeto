import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {},
  reducers: {
    // global states we need to keep track of
  }
})

// export const {  } = globalSlice.actions

export default globalSlice.reducer
