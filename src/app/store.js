import { configureStore } from '@reduxjs/toolkit'
import categorySlice from '../features/categorySlice'
import globalSlice from '../features/globalSlice'
import receiptSlice from '../features/receiptSlice'
import settingsSlice from '../features/settingsSlice'

export default configureStore({
  reducer: {
    global: globalSlice,
    receipt: receiptSlice,
    category: categorySlice,
    settings: settingsSlice,
  },
})

// const store = configureStore({
//   reducer: {
//     global: globalSlice,
//     receipt: receiptSlice,
//     category: categorySlice,
//     settings: settingsSlice,
//   },
// });
//
// export default store;
