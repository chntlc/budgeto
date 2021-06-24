import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    localUser: {
      // TODO: How to fetch redux store
      fname: 'Kevin',
      lname: 'Lee',
      budget: 0,
      email: 'budgeto@gmail.com'
      // fname: Redux.store.reducer.settings.global.user.fname,
      // lname: Redux.store.reducer.settings.global.user.lname,
      // budget: Redux.store.reducer.settings.global.user.budget,
      // email: Redux.store.reducer.settings.global.user.email
    }
  },
  reducers: {
    updateLocalUser: (state, action) => {
      console.log('hit updateLocalUser action')

      let inputId = action.payload.id
      let value = action.payload.value
      switch(inputId) {
        case "fname":
          state.localUser.fname = value;
          break;
        case "lname":
          state.localUser.lname = value;
          break;
        case "email":
          state.localUser.email = value;
          break;
        case "budget":
          state.localUser.budget = value;
          break;
        default:
          break;
      }
    }
  }
})

export const { updateLocalUser } = settingsSlice.actions

export default settingsSlice.reducer
