import React, { useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";

import { Line } from "react-chartjs-2";
import {
  toggleLineReady,
  toggleNoData,
  setLineData,
} from "../features/reportSlice";

function ReportLineGraph(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      let date = props.date;
      let params = {
        periodStart: date.substring(0, 10),
        periodEnd: date.substring(13),
      };
      console.log({ params });
      axios
        .get(`/report/linedata/${props.userId}`, {
          params,
        })
        .then((result) => {
          if (result.data.data.length === 0) {
            dispatch(toggleNoData(true));
            dispatch(toggleLineReady(true));
            return;
          }
          console.log({ result });
          const labels = result.data.label;
          const data = result.data.data;
          let p = 0;
          let values = new Array(labels.length).fill(0);
          for (let i = 0; i < labels.length; i++) {
            if (labels[i] === data[p]._id) {
              values[i] = Math.round(data[p].total * 100) / 100;
              p++;
              if (p >= data.length) {
                break;
              }
            }
          }
          dispatch(setLineData({ values, labels }));
        });
    };
    loadData();
  }, []);

  const lineData = {
    labels: props.lineLabel,
    datasets: [
      {
        label: "Spendings",
        data: props.lineData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        lineTension: 0.2,
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
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = props.lineData;
            const currentValue = dataset[tooltipItem.dataIndex];
            return `Spendings: $${currentValue}`;
          },
        },
      },
    },
  };

  return (
    <div className="reportpage__chartArea">
      <div>
        {props.noData ? (
          <h2>Please select a range of period with at least one spending!</h2>
        ) : (
          <Line data={lineData} options={lineOptions} />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lineReady: state.report.lineReady,
    lineData: state.report.lineData,
    lineLabel: state.report.lineLabel,
    noData: state.report.noData,
  };
};

export default connect(mapStateToProps)(ReportLineGraph);
