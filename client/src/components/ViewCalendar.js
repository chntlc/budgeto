import React from "react";
import { Calendar } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  toggleMode,
  selectDay,
  selectMonth,
  toggleCalendarMode,
  toggleReportBtn,
} from "../features/viewSlice";
import CalendarDayCell from "./CalendarDayCell";
import CalendarMonthCell from "./CalendarMonthCell";

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
    if (mode !== this.props.calendarMode) {
      this.props.dispatch(toggleCalendarMode(mode));
      if (mode === "month") {
        this.onDateSelect(value);
      } else {
        this.onMonthSelect(value);
      }
    }
  }

  onDateSelect(value) {
    this.props.dispatch(toggleReportBtn(false));
    this.props.dispatch(selectDay(value.format("YYYY-MM-DD")));
    this.getDailyData(value).then((val) => {
      if (val !== 0) {
        this.props.dispatch(toggleReportBtn(true));
      }
    });
  }

  onMonthSelect(value) {
    this.props.dispatch(toggleReportBtn(false));
    this.props.dispatch(selectMonth(value.format("YYYY-MM-DD")));
    this.getMonthlyData(value).then((val) => {
      if (val !== 0) {
        this.props.dispatch(toggleReportBtn(true));
      }
    });
  }

  async getDailyData(value) {
    const year = value.year(),
      // month value range 0-11
      month = value.month() + 1,
      day = value.date();
    let spending = 1;
    if (month !== moment(this.props.selectedDate).month() + 1) {
      spending *= -1;
    }

    const date = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    return await axios
      .get(`/view/dailyspend/${this.props.userId}/${date}`)
      .then((result) => {
        const dailySpend =
          result.data.dailyspend !== 0
            ? parseFloat(result.data.dailyspend.$numberDecimal)
            : 0;
        return spending * dailySpend;
      });
  }

  async getMonthlyData(value) {
    const year = value.year(),
      // month value range 0-11
      month = value.month() + 1;

    const date = `${year}-${month < 10 ? "0" + month : month}-01`;

    return await axios
      .get(
        `/view/monthlyspend/${this.props.userId}/${date}`
      )
      .then((result) => {
        const monthlySpend =
          result.data.monthlyspend !== 0
            ? parseFloat(result.data.monthlyspend.$numberDecimal)
            : 0;
        return monthlySpend;
      });
  }

  dateCellRender(value) {
    return (
      <CalendarDayCell
        userId={this.props.userId}
        selectedDate={this.props.selectedDate}
        date={value}
      />
    );
  }

  monthCellRender(value) {
    return (
      <CalendarMonthCell
        userId={this.props.userId}
        selectedDate={this.props.selectedDate}
        date={value}
      />
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
    userId: state.global.user._id,
  };
}

export default connect(mapStateToProps)(ViewCalendar);
