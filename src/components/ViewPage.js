import React from "react";
import "../css/ViewPage.css";
import "antd/dist/antd.css";
import { connect } from 'react-redux';
import ViewCustomRange from "./ViewCustomRange";
import ViewCalendar from "./ViewCalendar";
import { toggleMode } from "../features/viewSlice";

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.setTypeCustom = this.setTypeCustom.bind(this);
    this.setTypeDefault = this.setTypeDefault.bind(this);
  }

  setTypeCustom() {
    this.props.dispatch(toggleMode("custom-range"));
  }

  setTypeDefault() {
    this.props.dispatch(toggleMode("calendar"));
  }

  render() {
    const { mode } = this.props;
    return (
      <div className="viewpage page-content">
        <div className="viewpage__typeChoice">
          <button
            className={mode === "calendar" ? "current" : null}
            onClick={this.setTypeDefault}
          >
            Default Calendar
          </button>
          <button
            className={mode === "custom-range" ? "current" : null}
            onClick={this.setTypeCustom}
          >
            Custom Range
          </button>
        </div>
        <hr />
        <div className="viewpage__view">
          {mode === "calendar" ? <ViewCalendar /> : <ViewCustomRange />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mode: state.view.mode,
    user: state.global.user,
  };
}

export default connect(mapStateToProps)(ViewPage);