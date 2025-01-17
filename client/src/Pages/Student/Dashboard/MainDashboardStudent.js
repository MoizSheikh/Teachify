/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import ActiveOrders from "./ActiveOrders";
import LoggedInNavStudent from "../../Shared/Navs/LoggedInNavStudent";
import { useSelector } from "react-redux";

const MainDashboardStudent = () => {
  const userDetails = useSelector(({ user }) => user.userDetails);
  const userData = userDetails?.userData;

  return (
    <div className="StudentDashboard">
      <LoggedInNavStudent userData={userData} status="overview" />
      <div className="MainDashboardStudent">
        <div className="title">
          Hi {userData?.first_name},
          <br /> <span style={{ fontSize: "25px" }}>Welcome</span>
        </div>
        <div className="mainContent">
          <ActiveOrders userData={userData} student={true} />
        </div>
      </div>
    </div>
  );
};

export default MainDashboardStudent;
