import React, { useEffect } from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";

import { Line } from "react-chartjs-2";
import {
  toggleLineReady,
  setLineData,
  setLineLabel,
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
          console.log({ result });
          const labels = result.data.label;
          const data = result.data.data;
          let p = 0;
          let values = new Array(labels.length).fill(0);
          for (let i = 0; i < labels.length; i++) {
            if (labels[i] === data[p]._id) {
              values[i] = parseInt(data[p].total.$numberDecimal);
              p++;
              if (p >= data.length) {
                break;
              }
            }
          }
          dispatch(setLineData(values));
          dispatch(setLineLabel(labels));
          dispatch(toggleLineReady(true));
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
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lineReady: state.report.lineReady,
    lineData: state.report.lineData,
    lineLabel: state.report.lineLabel,
  };
};

export default connect(mapStateToProps)(ReportLineGraph);
