import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addItems = createAsyncThunk('receipt/addItems', async (items) => {

  const response = await axios.post(`http://localhost:3001/receipt/items/`, {
    items
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

export const { deleteItem } = receiptSlice.actions

export default receiptSlice.reducer
