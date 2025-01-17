import React, { useContext } from "react";
import { classContext } from "./CreateClassContainer";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { InputLabel } from "@mui/material";

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

const subcategories = [
  "Introduction",
  "Theory",
  "Practical",
  "Applications",
  "History",
  "Problem-solving",
  "Research",
  "Projects",
  "Experiments",
  "Assessments",
];
const Wizard1 = () => {
  const { setTab, handleData, classInfo } = useContext(classContext);
  const navigate = useNavigate();
  const navigateToBack = () => {
    navigate("/teacherClasses");
  };
  return (
    <div className="wizard1">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="Con1">
        <div className="field">
          <h4 className="label">GO TITLE</h4>
          <TextField
            variant="outlined"
            multiline
            id="title"
            className="input"
            // label="title"
            fullWidth
            rows={4}
            placeholder="title"
            value={classInfo.title}
            name="title"
            onChange={handleData}
          />
        </div>

        <div className="field">
          <h4 className="label">Category</h4>
          <div className="selectCon">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                value={classInfo.category}
                className="select"
                onChange={handleData}
                name="category"
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
              >
                {categories.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="selectCon">
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Sub Category
              </InputLabel>
              <Select
                id="subCategory-select"
                value={classInfo.subCategory}
                onChange={handleData}
                name="subCategory"
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
              >
                {subcategories.map((el) => (
                  <MenuItem value={el}>{el}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="field">
          <h4 className="label">SEARCH</h4>
          <TextField
            variant="outlined"
            id="searchTags"
            fullWidth
            placeholder="searchTags"
            value={classInfo.searchTags}
            name="searchTags"
            className="input"
            onChange={handleData}
          />
        </div>
        <div className="field">
          <h4 className="label">No of Lectures</h4>
          <TextField
            variant="outlined"
            id="noOfClasses"
            fullWidth
            placeholder="No of Lectures"
            value={classInfo.noOfClasses}
            name="noOfClasses"
            className="input"
            type="Number"
            onChange={handleData}
          />
        </div>

        <div className="field">
          <Button onClick={navigateToBack} className="cancelBtn">
            cancel
          </Button>
          <Button
            onClick={() => setTab((tab) => tab + 1)}
            className="saveBtn"
            variant="contained"
            disabled={
              classInfo?.title === "" ||
              classInfo?.category === "" ||
              classInfo?.subCategory === ""
            }
          >
            Save and Continue
          </Button>
        </div>
      </div>
      <div className="Con2">
        <h3 className="heading">Describe Your Service</h3>
        <div className="detail">
          This Is Your Gig Title. Choose Wisely, You Can Only Use 80 Characters.
        </div>
        <img
          className="image"
          src={  "/step1.PNG"}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Wizard1;
