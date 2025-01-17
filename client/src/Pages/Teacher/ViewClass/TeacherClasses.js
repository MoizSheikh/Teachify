/* eslint-disable react-hooks/exhaustive-deps */
//imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector } from "react-redux";
import TeacherNav from "Pages/Shared/Navs/LoggedInNavTeacher";

import { LinearProgress } from "@mui/material";
import moment from "moment";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { Avatar } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import Switch from "@mui/material/Switch";

//Each row for table
function Row(props) {
  const { row, handleDelete, handleEdit, handleChangeStatus } = props;
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const handleChange = (event, id) => {
    handleChangeStatus(id, event.target.checked);
  };

  const handleRowData = (id) => {
    setOpen(!open);

    if (!open) {
      axios.get(`/review/getbyClass/${id}`).then((data) => {
        console.log(data);
        setReviews(data.data.data);
        const _data = data.data.data;
        const sum = _data.reduce(
          (partialSum, a) => partialSum + a.ratingStar,
          0,
        );
        _data.length > 0 && setAvgRating(sum / _data.length);
      });
    }
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} className="row">
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleRowData(row._id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center" className="imgRow">
          <img src={row.imgs[0]} alt={row.imgs[0]} />
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.title}
        </TableCell>

        <TableCell align="center">{row.category}</TableCell>
        <TableCell align="center">{row.subCategory}</TableCell>
        <TableCell align="center">
          {row.is_active ? "active" : "Inactive"}
          <Switch
            checked={row.is_active}
            onChange={(e) => handleChange(e, row._id)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </TableCell>
        <TableCell align="center">
          <button onClick={(e) => handleEdit(e, row)} className="operationBtn">
            <MdOutlineEdit size={25} className="icon" />
          </button>
        </TableCell>
        <TableCell align="center">
          <button
            onClick={(e) => handleDelete(e, row._id)}
            className="operationBtn"
          >
            <RiDeleteBinLine size={25} className="icon" />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {/* <Box sx={{ margin: 1 }} className="OpenCon">
              <div className="con1"> */}
            <Box sx={{ margin: 1 }}>
              <div>
                <div className="heading">LATEST REVIEWS</div>
                {reviews.length > 0 &&
                  reviews.map((el) => {
                    return (
                      <div className="row">
                        <Avatar
                          alt=""
                          src={el?.student_id?.img}
                          className="avatar"
                        />
                        <div className="ReviewContent">
                          <div className="HeaderCon">
                            <div className="name">
                              {el?.student_id?.first_name}
                            </div>
                            <div className="rateCon">
                              <AiFillStar className="icon" />
                              <div className="value">{el?.ratingStar}</div>
                            </div>
                          </div>
                          <div className="review">{el?.ratingMsg}</div>
                          <div className="date">
                            {moment(el?.createdAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div></div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

//Each props for row for table
Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

//Main Function for my classes
export default function TeacherClasses() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDetails = useSelector(({ user }) => user.userDetails);
  const userId = userDetails.userData._id;
  useEffect(() => {
    axios.get(`/class/getbyteacher/${userId}`).then((data) => {
      setData(data.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (e, ind) => {
    axios.delete(`/class/delete/${ind}`).then((res) => {
      console.log(res);
      if (res.data.success) {
        axios.get(`/class/getbyteacher/${userId}`).then((data) => {
          console.log(data);
          setData(data.data);
          setLoading(false);
        });
      }
    });
  };

  const handleToggleData = (e) => {
    setToggle(e.target.value);
  };

  const handleChangeStatus = (ind, check) => {
    setLoading(true);
    const _data = {
      check,
    };
    axios({
      url: `/class/updateStatus/${ind}`,
      method: "PUT",
      data: _data,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.data.success) {
        axios.get(`/class/getbyteacher/${userId}`).then((data) => {
          console.log(data);
          setData(data.data.data);
          setLoading(false);
        });
      }
    });
  };
  const handleEdit = (e, data) => {
    navigate("/addclass", { state: { editData: data, isEdit: true } });
  };

  const navigateToadd = () => {
    navigate("/addclass");
  };

  return (
    <div style={{ width: "100%" }}>
      <TeacherNav status="service" />
      <div className="MyClassesCon" style={{ width: "100%" }}>
        <div className="patch1"></div>
        <div className="patch2"></div>
        <div className="patch3"></div>
        <div className="patch4"></div>
        <div className="headerDiv">
          <div className="heading">Your Servies</div>
          <button
            className="addClassBtn"
            disabled={userDetails.userData.is_payment_verified}
            onClick={navigateToadd}
          >
            <div className="con">
              <HiPlus className="BtnIcon" />
              <div>Add a New Class</div>
            </div>
          </button>
        </div>
        <div className="tableContainer">
          <div className="tableTop">
            <select className="select" onChange={handleToggleData}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {loading ? (
            <div className="">
              <Box sx={{ width: "100%" }}>
                Loading
                <LinearProgress size={"100%"} />
              </Box>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="title"></TableCell>
                    <TableCell align="center" className="title"></TableCell>
                    <TableCell align="left" className="title">
                      Title
                    </TableCell>
                    <TableCell align="center" className="title">
                      Category
                    </TableCell>
                    <TableCell align="center" className="title">
                      Subcategory
                    </TableCell>
                    <TableCell align="center" className="title">
                      Status
                    </TableCell>
                    <TableCell align="center" className="title">
                      Edit
                    </TableCell>
                    <TableCell align="center" className="title">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 &&
                    data
                      ?.filter((el) =>
                        toggle === "Active"
                          ? el.is_active
                          : toggle === "Inactive"
                            ? !el.is_active
                            : el,
                      )
                      .map((row, key) => (
                        <Row
                          key={key}
                          row={row}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          handleChangeStatus={handleChangeStatus}
                        />
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}
