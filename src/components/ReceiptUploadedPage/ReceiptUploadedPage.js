import Receipt from "./Receipt";
import CategoryPicker from "./CategoryPicker";
import CategoryFilter from "./CategoryFilter";
import GroceryIcon from "../../images/groceryIcon.png";
import RestaurantIcon from "../../images/restaurantIcon.png";
import ClothingIcon from "../../images/clothingIcon.png";
import TransportationIcon from "../../images/transportationIcon.png";
import TravelingIcon from "../../images/travelingIcon.png";
import AddIcon from "../../images/addIcon.png";
import "./ReceiptUploadedPage.css";
import { connect } from 'react-redux'

function ReceiptUploadedPage(props) {
  let categories = [
    {
      category: "Grocery",
      iconImg: GroceryIcon,
      iconColor: "#EAC495",
    },
    {
      category: "Dining Out",
      iconImg: RestaurantIcon,
      iconColor: "#E7AD9E",
    },
    {
      category: "Clothing",
      iconImg: ClothingIcon,
      iconColor: "#46436A",
    },
    {
      category: "Transportation",
      iconImg: TransportationIcon,
      iconColor: "#2F2D4F",
    },
    {
      category: "Traveling",
      iconImg: TravelingIcon,
      iconColor: "#301B3F",
    },
    {
      category: "Add More",
      iconImg: AddIcon,
      iconColor: "#E1E5EA",
    },
  ];

  return (
    <div className="container">
      <div className="receiptView">
        {/* <Receipt /> */}
        <h2>Receipt Items</h2>
        <div>
          {props.items.map((item) =>
            <div className='list-item' draggable>
              <li>{item.name}</li>
            </div>
          )}
        </div>
      </div>
      <div className="categoryView">
        <CategoryPicker categories={categories} />
        <CategoryFilter categories={categories} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items
  }
}

export default connect(mapStateToProps)(ReceiptUploadedPage);
