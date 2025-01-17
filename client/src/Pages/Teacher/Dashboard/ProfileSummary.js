import React from "react";
import { LinearProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ProfileSummary = ({ userData, orderRate }) => {
  const navigate = useNavigate();
  const navigateTochat = () => {
    navigate("/chats");
  };

  return (
    <div className="profileSummary teacherDashboardCard">
      <div className="Header">
        <Avatar alt="Remy Sharp" src={userData?.img} className="avatar" />
        {`${userData?.first_name} ${userData?.last_name}`}
      </div>

      <hr className="line" />
      <div className="rates">
        <div className="ProfileCon">
          <span className="ProgressHeading">Order Completion</span>
          <LinearProgress
            variant="determinate"
            value={orderRate}
            className="progressBar"
            sx={{ width: "50%" }}
          />
          <span className="ProgressHeading">{orderRate}%</span>
        </div>
      </div>

      <Button onClick={navigateTochat} className="ViewBtn">
        View All
      </Button>
    </div>
  );
};

export default ProfileSummary;
