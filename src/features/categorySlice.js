import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import GroceryIcon from "../images/groceryIcon.png";
import RestaurantIcon from "../images/restaurantIcon.png";
import ClothingIcon from "../images/clothingIcon.png";
import TransportationIcon from "../images/transportationIcon.png";
import TravelingIcon from "../images/travelingIcon.png";

const initialState = {
  categories: [
    // {
    //   categoryId: nanoid(),
    //   categoryName: "Grocery",
    //   iconImg: GroceryIcon,
    //   iconColour: "#EAC495",
    //   items: [],
    // },
    // {
    //   categoryId: nanoid(),
    //   categoryName: "Dining Out",
    //   iconImg: RestaurantIcon,
    //   iconColour: "#E7AD9E",
    //   items: [],
    // },
    // {
    //   categoryId: nanoid(),
    //   categoryName: "Clothing",
    //   iconImg: ClothingIcon,
    //   iconColour: "#46436A",
    //   items: [],
    // },
    // {
    //   categoryId: nanoid(),
    //   categoryName: "Transportation",
    //   iconImg: TransportationIcon,
    //   iconColour: "#2F2D4F",
    //   items: [],
    // },
    // {
    //   categoryId: nanoid(),
    //   categoryName: "Traveling",
    //   iconImg: TravelingIcon,
    //   iconColour: "#301B3F",
    //   items: [],
    // },
  ],
  status: "idle",
  error: null,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const user_id = 1;
    const response = await axios.get(
      `http://localhost:3001/categories/${user_id}`
    );

    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category) => {
    const response = await axios.post(
      "http://localhost:3001/categories/addCategory",
      category
    );
    console.log({ response });
    return response.data;
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (category) => {
    const { _id } = category;
    const response = axios.put(
      `http://localhost:3001/categories/editCategory/${_id}`,
      category
    );
    console.log({ response });
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (_id) => {
    const response = axios.delete(
      `http://localhost:3001/categories/deleteCategory/${_id}`
    );
    console.log(response);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // addCategory: {
    //   reducer: (state, action) => {
    //     state.categories.push(action.payload);
    //   },
    //   prepare: (categoryName, iconImg, iconColour) => {
    //     const categoryId = nanoid();
    //     const items = [];
    //     return {
    //       payload: {
    //         categoryId,
    //         categoryName,
    //         iconImg,
    //         iconColour,
    //         items,
    //       },
    //     };
    //   },
    // },
    // deleteCategory: {
    //   reducer: (state, action) => {
    //     const categoryId = action.payload;
    //     const targetCategoryIndex = state.categories.findIndex(
    //       (category) => category.categoryId === categoryId
    //     );

    //     if (targetCategoryIndex !== -1) {
    //       state.categories.splice(targetCategoryIndex, 1);
    //     }
    //   },
    //   prepare: (categoryId) => {
    //     return { payload: categoryId };
    //   },
    // },
    // editCategory: {
    //   reducer: (state, action) => {
    //     const { categoryId, categoryName, iconImg, iconColour } =
    //       action.payload;
    //     const categoryToEdit = state.categories.find(
    //       (category) => category.categoryId === categoryId
    //     );

    //     if (categoryToEdit) {
    //       categoryToEdit.categoryName = categoryName;
    //       categoryToEdit.iconImg = iconImg;
    //       categoryToEdit.iconColour = iconColour;
    //     }
    //   },
    //   prepare: (categoryId, categoryName, iconImg, iconColour) => {
    //     return {
    //       payload: {
    //         categoryId,
    //         categoryName,
    //         iconImg,
    //         iconColour,
    //       },
    //     };
    //   },
    // },
    addItemToCategory: {
      reducer: (state, action) => {
        const { item, categoryId, destinationIndex } = action.payload;
        const category = state.categories.find(
          (category) => category.categoryId === categoryId
        );

        if (category) {
          category.items.splice(destinationIndex, 0, item);
        }
      },
      prepare: (
        itemId,
        itemName,
        price,
        quantity,
        categoryId,
        destinationIndex
      ) => {
        const item = {
          itemId,
          itemName,
          price,
          quantity,
        };
        return {
          payload: { item, categoryId, destinationIndex },
        };
      },
    },
    deleteItemFromCategory: {
      reducer: (state, action) => {
        const { itemIndex, categoryId } = action.payload;
        const category = state.categories.find(
          (category) => category.categoryId === categoryId
        );

        if (category) {
          category.items.splice(itemIndex, 1);
        }
      },
      prepare: (itemIndex, categoryId) => {
        return {
          payload: { itemIndex, categoryId },
        };
      },
    },
    reorderItemInCategory: {
      reducer: (state, action) => {
        const { categoryId, sourceIndex, destinationIndex } = action.payload;
        const categoryToEdit = state.categories.find(
          (category) => category.categoryId === categoryId
        );

        if (categoryToEdit) {
          const itemsCopy = [...categoryToEdit.items];
          const [reorderedItem] = itemsCopy.splice(sourceIndex, 1);
          itemsCopy.splice(destinationIndex, 0, reorderedItem);

          categoryToEdit.items = itemsCopy;
        }
      },
      prepare: (categoryId, sourceIndex, destinationIndex) => {
        return {
          payload: { categoryId, sourceIndex, destinationIndex },
        };
      },
    },
    submitCategorizedItems: {
      reducer: (state) => {
        console.log("Insert to mongo collection");
      },
    },
  },
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCategories.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.categories = state.categories.concat(action.payload);
    },
    [getCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
    },
    [editCategory.fulfilled]: (state, action) => {
      const { _id, name, color, icon_img } = action.payload;
      const categoryToEdit = state.categories.find(
        (category) => category._id === _id
      );

      if (categoryToEdit) {
        categoryToEdit.name = name;
        categoryToEdit.color = color;
        categoryToEdit.icon_img = icon_img;
      }
    },
    [deleteCategory.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      const targetCategoryIndex = state.categories.findIndex(
        (category) => category._id === _id
      );

      if (targetCategoryIndex !== -1) {
        state.categories.splice(targetCategoryIndex, 1);
      }
    },
  },
});

export const {
  // addCategory,
  // deleteCategory,
  // editCategory,
  addItemToCategory,
  deleteItemFromCategory,
  reorderItemInCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
