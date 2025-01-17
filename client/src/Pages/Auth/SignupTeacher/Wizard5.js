import React, { useEffect, useState, useContext } from "react";
import { signupContext } from "./SignupWizardContainer";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UpdateCurrentUser } from "redux/action/userAction";
import axios from "axios";

const Wizard5 = () => {
  const { steps, credentials } = useContext(signupContext);
  const [add1, setAdd1] = useState(true);
  const [add2, setAdd2] = useState(true);
  const [add3, setAdd3] = useState(true);
  const [add4, setAdd4] = useState(true);
  const [add5, setAdd5] = useState(true);

  const [allOccupations, setAllOccupations] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allEducations, setAllEducations] = useState([]);
  const [allCertifications, setAllCertifications] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [width, setWidth] = useState(false);
  const initialObj = { required: false, language: "", level: "" };
  const [languages, setLanguages] = useState([initialObj]);
  const handleAddLanguages = () => {
    setAdd5(true);
    setLanguages([...languages, initialObj]);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    navigate("/login");
  };

  let screenWidth = window.innerWidth;
  useEffect(() => {
    if (screenWidth < 450) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  }, [screenWidth]);

  const AddOccupation = (event) => {
    setAdd1(true);
    setOccupation([
      ...Occupation,
      <select
        className="select1"
        onChange={(e) => handleOccupation(e, Occupation.length)}
        style={{ marginRight: "1rem", marginBottom: "1rem" }}
        key={Occupation.length}
        // value="Select"
        // value={credentials?.occupation[Occupation.length]}
      >
        <option disabled value="Select" selected>
          Select Occupation
        </option>
        <option value="Engineer">Engineer</option>
        <option value="Doctor">Doctor</option>
        <option value="Professor">Professor</option>
      </select>,
    ]);
  };
  const AddSkills = (event) => {
    setAdd2(true);
    setSkills([
      ...skills,
      <div className="Con skillCon">
        <TextField
          variant="outlined"
          placeholder="Add Skill (EG, Voice Talent)"
          className="skill first Skill"
          name="skillname"
          inputProps={{
            style: {
              padding: 13,
            },
          }}
          onChange={(e) => handleSkills(e, skills.length)}
        />
        <select
          className="select1 experience"
          name="experience"
          onChange={(e) => handleSkills(e, skills.length)}
          key={skills.length}
          // value="Select"
        >
          <option disabled value="Select" selected>
            Experience Level
          </option>
          <option value="good">Good</option>
          <option value="bad">Bad</option>
          <option value="average">Average</option>
        </select>
      </div>,
    ]);
  };
  const AddEducation = (event) => {
    setAdd3(true);
    setEducation([
      ...education,
      <div className="education">
        <div className="Con">
          <select
            className="select1 experience"
            name="edu_country"
            onChange={(e) => handleEducation(e, education.length)}
            key={education.length}
            // value="Select"
          >
            <option disabled value="Select" selected>
              Country of College/University
            </option>
            <option value="pakistan">Pakistan</option>
            <option value="belgium">Belgium</option>
            <option value="brazil">Brazil</option>
            <option value="canada">Canada</option>
            <option value="china">China</option>
            <option value="germany">Germany</option>
          </select>
          <TextField
            variant="outlined"
            placeholder="College/University Name"
            className="skill Skill"
            name="edu_college"
            inputProps={{
              style: {
                padding: 13,
              },
            }}
            onChange={(e) => handleEducation(e, education.length)}
          />
        </div>
        <div className="Con">
          <select
            className="select3 title"
            name="edu_title"
            onChange={(e) => handleEducation(e, education.length)}
            key={education.length}
            // value="Select"
          >
            <option disabled value="Select" selected>
              Title
            </option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
            <option value="course">Course</option>
          </select>
          <TextField
            variant="outlined"
            placeholder="Major"
            className="skill"
            name="edu_major"
            inputProps={{
              style: {
                padding: 13,
              },
            }}
            onChange={(e) => handleEducation(e, education.length)}
          />
          <select
            className="select2 title"
            name="edu_year"
            onChange={(e) => handleEducation(e, education.length)}
            key={education.length}
            // value="Select"
          >
            <option disabled value="Select" selected>
              Year
            </option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2022">2023</option>
            <option value="2022">2024</option>
          </select>
        </div>
      </div>,
    ]);
  };
  const AddCertification = (event) => {
    setAdd4(true);
    setCertification([
      ...certification,
      <div className="Con CerCon">
        <TextField
          variant="outlined"
          placeholder="Certificate Or Award"
          className="skill first"
          name="cert_name"
          inputProps={{
            style: {
              padding: 13,
            },
          }}
          onChange={(event) => handleCertification(event, certification.length)}
        />
        <TextField
          variant="outlined"
          placeholder="Certicate From e.g Adobe"
          className="skill first"
          name="cert_from"
          inputProps={{
            style: {
              padding: 13,
            },
          }}
          onChange={(event) => handleCertification(event, certification.length)}
        />
        <select
          className="select2"
          name="cert_year"
          onChange={(event) => handleCertification(event, certification.length)}
          key={certification.length}
          // value="Select"
        >
          <option disabled value="Select" selected>
            Year
          </option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>,
    ]);
  };

  const [Occupation, setOccupation] = useState([
    <select
      className="select1"
      onChange={(event) => handleOccupation(event, 0)}
      style={{ marginRight: "1rem", marginBottom: "1rem" }}
      key={0}
      // value={O}
      // value={credentials.occupation[0]}
    >
      <option disabled value="Select" selected>
        Select Occupation
      </option>
      <option value="Engineer">Engineer</option>
      <option value="Doctor">Doctor</option>
      <option value="Professor">Professor</option>
    </select>,
  ]);
  const [skills, setSkills] = useState([
    <div className="Con skillCon">
      <TextField
        variant="outlined"
        placeholder="Add Skill (EG, Voice Talent)"
        className="skill first Skill"
        name="skillname"
        inputProps={{
          style: {
            padding: 13,
          },
        }}
        onChange={(event) => handleSkills(event, 0)}
      />
      <select
        className="select1 experience"
        name="experience"
        onChange={(event) => handleSkills(event, 0)}
        key={0}
        // value="Select"
      >
        <option disabled value="Select" selected>
          Experience Level
        </option>
        <option value="good">Good</option>
        <option value="bad">Bad</option>
        <option value="average">Average</option>
      </select>
    </div>,
  ]);
  const [education, setEducation] = useState([
    <div className="education">
      <div className="Con">
        <select
          className="select1 experience"
          name="edu_country"
          onChange={(event) => handleEducation(event, 0)}
          key={0}
          // value="Select"
        >
          <option disabled value="Select" selected>
            Country of College/University
          </option>
          <option value="pakistan">Pakistan</option>
          <option value="belgium">Belgium</option>
          <option value="brazil">Brazil</option>
          <option value="canada">Canada</option>
          <option value="china">China</option>
          <option value="germany">Germany</option>
        </select>
        <TextField
          variant="outlined"
          placeholder="College/University Name"
          className="skill Skill"
          name="edu_college"
          inputProps={{
            style: {
              padding: 13,
            },
          }}
          onChange={(e) => handleEducation(e, 0)}
        />
      </div>
      <div className="Con">
        <select
          className="select3 title"
          name="edu_title"
          onChange={(event) => handleEducation(event, 0)}
          key={0}
          // value="Select"
        >
          <option disabled value="Select" selected>
            Title
          </option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="course">Course</option>
        </select>
        <TextField
          variant="outlined"
          placeholder="Major"
          className="skill"
          name="edu_major"
          inputProps={{
            style: {
              padding: 13,
            },
          }}
          onChange={(e) => handleEducation(e, 0)}
        />
        <select
          className="select2 title"
          name="edu_year"
          onChange={(event) => handleEducation(event, 0)}
          key={0}
          // value="Select"
        >
          <option disabled value="Select" selected>
            Year
          </option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>,
  ]);
  const [certification, setCertification] = useState([
    <div className="Con CerCon">
      <TextField
        variant="outlined"
        placeholder="Certificate Or Award"
        className="skill first"
        name="cert_name"
        inputProps={{
          style: {
            padding: 13,
          },
        }}
        onChange={(event) => handleCertification(event, 0)}
      />
      <TextField
        variant="outlined"
        placeholder="Certicate From e.g Adobe"
        className="skill first"
        name="cert_from"
        inputProps={{
          style: {
            padding: 13,
          },
        }}
        onChange={(event) => handleCertification(event, 0)}
      />
      <select
        className="select2"
        name="cert_year"
        onChange={(event) => handleCertification(event, 0)}
        key={0}
        // value="Select"
      >
        <option disabled value="Select" selected>
          Year
        </option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
      </select>
    </div>,
  ]);

  const handleOccupation = (event, o) => {
    allOccupations[o] = event.target.value;
    setAllOccupations(allOccupations);
    setAdd1(false);
  };
  const handleSkills = (event, o) => {
    const _name = event.target.name;
    const val = event.target.value;
    const obj = { [_name]: val };
    allSkills[o] = { ...allSkills[o], ...obj };
    setAllSkills(allSkills);

    if (
      (allSkills[o].skillname ? true : false) &&
      (allSkills[o].experience ? true : false)
    ) {
      setAdd2(false);
    }
  };
  const handleEducation = (event, o) => {
    const _name = event.target.name;
    const val = event.target.value;
    const obj = { [_name]: val };
    allEducations[o] = { ...allEducations[o], ...obj };
    setAllEducations(allEducations);
    if (
      (allEducations[o].edu_college ? true : false) &&
      (allEducations[o].edu_country ? true : false) &&
      (allEducations[o].edu_major ? true : false) &&
      (allEducations[o].edu_title ? true : false) &&
      (allEducations[o].edu_year ? true : false)
    ) {
      setAdd3(false);
    }
  };
  const handleCertification = (event, o) => {
    const _name = event.target.name;
    const val = event.target.value;
    const obj = { [_name]: val };
    allCertifications[o] = { ...allCertifications[o], ...obj };
    setAllCertifications(allCertifications);
    if (
      (allCertifications[o].cert_from ? true : false) &&
      (allCertifications[o].cert_name ? true : false) &&
      (allCertifications[o].cert_year ? true : false)
    ) {
      setAdd4(false);
    }
  };
  const handleLanguages = (event, o) => {
    const _name = event.target.name;
    const val = event.target.value;
    const obj = { [_name]: val };
    allLanguages[o] = { ...allLanguages[o], ...obj };
    setAllLanguages(allLanguages);
    if (
      (allLanguages[o].language ? true : false) &&
      (allLanguages[o].lang_level ? true : false)
    ) {
      setAdd5(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const _creds = {
      ...credentials,
      // is_profile_completed: true,
      is_teacher_completed: true,
    };
    if (credentials._id) {
      axios({
        url: `/teacher/teacher/${_creds._id}`,
        method: "PUT",
        data: _creds,
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        const _data = {
          userData: {
            ...res.data.data,
          },
        };
        dispatch(UpdateCurrentUser(_data));
      });
      navigateToLogin();
    }
  };

  return (
    <div className="wizard4 wizard5">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="WizardCon">
        <div className="progress">
          <div className="ProgressCon">
            <Box sx={{ width: "100%" }}>
              {width ? (
                <Stepper activeStep={1} className="stepper" alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                <Stepper activeStep={1} className="stepper">
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
            <div className="ProgressDetail">Completaion Rate 55%</div>
            <LinearProgress
              variant="determinate"
              value={55}
              className="progressBar"
            />
          </div>
        </div>
        <div className="InfoCon">
          <h3>Professional Info</h3>
          <div className="main-detail">
            This is your time to shine. Let potential buyers know what you do
            best and how you gained your skills, certifications and experience.
          </div>
          <hr className="line" />
          <div className="field">
            <div className="label">
              Your Occupation <span className="req">*</span>
            </div>
            {
              <div className="field">
                {Occupation.length > 0 &&
                  Occupation?.map((ele, index) => {
                    return ele;
                  })}
                <Button
                  variant="contained"
                  className="add-btn"
                  disabled={add1}
                  onClick={AddOccupation}
                >
                  + Add New
                </Button>
              </div>
            }
          </div>

          <div className="field">
            <div className="label">
              Skills <span className="req">*</span>
            </div>
            <div className="extra">
              List the skills related to the services you’re offering and add
              your experience level.
            </div>
            <div className="SkillCon">
              {skills.length > 0 &&
                skills?.map((ele, index) => {
                  return ele;
                })}
              <Button
                variant="contained"
                className="add-btn"
                disabled={add2}
                onClick={AddSkills}
              >
                + Add New
              </Button>
            </div>
          </div>
          <div className="field">
            <div className="label">Education</div>
            <div className="extra">
              Add any relevant education details that will help customers to get
              to know you better.
            </div>
            <div className="EduCon">
              {education.length > 0 &&
                education?.map((ele, index) => {
                  return ele;
                })}
              <Button
                variant="contained"
                className="add-btn edu-btn"
                disabled={add3}
                onClick={AddEducation}
              >
                + Add New
              </Button>
            </div>
          </div>
          <div className="field">
            <div className="label">Certifications</div>
            <div className="extra">
              Include any certificates or awards that are relevant to the
              services you’re offering.
            </div>
            <div className="SkillCon">
              {certification.length > 0 &&
                certification?.map((ele, index) => {
                  return ele;
                })}
              <Button
                variant="contained"
                className="add-btn"
                disabled={add4}
                onClick={AddCertification}
              >
                + Add New
              </Button>
            </div>
          </div>
          <div className="field">
            <div className="label">Languages</div>
            <div className="extra">
              Select which languages you can communicate in and your proficiency
              level.
            </div>
            <div className="lanCon">
              {languages.map((e, ind) => {
                return (
                  <span key={ind}>
                    <select
                      className="select1"
                      name="language"
                      onChange={(event) =>
                        handleLanguages(event, languages.length)
                      }
                    >
                      <option>Language</option>
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Spanish</option>
                      <option>German</option>
                    </select>
                    <select
                      className="select1"
                      name="lang_level"
                      onChange={(event) =>
                        handleLanguages(event, languages.length)
                      }
                    >
                      <option>Language Level</option>
                      <option>High</option>
                      <option>Average</option>
                      <option>Low</option>
                    </select>
                  </span>
                );
              })}
              <Button
                variant="contained"
                className="add-btn"
                disabled={add5}
                onClick={handleAddLanguages}
              >
                + Add New
              </Button>
            </div>
          </div>
          <Button
            variant="contained"
            onClick={(e) => {
              handleSignUp(e);
            }}
            className="continue-btn"
            // disabled={check1 || check2 || check3}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard5;
