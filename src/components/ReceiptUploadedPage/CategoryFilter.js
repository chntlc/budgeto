import "./CategoryFilter.css";

function CategoryFilter() {
  function openFilterContainer(event) {
    event.target.classList.toggle("active");

    let collapsibleContent = event.target.nextElementSibling;
    let isMaxHeightSet = collapsibleContent.style.maxHeight;

    collapsibleContent.style.maxHeight = isMaxHeightSet
      ? null
      : collapsibleContent.scrollHeight + "px";
  }

  return (
    <div>
      <div className="filterContainer">
        <button
          type="button"
          className="collapsible"
          onClick={(event) => openFilterContainer(event)}
        ></button>
        <div className="filteredItems">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <div className="filterContainer">
        <button
          type="button"
          className="collapsible"
          onClick={(event) => openFilterContainer(event)}
        ></button>
        <div className="filteredItems">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
