import React from "react";
import { Calendar } from "antd";
import "../css/ViewPage.css";
import "antd/dist/antd.css";
import ViewCustomRange from "./ViewCustomRange";

class ViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: "default",
    };
    this.setTypeCustom = this.setTypeCustom.bind(this);
    this.setTypeDefault = this.setTypeDefault.bind(this);
  }

  setTypeCustom() {
    this.setState({
      viewType: "custom",
    });
  }

  setTypeDefault() {
    this.setState({
      viewType: "default",
    });
  }

  render() {
    const { viewType } = this.state;
    return (
      <div className="viewpage page-content">
        <div className="viewpage__typeChoice">
          <button
            className={viewType === "default" ? "current" : null}
            onClick={this.setTypeDefault}
          >
            Default Calendar
          </button>
          <button
            className={viewType === "custom" ? "current" : null}
            onClick={this.setTypeCustom}
          >
            Custom Range
          </button>
        </div>
        <hr />
        {viewType === "default" ? <Calendar /> : <ViewCustomRange />}
      </div>
    );
  }
}

export default ViewPage;
