import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "../features/categorySlice";
import Category from "./Category";
import Modal from "./Modal";
import AddIcon from "../images/addIcon.png";
import "../css/CategoryPicker.css";
import { unwrapResult } from "@reduxjs/toolkit";

function CategoryPicker(props) {
  const user_id = useSelector((state) => state.global.user._id);
  const [modal, toggleModal] = useState(false);
  const [edit, toggleEdit] = useState(false);
  const [categoryInModal, setCategoryInModal] = useState({});
  const [customName, setCustomName] = useState("");
  const [customIconBase64, setCustomIconBase64] = useState("");
  const [customIconFile, setCustomIconFile] = useState(null);
  const [customColor, setCustomeColor] = useState("");
  const categories = props.categories;
  const dispatch = useDispatch();
  const defaultCategories = [
    "Grocery",
    "Clothing",
    "Dining Out",
    "Transportation",
    "Traveling",
  ];

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
        {edit && !isDefaultCategory(name) && (
          <button onClick={() => onEditCategory(categoryInModal)}>Edit</button>
        )}
        {edit && !isDefaultCategory(name) && (
          <button onClick={() => onDeleteCategory(categoryInModal)}>
            Delete
          </button>
        )}
      </div>
    );
  }

  function isDefaultCategory(name) {
    return defaultCategories.indexOf(name) !== -1;
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
    }
  }

  function chooseColor(event) {
    setCustomeColor(event.target.value);
  }

  async function onAddCategory() {
    const selectedName = customName ? customName : "Unknown";
    const selectedColor = customColor ? customColor : "#39A9CB";
    const selectedIcon = customIconFile ? customIconFile : null;

    if (!selectedIcon) {
      alert("Please select an icon");
    } else if (isDefaultCategory(selectedName)) {
      alert("Selected name already exists as a default category");
    } else {
      try {
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
        alert("Failed to add the category");
      } finally {
        closeModal();
      }
    }
  }

  async function onEditCategory(category) {
    const { _id, name, color, icon_img } = category;
    const updatedName = customName ? customName : name;
    const updatedColor = customColor ? customColor : color;
    const updatedIcon = customIconFile ? customIconFile : null;

    if (isDefaultCategory(updatedName)) {
      alert("Selected name already exists as a default category");
    } else {
      try {
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
        alert("Failed to update the category");
      } finally {
        closeModal();
      }
    }
  }

  async function onDeleteCategory(category) {
    const { _id } = category;
    const deletePayload = { user_id, category_id: _id };

    try {
      const resultAction = await dispatch(deleteCategory(deletePayload));
      unwrapResult(resultAction);
    } catch (err) {
      alert("Failed to delete the category");
    } finally {
      closeModal();
    }
  }

  function closeModal() {
    toggleModal(false);
    setCustomName("");
    setCustomeColor("");
    setCustomIconBase64("");
    setCustomIconFile(null);
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
