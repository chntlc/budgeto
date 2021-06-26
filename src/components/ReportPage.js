import React from "react";
import { connect } from "react-redux";

class ReportPage extends React.Component {
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.view.mode,
    calendarMode: state.view.calendarMode,
    selectedDate: state.view.selectedDate,
    selectedMonth: state.view.selectedMonth,
    periodStart: state.view.periodStart,
    periodEnd: state.view.periodEnd,
  };
}

export default connect(mapStateToProps)(ReportPage);
