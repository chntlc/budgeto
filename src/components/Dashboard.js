import React, { useEffect } from "react";
import DashboardBtn from "./DashboardBtn";
import "../css/Dashboard.css";
import "../images/profile.png";
import { connect, useDispatch } from "react-redux";
import { Row, Card, Col, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  fetchSummary,
  updateNotificationState,
} from "../features/dashboardSlice";

// TODO: add loading state until we get response from backend

function DashboardContent(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummary(props.user._id));
  }, [props.user._id]);

  const userName = `${props.user.fname} ${props.user.lname}`,
    // userImg = "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png",
    userBudget = props.user.budget,
    userSpending = props.spending,
    moneyDiff = userBudget - userSpending,
    mostSpentCat = props.mostSpentCategory,
    notificationCheck = props.notificationCheck;

  console.log({ moneyDiff });
  const openNotification = () => {
    dispatch(updateNotificationState(true));
    if (moneyDiff > 0) {
      notification.warning({
        message: "Watch you spending!",
        description: `You are only $${moneyDiff} from reaching your weekly budget!!`,
        style: { backgroundColor: "#fffbe6" },
        icon: <ExclamationCircleOutlined style={{ color: "#FAAD14" }} />,
      });
    } else if (moneyDiff === 0) {
      notification.error({
        message: "Budget reached!!!",
        description: `You've met your weekly budget!!!
        Any more spend will go over your budget!`,
        style: { backgroundColor: "#fff2f0" },
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
      });
    } else {
      notification.error({
        message: "Budget passed!!!",
        description: `You've spent $${Math.abs(
          moneyDiff
        )} over your weekly budget!!`,
        style: { backgroundColor: "#fff2f0" },
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
      });
    }
  };

  return (
    <Row gutter={16} className="dashboard-row-content">
      {moneyDiff <= 50 && !notificationCheck ? openNotification() : null}
      <Col span={20} offset={2}>
        <Card
          className="card"
          title={`👋 \u00A0\u00A0\u00A0\u00A0Hey, \u00A0\u00A0${userName}! `}
          loading={props.isLoading}
        >
          {/* <Row> */}
          {/* <img src={userImg} alt="UserImg" /> */}
          {/* <span>&#128075; &nbsp;&nbsp;&nbsp;Hey,&nbsp;&nbsp; {userName}! </span> */}
          {/*</Row> */}
          <div className="dashboard__report">
            <p>
              You've spent <strong className="green">${userSpending}</strong>{" "}
              this week
            </p>
            <p>
              You're{" "}
              <strong className="red">
                ${Math.round(Math.abs(moneyDiff) * 100) / 100}
              </strong>{" "}
              {moneyDiff > 0 ? "under" : "over"} your budget of{" "}
              <strong className="brown">${userBudget}</strong>
            </p>
            <p>
              Your most spent category is:{" "}
              <strong className="blue">{mostSpentCat}</strong>
            </p>
          </div>
          <hr />
          <div className="dashboard__actions">
            <DashboardBtn label="Add Spending" path="/add" />
            <DashboardBtn label="View Spending" path="/view" />
          </div>
        </Card>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    spending: state.dashboard.spentForWeek,
    mostSpentCategory: state.dashboard.mostSpentCategory,
    mostSpentCategorySpending: state.dashboard.mostSpentCategorySpending,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn,
    isLoading: state.dashboard.isLoading,
    notificationCheck: state.dashboard.notificationCheck,
  };
};

export default connect(mapStateToProps)(DashboardContent);
