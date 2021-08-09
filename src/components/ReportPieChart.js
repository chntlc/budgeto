import React, { useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";

import { Pie } from "react-chartjs-2";
import {
  togglePieReady,
  setPieData,
  toggleNoData,
} from "../features/reportSlice";

function ReportPieChart(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      let date = props.date;
      let params = {
        periodStart: date,
        periodEnd: date,
      };
      if (!props.isSingleDay) {
        params.periodStart = params.periodStart.substring(0, 10);
        params.periodEnd = params.periodEnd.substring(13);
      }
      axios
        .get(`/report/piedata/${props.userId}`, { params })
        .then((result) => {
          if (result.data.data.length === 0) {
            dispatch(toggleNoData(true));
            dispatch(togglePieReady(true));
            return;
          }
          const data = [];
          result.data.data.map((item) => {
            data.push(Math.round(item * 100) / 100);
            return "";
          });
          dispatch(
            setPieData({
              data,
              labels: result.data.label,
              colors: result.data.color,
            })
          );
        });
    };
    loadData();
  }, []);

  let pieData = {
    labels: props.pieLabel,
    datasets: [
      {
        label: "Spendings per Category ($)",
        data: props.pieData,
        backgroundColor: props.pieColors,
        hoverOffset: 4,
      },
    ],
  };

  let pieOptions = {
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
            const dataset = props.pieData;
            const currentValue = dataset[tooltipItem.dataIndex];
            const total = dataset.reduce((a, b) => a + b, 0);
            const percentage = Math.round((currentValue / total) * 1000) / 10;
            return `$${currentValue} (${percentage}%)`;
          },
          title: function (tooltipItem) {
            return pieData.labels[tooltipItem[0].dataIndex];
          },
        },
      },
    },

    maintainAspectRatio: false,
  };

  return (
    <div className="reportpage__chartArea">
      <div>
        {props.noData ? (
          <h2>Please select a range of period with at least one spending!</h2>
        ) : (
          <Pie data={pieData} options={pieOptions} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pieReady: state.report.pieReady,
    pieData: state.report.pieData,
    pieLabel: state.report.pieLabel,
    pieColors: state.report.pieColors,
    noData: state.report.noData,
  };
};

export default connect(mapStateToProps)(ReportPieChart);
