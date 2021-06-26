import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isLoggedIn: false,
    user: {
      id: '',
      email: '',
      name: '',
      budget: 0
    },
    showLoginModal: ''  // can be: login, signup, or ''
  },
  reducers: {
    // global states we need to keep track of
    userLogin: (state, action) => {
      console.log({ action })
      console.log('hit userLogin action')
      state.user = action.payload
      state.isLoggedIn = true
    },
    userSignup: (state, action) => {
      console.log({ action })
      console.log('hit userSignup action')
      state.user = action.payload
      state.isLoggedIn = true
    },
    userLogout: (state) => {
      console.log('hit userLogout action')
    },
    updateUser: (state) => {
      console.log('hit updateUser action')
    },
    toggleLoginModal: (state, action) => {
      console.log('hit toggleLoginModal action')
      state.showLoginModal = action.payload
    }
  }
})

export const { userLogin, userSignup, userLogout, updateUser, toggleLoginModal } = globalSlice.actions

export default globalSlice.reducer
