import React, { useContext } from "react";
import { completeProfileContext } from "./SignupStudentModal";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { UpdateCurrentUser } from "@redux/action/userAction";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const universities = [
  "University of the Punjab",
  "Quaid-i-Azam University",
  "University of Karachi",
  "Lahore University of Management Sciences (LUMS)",
  "National University of Sciences and Technology (NUST)",
  "University of Engineering and Technology (UET), Lahore",
  "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
  "COMSATS Institute of Information Technology",
  "University of the Punjab, Lahore",
  "University of Peshawar",
  "University of Agriculture, Faisalabad",
  "University of Health Sciences, Lahore",
  "University of Sargodha",
  "University of Gujrat",
  "University of Balochistan",
  "University of Science and Technology, Bannu",
  "University of Malakand",
  "University of Azad Jammu and Kashmir",
  "University of Science and Technology, Peshawar",
  "University of Management and Technology, Lahore",
];

const categories = [
  "Science",
  "Mathematics",
  "English",
  "History",
  "Physical Education",
  "Art",
  "Music",
  "Computer Science",
  "Foreign Languages",
  "Social Sciences",
];

const educationLevels = [
  "Secondary",
  "Higher Secondary",
  "Undergraduate",
  "Postgraduate",
  "Ph.D.",
];

const Wizard2 = () => {
  const { setTab, handleCreds, credentials } = useContext(
    completeProfileContext,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    const _creds = { ...credentials, is_profile_completed: true };
    if (credentials._id) {
      axios({
        url: `/student/student/${_creds._id}`,
        method: "PUT",
        data: _creds,
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.data.success) {
          const _data = {
            userData: {
              ...res.data.data,
            },
          };
          dispatch(UpdateCurrentUser(_data));
          navigateToLogin();
        } else {
          alert(res.data.message);
        }
      });
    }
  };
  return (
    <div className="security">
      <div className="Header">
        <div className="head1">
          <div className="heading">Personalise ItsEast</div>
          <div className="detail">Well gather the right lessons for you</div>
        </div>
      </div>
      <div className="fieldsCon">
        <div className="Field1">
          <select
            className="input"
            name="university"
            value={credentials.university}
            onChange={handleCreds}
          >
            <option>University</option>
            {universities.map((el) => (
              <option value={el}>{el}</option>
            ))}
          </select>

          <div className="eduCon">
            <div>From</div>
            <TextField
              variant="outlined"
              placeholder="Year"
              className="input"
              name="start_date"
              type="text"
              value={credentials.start_date}
              onChange={handleCreds}
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
            />
            <div>To</div>
            <TextField
              variant="outlined"
              placeholder="Year"
              className="input"
              name="end_date"
              type="text"
              value={credentials.end_date}
              onChange={handleCreds}
              inputProps={{
                style: {
                  padding: 10,
                },
              }}
            />
            <select
              className="input select"
              name="edu_level"
              value={credentials.edu_level}
              onChange={handleCreds}
            >
              <option>Education Level</option>
              {educationLevels.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="Field1">
          <select
            className="input"
            name="study"
            value={credentials.study}
            onChange={handleCreds}
          >
            <option>Study</option>
            {categories.map((el) => (
              <option value={el}>{el}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="nextCon">
        <div className="progCon">
          <div className="header">Completion Rate 100%</div>
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{ width: "100%" }}
          />
        </div>
        <Button variant="text" onClick={() => setTab((old) => old - 1)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={(e) => handleSubmit(e)}
          className="UBtn"
        >
          Next <MdKeyboardArrowRight className="arrow" />
        </Button>
      </div>
    </div>
  );
};

export default Wizard2;
