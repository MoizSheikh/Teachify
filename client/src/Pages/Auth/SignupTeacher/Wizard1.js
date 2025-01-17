import React, { useContext } from "react";
import { signupContext } from "./SignupWizardContainer";
import { Button } from "@mui/material";
import { MdOutlineBook, MdStoreMallDirectory } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";

const Wizard1 = () => {
  const { tab, setTab } = useContext(signupContext);
  console.log(tab);
  return (
    <div className="wizard1">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="WizardCon">
        <h3>Ready to start teaching on Teachify?</h3>
        <h3>Here's the breakdown:</h3>
        <div className="ConPart">
          <MdOutlineBook className="icon" />
          <div>
            <div className="bold" style={{ fontWeight: "bolder" }}>
              Learn what makes a successful profile
            </div>
            <div>
              Discover the do’s and don’ts to ensure you’re always on the right
              track.
            </div>
          </div>
        </div>
        <div className="ConPart">
          <HiOutlineUserCircle className="icon" />
          <div>
            <div className="bold" style={{ fontWeight: "bolder" }}>
              Create your seller profile
            </div>
            <div>
              Add your profile picture, description, and professional
              information.
            </div>
          </div>
        </div>
        <div className="ConPart">
          <MdStoreMallDirectory className="icon" />
          <div>
            <div className="bold" style={{ fontWeight: "bolder" }}>
              Publish your Service
            </div>
            <div>
              Create a Gig of the service you’re offering and start selling
              instantly.
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => setTab(3)}
          className="continue-btn"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Wizard1;
