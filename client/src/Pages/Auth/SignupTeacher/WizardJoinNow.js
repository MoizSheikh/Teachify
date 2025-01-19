import React from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { BiEnvelope } from "react-icons/bi";

const WizardJoinNow = () => {
  console.log("inside")
  const navigate = useNavigate();
  const navigateToSignUpStudent = () => {
    navigate("/signupstudent");
  };
  const navigateToSignUpTeacher = () => {
    navigate("/signupteacher");
  };

  return (
    <div className="SignupTeacher">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <h3 className="mainHeading">
        <img
          className="Logoimage"
          src={  "/ItsEasyLogo.png"}
          alt="logo"
        />
      </h3>
      <hr className="line" />
      <div className="Form">
        <div className="Part1">
          <h3>Support every student with tailored lesson to succeed. </h3>
          <div className="detail">
            <GoDotFill /> Find material that is standards-aligned
          </div>
          <div className="detail">
            <GoDotFill /> Track progress for students
          </div>
          <div className="detail">
            <GoDotFill /> Join hundreds of students and teachers
          </div>
          <div className="detail">
            By signing up for teachify, you agree to our
            <a href="/" className="detail-link">
              {" "}
              Privacy Policy and Terms
            </a>{" "}
            of Use.
          </div>
        </div>
        <div className="Part2">
          <h4>Join teachify as a</h4>

          <div className="Con" onClick={() => navigateToSignUpTeacher()}>
            <div className="detail">
              <BiEnvelope className="Micon" />
              <div>Signup as Teacher</div>
            </div>
          </div>
          <div className="Con" onClick={() => navigateToSignUpStudent()}>
            <div className="detail">
              <BiEnvelope className="Micon" />
              <div>Sign up as student</div>
            </div>
          </div>
          <a href="/login" className="detail-link">
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default WizardJoinNow;
