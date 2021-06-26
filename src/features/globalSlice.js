import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isLoggedIn: false,
    user: {
      id: 'budgeto.io',
      fname: 'Kevin',
      lname: 'Lee',
      budget: 0,
      email: 'budgeto@gmail.com',
    },
    showLoginModal: '',  // can be: login, signup, or ''
    showSettingsModal: '' // can be: settings or ''
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
    updateUser: (state, action) => {
      console.log('hit updateUser action')

      state.user.id = action.payload.id;
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.budget = action.payload.budget;
      state.user.email = action.payload.email;
      state.showSettingsModal = '';
    },
    toggleLoginModal: (state, action) => {
      console.log('hit toggleLoginModal action')
      state.showLoginModal = action.payload
    },
    toggleSettingsModal: (state, action) => {
      console.log('hit toggleSettingsModal action')
      state.showSettingsModal = action.payload
    }
  }
})


export const { userLogin, userSignup, userLogout, updateUser, toggleLoginModal, toggleSettingsModal } = globalSlice.actions

export default globalSlice.reducer
