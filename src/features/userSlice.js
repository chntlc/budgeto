import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    // login user
    login: (state) => {
      console.log('hit login action')
    },
    // signup user
  }
})

export const { login } = userSlice.actions

export default userSlice.reducer
