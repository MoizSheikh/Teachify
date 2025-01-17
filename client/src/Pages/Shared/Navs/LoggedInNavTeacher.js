/* eslint-disable react-hooks/exhaustive-deps */
// Imports
import React, { useState } from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CompleteProfileMain from "./../CompleteProfile/CompleteProfileMain";
import { useSelector } from "react-redux";
import { logout } from "redux/action/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";

const BtnStyle = (StyleSheet = {
  border: "none",
  width: "100%",
  padding: "0.5rem 0.5rem",
  backgroundColor: "transparent",
  fontSize: "16px",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  AlignItems: "center",
  color: "#727E8F",
});

export default function LoggedInNavTeacher() {
  //UseStates

  const userDetails = useSelector(({ user }) => user.userDetails);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userData = userDetails.userData;

  // handles
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.href = "/";
  };

  // Handles
  const navigateToServices = () => {
    console.log("teacher");
    navigate("/teacherClasses");
  };
  const navigateToStudentSchedules = () => {
    navigate("/schedules");
  };

  const navigateToteacherdashboard = () => {
    console.log("teacher");
    navigate("/teacherdashboard");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateTochat = () => {
    navigate("/chats");
  };

  return (
    <>
      <div className="TeacherNavbar">
        <div className="resCon">
          <div onClick={() => navigate("/")} className="MainLogo">
            <img
              className="Logoimage"
              src={  "/logo.jpg"}
              alt="logo"
            />
          </div>
        </div>
        <div className="LinkCon">
          <Button className="link" onClick={navigateToteacherdashboard}>
            <HiOutlineLightningBolt className="icon" /> Overview
          </Button>
          <Button className="link" onClick={navigateTochat}>
            <BiEnvelope className="icon" /> Inbox
          </Button>
          <Button className="link" onClick={navigateToStudentSchedules}>
            <AiOutlineCalendar className="icon" /> Schedule
          </Button>
          <Button className="link" onClick={navigateToServices}>
            <HiOutlineShoppingBag className="icon" /> Service
          </Button>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" className="avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem style={{ padding: 0 }}>
                <button
                  onClick={setShowModal}
                  className="item"
                  style={BtnStyle}
                >
                  <BsGear size={20} style={{ marginRight: "0.5rem" }} /> Setting
                </button>
              </MenuItem>
              <MenuItem style={{ padding: 0 }}>
                <button
                  onClick={handleLogout}
                  className="item"
                  style={BtnStyle}
                >
                  Logout
                </button>
              </MenuItem>
            </Menu>
          </Box>
        </div>
      </div>
      <CompleteProfileMain
        showModal={showModal}
        setShowModal={setShowModal}
        userData={userData}
        section="teacher"
      />
    </>
  );
}
