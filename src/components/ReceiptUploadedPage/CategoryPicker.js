import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "../../features/categorySlice";
import Category from "./Category";
import Modal from "../Modal";
import AddIcon from "../../images/addIcon.png";
import QuestionMarkIcon from "../../images/questionMarkIcon.png";
import "./CategoryPicker.css";
import { unwrapResult } from "@reduxjs/toolkit";

function CategoryPicker(props) {
  const [modal, toggleModal] = useState(false);
  const [edit, toggleEdit] = useState(false);
  const [categoryInModal, setCategoryInModal] = useState({});
  const [customName, setCustomName] = useState("");
  const [customIcon, setCustomIcon] = useState("");
  const [customColor, setCustomeColor] = useState("");
  const [addCategoryStatus, setAddCategoryStatus] = useState("idle");
  const [editCategoryStatus, setEditCategoryStatus] = useState("idle");
  const [deleteCategoryStatus, setDeleteCategoryStatus] = useState("idle");
  const categories = props.categories;
  const dispatch = useDispatch();

  function showAddModal() {
    const templateCategory = {
      name: "",
      icon_img: customIcon,
      color: "#E1E5EA",
    };

    if (!edit) {
      toggleModal(true);
      setCategoryInModal(templateCategory);
    }
  }

  function showEditModal(category) {
    if (edit) {
      toggleModal(true);
      setCategoryInModal(category);
    }
  }

  function makeModalContent(categoryInModal) {
    const { name, icon_img, color } = categoryInModal;

    return (
      <div id="modalContainer">
        <div id="modalFormContainer">
          <form>
            <label>Category Name</label>
            <input
              onChange={setCategoryName}
              type="text"
              placeholder={edit ? name : ""}
            />
            <label>Icon Image</label>
            <label id="customFileUpload">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={chooseIcon}
              />
              Choose Image
            </label>
            <label>Icon Color</label>
            <input
              id="customColor"
              type="color"
              value={customColor ? customColor : color}
              onChange={chooseColor}
            />
          </form>
          <Category
            iconAlt={name}
            iconImg={customIcon ? customIcon : icon_img}
            color={customColor ? customColor : color}
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

  function setCategoryName(event) {
    setCustomName(event.target.value);
  }

  function chooseIcon(event) {
    if (event.target.files && event.target.files[0]) {
      const chosenIcon = URL.createObjectURL(event.target.files[0]);
      setCustomIcon(chosenIcon);
    }
  }

  function chooseColor(event) {
    setCustomeColor(event.target.value);
  }

  async function onAddCategory() {
    const selectedName = customName ? customName : "Unknown";
    const selectedColor = customColor ? customColor : "#39A9CB";
    const selectedIcon = customIcon ? customIcon : QuestionMarkIcon;

    try {
      setAddCategoryStatus("pending");

      const resultAction = await dispatch(
        addCategory({
          name: selectedName,
          color: selectedColor,
          icon_img: selectedIcon,
        })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.log("Failed to add the category", err);
    } finally {
      setAddCategoryStatus("idle");
      closeModal();
    }
  }

  async function onEditCategory(category) {
    const { _id, name, color, icon_img } = category;
    const updatedName = customName ? customName : name;
    const updatedColor = customColor ? customColor : color;
    const updatedIcon = customIcon ? customIcon : icon_img;

    try {
      setEditCategoryStatus("pending");

      const resultAction = await dispatch(
        editCategory({
          _id,
          name: updatedName,
          color: updatedColor,
          icon_img: updatedIcon,
        })
      );
      unwrapResult(resultAction);
    } catch (err) {
      console.log("Failed to update the category", err);
    } finally {
      setEditCategoryStatus("idle");
      closeModal();
    }
  }

  async function onDeleteCategory(category) {
    const { _id } = category;

    try {
      setDeleteCategoryStatus("pending");

      const resultAction = await dispatch(deleteCategory(_id));
      unwrapResult(resultAction);
    } catch (err) {
      console.log("Failed to delete the category", err);
    } finally {
      setDeleteCategoryStatus("idle");
      closeModal();
    }
  }

  function closeModal() {
    toggleModal(false);
    setCustomName("");
    setCustomIcon("");
    setCustomeColor("");
  }

  return (
    <div>
      {modal && (
        <Modal
          content={makeModalContent(categoryInModal)}
          onClose={closeModal}
        />
      )}
      <button id={edit ? "edit" : "add"} onClick={() => toggleEdit(!edit)}>
        {edit ? "Done" : "Edit"}
      </button>
      <div id={edit ? "categoryContainerEdit" : "categoryContainerAdd"}>
        <div id="scroller">
          {categories.map((category) => {
            const { _id, name, color, icon_img } = category;
            return (
              <Category
                key={_id}
                iconAlt={name}
                color={color}
                iconImg={icon_img}
                clickEvent={() => showEditModal(category)}
              />
            );
          })}
          <Category
            iconAlt="Add Category"
            color="#E1E5EA"
            iconImg={AddIcon}
            clickEvent={() => showAddModal()}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPicker;
