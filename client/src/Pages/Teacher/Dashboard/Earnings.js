import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { LinearProgress } from "@mui/material";
import moment from "moment";

const Earnings = ({ payment, setMonthEarning, monthEarning }) => {
  const [earning, setEarning] = useState([
    { month: 1, amount: 0 },
    { month: 2, amount: 0 },
    { month: 3, amount: 0 },
    { month: 4, amount: 0 },
    { month: 5, amount: 0 },
    { month: 6, amount: 0 },
    { month: 7, amount: 0 },
    { month: 8, amount: 0 },
    { month: 9, amount: 0 },
    { month: 10, amount: 0 },
    { month: 11, amount: 0 },
    { month: 12, amount: 0 },
  ]);
  useEffect(() => {
    console.log(payment);
    payment.forEach((el) => {
      const d = moment(el.createdAt).month();
      console.log(d);
      const _earning = earning;
      const _am = _earning[d].amount + el.amount;
      _earning[d] = { ..._earning[d], amount: _am };
      console.log(_earning);
      setEarning(_earning);

      const thisMonth = moment().month();
      console.log(thisMonth);
      const _earn = earning[thisMonth].amount;
      console.log(_earn);
      setMonthEarning(_earn);
    });
  }, [payment]);

  const handleCategory = (event) => {
    console.log(event.target.value);
    const val = event.target.value;

    // if (val === "Active") setToggleData(data.filter((e) => e.is_active));
    // else if (val === "InActive")
    //   setToggleData(data.filter((e) => !e.is_active));
    // else setToggleData(data.filter((e) => e));
  };
  return (
    <div className="Earnings teacherDashboardCard">
      <div className="header">
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <span>Earnings</span>
          <select
            className="select1"
            onChange={(e) => handleCategory(e)}
            defaultValue="All"
          >
            <option value="All">Last 30 days</option>
            <option value="Active">Last 60 days</option>
            <option value="InActive">Last 90 days</option>
          </select>
        </Stack>
      </div>
      <div className="detailRow">
        <div className="earningInfo">
          <div className="CardMainHeading">PKR{monthEarning}</div>
          <div className="ProfileCon">
            <Avatar alt="Remy Sharp" src="" className="avatar" />
            <div className="ProgressHeading">Earning</div>
          </div>
          <hr className="line" />
        </div>
        <div className="graph">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={earning}>
              <XAxis dataKey="month" stroke="" />
              <YAxis stroke="" />
              <Bar dataKey="amount" fill="#45DBC9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
