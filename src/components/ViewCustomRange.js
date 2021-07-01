import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleMode,
  toggleReportBtn,
  selectPeriodStart,
  selectPeriodEnd,
} from "../features/viewSlice";

class ViewCustomRange extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.dispatch(toggleMode("custom-range"));
    this.props.dispatch(toggleReportBtn(false));
  }

  onRangeChange(dates) {
    if (dates === null) {
      this.props.dispatch(toggleReportBtn(false));
    } else {
      this.props.dispatch(selectPeriodStart(dates[0].format("YYYY-MM-DD")));
      this.props.dispatch(selectPeriodEnd(dates[1].format("YYYY-MM-DD")));
      this.props.dispatch(toggleReportBtn(true));
    }
  }

  render() {
    const { RangePicker } = DatePicker;
    return (
      <div className="custom-range">
        <h1>Please select the range of period you would like to see:</h1>
        <RangePicker
          size="large"
          style={{ width: "50vw", margin: "5vh" }}
          onChange={(dates) => this.onRangeChange(dates)}
          disabledDate={(value) => value > moment().endOf("day")}
        />
        <div className="custom-range__action">
          {this.props.reportBtnEnabled ? (
            <Link className="custom-range__submit" to={"/report"}>
              View Report
            </Link>
          ) : (
            <span className="disabled custom-range__submit">View Report</span>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    calendarMode: state.view.calendarMode,
    periodStart: state.view.periodStart,
    periodEnd: state.view.periodEnd,
    reportBtnEnabled: state.view.reportBtnEnabled,
  };
}

export default connect(mapStateToProps)(ViewCustomRange);
