import React, { useContext, useState } from "react";
import { classContext } from "./CreateClassContainer";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Wizard2 = () => {
  const { setTab, classInfo, setClassInfo } = useContext(classContext);
  const [premium, setPremium] = useState({
    ...classInfo.premium,
  });
  const [standard, setStandard] = useState({ ...classInfo.standard });

  const handleNext = () => {
    setTab(2);
    setClassInfo({ ...classInfo, premium: premium, standard: standard });
  };

  const handleGroup = (e) => {
    setPremium({ ...premium, [e.target.name]: e.target.value });
  };

  const handleIndivisual = (e) => {
    setStandard({ ...standard, [e.target.name]: e.target.value });
  };

  return (
    <div className="wizard2">
      <div className="patch1"></div>
      <div className="Con">
        <div className="Mainheading">Scope & Pricing</div>
        <div className="table">
          <div className="row1 row">
            <div className="col1"></div>
            <div className="col4 border">Standard</div>
            <div className="col3 border">premium</div>
          </div>
          <div className="row2">
            <div className="col1"></div>
            <TextField
              variant="outlined"
              multiline
              id="title"
              className="input"
              name="name"
              value={standard?.name}
              onChange={handleIndivisual}
              rows={2}
              placeholder="Name your Package"
            />
            <TextField
              variant="outlined"
              multiline
              id="title"
              className="input"
              name="name"
              value={premium?.name}
              onChange={handleGroup}
              rows={2}
              placeholder="Name your Package"
            />
          </div>
          <div className="row2">
            <div className="col1"></div>
            <TextField
              variant="outlined"
              multiline
              id="title"
              className="input"
              name="description"
              value={standard?.description}
              onChange={handleIndivisual}
              rows={2}
              placeholder="Describe the detail of your offering"
            />
            <TextField
              variant="outlined"
              multiline
              id="title"
              className="input"
              name="description"
              value={premium?.description}
              onChange={handleGroup}
              rows={2}
              placeholder="Describe the detail of your offering"
            />
          </div>
          <div className="row2">
            <div className="col1"></div>
            <FormControl fullWidth>
              <Select
                id="delivery-select"
                className="select"
                name="delivery"
                onChange={handleIndivisual}
                value={standard?.delivery}
                inputProps={{ "aria-label": "Without label" }}
                displayEmpty
              >
                <MenuItem value="">Delivery Time</MenuItem>
                <MenuItem value={10}>10;00 AM</MenuItem>
                <MenuItem value={20}>11:00 AM</MenuItem>
                <MenuItem value={30}>12:00 PM</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Select
                id="delivery-select"
                className="select"
                name="delivery"
                onChange={handleGroup}
                value={premium?.delivery}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">Delivery Time</MenuItem>
                <MenuItem value={10}>10;00 AM</MenuItem>
                <MenuItem value={20}>11:00 AM</MenuItem>
                <MenuItem value={30}>12:00 PM</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="row7 row">
            <div className="colName col1 col5 border">Price</div>
            <div className="detail1 price border">
              <TextField
                variant="outlined"
                multiline
                id="title"
                className="input"
                name="price"
                value={standard?.price}
                onChange={handleIndivisual}
                // rows={2}
                placeholder="Price"
              />
            </div>
            <div className="detail1 price border">
              {" "}
              <TextField
                variant="outlined"
                multiline
                id="title"
                className="input"
                name="price"
                value={premium?.price}
                onChange={handleGroup}
                // rows={2}
                placeholder="price"
              />
            </div>
          </div>
        </div>

        <div className="BtnCon">
          <Button onClick={() => setTab(0)} className="cancelBtn">
            back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              standard.name === "" ||
              standard.price === "" ||
              standard.description === "" ||
              premium.name === "" ||
              premium.price === "" ||
              premium.description === ""
            }
            className="saveBtn"
            variant="contained"
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wizard2;
