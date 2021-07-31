import React from "react";
import { Link } from "react-router-dom";

function DashboardBtn({ label, path }) {
  return (
    <Link to={path} className="dashboard__btn">
      {label}
    </Link>
  );
}

export default DashboardBtn;
