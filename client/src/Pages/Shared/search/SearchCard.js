import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { BsFillStarFill } from "react-icons/bs";

const SearchCard = ({ card }) => {
  return (
    <Link to={`/classview/${card._id}`} className="searchCard">
      <img src={card?.imgs[0]} alt={card?.imgs[0]} className="card-img" />
      <div className="content">
        <div className="teacherDetail">
          <Avatar
            alt="Remy Sharp"
            src={card?.teacher_id?.img}
            className="avatar"
            sizes={20}
          />
          <span>{card.teacher_id?.first_name}</span>
        </div>
        <div className="">{card?.title}</div>
        <div className="ratingCon">
          <div className="con1">
            <BsFillStarFill className="icon" color="yellow" />
            <div className="label">
              0.0<span>(0)</span>
            </div>
          </div>
        </div>
        <div className="priceCon">
          <div className="con">
            <div className="label">Starting</div>
            <div>pkr {card?.standard?.price}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
