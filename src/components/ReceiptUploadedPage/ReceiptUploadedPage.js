import Receipt from "./Receipt";
import CategoryPicker from "./CategoryPicker";
import CategoryFilter from "./CategoryFilter";
import "./ReceiptUploadedPage.css";
import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  addItemToCategory,
  deleteItemFromCategory,
  getCategories,
  reorderItemInCategory,
} from "../../features/categorySlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

function ReceiptUploadedPage() {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.global.user._id);
  const categories = useSelector((state) => state.categories.categories);
  const categoriesStatus = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);
  const transactions = [
    {
      itemId: "1",
      itemName: "tomato",
      price: "$2",
      quantity: "Qty: 1",
    },
    {
      itemId: "2",
      itemName: "apple",
      price: "$2",
      quantity: "Qty: 1",
    },
    {
      itemId: "3",
      itemName: "lettuce",
      price: "$2",
      quantity: "Qty: 1",
    },
    {
      itemId: "4",
      itemName: "bacon",
      price: "$2",
      quantity: "Qty: 1",
    },
    {
      itemId: "5",
      itemName: "milk",
      price: "$2",
      quantity: "Qty: 1",
    },
  ];
  const [items, updateItems] = useState(transactions);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getCategories(user_id));
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
    const [selectedItem] = items.splice(sourceIndex, 1);
    const { itemId, itemName, price, quantity } = selectedItem;

    dispatch(
      addItemToCategory(
        itemId,
        itemName,
        price,
        quantity,
        categoryId,
        destinationIndex
      )
    );
  }

  function handleItemToTransactions(categoryId, sourceIndex, destinationIndex) {
    const selectedItem = getAndDeleteItemFromCategory(categoryId, sourceIndex);
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
    const selectedItem = getAndDeleteItemFromCategory(
      fromCategoryId,
      sourceIndex
    );
    const { itemId, itemName, price, quantity } = selectedItem;

    dispatch(
      addItemToCategory(
        itemId,
        itemName,
        price,
        quantity,
        toCategoryId,
        destinationIndex
      )
    );
    dispatch(deleteItemFromCategory(sourceIndex, fromCategoryId));
  }

  function getAndDeleteItemFromCategory(categoryId, itemIndex) {
    const category = categories.find(
      (category) => category.categoryId === categoryId
    );
    const categoryItems = [...category.items];
    const [selectedItem] = categoryItems.splice(itemIndex, 1);

    return selectedItem;
  }

  return (
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
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items,
  };
};

export default connect(mapStateToProps)(ReceiptUploadedPage);
