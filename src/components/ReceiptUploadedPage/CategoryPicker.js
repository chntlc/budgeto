import Category from "./Category";
import "./CategoryPicker.css";

function CategoryPicker(props) {
  let categories = props.categories;

  return (
    <div className="categoryContainer">
      <div className="scroller">
        {categories.map((category, index) => {
          return (
            <Category
              iconImg={category["iconImg"]}
              iconAlt={category["category"]}
              iconColor={category["iconColor"]}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategoryPicker;
