import { createSlice, nanoid } from "@reduxjs/toolkit";
import GroceryIcon from "../images/groceryIcon.png";
import RestaurantIcon from "../images/restaurantIcon.png";
import ClothingIcon from "../images/clothingIcon.png";
import TransportationIcon from "../images/transportationIcon.png";
import TravelingIcon from "../images/travelingIcon.png";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [
      {
        categoryId: nanoid(),
        categoryName: "Grocery",
        iconImg: GroceryIcon,
        iconColour: "#EAC495",
        items: [],
      },
      {
        categoryId: nanoid(),
        categoryName: "Dining Out",
        iconImg: RestaurantIcon,
        iconColour: "#E7AD9E",
        items: [],
      },
      {
        categoryId: nanoid(),
        categoryName: "Clothing",
        iconImg: ClothingIcon,
        iconColour: "#46436A",
        items: [],
      },
      {
        categoryId: nanoid(),
        categoryName: "Transportation",
        iconImg: TransportationIcon,
        iconColour: "#2F2D4F",
        items: [],
      },
      {
        categoryId: nanoid(),
        categoryName: "Traveling",
        iconImg: TravelingIcon,
        iconColour: "#301B3F",
        items: [],
      },
    ],
  },
  reducers: {
    addCategory: {
      reducer: (state, action) => {
        state.categories.push(action.payload);
      },
      prepare: (categoryName, iconImg, iconColour) => {
        const categoryId = nanoid();
        const items = [];
        return {
          payload: {
            categoryId,
            categoryName,
            iconImg,
            iconColour,
            items,
          },
        };
      },
    },
    deleteCategory: {
      reducer: (state, action) => {
        const categoryId = action.payload;
        const targetCategoryIndex = state.categories.findIndex(
          (category) => category.categoryId === categoryId
        );

        if (targetCategoryIndex !== -1) {
          state.categories.splice(targetCategoryIndex, 1);
        }
      },
      prepare: (categoryId) => {
        return { payload: categoryId };
      },
    },
    editCategory: {
      reducer: (state, action) => {
        const { categoryId, categoryName, iconImg, iconColour } =
          action.payload;
        const categoryToEdit = state.categories.find(
          (category) => category.categoryId === categoryId
        );

        if (categoryToEdit) {
          categoryToEdit.categoryName = categoryName;
          categoryToEdit.iconImg = iconImg;
          categoryToEdit.iconColour = iconColour;
        }
      },
      prepare: (categoryId, categoryName, iconImg, iconColour) => {
        return {
          payload: {
            categoryId,
            categoryName,
            iconImg,
            iconColour,
          },
        };
      },
    },
    addItemToCategory: {
      reducer: (state, action) => {
        const { item, categoryId } = action.payload;
        const category = state.categories.find(
          (category) => category.categoryId === categoryId
        );

        if (category) {
          category.items.push(item);
        }
      },
      prepare: (itemName, price, quantity, categoryId) => {
        const itemId = nanoid();
        const item = {
          itemId,
          itemName,
          price,
          quantity,
        };
        return {
          payload: { item, categoryId },
        };
      },
    },
    deleteItemFromCategory: {
      reducer: (state, action) => {
        const { itemId, categoryId } = action.payload;
        const category = state.categories.find(
          (category) => category.categoryId === categoryId
        );

        if (category) {
          category.items.filter((item) => item.itemId !== itemId);
        }
      },
      prepare: (itemId, categoryId) => {
        return {
          payload: { itemId, categoryId },
        };
      },
    },
    submitCategorizedItems: {
      reducer: (state) => {
        console.log("Insert to mongo collection");
      },
    },
  },
});

export const {
  addCategory,
  deleteCategory,
  editCategory,
  addItemToCategory,
  deleteItemFromCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
