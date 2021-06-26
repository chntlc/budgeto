import React from "react";
import { Calendar } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectDay,
  selectMonth,
  toggleCalendarMode,
  toggleReportBtn,
} from "../features/viewSlice";

class ViewCalendar extends React.Component {
  constructor(props) {
    super();

    this.dateCellRender = this.dateCellRender.bind(this);
    this.monthCellRender = this.monthCellRender.bind(this);
  }

  toggleMode(mode) {
    this.props.dispatch(toggleCalendarMode(mode));
  }

  onDateSelect(value) {
    this.props.dispatch(selectDay(value));
    if (this.getDailyData(value) !== 0) {
      this.props.dispatch(toggleReportBtn(true));
    } else {
      this.props.dispatch(toggleReportBtn(false));
    }
  }

  onMonthSelect(value) {
    this.props.dispatch(selectMonth(value.month() + 1));
    if (this.getMonthlyData(value) !== 0) {
      this.props.dispatch(toggleReportBtn(true));
    } else {
      this.props.dispatch(toggleReportBtn(false));
    }
  }

  getDailyData(value) {
    const year = value.year(),
      // month value range 0-11
      month = value.month() + 1,
      day = value.date();
    if (month !== this.props.selectedDate.month() + 1) {
      return 0;
    }
    //mock data, will create http request eventually
    if (year === 2021 && month === 6 && day === 1) {
      return 100;
    }
    if (year === 2021 && month === 6 && day === 24) {
      return 140;
    }
    if (year === 2021 && month === 4 && day === 4) {
      return 42;
    }
    return 0;
  }

  getMonthlyData(value) {
    const year = value.year(),
      // month value range 0-11
      month = value.month();
    if (year === 2021 && month === 4) {
      return 42;
    }
    if (year === 2021 && month === 6) {
      return 240;
    }
    return 0;
  }

  dateCellRender(value) {
    const dailySpend = this.getDailyData(value);
    console.log("rendered");
    return (
      <div className="calendar__cell">
        <span>{dailySpend === 0 ? "" : `$${dailySpend}`}</span>
      </div>
    );
  }

  monthCellRender(value) {
    const monthlySpend = this.getMonthlyData(value);
    return (
      <div className="calendar__cell">
        <span>{monthlySpend === 0 ? "" : `$${monthlySpend}`}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="calendar">
        <div className="calendar__submit">
          {this.props.reportBtnEnabled ? (
            <Link to={"/report"}>View Report</Link>
          ) : (
            <span className="disabled">View Report</span>
          )}
        </div>
        <Calendar
          //   value={value}
          mode={this.props.calendarMode}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onPanelChange={(value, mode) => this.toggleMode(mode)}
          onSelect={(value) =>
            this.props.calendarMode === "month"
              ? this.onDateSelect(value)
              : this.onMonthSelect(value)
          }
        />
        <div className="calendar__submit">
          {this.props.reportBtnEnabled ? (
            <Link to={"/report"}>View Report</Link>
          ) : (
            <span className="disabled">View Report</span>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    calendarMode: state.view.calendarMode,
    selectedDate: state.view.selectedDate,
    selectedMonth: state.view.selectedMonth,
    reportBtnEnabled: state.view.reportBtnEnabled,
  };
}

export default connect(mapStateToProps)(ViewCalendar);
