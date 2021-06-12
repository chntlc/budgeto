import "./Receipt.css";
import Bill from "../../images/bill.png";

function Receipt() {
  return (
    <div className="receipt">
      <img src={Bill} />
    </div>
  );
}

export default Receipt;
