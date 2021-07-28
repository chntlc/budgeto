import "./Receipt.css";
import { Droppable, Draggable } from "react-beautiful-dnd";

function Receipt(props) {
  const items = props.items;

  return (
    <div className="receipt">
      <Droppable droppableId="transactions">
        {(provided) => (
          <ul
            className="transactions"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map(({ name, price, qty }, index) => {
              return (
                <Draggable key={index} draggableId={name} index={index}>
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
                        <div className="price">
                          <p>{price}</p>
                        </div>
                        <div className="quantity">
                          <p>{qty}</p>
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
    </div>
  );
}

export default Receipt;

// React Beautiful Drag and Drop tutorial from:
// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
