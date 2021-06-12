import Category from "./Category";
import GroceryIcon from "../../images/groceryIcon.png";
import RestaurantIcon from "../../images/restaurantIcon.png";
import ClothingIcon from "../../images/clothingIcon.png";
import TransportationIcon from "../../images/transportationIcon.png";
import AddIcon from "../../images/addIcon.png";
import "./CategoryPicker.css";

function CategoryPicker() {
  let categories = [
    {
      category: "Grocery",
      iconImg: GroceryIcon,
      iconColor: "#81B214",
    },
    {
      category: "Dining Out",
      iconImg: RestaurantIcon,
      iconColor: "#F54748",
    },
    {
      category: "Clothing",
      iconImg: ClothingIcon,
      iconColor: "#FFC93C",
    },
    {
      category: "Transportation",
      iconImg: TransportationIcon,
      iconColor: "#AC66CC",
    },
    {
      category: "Add More",
      iconImg: AddIcon,
      iconColor: "#A7BBC7",
    },
  ];

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
