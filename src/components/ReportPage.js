import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Carousel } from "antd";
import { Pie, Line } from "react-chartjs-2";
import { FaArrowLeft } from "react-icons/fa";
import "../css/ReportPage.css";
import { Link } from "react-router-dom";

class ReportPage extends React.Component {
  constructor(props) {
    super();
  }

  isSingleDayReport() {
    const { mode, calendarMode, periodStart, periodEnd } = this.props;
    return (
      (mode === "calendar" && calendarMode === "month") ||
      (mode === "custom-range" && periodStart === periodEnd)
    );
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
    const pieOptions = {
      plugins: {
        datalabels: {
          display: true,
          color: "white",
        },
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const dataset = pieData.datasets[tooltipItem.datasetIndex].data;
              const currentValue = dataset[tooltipItem.dataIndex];
              const total = dataset.reduce((a, b) => a + b, 0);
              const percentage = Math.round((currentValue / total) * 1000) / 10;
              return `$${currentValue} (${percentage}%)`;
            },
            // title: function (tooltipItem) {
            //   return pieData.labels[tooltipItem[0].dataIndex];
            // },
          },
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
        <div className="reportpage__goback">
          <Link to={"/view"}>
            <FaArrowLeft /> Back to View
          </Link>
        </div>

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
