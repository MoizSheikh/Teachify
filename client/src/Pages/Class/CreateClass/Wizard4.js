import React, { useContext, useState, useEffect } from "react";
import { classContext } from "./CreateClassContainer";
import { Button, TextField } from "@mui/material";
import { Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const formOptions = ["Free Text", "new"];
const Wizard4 = () => {
  const { setTab, setClassInfo, classInfo } = useContext(classContext);
  const initialObj = { required: false, description: "", form: "" };
  // const initialQuestions
  // const [questions, setQuestions] = useState([initialObj]);
  const [questions, setQuestions] = useState([...classInfo.question]);
  const handleAddQuestions = () => {
    setQuestions([...questions, initialObj]);
  };
  const handleQuestions = (event, o) => {
    const _name = event.target.name;
    const val = event.target.value;
    const obj = { [_name]: val };
    questions[o] = { ...questions[o], ...obj };
    setQuestions([...questions]);
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleNext = () => {
    setClassInfo({ ...classInfo, question: questions });
    setTab(4);
  };

  return (
    <div className="wizard4">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="Con1">
        <div className="Mainheading">Scope & Pricing</div>
        <div className="InnerCon">
          <div className="heading">
            Get All The Information You Need From Buyers To Get Started
          </div>
          <div className="detail1">
            Add Questions To Help Buyers Provide You With Exactly What You Need
            To Start Working On Their Order.
          </div>
          <Divider className="divider">YOUR QUESTION</Divider>
          <div className="content">
            <div className="con">
              <div className="detail">Add a question</div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox className="check" />}
                  label="Required"
                />
              </FormGroup>
            </div>
            {questions.map((el, ind) => {
              return (
                <div key={ind}>
                  <TextField
                    variant="outlined"
                    multiline
                    placeholder="Request Necessary Details Such As Dimensions, Brand Guidelines, And More."
                    className="input"
                    name="description"
                    rows={3}
                    value={el.description}
                    inputProps={{
                      style: {
                        padding: 13,
                      },
                    }}
                    onChange={(e) => handleQuestions(e, ind)}
                  />
                  <div className="selectCon">
                    Get it in a form of:
                    <select
                      className="select"
                      name="form"
                      onChange={(e) => handleQuestions(e, ind)}
                      value={el.form}
                    >
                      {formOptions.map((e, i) => {
                        return (
                          <option value={e} key={i}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                    <div className="addCon">
                      <Button className="CBtn" variant="outlined">
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleAddQuestions()}
                        className="addBtn"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="BtnCon">
            <Button onClick={() => setTab(2)} className="cancelBtn">
              back
            </Button>
            <Button
              onClick={handleNext}
              className="saveBtn"
              variant="contained"
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="Con2">
        <img
          className="image"
          src={  "/Vector.png"}
          alt="logo"
        />
        <div className="detail">
          Lorem Ipsum Dolor Sit Amet, Consectetur Adipi Scing Elit. Ipsum Sed
          Dui Nibh Pellentesque.{" "}
        </div>
      </div> */}
    </div>
  );
};

export default Wizard4;
