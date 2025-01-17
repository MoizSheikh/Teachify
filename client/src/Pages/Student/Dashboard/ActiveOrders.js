/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import moment from "moment";

export default function ActiveOrders({ userData }) {
  const id = userData?._id;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [toggleData, setToggleData] = useState([]);
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios.get(`/order/getbystudent/${id}`).then((data) => {
      console.log(data);

      const _data = data.data.data.map((el) => {
        const _obj = {
          ...el,
          cost:
            el?.status === "standard"
              ? parseInt(el?.class_id?.standard?.price)
              : parseInt(el?.class_id?.premium?.price),
        };
        return _obj;
      });
      const sum = _data.reduce((partialSum, a) => partialSum + a.cost, 0);

      setData(_data);
      setToggleData(_data);
      setSum(sum);
      setLoading(false);
    });
  };

  const handleCategory = (event) => {
    console.log(event.target.value);
    const val = event.target.value;
    let _data = [];
    if (val === "Active") _data = data.filter((e) => e.is_active);
    else if (val === "InActive") _data = data.filter((e) => !e.is_active);
    else _data = data.filter((e) => e);

    setToggleData(_data);
    const sum = _data.reduce((partialSum, a) => partialSum + a.cost, 0);
    setSum(sum);
  };

  const navigateToClass = (id) => {
    navigate(`/classview/${id}`);
  };

  if (loading) {
    return (
      <div className="activeOrder teacherDashboardCard">
        <Box sx={{ width: "100%" }}>
          Loading
          <LinearProgress size={"100%"} />
        </Box>
      </div>
    );
  }

  return (
    <div className="activeOrder teacherDashboardCard w-full">
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <span>
          Active Orders- {toggleData?.length} (pkr{sum})
        </span>
        <select
          className="select1"
          onChange={(e) => handleCategory(e)}
          defaultValue="All"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="InActive">Inactive</option>
        </select>
      </Stack>
      <hr className="line" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>Course</TableCell>
              <TableCell style={{ fontWeight: "bolder", width: "20px" }}>
                OrderID
              </TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>Due Date</TableCell>
              {/* <TableCell style={{ fontWeight: "bolder" }}>Note</TableCell> */}
              <TableCell style={{ fontWeight: "bolder" }}>Cost</TableCell>
              <TableCell style={{ fontWeight: "bolder" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toggleData.length > 0 &&
              toggleData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => navigateToClass(row?.class_id._id)}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={row?.class_id?.imgs[0]}
                      alt=""
                      style={{
                        width: "60px",
                        borderRadius: "10px",
                        height: "50px",
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row?.class_id?.title}
                  </TableCell>
                  <TableCell align="left">{row?._id}</TableCell>
                  <TableCell align="left">
                    {" "}
                    {row?.status === "group"
                      ? moment(row?.createdAt)
                          .add(row?.class_id?.group?.delivery, "days")
                          .format("MMM Do YY")
                      : moment(row?.createdAt)
                          .add(row?.class_id?.individual?.delivery, "days")
                          .format("MMM Do YY")}
                  </TableCell>
                  {/* <TableCell align="left">{row?.note}</TableCell> */}
                  <TableCell align="left">{row?.total_price}pkr</TableCell>
                  <TableCell align="left">
                    {row?.isScheduled ? "Scheduled" : "Not Scheduled"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
