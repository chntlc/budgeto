import React from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import { Pie, Line } from "react-chartjs-2";
import "../css/ReportPage.css";

class ReportPage extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div className="reportpage page-content">
        <Carousel dotPosition="right">
          <div>
            <Pie data={data} />
          </div>
          {(this.props.mode === "calendar" &&
            this.props.calendarMode === "year") ||
          (this.props.mode === "custom-range" &&
            this.props.periodStart !== this.props.periodEnd) ? (
            <div>
              <Line />
            </div>
          ) : null}
        </Carousel>
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
