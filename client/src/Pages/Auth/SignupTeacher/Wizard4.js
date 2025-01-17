/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { signupContext } from "./SignupWizardContainer";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { LinearProgress } from "@mui/material";
// const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Wizard4 = () => {
  const { setTab, steps, handleCreds, credentials, setCredentials } =
    useContext(signupContext);
  const [width, setWidth] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (credentials.password.length > 0) {
      if (credentials.password.length < 8) {
        setErrorMsg("Please make sure password is 8 characters");
      } else if (credentials.password !== credentials.password2) {
        setErrorMsg("Password not same");
      } else setErrorMsg("");
    } else setErrorMsg("");
  }, [credentials]);

  async function uploadImg(e) {
    let file = e.target.files[0];
    var formdata = new FormData();
    formdata.append("file", file);
    let res = await Singleupload(formdata);
    if (res.success) {
      console.log(res.url);
      setCredentials({ ...credentials, img: res.url });
    } else {
    }
  }

  const Singleupload = async (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`,
    );

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: myHeaders,
    };
    const response = await fetch("/teacher/upload", requestOptions);
    const data = await response.json();
    return data;
  };
  // useEffect(() => {
  //   let fileReader,
  //     isCancel = false;
  //   if (file) {
  //     fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       const { result } = e.target;
  //       if (result && !isCancel) {
  //         setFileDataURL(result);

  //         setCredentials({ ...credentials, img: result });
  //       }
  //     };
  //     fileReader.readAsDataURL(file);
  //     console.log(fileDataURL);
  //   }
  //   return () => {
  //     isCancel = true;
  //     if (fileReader && fileReader.readyState === 1) {
  //       fileReader.abort();
  //     }
  //   };
  // }, [file]);
  let screenWidth = window.innerWidth;
  useEffect(() => {
    if (screenWidth < 450) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  }, [screenWidth]);
  return (
    <div className="wizard4">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="patch5"></div>
      <div className="WizardCon">
        <div className="progress">
          <div className="ProgressCon">
            <Box sx={{ width: "100%" }}>
              {width ? (
                <Stepper activeStep={0} className="stepper" alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                <Stepper activeStep={0} className="stepper">
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
            </Box>
          </div>
          <div className="ProgressCon">
            <div className="ProgressDetail">Completaion Rate 25%</div>
            <LinearProgress
              variant="determinate"
              value={25}
              className="progressBar"
            />
          </div>
        </div>
        <div className="InfoCon">
          <h3>Personal Info</h3>
          <div className="main-detail">
            Lorem ipsum dolor sit amet, cons ectetur adipiscing elit. Aliquet
            euis mod enim accumsan gravida.
          </div>
          <div className="field">
            <div className="label">
              Full Name <span className="req">*</span>{" "}
              <span className="detail">Private</span>
            </div>
            <div className="demo">Ex.John</div>
            <TextField
              variant="outlined"
              placeholder="First Name"
              className="fname"
              name="first_name"
              value={credentials.first_name}
              inputProps={{
                style: {
                  padding: 13,
                },
              }}
              onChange={handleCreds}
            />
            <TextField
              variant="outlined"
              name="last_name"
              placeholder="Last Name"
              value={credentials.last_name}
              className="lname"
              inputProps={{
                style: {
                  padding: 13,
                },
              }}
              onChange={handleCreds}
            />
          </div>
          <div className="field">
            <div className="label">
              Password <span className="req">*</span>{" "}
            </div>
            <TextField
              variant="outlined"
              placeholder="Password"
              className="fname"
              name="password"
              value={credentials.password}
              type="password"
              inputProps={{
                style: {
                  padding: 13,
                },
              }}
              onChange={handleCreds}
            />
            <TextField
              variant="outlined"
              name="password2"
              placeholder="Confirm Password"
              value={credentials.password2}
              className="lname"
              type="password"
              inputProps={{
                style: {
                  padding: 13,
                },
              }}
              onChange={handleCreds}
            />
            <p style={{ color: "red" }}>{errorMsg}</p>
          </div>
          <hr className="line" />
          <div className="field">
            <div className="label">
              Profile Picture <span className="req">*</span>
            </div>
            <label htmlFor="image">
              {credentials.img === "" ? (
                <img
                  src={  "/ProfileLogo.PNG"}
                  alt="logo"
                  className="upload-img"
                />
              ) : (
                <img src={credentials.img} alt="logo" className="upload-img" />
              )}
            </label>
            <input
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              name="img"
              // value={credentials.img}
              onChange={(e) => {
                // changeHandler(e);
                // handleCreds(e);
                uploadImg(e);
              }}
              style={{ display: "none" }}
            />
            {/* {fileDataURL ? (
              <img src={fileDataURL} alt="preview" className="upload-img" />
            ) : null} */}
          </div>
          <div className="field">
            <div className="label">
              Description <span className="req">*</span>
            </div>
            <TextareaAutosize
              aria-label="empty textarea"
              className="textarea"
              name="description"
              value={credentials.description}
              onChange={handleCreds}
            />
          </div>
          <Button
            variant="contained"
            onClick={() => setTab(4)}
            className="continue-btn"
            disabled={
              credentials.fname === "" ||
              credentials.lname === "" ||
              credentials.description === "" ||
              credentials.img === "" ||
              credentials.password === "" ||
              credentials.password2 === "" ||
              credentials.password !== credentials.password2
            }
          >
            Continue
          </Button>
          <Button variant="text" onClick={() => setTab(0)} className="back-btn">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard4;
