/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Wizard1 from "./Wizard1";
import Wizard2 from "./Wizard2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UpdateCurrentUser } from "redux/action/userAction";
import Modal from "@mui/material/Modal";

const CustomTab = styled(Tab)(({ theme }) => ({
  border: "1px solid grey",
  borderRadius: "5px",
  margin: "1rem 0.4rem",
  minHeight: "35px",
  height: "35px",
  "&:hover": {
    backgroundColor: "#5956E9",
    color: "white !important",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
  },
  "&.Mui-selected": {
    backgroundColor: "#5956E9",
    color: "white !important",
    transition: "transform .2s",
    borderRadius: "5px",
    padding: "0",
    border: "none",
    fontWeight: "bold",
  },
}));

export const completeProfileContext = React.createContext();

const initialDataStudent = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  dob: "",
  language: "",
  _id: "",
};

const initialDataTeacher = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
  dob: "",
  description: "",
  _id: "",
};

const passwords = {
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const CompleteProfileMain = ({ setShowModal, showModal, userData, section }) => {
  const dispatch = useDispatch();
  const MidScreen = useMediaQuery("(min-width:1000px)");
  const LargeScreen = useMediaQuery("(min-width:1200px)");
  const [credentials, setCredentials] = useState(null);
  const [password, setPassword] = useState(passwords);
  const [tab, setTab] = useState(0);
  const [err, setErr] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: LargeScreen ? "35vw !important" : MidScreen ? "65vw !important" : "85vw !important",
    minWidth: LargeScreen ? "35vw !important" : MidScreen ? "65vw !important" : "85vw !important",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
    padding: "1rem 2rem",
  };

  useEffect(() => {
    if (section === "teacher") {
      setCredentials(initialDataTeacher);
    } else if (section === "student") {
      setCredentials(initialDataStudent);
    }
  }, [section]);

  useEffect(() => {
    if (userData) {
      setCredentials({
        ...credentials,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        email: userData?.email,
        gender: userData?.gender,
        dob: userData?.dob,
        role: userData?.role,
        language: userData?.language,
        description: userData?.description,
        _id: userData?._id,
        ...userData,
      });
    }
  }, [userData]);

  const handleCreds = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleUpdateProfile = () => {
    if (credentials._id) {
      axios({
        url: `/${section}/${section}/${credentials._id}`,
        method: "PUT",
        data: credentials,
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        const _data = {
          userData: {
            ...userData,
            ...res.data.data,
          },
        };
        dispatch(UpdateCurrentUser(_data));
        setShowModal(false);
      });
    }
  };

  const handlePassword = () => {
    if (credentials._id) {
      axios({
        url: `/${section}/changePassword/${credentials._id}`,
        method: "PUT",
        data: password,
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (!res.data.success) {
          setErr(res.data.message);
        } else {
          const _data = {
            userData: {
              ...userData,
              ...res.data.data,
            },
          };
          dispatch(UpdateCurrentUser(_data));
          setShowModal(false);
        }
      });
    }
  };

  const completeProfileContextValue = {
    tab,
    setTab,
    handleCreds,
    credentials,
    handleUpdateProfile,
    handlePassword,
    setPassword,
    password,
    err,
    section,
  };

  const completeProfileContent = (tab) => {
    switch (tab) {
      case 0:
        return <Wizard1 />;
      case 1:
        return <Wizard2 />;
      default:
        return null;
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="Profile and Security tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <CustomTab label="Profile" />
            <CustomTab label="Security" disabled={userData?.google_oauth_id} />
          </Tabs>
          <completeProfileContext.Provider value={completeProfileContextValue}>
            {completeProfileContent(tab)}
          </completeProfileContext.Provider>
        </>
      </Box>
    </Modal>
  );
};

export default CompleteProfileMain;
