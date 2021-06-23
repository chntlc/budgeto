import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [
      {
        name: 'grocery',
        colour: 'blue',
        selected: true,
        imageURL: 'https://github.com/chntlc/broke.io/blob/563ed4e6bf62af606764c7a24b1e4c477b13e918/src/images/groceryIcon.png'
      },
      {
        name: 'clothing',
        colour: 'pink',
        selected: false,
        imageURL: 'https://github.com/chntlc/broke.io/blob/563ed4e6bf62af606764c7a24b1e4c477b13e918/src/images/clothingIcon.png'
      }
    ]
  },
  reducers: {
    addCategory: (state) => {
      console.log('hit addCategory action')
    },
    deleteCategory: (state) => {
      console.log('hit deleteCategory action')
    },
    editCategory: (state) => {
      console.log('hit editCategory action')
    },
    addItemToCategory: (state) => {
      console.log('hit addItemToCategory action')
    },
    deleteItemFromCategory: (state) => {
      console.log('hit deleteItemFromCategory action')
    }
  }
})

export const { addCategory, deleteCategory, editCategory, addItemToCategory, deleteItemFromCategory } = categorySlice.actions

export default categorySlice.reducer
