import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { BsFillStarFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";

const ReviewCard = ({ card }) => {
  console.log(card);
  return (
    <Link to={`/classview/${card?._id}`} className="searchCard reviewCard">
      <img src={card?.imgs[0]} alt={card?.imgs[0]} className="card-img" />
      <div className="content">
        <div className="teacherDetail">
          <Avatar
            alt="Remy Sharp"
            src={card?.teacher_id?.img}
            className="avatar"
            sizes={20}
          />
          <span>{card?.teacher_id?.first_name}</span>
        </div>
        <div className="description">{card?.title}</div>
        <div className="ratingCon">
          <div className="con1">
            <BsFillStarFill className="icon" color="yellow" />
            <div className="label">
              5.0<span>(23)</span>
            </div>
          </div>
          <div className="con2">
            <AiOutlineEye className="icon" />
            <div className="label">255</div>
          </div>
        </div>
        <div className="priceCon">
          <BiHeart className="icon" />
          <div className="con">
            <div className="label">Starting</div>
            <div>pkr {card?.individual?.price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
