import "../css/CategoryFilter.css";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

function CategoryFilter() {
  const categories = useSelector((state) => state.categories.categories);
  const items = [];

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
      {categories.map(({ _id, name, color, items }) => {
        return (
          <div className="filter" key={_id}>
            <button
              type="button"
              className="collapsible"
              style={{ backgroundColor: color }}
              onClick={(event) => toggleFilterContainer(event)}
            >
              {name}
            </button>
            <div className="filteredItems">
              {items.length ? (
                <Droppable droppableId={_id}>
                  {(provided) => (
                    <ul
                      className="transactions"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {items.map(({ itemId, name, qty, price }, index) => {
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
                                    <p>{name}</p>
                                  </div>
                                  <div className="quantity">
                                    <p>{qty}</p>
                                  </div>
                                  <div className="price">
                                    <p>${price}</p>
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              ) : (
                <Droppable droppableId={_id}>
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
