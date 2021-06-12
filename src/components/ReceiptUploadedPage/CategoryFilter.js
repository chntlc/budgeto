import "./CategoryFilter.css";

function CategoryFilter(props) {
  let categories = props.categories;

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
      {categories.map((category, index) => {
        if (index !== categories.length - 1) {
          return (
            <div className="filter" key={index}>
              <button
                type="button"
                className="collapsible"
                style={{ backgroundColor: category["iconColor"] }}
                onClick={(event) => openFilterContainer(event)}
              >
                {category["category"]}
              </button>
              <div className="filteredItems">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default CategoryFilter;
