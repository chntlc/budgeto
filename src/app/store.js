import { configureStore } from '@reduxjs/toolkit'
import globalSlice from '../features/globalSlice'
import userSlice from '../features/userSlice'

export default configureStore({
  reducer: {
    global: globalSlice,
    user: userSlice
  },
})
