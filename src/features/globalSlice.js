import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    isLoggedIn: false,
    user: {
      _id: "",
      fname: "",
      lname: "",
      budget: 0,
      profileImg: "",
      username: "",
    },
    showLoginModal: "", // can be: login, signup, or ''
    showSettingsModal: "", // can be: settings or ''
  },
  reducers: {
    // global states we need to keep track of
    userLogin: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userSignup: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
    },
    updateUser: (state, action) => {
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.budget = action.payload.budget;
      state.user.username = action.payload.username;
      state.user.profileImg = action.payload.profileImg;
    },
    refreshUser: (state, action) => {
      state.user._id = action.payload._id;
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.budget = action.payload.budget;
      state.user.username = action.payload.username;
      state.user.profileImg = action.payload.profileImg;
      state.isLoggedIn = true;
    },
    toggleLoginModal: (state, action) => {
      state.showLoginModal = action.payload;
    },
    toggleSettingsModal: (state, action) => {
      state.showSettingsModal = action.payload;
    },
  },
});

export const {
  userLogin,
  userSignup,
  userLogout,
  updateUser,
  refreshUser,
  toggleLoginModal,
  toggleSettingsModal,
} = globalSlice.actions;

export default globalSlice.reducer;
