import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

export const addReceipt = createAsyncThunk(
  "receipt/addReceipt",
  async (receipt) => {
    const response = await axios.post(
      `http://localhost:3001/receipts/receipt`,
      {
        receipt,
      }
    );

    return response.data;
  }
);

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, items) => {
      let transactions = items.payload;

      for (let i = 0; i < transactions.length; i++) {
        if (!transactions[i].itemId) transactions[i].itemId = nanoid();
      }

      state.items = items.payload;
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItems, deleteItem, clearItems } = receiptSlice.actions;

export default receiptSlice.reducer;
