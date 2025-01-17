import React, { useContext } from "react";
import { completeProfileContext } from "./CompleteProfileMain";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const Wizard2 = () => {
  const { password, setPassword, handlePassword, err } = useContext(
    completeProfileContext,
  );

  return (
    <div className="security">
      <div className="passCon">
        <div className="heading">Password</div>
        <div className="detail">
          Creating Password allow you to log with your teachify username and
          Email.
        </div>
      </div>
      <div className="fieldCon">
        <div className="con">
          <TextField
            variant="outlined"
            placeholder="Old Password"
            className="input"
            name="old_password"
            type="password"
            value={password.old_password}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={(e) =>
              setPassword({ ...password, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="con">
          <TextField
            variant="outlined"
            placeholder="New Password"
            className="input"
            name="new_password"
            type="password"
            value={password.new_password}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={(e) =>
              setPassword({ ...password, [e.target.name]: e.target.value })
            }
          />

          <TextField
            variant="outlined"
            placeholder="Re-Type New Password"
            className="input"
            name="confirm_password"
            type="password"
            value={password.confirm_password}
            inputProps={{
              style: {
                padding: 10,
              },
            }}
            onChange={(e) =>
              setPassword({ ...password, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div style={{ color: "red", fontWeight: "semi-bold" }}>{err}</div>
      </div>
      <Button variant="contained" onClick={handlePassword} className="UBtn">
        Update Password
      </Button>
    </div>
  );
};

export default Wizard2;
