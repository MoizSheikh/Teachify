import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./../../redux/action/userAction";
import { url } from "../../url";
const axios = require("axios");

function LoginPage(props) {
  const dispatch = useDispatch();
  //credentials object will get the input data user type on form in frontend
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //state update here when something changed
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [isStudent, setisStudent] = useState(true);

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  const handleLogin = () => {
    isStudent
      ? axios.post("/student/login", credentials).then((data) => {
          console.log(data.data);
          const response = data.data;
          alert(response.message);

          if (response.success) {
            dispatch(setCurrentUser({ ...response, role: "student" }));
            navigate("/studentdashboard");
          }
        })
      : axios.post("/teacher/login", credentials).then((data) => {
          console.log(data.data);
          const response = data.data;
          alert(response.message);

          if (response.success) {
            dispatch(setCurrentUser({ ...response, role: "teacher" }));
            navigate("/teacherdashboard");
          }
        });
  };
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="SignupTeacher SignIn">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="mainHeading" onClick={() => navigate("/")}>
        <img
          style={{ width: "100px" }}
          className="Logoimage"
          src={"/ItsEasyLogo.png"}
          alt="logo"
        />
      </div>
      <hr className="line" />
      <div className="BackgroundCon">
        <div className="Form SignInForm">
          <h1>Sign In</h1>
          <div className="BtnCon">
            <button
              className="btn Lbtn"
              disabled={isStudent}
              onClick={() => setisStudent(true)}
            >
              Student
            </button>
            <button
              className="btn Tbtn"
              disabled={!isStudent}
              onClick={() => setisStudent(false)}
            >
              Teacher
            </button>
          </div>
          <TextField
            variant="outlined"
            placeholder="Email address or Phone"
            className="email"
            name="email"
            onChange={onChange}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            className="password"
            type="password"
            onChange={onChange}
            name="password"
            inputProps={{
              style: {
                padding: 10,
              },
            }}
          />
          <Button variant="contained" className="btn1" onClick={handleLogin}>
            SignIn
          </Button>
          {/* <a href="/" className="Fpassword">
            Forgot Password?
          </a> */}

          <hr className="line2" />
          <button className="btn2" onClick={navigateToSignUp}>
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
