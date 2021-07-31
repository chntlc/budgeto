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
      console.log({ action });
      console.log("hit userLogin action");
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log("user state updated in globalSlice");
    },
    userSignup: (state, action) => {
      console.log({ action });
      console.log("hit userSignup action");
      state.user = action.payload;
      state.isLoggedIn = true;
      console.log("user state updated in globalSlice");
    },
    userLogout: (state, action) => {
      console.log({ action });
      console.log("hit userLogout action");
      state.isLoggedIn = false;
      console.log("User logged out");
    },
    updateUser: (state, action) => {
      console.log("hit updateUser action");

      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.budget = action.payload.budget;
      state.user.username = action.payload.username;
      state.user.profileImg = action.payload.profileImg;
      // state.showSettingsModal = '';
    },
    refreshUser: (state, action) => {
      console.log("hit refreshUser action");

      state.user._id = action.payload._id;
      state.user.fname = action.payload.fname;
      state.user.lname = action.payload.lname;
      state.user.budget = action.payload.budget;
      state.user.username = action.payload.username;
      state.user.profileImg = action.payload.profileImg;
      state.isLoggedIn = true;
    },
    toggleLoginModal: (state, action) => {
      console.log("hit toggleLoginModal action");
      state.showLoginModal = action.payload;
    },
    toggleSettingsModal: (state, action) => {
      console.log("hit toggleSettingsModal action");
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
