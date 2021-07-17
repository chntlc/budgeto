import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { toggleReportReady } from "../features/reportSlice";

class ReportLoading extends React.Component {
  constructor(props) {
    super();
  }

  isReportReady() {
    if (this.props.isSingleDayReport) {
      this.props.dispatch(toggleReportReady(this.props.pieReady));
      return this.props.pieReady;
    } else {
      this.props.dispatch(
        toggleReportReady(this.props.pieReady && this.props.lineReady)
      );
      return this.props.pieReady && this.props.lineReady;
    }
  }

  render() {
    return (
      <div className="reportpage__loading">
        {this.isReportReady() ? (
          <div>
            <Spin />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pieReady: state.report.pieReady,
    lineReady: state.report.lineReady,
  };
};

export default connect(mapStateToProps)(ReportLoading);
