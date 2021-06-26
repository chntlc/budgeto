import React from "react";
import { connect } from "react-redux";
import { Carousel } from "antd";
import { Pie, Line } from "react-chartjs-2";
import "../css/ReportPage.css";

class ReportPage extends React.Component {
  constructor(props) {
    super();
  }

  isSingleDayReport() {
    const { mode, calendarMode, periodStart, periodEnd } = this.props;
    return (
      (mode === "calendar" && calendarMode === "month") ||
      (mode === "custom-range" &&
        periodStart.format("YYYY-MM-DD") === periodEnd.format("YYYY-MM-DD"))
    );
  }

  dateTextHelper() {
    const { mode, selectedDate, selectedMonth, periodStart, periodEnd } =
      this.props;
    if (mode === "calendar") {
      return this.isSingleDayReport()
        ? selectedDate.format("YYYY-MM-DD")
        : `${selectedMonth
            .startOf("month")
            .format("YYYY-MM-DD")} ~ ${selectedMonth
            .endOf("month")
            .format("YYYY-MM-DD")}`;
    } else {
      return this.isSingleDayReport()
        ? periodStart.format("YYYY-MM-DD")
        : `${periodStart.format("YYYY-MM-DD")} ~ ${periodEnd.format(
            "YYYY-MM-DD"
          )}`;
    }
  }

  render() {
    const pieOptions = {
      plugins: {
        labels: {
          render: "percentage",
          fontColor: "black",
          precision: 2,
        },
        legend: {
          position: "bottom",
        },
      },

      maintainAspectRatio: false,
    };

    const pieData = {
      labels: ["Food", "Groceries", "Entertainment", "etc."],
      datasets: [
        {
          label: "Spendings per Category ($)",
          data: [12, 15, 7, 3],
          backgroundColor: [
            "rgba(54, 162, 235, 0.5)",
            "rgba(175, 42, 42, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 206, 86, 0.5)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const lineData = {
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          label: "Spendings",
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    };
    const lineOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div className="reportpage page-content">
        <span className="reportpage__title">
          Here is your report ({this.dateTextHelper()}):
        </span>
        {this.isSingleDayReport() ? (
          <div className="reportpage__chartArea">
            <Pie data={pieData} options={pieOptions} />
          </div>
        ) : (
          <Carousel dotPosition="right">
            <div className="reportpage__chartArea">
              <Pie data={pieData} options={pieOptions} />
            </div>

            <div className="reportpage__chartArea">
              <div>
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </Carousel>
        )}
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
