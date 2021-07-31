import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { addToDailyValues } from "../features/viewSlice";

function CalendarDayCell(props) {
  const [spending, setSpending] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getSpending();
  });

  const getSpending = () => {
    const year = props.date.year(),
      // month value range 0-11
      month = props.date.month() + 1,
      day = props.date.date();
    let value = 1;
    if (month !== moment(props.selectedDate).month() + 1) {
      value = 0;
    }

    const date = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    // if (props.dailyValues.has(date)) {
    //   setSpending(props.dailyValues.get(date));
    // } else {
    axios
      .get(`http://localhost:3001/view/dailyspend/${props.userId}/${date}`)
      .then((result) => {
        const dailySpend =
          result.data.dailyspend !== 0
            ? parseFloat(result.data.dailyspend.$numberDecimal)
            : 0;
        setSpending(dailySpend * value);
      });
  };
  // };
  return (
    <div className="calendar__cell">
      <span>{spending === 0 ? "" : `$${spending}`}</span>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     dailyValues: state.view.dailyValues,
//     needUpdate: state.view.needUpdate,
//   };
// };

export default CalendarDayCell;
