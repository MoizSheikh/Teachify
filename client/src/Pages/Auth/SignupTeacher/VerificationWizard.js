import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { signupContext } from "./SignupWizardContainer";
import { useNavigate } from "react-router-dom";
import { url } from "url.js";
import axios from "axios";

export default function VerificationWizard() {
  const { credentials, setCredentials, tab, setTab } =
    useContext(signupContext);
  const [codeField, setCodeField] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/");
  };
  const sendVerifyEmailCode = async (e) => {
    e.preventDefault();
    const result = await axios(url + "/teacher/add/" + email);
    const response = result.data;
    if (response.success) {
      alert(response.message);
      setCredentials({
        ...credentials,
        _id: response.data._id,
        email: response.data.email,
      });
      if (
        response.data.is_email_verified &&
        !response.data.is_profile_completed
      ) {
        setTab(0);
        // setShowModal(true);
      } else if (response.data.is_profile_completed) {
        navigateToLogin();
      } else {
        setCodeField(true);
      }
    } else {
      alert(response.message);
    }
  };

  const VerifyEmailCode = async (e) => {
    e.preventDefault();
    const result = await axios(url + "/teacher/verifyEmailCode/" + code);
    const response = result.data;
    if (response.success) {
      alert(response.message);
      setTab(0);
    } else {
      alert(response.message);
    }
  };

  return (
    <>
      <div className="SignupTeacher SignIn EmailVerify">
        <div className="patch1"></div>
        <div className="patch2"></div>
        <div className="patch3"></div>
        <div className="patch4"></div>
        <div className="mainHeading" onClick={() => navigate("/")}>
          <img
            style={{ width: "100px" }}
            className="Logoimage"
            src={  "/ItsEasyLogo.png"}
            alt="logo"
          />
        </div>
        <hr className="line" />
        <div className="Form SignInForm">
          <h2>Email Verification</h2>
          <TextField
            variant="outlined"
            placeholder="Email address or Phone"
            className="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{
              style: {
                padding: 13,
              },
            }}
            disabled={codeField}
          />
          <Button
            variant="contained"
            className="btn1"
            onClick={(e) => sendVerifyEmailCode(e)}
            disabled={codeField}
          >
            Send Verification Code
          </Button>
          {codeField ? (
            <>
              <hr className="line2" />
              <TextField
                variant="outlined"
                placeholder="Code"
                className="password"
                type="text"
                name="password"
                onChange={(e) => setCode(e.target.value)}
                inputProps={{
                  style: {
                    padding: 13,
                  },
                }}
              />
              <Button
                variant="contained"
                className="btn2"
                onClick={(e) => VerifyEmailCode(e)}
              >
                Verify Code
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
