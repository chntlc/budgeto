import React, { useState, useEffect } from "react";

import axios from "axios";

function CalendarMonthCell(props) {
  const [spending, setSpending] = useState(0);

  useEffect(() => {
    getSpending();
  });

  const getSpending = () => {
    const year = props.date.year(),
      // month value range 0-11
      month = props.date.month() + 1;

    const date = `${year}-${month < 10 ? "0" + month : month}-01`;

    axios.get(`/view/monthlyspend/${props.userId}/${date}`).then((result) => {
      const monthlySpend =
        result.data.monthlyspend !== 0
          ? Math.round(result.data.monthlyspend * 100) / 100
          : 0;
      setSpending(monthlySpend);
    });
  };
  return (
    <div className="calendar__cell">
      <span>{spending === 0 ? "" : `$${spending}`}</span>
    </div>
  );
}

export default CalendarMonthCell;
