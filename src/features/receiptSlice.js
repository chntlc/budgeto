import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// export const addItems = createAsyncThunk('receipt/addItems', async (items) => {

//   const response = await axios.post(`http://localhost:3001/receipts/items/`, {
//     items
//   })

//   return response.data
// })

export const addReceipt = createAsyncThunk('receipt/addReceipt', async (receipt) => {

  const response = await axios.post(`http://localhost:3001/receipts/receipt`, {
    receipt
  })

  return response.data
})

const receiptSlice = createSlice({
  name: 'receipt',
  initialState: {
    items: []
  },
  reducers: {
    addItems: (state, items) => {
      console.log('hit addItem action')
      console.log(items.payload)
      state.items = items.payload
    },
    deleteItem: (state, itemToDelete) => {
      console.log('hit deleteItem action')
      // TODO: implement support for deleting item

      // look for item in array, delete it
      // const itemsCopy = state.items.filter((item) => item.name !== itemToDelete.payload)
      // state.items = itemsCopy
    }
  }
})

export const { addItems, deleteItem } = receiptSlice.actions

export default receiptSlice.reducer
