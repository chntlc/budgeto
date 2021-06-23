import { createSlice } from '@reduxjs/toolkit'

const receiptSlice = createSlice({
  name: 'receipt',
  initialState: {
    items: [
      {
        name: 'chocolate',
        qty: 1,
        price: 2
      },
      {
        name: 'chips',
        qty: 3,
        price: 1
      },
      {
        name: 't-shirt',
        qty: 1,
        price: 20
      }
    ]
  },
  reducers: {
    addItem: (state) => {
      console.log('hit addItem action')
    },
    deleteItem: (state) => {
      console.log('hit deleteItem action')
    },
    editItem: (state) => {
      console.log('hit editItem action')
    }
  }
})

export const { addItem, deleteItem, editItem } = receiptSlice.actions

export default receiptSlice.reducer
