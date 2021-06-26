import "./CategoryFilter.css";
import { useSelector } from "react-redux";

function CategoryFilter() {
  const categories = useSelector((state) => state.category.categories);

  function openFilterContainer(event) {
    event.target.classList.toggle("activeCollapsible");

    let collapsibleContent = event.target.nextElementSibling;
    let isMaxHeightSet = collapsibleContent.style.maxHeight;

    collapsibleContent.style.maxHeight = isMaxHeightSet
      ? null
      : collapsibleContent.scrollHeight + "px";
  }

  return (
    <div className="filterContainer">
      {categories.map((category) => {
        return (
          <div className="filter" key={category["categoryId"]}>
            <button
              type="button"
              className="collapsible"
              style={{ backgroundColor: category["iconColour"] }}
              onClick={(event) => openFilterContainer(event)}
            >
              {category["categoryName"]}
            </button>
            <div className="filteredItems">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
