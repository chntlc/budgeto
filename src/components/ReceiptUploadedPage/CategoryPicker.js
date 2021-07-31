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
import QuestionMarkIcon from "../../images/questionMarkIcon.png";
import "./CategoryPicker.css";
import { unwrapResult } from "@reduxjs/toolkit";

function CategoryPicker(props) {
  const user_id = useSelector((state) => state.global.user._id);
  const [modal, toggleModal] = useState(false);
  const [edit, toggleEdit] = useState(false);
  const [categoryInModal, setCategoryInModal] = useState({});
  const [customName, setCustomName] = useState("");
  const [customIconBase64, setCustomIconBase64] = useState("");
  const [customIconFile, setCustomIconFile] = useState({});
  const [customColor, setCustomeColor] = useState("");
  const [addCategoryStatus, setAddCategoryStatus] = useState("idle");
  const [editCategoryStatus, setEditCategoryStatus] = useState("idle");
  const [deleteCategoryStatus, setDeleteCategoryStatus] = useState("idle");
  const categories = props.categories;
  const dispatch = useDispatch();

  function showAddModal() {
    const templateCategory = {
      name: "",
      icon_img: customIconBase64,
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
                name="icon_img"
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
            iconImg={customIconBase64 ? customIconBase64 : icon_img}
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
    const files = event.target.files;
    if (files && files[0]) {
      const chosenIcon = URL.createObjectURL(files[0]);
      setCustomIconBase64(chosenIcon);
      setCustomIconFile(files[0]);
      console.log({ icon: files[0] });
    }
  }

  function chooseColor(event) {
    setCustomeColor(event.target.value);
  }

  async function onAddCategory() {
    const selectedName = customName ? customName : "Unknown";
    const selectedColor = customColor ? customColor : "#39A9CB";
    // const selectedIcon = customIconBase64 ? customIconBase64 : QuestionMarkIcon;
    const selectedIcon = customIconFile;

    try {
      setAddCategoryStatus("pending");

      const resultAction = await dispatch(
        addCategory({
          name: selectedName,
          color: selectedColor,
          icon_img: selectedIcon,
          user_id,
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
    // const updatedIcon = customIconBase64 ? customIconBase64 : icon_img;
    const updatedIcon = customIconFile ? customIconFile : null;

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
    const deletePayload = { user_id, category_id: _id };

    try {
      setDeleteCategoryStatus("pending");

      const resultAction = await dispatch(deleteCategory(deletePayload));
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
    setCustomeColor("");
    setCustomIconBase64("");
    setCustomIconFile({});
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
