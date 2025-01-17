import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
// import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextareaAutosize } from "@mui/material";

const AddReview = ({ teacher_id, student_id, class_id, order_id }) => {
  const [ratingStar, setRatingStar] = useState(0);
  const [ratingMsg, setRatingMsg] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(0);
  };

  const [ratingConfirm, setRatingConfirm] = useState(false);

  const handleAddRating = () => {
    const _data = {
      ratingStar,
      ratingMsg,
      teacher_id,
      student_id,
      class_id,
    };
    axios({
      url: `/review/addReview/${order_id}`,
      method: "POST",
      data: _data,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      if (res.data.success) {
        const notif = {
          msg: "A user has Given a new review",
        };
        const _data = {
          user_id: teacher_id,
          class_id: class_id,
          order_id: order_id,
          notif,
        };
        axios({
          url: "/notification/addnotification",
          method: "POST",
          data: _data,
          headers: {
            "content-type": "application/json",
          },
        }).then((data) => {
          console.log(data);
          // setShowPaymentModal(false);
          // getStudentOrder();
        });
        setRatingConfirm(true);
      } else {
        alert(res.data.message);
      }
    });
  };

  if (ratingConfirm) {
    return (
      <div className="ThanksCon">
        <div className="patch1"></div>
        <div className="patch2"></div>
        <div className="patch3"></div>
        <div className="patch4"></div>
        <div className="patch5"></div>
        <div className="content">
          <img
            className="image"
            src={  "/Thanks.PNG"}
            alt="logo"
          />
          <div className="heading">Thank you!</div>
          <div className="detail">
            Making your voice heard allows us to improve Teachify.
          </div>
          <button className="doneBtn" onClick={handleNavigate}>
            Done
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="addReview">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="patch5"></div>
      <div className="heading">Give Feedback</div>
      <div className="deatil">How did teacher Do?</div>
      <div className="ratingsStar">
        <Rating
          name="simple-controlled"
          onChange={(_, newValue) => {
            setRatingStar(newValue);
          }}
          className="rating"
          value={ratingStar}
          precision={0.5}
        />
      </div>
      <div className="ratingMsg">
        <div className="label">Care to share more about the experience?</div>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={6}
          placeholder="Some Review"
          className="textarea"
          name="ratingMsg"
          onChange={(e) => setRatingMsg(e.target.value)}
        />
      </div>
      <button onClick={handleAddRating} className="publishBtn">
        Publish Feedback
      </button>
    </div>
  );
};

export default AddReview;
