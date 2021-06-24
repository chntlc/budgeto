import { configureStore } from '@reduxjs/toolkit'
import categorySlice from '../features/categorySlice'
import globalSlice from '../features/globalSlice'
import receiptSlice from '../features/receiptSlice'

export default configureStore({
  reducer: {
    global: globalSlice,
    receipt: receiptSlice,
    category: categorySlice
  },
})
