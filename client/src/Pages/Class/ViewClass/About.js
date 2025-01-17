/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Rating from "@mui/material/Rating";
import { Avatar } from "@mui/material";

const About = ({ data, teacherReviewsLength, teacherAvgRating }) => {
  return (
    <div className="About">
      <div className="content">
        <div className="heading">About The Seller</div>
        <div className="InfoCon">
          <Avatar
            alt="Remy Sharp"
            src={data.teacher_id?.img}
            className="avatar"
            sx={{ width: 110, height: 110 }}
          />
          <div className="detailCon">
            <div className="name">{data?.teacher_id?.first_name}</div>
            <div className="ratingCon">
              <Rating
                name="simple-controlled"
                value={teacherAvgRating}
                precision={0.5}
                readOnly
              />
              <div className="val">
                {teacherAvgRating}
                <span>({teacherReviewsLength}Reviews)</span>
              </div>
            </div>
            <button className="CBtn">Contact</button>
          </div>
        </div>
        <div className="Con2">
          <div className="Con">
            <div className="con1">
              <div className="InnerCon">
                <div className="header">Avg Response</div>
                <div className="value">1 hour</div>
              </div>
              <div className="InnerCon">
                <div className="header">Last Delivery</div>
                <div className="value">4 Days</div>
              </div>
            </div>
          </div>
          <div className="description">{data?.teacher_id?.description}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
