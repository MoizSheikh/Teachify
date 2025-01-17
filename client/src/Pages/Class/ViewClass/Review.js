/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { Avatar } from "@mui/material";
import ReviewCard from "./ReviewCard";
import moment from "moment";

function TextMobileStepper({ sellerCourses }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const steps = sellerCourses;
  const maxSteps = steps?.length > 0 ? steps.length - 1 : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 0, margin: 0 }}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        className="RecommendedStepperBtnsBar"
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            className="OverviewSwipperBtn"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            className="OverviewSwipperBtn"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          overFlow: "hidden",
          bgcolor: "background.default",
          flexWrap: "wrap",
        }}
        className="RecommendedStepperImg"
      >
        {steps.length > 0 && (
          <>
            <ReviewCard card={steps[activeStep]} />
            <ReviewCard card={steps[activeStep + 1]} />
          </>
        )}
      </Paper>
    </Box>
  );
}
const Review = ({ data, classId }) => {
  const [sellerCourses, setSellerCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    axios.get(`/class/getbyteacher/${data.teacher_id._id}`).then((data) => {
      console.log(data);
      setSellerCourses(data.data.data);
    });

    axios.get(`/review/getbyClass/${classId}`).then((data) => {
      console.log(data);
      setReviews(data.data.data);
      const _data = data.data.data;
      const sum = _data.reduce((partialSum, a) => partialSum + a.ratingStar, 0);
      _data.length > 0 && setAvgRating(sum / _data.length);
    });
  }, []);

  return (
    <div className="classReview">
      {sellerCourses.length > 1 ? (
        <div className="recommand">
          <div className="recommendedHeader">Recommend For You</div>
          <div className="recommendedSwipper">
            <TextMobileStepper sellerCourses={sellerCourses} />
          </div>
        </div>
      ) : null}
      <div className="Rating">
        <div className="summerizedDetails">
          <div className="lineReviews">
            <div className="rate rates">
              {reviews?.length} Reviews
              <Rating
                name="simple-controlled"
                value={avgRating}
                precision={0.5}
                readOnly
              />
              <div className="value">{avgRating}</div>
            </div>
            <div className="rate first">
              5 Star
              <hr className="line" />(
              {reviews?.filter((e) => e.ratingStar === 5).length})
            </div>
            <span className="rate">
              4 Star
              <hr className="line" />(
              {
                reviews?.filter((e) => e.ratingStar >= 4 && e.ratingStar < 5)
                  .length
              }
              )
            </span>
            <span className="rate">
              3 Star
              <hr className="line" />(
              {
                reviews?.filter((e) => e.ratingStar >= 3 && e.ratingStar < 4)
                  .length
              }
              )
            </span>
            <span className="rate">
              2 Star
              <hr className="line" />(
              {
                reviews?.filter((e) => e.ratingStar >= 2 && e.ratingStar < 3)
                  .length
              }
              )
            </span>
            <span className="rate">
              1 Star
              <hr className="line" />(
              {
                reviews?.filter((e) => e.ratingStar >= 1 && e.ratingStar < 2)
                  .length
              }
              )
            </span>
          </div>
          <div className="sortRating">
            <div className="ratingSortSelect">
              <div className="label">Short by</div>
              <select className="select">
                <option>Most Recent</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div className="detail firstDetail">Rating Breakdown</div>
            <div className="detail">
              <div className="head">Seller Communication</div>
              <div className="icon">
                <BsFillStarFill /> {avgRating.toFixed(1)}
              </div>
            </div>
            <div className="detail">
              <div className="head">Recommended to a friend</div>
              <div className="icon">
                <BsFillStarFill /> {avgRating.toFixed(1)}
              </div>
            </div>
            <div className="detail">
              <div className="head">Service as descrive</div>
              <div className="icon">
                <BsFillStarFill /> {avgRating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>
        <div className="reviews">
          {reviews.length > 0 &&
            reviews.map((el, i) => {
              return (
                <div className="eachReview" key={i}>
                  <div className="detailCon">
                    <Avatar
                      alt="Remy Sharp"
                      src={el?.student_id?.img ?? ""}
                      className="avatar"
                      sx={{ width: 40, height: 40 }}
                    />
                    <div className="nameCon">
                      <div className="name">{el?.student_id?.first_name}</div>
                      <div className="icon">
                        <BsFillStarFill /> {el?.ratingStar}
                      </div>
                    </div>
                  </div>
                  <div className="description">{el?.ratingMsg}</div>
                  <div className="time">{moment(el?.createdAt).fromNow()}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Review;
