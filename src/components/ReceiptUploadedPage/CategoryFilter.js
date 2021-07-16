import "./CategoryFilter.css";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

function CategoryFilter(props) {
  const categories = useSelector((state) => state.categories.categories);

  function toggleFilterContainer(event) {
    event.target.classList.toggle("activeCollapsible");

    let collapsibleContent = event.target.nextElementSibling;
    let isMaxHeightSet = collapsibleContent.style.maxHeight;

    if (
      !collapsibleContent.style.display ||
      collapsibleContent.style.display === "none"
    ) {
      collapsibleContent.style.display = "block";
    } else {
      collapsibleContent.style.display = "none";
    }

    collapsibleContent.style.maxHeight = isMaxHeightSet
      ? null
      : collapsibleContent.scrollHeight + "px";
  }

  return (
    <div className="filterContainer">
      {categories.map(({ categoryId, categoryName, iconColour, items }) => {
        return (
          <div className="filter" key={categoryId}>
            <button
              type="button"
              className="collapsible"
              style={{ backgroundColor: iconColour }}
              onClick={(event) => toggleFilterContainer(event)}
            >
              {categoryName}
            </button>
            <div className="filteredItems">
              {items.length ? (
                <Droppable droppableId={categoryId}>
                  {(provided) => (
                    <ul
                      className="transactions"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {items.map(
                        ({ itemId, itemName, price, quantity }, index) => {
                          return (
                            <Draggable
                              key={itemId}
                              draggableId={itemId}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="item">
                                    <div className="itemName">
                                      <p>{itemName}</p>
                                    </div>
                                    <div className="price">
                                      <p>{price}</p>
                                    </div>
                                    <div className="quantity">
                                      <p>{quantity}</p>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              ) : (
                <Droppable droppableId={categoryId}>
                  {(provided) => (
                    <div
                      className="emptyCategory"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
