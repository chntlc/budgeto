import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Carousel, Spin } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import "../css/ReportPage.css";
import { Link } from "react-router-dom";
import ReportPieChart from "./ReportPieChart";
import ReportLineGraph from "./ReportLineGraph";
import {
  toggleLineReady,
  togglePieReady,
  toggleReportReady,
} from "../features/reportSlice";

class ReportPage extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.dispatch(togglePieReady(false));
    this.props.dispatch(toggleLineReady(false));
    this.props.dispatch(toggleReportReady(false));
    // This will redirect to View page when the periodStart and periodEnd value is reset during refresh of the page
    if ((this.props.periodStart === "" || this.props.periodEnd === "") && this.props.mode !== "custom-range") {
      // alert("Please select the dates again!")
      this.props.history.push({
        pathname: '/view'
      })
    }
  }

  isSingleDayReport() {
    const { mode, calendarMode, periodStart, periodEnd } = this.props;
    return (
      (mode === "calendar" && calendarMode === "month") ||
      (mode === "custom-range" && periodStart === periodEnd)
    );
  }

  isReportReady() {
    if (this.isSingleDayReport()) {
      this.props.dispatch(toggleReportReady(this.props.pieReady));
      return this.props.pieReady;
    } else {
      this.props.dispatch(
        toggleReportReady(this.props.pieReady && this.props.lineReady)
      );
      return this.props.pieReady && this.props.lineReady;
    }
  }

  dateTextHelper() {
    const { mode, selectedDate, selectedMonth, periodStart, periodEnd } =
      this.props;
    if (mode === "calendar") {
      return this.isSingleDayReport()
        ? selectedDate
        : `${moment(selectedMonth)
            .startOf("month")
            .format("YYYY-MM-DD")} ~ ${moment(selectedMonth)
            .endOf("month")
            .format("YYYY-MM-DD")}`;
    } else {
      return this.isSingleDayReport()
        ? periodStart
        : `${periodStart} ~ ${periodEnd}`;
    }
  }

  render() {
    return (
      <div className="reportpage page-content">
        <div className="reportpage__goback">
          <Link to={"/view"}>
            <FaArrowLeft /> Back to View
          </Link>
        </div>

        <span className="reportpage__title">
          Here is your report ({this.dateTextHelper()}):
        </span>
        {this.isReportReady() ? null : (
          <div className="reportpage__loading">
            <Spin />
          </div>
        )}
        {this.isSingleDayReport() ? (
          <ReportPieChart
            userId={this.props.user}
            isSingleDay={true}
            date={this.dateTextHelper()}
          />
        ) : (
          <Carousel dotPosition="right">
            <ReportPieChart
              userId={this.props.user}
              isSingleDay={false}
              date={this.dateTextHelper()}
            />

            <ReportLineGraph
              userId={this.props.user}
              isSingleDay={false}
              date={this.dateTextHelper()}
            />
          </Carousel>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.global.user._id,
    mode: state.view.mode,
    calendarMode: state.view.calendarMode,
    selectedDate: state.view.selectedDate,
    selectedMonth: state.view.selectedMonth,
    periodStart: state.view.periodStart,
    periodEnd: state.view.periodEnd,
    reportReady: state.report.reportReady,
    pieReady: state.report.pieReady,
    lineReady: state.report.lineReady,
  };
}

export default connect(mapStateToProps)(ReportPage);
