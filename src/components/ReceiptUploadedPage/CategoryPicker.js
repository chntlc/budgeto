import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "../../features/categorySlice";
import Category from "./Category";
import Modal from "../Modal";
import AddIcon from "../../images/addIcon.png";
import VideoGameIcon from "../../images/videoGameIcon.png";
import SnacksIcon from "../../images/snacksIcon.png";
import "./CategoryPicker.css";

function CategoryPicker() {
  const [modal, toggleModal] = useState(false);
  const [edit, toggleEdit] = useState(false);
  const [categoryInModal, setCategoryInModal] = useState({});
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  function onAddCategory() {
    toggleModal(false);
    dispatch(addCategory("Video Game", VideoGameIcon, "#39A9CB"));
  }

  function onEditCategory(category) {
    const { categoryId } = category;

    toggleModal(false);
    dispatch(editCategory(categoryId, "Snacks", SnacksIcon, "#F4ABC4"));
  }

  function onDeleteCategory(category) {
    const { categoryId } = category;

    toggleModal(false);
    dispatch(deleteCategory(categoryId));
  }

  function showAddModal() {
    const categoryInModal = {
      categoryName: "Add Category",
      iconImg: VideoGameIcon,
      iconColour: "#39A9CB",
    };

    if (!edit) {
      toggleModal(true);
      setCategoryInModal(categoryInModal);
    }
  }

  function showEditModal(category) {
    if (edit) {
      toggleModal(true);
      setCategoryInModal(category);
    }
  }

  function makeModalContent(categoryInModal) {
    const { categoryName, iconImg, iconColour } = categoryInModal;

    return (
      <div id="modalContainer">
        <div id="modalFormContainer">
          <form>
            <label>Category Name</label>
            <input type="text" placeholder={edit ? categoryName : ""} />
            <label>Icon Image</label>
            <button type="button">Choose File</button>
            <label>Icon Colour</label>
            <button type="button">Choose Colour</button>
          </form>
          <Category
            iconAlt={categoryName}
            iconImg={iconImg}
            iconColour={iconColour}
          />
        </div>
        {!edit && <button onClick={onAddCategory}>Add</button>}
        {edit && (
          <button onClick={() => onEditCategory(categoryInModal)}>Edit</button>
        )}
        {edit && (
          <button onClick={() => onDeleteCategory(categoryInModal)}>
            Delete
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {modal && (
        <Modal
          content={makeModalContent(categoryInModal)}
          onClose={() => toggleModal(false)}
        />
      )}
      <button id={edit ? "edit" : "add"} onClick={() => toggleEdit(!edit)}>
        {edit ? "Done" : "Edit"}
      </button>
      <div id={edit ? "categoryContainerEdit" : "categoryContainerAdd"}>
        <div id="scroller">
          {categories.map((category) => {
            const { categoryId, categoryName, iconImg, iconColour } = category;
            return (
              <Category
                key={categoryId}
                iconAlt={categoryName}
                iconImg={iconImg}
                iconColour={iconColour}
                clickEvent={() => showEditModal(category)}
              />
            );
          })}
          <Category
            iconImg={AddIcon}
            iconAlt="Add Category"
            iconColour="#E1E5EA"
            clickEvent={() => showAddModal()}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPicker;
