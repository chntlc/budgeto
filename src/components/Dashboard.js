import React from "react";
import DashboardBtn from "./DashboardBtn";
import "../css/Dashboard.css";
import { connect, useDispatch } from 'react-redux';

function DashboardContent(props) {
  const userName = "Anonymous",
    userImg =
      "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png",
    userBudget = 300,
    userSpending = 256,
    moneyDiff = userBudget - userSpending,
    mostSpentCat = "Food";
  return (
    <div className="dashboard page-content">
      <div className="dashboard__content">
        <div className="dashboard__greeting">
          <img src={userImg} alt="UserImg" />
          <span>Hi, {userName}!</span>
        </div>
        <div className="dashboard__report">
          <p>
            You've spent <strong className="green">${userSpending}</strong>{" "}
              this week
            </p>
          <p>
            You're <strong className="red">${Math.abs(moneyDiff)}</strong>{" "}
            {moneyDiff > 0 ? "under" : "over"} your budget of{" "}
            <strong className="brown">${userBudget}</strong>
          </p>
          <p>
            Your most spent category is:{" "}
            <strong className="blue">{mostSpentCat}</strong>
          </p>
        </div>
      </div>
      <hr className="dashboard__border" />
      <div className="dashboard__actions">
        <DashboardBtn label="Add Spending" path="/add" />
        <DashboardBtn label="View Spending" path="/view" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    showLogin: state.global.,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn
  }
}

export default connect(mapStateToProps)(DashboardContent);
