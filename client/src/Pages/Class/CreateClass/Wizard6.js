import { Button } from "@mui/material";
import React, { useContext } from "react";
import { classContext } from "./CreateClassContainer";
import { useNavigate } from "react-router-dom";
import { TbLink } from "react-icons/tb";

const Wizard6 = () => {
  const { classId } = useContext(classContext);
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/teacherdashboard");
  };
  const navigateToMyClasses = () => {
    navigate("/myclass");
  };
  const handleSubmit = async (e) => {
    navigateToLogin();
  };
  return (
    <div className="wizard6">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="Con">
        <h2 className="heading">Your Course is Open For Students!</h2>
        <h3 className="detail">Spread The World To Boost Your Sales</h3>
        <div className="link">
          <TbLink />
          {`localhost:3000/classview/${classId}`}
        </div>

        <hr className="line" />
        <h2 className="heading2">Level Up Your Skills With These Courses</h2>
        <div className="detail1">
          Take Courses Tailored To Your Professional Needs And Improve Your
          Ranking In teachify
        </div>

        <Button
          variant="outlined"
          className="VBtn"
          onClick={navigateToMyClasses}
        >
          View All Courses
        </Button>
      </div>
      <Button
        onClick={(e) => handleSubmit(e)}
        variant="contained"
        className="saveBtn"
      >
        Done
      </Button>
    </div>
  );
};

export default Wizard6;
