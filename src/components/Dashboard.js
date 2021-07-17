import React, { useEffect } from "react";
import DashboardBtn from "./DashboardBtn";
import "../css/Dashboard.css";
import "../images/profile.png";
import { connect, useDispatch } from 'react-redux';
import { Row, Card, Col } from 'antd';
import { fetchSummary } from "../features/dashboardSlice";

// TODO: add loading state until we get response from backend

function DashboardContent(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummary(props.user._id))
  }, [props.user._id])

  const userName = `${props.user.fname} ${props.user.lname}`,
    // userImg = "https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/anonymous-512.png",
    userBudget = props.user.budget,
    userSpending = props.spending,
    moneyDiff = userBudget - userSpending,
    mostSpentCat = props.mostSpentCategory;

  return (
    <Row gutter={16} className='dashboard-row-content'>
      <Col span={20} offset={2}>
        <Card className='card' title={`👋 \u00A0\u00A0\u00A0\u00A0Hey, \u00A0\u00A0${userName}! `} loading={props.isLoading} >
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
              You're <strong className="red">${Math.abs(moneyDiff)}</strong>{" "}
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
  }
}

export default connect(mapStateToProps)(DashboardContent);
