import React from "react";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";

function ViewCustomRange() {
  const { RangePicker } = DatePicker;
  return (
    <div className="custom-range">
      <h1>Please select the range of period you would like to see:</h1>
      <RangePicker
        size="large"
        style={{ width: "50vw", margin: "5vh" }}
      ></RangePicker>
      <div className="custom-range__action">
        <Link className="custom-range__submit" to={"/report"}>
          View Report
        </Link>
      </div>
    </div>
  );
}

export default ViewCustomRange;
