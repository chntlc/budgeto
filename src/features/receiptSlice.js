import { createSlice } from '@reduxjs/toolkit'

const receiptSlice = createSlice({
  name: 'receipt',
  initialState: {
    items: [
      // {
      //   name: 'chocolate',
      //   qty: 1,
      //   price: 2
      // },
      // {
      //   name: 'chips',
      //   qty: 3,
      //   price: 1
      // },
      // {
      //   name: 't-shirt',
      //   qty: 1,
      //   price: 20
      // }
    ]
  },
  reducers: {
    addItems: (state, items) => {
      console.log('hit addItem action')
      console.log(items.payload)
      state.items = items.payload
    },
    deleteItem: (state) => {
      console.log('hit deleteItem action')
    },
    editItem: (state) => {
      console.log('hit editItem action')
    }
  }
})

export const { addItems, deleteItem, editItem } = receiptSlice.actions

export default receiptSlice.reducer
