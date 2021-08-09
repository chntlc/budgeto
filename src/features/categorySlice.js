import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
  submitStatus: null,
};

function addItemsArray(category) {
  category.items = [];

  return category;
}

function arrayBufferToBase64(category) {
  const { icon_img } = category;
  const icon_img_buffer = icon_img.data.data;
  const base64Flag = `data:${icon_img.contentType};base64,`;

  let binary = "";
  let bytes = [].slice.call(new Uint8Array(icon_img_buffer));

  bytes.forEach((b) => (binary += String.fromCharCode(b)));

  category.icon_img = base64Flag + window.btoa(binary);

  return category;
}

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (user_id) => {
    const response = await axios.get(`/categories/${user_id}`);

    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryPayload) => {
    const { name, color, icon_img, user_id } = categoryPayload;

    const categoryForm = new FormData();
    categoryForm.append("name", name);
    categoryForm.append("color", color);
    categoryForm.append("icon_img", icon_img);
    categoryForm.append("user_id", user_id);

    const response = await axios.post("/categories/addCategory", categoryForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async (category) => {
    const { _id, name, color, icon_img } = category;

    const categoryForm = new FormData();
    categoryForm.append("name", name);
    categoryForm.append("color", color);
    categoryForm.append("icon_img", icon_img);

    const response = await axios.put(
      `/categories/editCategory/${_id}`,
      categoryForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (deletePayload) => {
    const { user_id, category_id } = deletePayload;
    const response = await axios.delete(
      `/categories/deleteCategory/${user_id}/${category_id}`
    );

    return response.data;
  }
);

// submit what is already in store
export const addItemsToCategories = createAsyncThunk(
  "categories/addItemsToCategories",
  async ({ user_id, categories }) => {
    console.log({ user_id, categories });
    const currentDate = new Date();
    const allItems = [];

    categories.forEach((category) => {
      console.log({ category });
      category.items.forEach((item) => {
        console.log({ item });
        const newItem = { ...item };
        // organize item object so it matches DB
        newItem.category_id = category._id;
        newItem.user_id = user_id;
        newItem.date = currentDate;

        console.log({ newItem });
        allItems.push(newItem);
        // assuming all the other fields: name, price, qty are correct
      });
    });

    const response = await axios.post(`/receipts/items`, {
      items: allItems,
    });

    return response.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addItemToCategory: {
      reducer: (state, action) => {
        const { item, categoryId, destinationIndex } = action.payload;
        const category = state.categories.find(
          (category) => category._id === categoryId
        );

        if (category) {
          category.items.splice(destinationIndex, 0, item);
        }
      },
      prepare: (itemId, name, qty, price, categoryId, destinationIndex) => {
        const item = {
          itemId,
          name,
          qty,
          price,
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
          (category) => category._id === categoryId
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
    clearItemsFromCategories: {
      reducer: (state, action) => {
        const categoriesCopy = [...state.categories];
        categoriesCopy.forEach((category) => {
          category.items = [];
        });

        state.categories = categoriesCopy;
      },
    },
    reorderItemInCategory: {
      reducer: (state, action) => {
        const { categoryId, sourceIndex, destinationIndex } = action.payload;
        const categoryToEdit = state.categories.find(
          (category) => category._id === categoryId
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
  },
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCategories.fulfilled]: (state, action) => {
      state.status = "succeeded";

      const categoriesCopy = action.payload;
      categoriesCopy.forEach(addItemsArray);
      categoriesCopy.forEach(arrayBufferToBase64);

      state.categories = state.categories.concat(categoriesCopy);
    },
    [getCategories.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addCategory.fulfilled]: (state, action) => {
      let categoryCopy = action.payload;
      categoryCopy = addItemsArray(categoryCopy);
      categoryCopy = arrayBufferToBase64(categoryCopy);

      state.categories.push(categoryCopy);
    },
    [editCategory.fulfilled]: (state, action) => {
      const { _id, name, color, icon_img } = action.payload;
      let categoryToEdit = state.categories.find(
        (category) => category._id === _id
      );

      if (categoryToEdit) {
        categoryToEdit.name = name;
        categoryToEdit.color = color;
        categoryToEdit.icon_img = icon_img;
        categoryToEdit = arrayBufferToBase64(categoryToEdit);
      }
    },
    [deleteCategory.fulfilled]: (state, action) => {
      const category_id = action.payload;
      const targetCategoryIndex = state.categories.findIndex(
        (category) => category._id === category_id
      );

      if (targetCategoryIndex !== -1) {
        state.categories.splice(targetCategoryIndex, 1);
      }
    },
    [addItemsToCategories.pending]: (state, action) => {
      state.submitStatus = "loading";
    },
    [addItemsToCategories.fulfilled]: (state, action) => {
      state.submitStatus = "succeeded";
    },
    [addItemsToCategories.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const {
  addItemToCategory,
  deleteItemFromCategory,
  reorderItemInCategory,
  clearItemsFromCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
