/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ActiveOrders from "./ActiveOrders";
import ProfileSummary from "./ProfileSummary";
import LoggedInNavTeacher from "../../Shared/Navs/LoggedInNavTeacher";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const [orderDetail, setOrderDetail] = useState(0);
  const userDetails = useSelector(({ user }) => user.userDetails);

  const userData = userDetails?.userData;

  return (
    <div className="MainDashboard">
      <LoggedInNavTeacher />

      <div className="row1">
        <div className="title">
          Hi {`${userData?.first_name} ${userData?.last_name}`} ,
          <br /> <span style={{ fontSize: "25px" }}>Welcome</span>
        </div>
      </div>
      <div className="row2">
        <ActiveOrders userData={userData} setOrderDetail={setOrderDetail} />
        <ProfileSummary userData={userData} orderRate={orderDetail} />
      </div>
      {/* <div className="row3">
        <Earnings
          userData={userData}
          payment={payment}
          setMonthEarning={setMonthEarning}
          monthEarning={monthEarning}
        />
      </div> */}
    </div>
  );
};

export default MainDashboard;
