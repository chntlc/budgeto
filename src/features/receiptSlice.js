import { createSlice, nanoid } from "@reduxjs/toolkit";

const receiptSlice = createSlice({
  name: "receipt",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, items) => {
      console.log("hit addItem action");
      console.log(items.payload);
      let transactions = items.payload;

      for (let i = 0; i < transactions.length; i++) {
        transactions[i].itemId = nanoid();
        transactions[i].price = `$${transactions[i].price}`;
      }

      state.items = items.payload;
    },
    deleteItem: (state) => {
      console.log("hit deleteItem action");
    },
    editItem: (state) => {
      console.log("hit editItem action");
    },
  },
});

export const { addItems, deleteItem, editItem } = receiptSlice.actions;

export default receiptSlice.reducer;
