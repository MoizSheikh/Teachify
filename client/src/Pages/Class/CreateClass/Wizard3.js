import React, { useContext } from "react";
import { classContext } from "./CreateClassContainer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Wizard3 = () => {
  const { setTab, classInfo, handleData } = useContext(classContext);
  return (
    <div className="wizard3">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="Con1">
        <div className="heading">Description</div>
        <div className="heading2">Briefly Describe Your Class</div>
        <div className="detail">
          This is Your Chance To Be Creative. Explain Your Class
        </div>
        <div className="detail1">Describe What Are You Offering.</div>
        <div className="content">
          <TextField
            variant="outlined"
            multiline
            id="title"
            name="description"
            value={classInfo?.description}
            onChange={handleData}
            className="input"
            // inputProps={{ maxLength: 90 }}
            // helperText={`${classInfo?.description.length}/90`}
            rows={12}
            placeholder="Be As Detailed As Possible So Students Will Be Able To Understand If This Meets Their Needs. Should Be At Least 120 Characters."
          />
        </div>
        <div className="BtnCon">
          <Button onClick={() => setTab(1)} className="cancelBtn">
            back
          </Button>
          <Button
            onClick={() => setTab(4)}
            className="saveBtn"
            variant="contained"
            disabled={classInfo?.description === ""}
          >
            Save & Continue
          </Button>
        </div>
      </div>
      <div className="Con2">
        <img
          className="image"
          src={  "/Vector.png"}
          alt="logo"
        />
        <div className="detail">
          Be As Detailed As Possible So Students Will Be Able To Understand If
          This Meets Their Needs. Should Be At Least 120 Characters.
        </div>
      </div>
    </div>
  );
};

export default Wizard3;
