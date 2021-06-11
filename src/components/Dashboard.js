import React from "react";
import DashboardBtn from "./DashboardBtn";
import "../css/Dashboard.css";

class DashboardContent extends React.Component {
  render() {
    const userName = "Anonymous",
      userImg =
        "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png",
      userBudget = 300,
      userSpending = 256,
      moneyDiff = userBudget - userSpending,
      mostSpentCat = "Food";
    return (
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard__greeting">
            <img src={userImg} />
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
}

export default DashboardContent;
