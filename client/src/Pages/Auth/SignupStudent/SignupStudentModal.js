import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Wizard1 from "./Wizard1";
import Wizard2 from "./Wizard2";

export const CompleteProfileContext = React.createContext();

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

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleDateOfBirthChange = (name, value) => {
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const contextValue = {
    tab,
    setTab,
    handleCreds: handleCredentialsChange,
    handleDob: handleDateOfBirthChange,
    credentials,
    setCredentials,
  };

  const renderWizard = () => {
    switch (tab) {
      case 0:
        return <Wizard1 />;
      case 1:
        return <Wizard2 />;
      default:
        return null;
    }
  };

  const isTabThree = tab === 3;

  return (
    <Dialog
      open={open}
      aria-labelledby="signup-dialog-title"
      className="signupStudentModal"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "45px",
          padding: "1rem 2rem",
          width: "70vw",
          minWidth: "70vw",
        }
      }}
    >
      {!isTabThree && (
        <DialogTitle
          id="signup-dialog-title"
          sx={{
            padding: "0.5rem",
            margin: 0,
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Create your Profile
        </DialogTitle>
      )}
      <DialogContent sx={{ padding: "0 1rem" }}>
        {!isTabThree && (
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            aria-label="signup wizard tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                borderRadius: "5px",
                margin: "1rem 0.4rem",
                background: "#E5E5E5",
                "&:hover": {
                  backgroundColor: "#5956E9",
                  color: "white",
                  cursor: "pointer",
                  border: "none",
                },
                "&.Mui-selected": {
                  backgroundColor: "#5956E9",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                }
              }
            }}
          />
        )}
        <CompleteProfileContext.Provider value={contextValue}>
          {renderWizard()}
        </CompleteProfileContext.Provider>
      </DialogContent>
    </Dialog>
  );
};

export default SignupStudentModal;
