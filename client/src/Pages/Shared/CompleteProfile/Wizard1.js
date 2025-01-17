import React, { useContext } from "react";
import { completeProfileContext } from "./CompleteProfileMain";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TextField } from "@mui/material";
const Wizard1 = () => {
  const { handleCreds, credentials, handleUpdateProfile, section } = useContext(
    completeProfileContext,
  );
  console.log(credentials);
  return (
    <div className="Profile">
      <div className="profileCon">
        <div className="heading">Your Profile</div>
        <div className="DCon">
          <Avatar alt="Remy Sharp" src={credentials?.img} className="avatar" />
          <div className="detail">{credentials?.first_name}</div>
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
        </div>
        <div className="con">
          <TextField
            variant="outlined"
            placeholder="Gender"
            className="input"
            value={credentials.gender}
            name="gender"
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
          <TextField
            variant="outlined"
            placeholder="Select Date"
            className="input"
            value={credentials.dob}
            name="dob"
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={handleCreds}
          />
        </div>
        <div className="con">
          {section === "teacher" ? (
            <>
              <TextField
                variant="outlined"
                placeholder="description"
                className="input"
                name="description"
                value={credentials.description}
                inputProps={{
                  style: {
                    padding: 10,
                  },
                }}
                onChange={handleCreds}
              />
            </>
          ) : (
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
          )}
        </div>
      </div>
      <Button
        variant="contained"
        onClick={handleUpdateProfile}
        className="UBtn"
      >
        Update Profile
      </Button>
    </div>
  );
};

export default Wizard1;
