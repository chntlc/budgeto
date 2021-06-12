import React from "react";
import { DatePicker } from "antd";

function ViewCustomRange() {
  const { RangePicker } = DatePicker;
  return (
    <div className="custom-range">
      <h1>Please select the range of period you would like to see:</h1>
      <RangePicker></RangePicker>
    </div>
  );
}

export default ViewCustomRange;
