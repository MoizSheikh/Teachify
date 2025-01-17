import React, { useContext, useState, useEffect } from "react";
import { completeProfileContext } from "./SignupStudentModal";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LinearProgress from "@mui/material/LinearProgress";
import { MdKeyboardArrowRight } from "react-icons/md";

const Wizard1 = () => {
  const { setTab, handleCreds, credentials, handleDob, setCredentials } =
    useContext(completeProfileContext);
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
  const [value, setValue] = useState(null);
  const handleDOB = (Val) => {
    setValue(Val);
    if (Val != null && Val.toString().length >= 16) {
      handleDob("dob", Val.toString().slice(0, 16));
    }
  };

  async function uploadImg(e, ind) {
    let file = e.target.files[0];
    var formdata = new FormData();
    formdata.append("file", file);
    let res = await Singleupload(formdata);
    if (res.success) {
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
  return (
    <div className="Profile">
      <div className="profileCon">
        <div className="heading">Your Picture</div>
        <div className="DCon">
          <input
            onChange={(e) => uploadImg(e, 0)}
            type="file"
            id="image1"
            accept=".png, .jpg, .jpeg"
            name="img"
            style={{ display: "none" }}
          />
          <label htmlFor="image1">
            {credentials?.img ? (
              <Avatar
                alt="Remy Sharp"
                src={credentials.img}
                className="avatar"
              />
            ) : (
              <Avatar alt="Remy Sharp" src="default.jpg" className="avatar" />
            )}
          </label>
        </div>
      </div>
      <div className="fieldsCon">
        <div className="con">
          <TextField
            variant="outlined"
            placeholder="First Name"
            className="input"
            name="first_name"
            value={credentials.first_name}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
          <TextField
            variant="outlined"
            placeholder="Last Name"
            className="input"
            name="last_name"
            value={credentials.last_name}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
        </div>

        <div className="con">
          <TextField
            variant="outlined"
            placeholder="Email"
            className="input"
            value={credentials.email}
            name="email"
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={credentials.dob === "" ? value : credentials.dob}
              className="input"
              onChange={(newValue) => {
                handleDOB(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="con">
          <TextField
            variant="outlined"
            placeholder="Password"
            type="password"
            className="input"
            name="password"
            value={credentials.password}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
          <TextField
            type="password"
            variant="outlined"
            placeholder="Confirm Password"
            className="input"
            value={credentials.password2}
            name="password2"
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
        </div>
        <p style={{ color: "red" }}>{errorMsg}</p>

        <div className="con">
          <select
            className="input select"
            value={credentials.gender}
            name="gender"
            onChange={handleCreds}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <TextField
            variant="outlined"
            placeholder="Language"
            className="input"
            name="language"
            value={credentials.language}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
        </div>
        <div className="con"></div>
      </div>
      <div className="nextCon">
        <div className="progCon">
          <div className="header">Completion Rate 50%</div>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{ width: "100%" }}
          />
        </div>
        <Button
          variant="contained"
          onClick={() => setTab((old) => old + 1)}
          className="UBtn"
        >
          Next <MdKeyboardArrowRight className="arrow" />
        </Button>
      </div>
    </div>
  );
};

export default Wizard1;
