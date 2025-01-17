/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Avatar } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BsDot } from "react-icons/bs";
import Box from "@mui/material/Box";
import { HiOutlineCheckCircle } from "react-icons/hi";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};
const style1 = {
  textDecoration: "none",
  fontSize: "20px",
  color: "#5956E9",
  margin: "1rem 0",
  marginBottom: "2rem",
};

const icon = {
  fontSize: "150px",
  color: "#45DBC9",
  margin: "1rem 0",
};
const Detail = {
  fontSize: "35px",
  color: "#45DBC9",
};

const CustomDialog = withStyles({
  paper: {
    borderRadius: "15px",
    padding: "0",
    width: "60vw !important",
    minWidth: "60vw !important",
  },
})(Dialog);

const MessageDialogue = ({ setShowModal, showModal, data, userId }) => {
  const [tab, setTab] = useState(0);
  const [msg, setMsg] = useState("");
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    if (data.teacher_id?._id) {
      console.log(data.teacher_id?._id);
      // handleIsExist();
    }
  }, [data.teacher_id?._id]);

  const loginDetail = useSelector(({ user }) => user);

  const isLoggedIn = loginDetail.isLoggedIn;

  const handleSend = () => {
    isExist ? handleAddMsg() : handleAddContact();
  };
  const handleAddContact = () => {
    if (!isLoggedIn) {
      alert("Please login to continue");
    } else {
      const _data = {
        student_id: userId,
        teacher_id: data.teacher_id?._id,
        sender: "student",
        msg,
      };
      axios({
        url: `/chat/addchat`,
        method: "POST",
        data: _data,
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.data.success) {
          console.log("ohhgya");
          setTab(1);
        } else {
        }
      });
    }
  };

  const handleAddMsg = () => {
    if (!isLoggedIn) {
      alert("Please login to continue");
    } else {
      setMsg("");
      const _data = {
        sender_id: userId,
        reciever_id: data.teacher_id?._id,
        msg,
      };
      axios({
        url: `/chat/addmsg/${isExist}`,
        method: "PUT",
        data: _data,
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.data.success) {
          setTab(1);
        } else {
        }
      });
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <CustomDialog
      // fullScreen={fullScreen}
      open={showModal}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="signupStudentModal"
    >
      <DialogTitle
        id="responsive-dialog-title"
        style={{ padding: 0, margin: 0 }}
      >
        <div
          className="label"
          style={{ backgroundColor: tab === 0 ? "#ffe202" : "#45DBC9" }}
        >
          <div className="name">{tab === 0 ? "Send a message" : null}</div>
          <button
            onClick={handleClose}
            className="closeBtn"
            style={{ backgroundColor: tab === 0 ? "#ffe202" : "#45DBC9" }}
          >
            X
          </button>
        </div>
      </DialogTitle>
      {tab === 0 ? (
        <DialogContent style={{ padding: "0 1rem", height: "70vh" }}>
          <div className="content">
            <div className="Con1">
              <div className="InfoCon">
                <Avatar
                  alt="Remy Sharp"
                  src=""
                  className="avatar"
                  sx={{ width: 80, height: 80 }}
                />
                <div className="name">{data.teacher_id?.first_name}</div>
              </div>
              <div className="detailCon">
                <div className="header">Please include:</div>
                <div className="option">
                  <BsDot /> Project
                </div>
                <div className="option">
                  <BsDot /> Specific
                </div>
                <div className="option">
                  <BsDot /> Relevent files
                </div>
                <div className="option">
                  <BsDot /> Your budget
                </div>
              </div>
            </div>
            <div className="Con2">
              <div className="dataCon">
                <textarea
                  rows={5}
                  className="textarea"
                  onChange={(e) => setMsg(e.target.value)}
                />
              </div>
              <div className="Container">
                <button className="sendBtn" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent style={{ padding: "0 1rem", height: "70vh" }}>
          <Box sx={style} className="modal">
            <HiOutlineCheckCircle style={icon} />
            <div style={Detail}>Message Sent!</div>
            <a href="/studentChat" className="link" style={style1}>
              View Your Message
            </a>
          </Box>
        </DialogContent>
      )}
    </CustomDialog>
  );
};

export default MessageDialogue;
