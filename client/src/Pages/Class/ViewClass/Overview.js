import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Avatar } from "@mui/material";

function TextMobileStepper({ data }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = data?.imgs ?? 0;
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
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
        }}
        className="classViewStepperImg"
      >
        <img
          className="Bigimg"
          alt={steps[activeStep]}
          src={steps[activeStep]}
        />
        <div className="imgPreviews">
          {steps.length > 0 &&
            steps?.map((el, ind) => {
              return activeStep === ind ? (
                <img className="activeimgpreview" alt={el} src={el} />
              ) : (
                <img className="" alt={el} src={el} />
              );
            })}
        </div>
      </Paper>
    </Box>
  );
}
const Overview = ({ data, teacherReviewsLength, teacherAvgRating }) => {
  return (
    <div className="classOverview">
      <div className="teacherInfo">
        <div className="teacherDetail con">
          <Avatar
            alt="Remy Sharp"
            src={data?.teacher_id?.img}
            className="avatar"
            sizes={20}
          />
          <div>{data?.teacher_id?.first_name}</div>
        </div>
        <div className="ratingCon con">
          <Rating
            name="simple-controlled"
            value={teacherAvgRating}
            precision={0.5}
            readOnly
          />
          <div className="value">
            {teacherAvgRating}
            <span className="span">({teacherReviewsLength})</span>
          </div>
        </div>
      </div>
      <div className="description">{data?.title}</div>
      <div className="imgSlider">
        <TextMobileStepper data={data} />
      </div>
      <div className="imgPreviews"></div>
      <div className="aboutCon">
        <div className="heading">About This Class</div>
        <div className="detail">{data?.description}</div>
      </div>
    </div>
  );
};

export default Overview;
