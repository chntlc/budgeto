import React from "react";
import { Calendar } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  toggleMode,
  selectDay,
  selectMonth,
  toggleCalendarMode,
  toggleReportBtn,
} from "../features/viewSlice";

class ViewCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.monthCellRender = this.monthCellRender.bind(this);
  }

  componentDidMount() {
    const { calendarMode, selectedDate, selectedMonth } = this.props;
    this.props.dispatch(toggleMode("calendar"));
    if (calendarMode === "month") {
      this.onDateSelect(moment(selectedDate));
    } else {
      this.onMonthSelect(moment(selectedMonth));
    }
  }

  toggleMode(value, mode) {
    this.props.dispatch(toggleCalendarMode(mode));
    if (mode === "month") {
      this.onDateSelect(value);
    } else {
      this.onMonthSelect(value);
    }
  }

  onDateSelect(value) {
    this.props.dispatch(selectDay(value.format("YYYY-MM-DD")));
    if (this.getDailyData(value) !== 0) {
      this.props.dispatch(toggleReportBtn(true));
    } else {
      this.props.dispatch(toggleReportBtn(false));
    }
  }

  onMonthSelect(value) {
    this.props.dispatch(selectMonth(value.format("YYYY-MM-DD")));
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
    if (month !== moment(this.props.selectedDate).month() + 1) {
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
      month = value.month() + 1;
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
    const { reportBtnEnabled, selectedDate, selectedMonth, calendarMode } =
      this.props;
    return (
      <div className="calendar">
        <div className="calendar__submit">
          {reportBtnEnabled ? (
            <Link to={"/report"}>View Report</Link>
          ) : (
            <span className="disabled">View Report</span>
          )}
        </div>
        <Calendar
          value={
            calendarMode === "month"
              ? moment(selectedDate)
              : moment(selectedMonth)
          }
          mode={calendarMode}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          onPanelChange={(value, mode) => this.toggleMode(value, mode)}
          onSelect={(value) =>
            calendarMode === "month"
              ? this.onDateSelect(value)
              : this.onMonthSelect(value)
          }
          disabledDate={(value) => value > moment().endOf("day")}
        />
        <div className="calendar__submit">
          {reportBtnEnabled ? (
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
