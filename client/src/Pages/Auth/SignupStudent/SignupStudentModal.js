/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
// import { withStyles } from "@material-ui/core/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Wizard1 from "./Wizard1";
import Wizard2 from "./Wizard2";

// const CustomTab = withStyles({
//   root: {
//     // border: "1px solid grey",
//     borderRadius: "5px",
//     margin: "1rem 0.4rem",
//     background: "#E5E5E5",
//     "&:hover": {
//       backgroundColor: "#5956E9",
//       color: "white !important",
//       borderRadius: "5px",
//       cursor: "pointer",
//       border: "none",
//     },
//   },
//   selected: {
//     backgroundColor: "#5956E9",
//     color: "white !important",
//     transition: "transform .2s" /* Animation */,
//     borderRadius: "5px",
//     padding: "0",
//     border: "none",
//     fontWeight: "bold",
//   },
// })(Tab);

// const CustomDialog = withStyles({
//   paper: {
//     borderRadius: "45px",
//     padding: "1rem 2rem",
//     width: "70vw !important",
//     minWidth: "70vw !important",
//   },
// })(Dialog);

export const completeProfileContext = React.createContext();

const SignupStudentModal = ({ showModal, _credentials }) => {
  const [open, setOpen] = useState(showModal);
  const [credentials, setCredentials] = useState(_credentials);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (showModal) setOpen(showModal);
  }, [showModal]);

  useEffect(() => {
    setCredentials(_credentials);
  }, [_credentials]);

  const handleCreds = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleDob = (name, value) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const completeProfileContextValue = {
    tab,
    setTab,
    handleCreds,
    handleDob,
    credentials,
    setCredentials,
  };
  const completeProfileContent = (tab) => {
    switch (tab) {
      case 0:
        return <Wizard1 />;
      case 1:
        return <Wizard2 />;
    }
  };

  return (
    <CustomDialog
      // fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="signupStudentModal"
    >
      {tab === 3 ? null : (
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            padding: "0.5rem",
            margin: 0,
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Create your Profile
        </DialogTitle>
      )}
      <DialogContent style={{ padding: "0 1rem" }}>
        <>
          {tab === 3 ? null : (
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="disabled tabs example"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              {/* <CustomTab label="Profile" />
              <CustomTab label="Study" /> */}
            </Tabs>
          )}
          <completeProfileContext.Provider value={completeProfileContextValue}>
            {completeProfileContent(tab)}
          </completeProfileContext.Provider>
        </>
      </DialogContent>
    </CustomDialog>
  );
};

export default SignupStudentModal;
