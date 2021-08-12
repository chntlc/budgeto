import Receipt from "./Receipt";
import CategoryPicker from "./CategoryPicker";
import CategoryFilter from "./CategoryFilter";
import "../css/ReceiptUploadedPage.css";
import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  addItemsToCategories,
  addItemToCategory,
  deleteItemFromCategory,
  getCategories,
  reorderItemInCategory,
  clearItemsFromCategories,
} from "../features/categorySlice";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { clearItems } from "../features/receiptSlice";

function ReceiptUploadedPage(props) {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.global.user._id);
  const categories = useSelector((state) => state.categories.categories);
  const categoriesStatus = useSelector((state) => state.categories.status);
  const transactions = useSelector((state) => state.receipt.items);
  const [items, updateItems] = useState(transactions);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getCategories(user_id));
    }
    // This will redirect to Add page if no items exists
    if (props.items.length === 0) {
      alert("You have no item to upload! Please enter them again");
      props.history.push({
        pathname: "/add",
      });
    }
  }, [categoriesStatus, dispatch]);

  function handleOnDragEnd({ source, destination }) {
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      handleIntraListMovement(source, destination);
    } else {
      handleInterlistMovement(source, destination);
    }
  }

  function handleIntraListMovement(source, destination) {
    const droppableId = source.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (droppableId === "transactions") {
      const itemsCopy = [...items];
      const [reorderedItem] = itemsCopy.splice(sourceIndex, 1);
      itemsCopy.splice(destinationIndex, 0, reorderedItem);

      updateItems(itemsCopy);
    } else {
      dispatch(
        reorderItemInCategory(droppableId, sourceIndex, destinationIndex)
      );
    }
  }

  function handleInterlistMovement(source, destination) {
    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (sourceDroppableId === "transactions") {
      const categoryId = destinationDroppableId;
      handleItemFromTransaction(sourceIndex, destinationIndex, categoryId);
    } else if (destinationDroppableId === "transactions") {
      const categoryId = sourceDroppableId;
      handleItemToTransactions(categoryId, sourceIndex, destinationIndex);
    } else {
      const fromCategoryId = sourceDroppableId;
      const toCategoryId = destinationDroppableId;
      handleItemBetweenCategories(
        fromCategoryId,
        toCategoryId,
        sourceIndex,
        destinationIndex
      );
    }
  }

  function handleItemFromTransaction(
    sourceIndex,
    destinationIndex,
    categoryId
  ) {
    const itemsCopy = [...items];
    const [selectedItem] = itemsCopy.splice(sourceIndex, 1);
    const { itemId, name, qty, price } = selectedItem;

    updateItems(itemsCopy);
    dispatch(
      addItemToCategory(itemId, name, qty, price, categoryId, destinationIndex)
    );
  }

  function handleItemToTransactions(categoryId, sourceIndex, destinationIndex) {
    const selectedItem = getItemFromCategory(categoryId, sourceIndex);
    const itemsCopy = [...items];

    itemsCopy.splice(destinationIndex, 0, selectedItem);

    updateItems(itemsCopy);
    dispatch(deleteItemFromCategory(sourceIndex, categoryId));
  }

  function handleItemBetweenCategories(
    fromCategoryId,
    toCategoryId,
    sourceIndex,
    destinationIndex
  ) {
    const selectedItem = getItemFromCategory(fromCategoryId, sourceIndex);
    const { itemId, name, qty, price } = selectedItem;

    dispatch(
      addItemToCategory(
        itemId,
        name,
        qty,
        price,
        toCategoryId,
        destinationIndex
      )
    );
    dispatch(deleteItemFromCategory(sourceIndex, fromCategoryId));
  }

  function getItemFromCategory(categoryId, itemIndex) {
    const category = categories.find((category) => category._id === categoryId);
    const categoryItems = [...category.items];
    const selectedItem = categoryItems[itemIndex];

    return selectedItem;
  }

  function handleSubmitItems() {
    dispatch(addItemsToCategories({ user_id, categories: props.categories }));
    dispatch(clearItems());
    dispatch(clearItemsFromCategories());
  }

  function handleBack() {
    dispatch(clearItemsFromCategories());
  }

  return (
    <>
      <div className="button-row-uploaded">
        <Link to="/add" className="back-button" onClick={handleBack}>
          Back
        </Link>
        <Link
          to="/dashboard"
          className="submit-button"
          onClick={handleSubmitItems}
        >
          Submit
        </Link>
      </div>
      <div className="container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="receiptView">
            <Receipt items={items} />
          </div>
          <div className="categoryView">
            <CategoryPicker categories={categories} />
            <CategoryFilter />
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items,
    categories: state.categories.categories,
    submitStatus: state.categories.submitStatus,
  };
};

export default connect(mapStateToProps)(ReceiptUploadedPage);
