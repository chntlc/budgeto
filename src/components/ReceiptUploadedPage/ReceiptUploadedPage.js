import Receipt from "./Receipt";
import CategoryPicker from "./CategoryPicker";
import CategoryFilter from "./CategoryFilter";
import "./ReceiptUploadedPage.css";
import { connect } from "react-redux";

function ReceiptUploadedPage(props) {
  return (
    <div className="container">
      <div className="receiptView">
        {/* <Receipt /> */}
        <h2>Receipt Items</h2>
        <div>
          {props.items.map((item) => (
            <div className="list-item" draggable>
              <li>{item.name}</li>
            </div>
          ))}
        </div>
      </div>
      <div className="categoryView">
        <CategoryPicker />
        <CategoryFilter />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.receipt.items,
  };
};

export default connect(mapStateToProps)(ReceiptUploadedPage);
