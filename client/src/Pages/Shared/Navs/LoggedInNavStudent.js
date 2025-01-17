import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import CompleteProfileMain from "./../CompleteProfile/CompleteProfileMain";
import { logout } from "redux/action/userAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BsGear } from "react-icons/bs";

const BtnStyle1 = (StyleSheet = {
  border: "none",
  width: "100%",
  padding: "0.5rem 0.5rem",
  backgroundColor: "transparent",
  fontSize: "16px",
  cursor: "pointer",
  display: "flex",
  AlignItems: "center",
  textAlign: "left",
  color: "#727E8F",
});

export default function LoggedInNavStudent(props) {
  const status = props.status;
  const userDetails = useSelector(({ user }) => user.userDetails);
  const userData = userDetails?.userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchVal, setSearchVal] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearchVal = (e) => setSearchVal(e.target.value);

  const navigateToSearch = () => {
    navigate(`/searchResults/${searchVal}`);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigateToStudentSchedules = () => {
    navigate("/studentSchedules");
  };

  const navigateTochat = () => {
    navigate("/studentChat");
  };
  const navigatestudentdashboard = () => {
    navigate("/studentdashboard");
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <>
      <div className="StudentNavbar">
        <div className="TeacherNavbar">
          <div className="resCon">
            <div onClick={() => navigate("/")} className="MainLogo">
              <img
                className="Logoimage"
                src={  "/logo.jpg"}
                alt="logo"
              />
            </div>
            <form className="searchbar" onSubmit={navigateToSearch}>
              <input
                placeholder="Math"
                onChange={handleSearchVal}
                type="text"
                className="searchInput"
              />
              <IoSearchOutline className="seachIcon" />
              <Button
                className="searchBtn"
                disabled={searchVal === ""}
                onClick={navigateToSearch}
              >
                Search
              </Button>
              <button type="submit" style={{ display: "none" }}></button>
            </form>
          </div>
          <div className="LinkCon">
            <Button
              className="link"
              onClick={navigatestudentdashboard}
              style={{
                backgroundColor: status === "overview" ? "#5956E9" : "#FFFFFF",
                color: status === "overview" ? "#FFFFFF" : "#C4C4C4",
              }}
            >
              <HiOutlineLightningBolt
                className="icon"
                style={{ color: status === "overview" ? "#FFFFFF" : "#C4C4C4" }}
              />{" "}
              Overview
            </Button>

            <Button
              className="link"
              onClick={navigateToStudentSchedules}
              style={{
                backgroundColor: status === "schedule" ? "#5956E9" : "#FFFFFF",
                color: status === "schedule" ? "#FFFFFF" : "#C4C4C4",
              }}
            >
              <AiOutlineCalendar
                className="icon"
                style={{ color: status === "schedule" ? "#FFFFFF" : "#C4C4C4" }}
              />{" "}
              Schedule
            </Button>
            <Button
              className="link"
              onClick={navigateTochat}
              style={{
                backgroundColor: status === "inbox" ? "#5956E9" : "#FFFFFF",
                color: status === "inbox" ? "#FFFFFF" : "#C4C4C4",
              }}
            >
              <BiEnvelope
                className="icon"
                style={{ color: status === "inbox" ? "#FFFFFF" : "#C4C4C4" }}
              />{" "}
              Inbox
            </Button>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" className="avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  borderRadius: "1rem",
                }}
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
                    style={BtnStyle1}
                  >
                    <BsGear size={20} style={{ marginRight: "0.5rem" }} />{" "}
                    Profile Setting
                  </button>
                </MenuItem>

                <MenuItem style={{ padding: 0 }}>
                  <button
                    onClick={handleLogout}
                    className="item"
                    style={BtnStyle1}
                  >
                    Logout
                  </button>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </div>
        <CompleteProfileMain
          setShowModal={setShowModal}
          showModal={showModal}
          userData={userData}
          section="student"
        />
      </div>
    </>
  );
}
