import React from "react";
import { BsClock } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";
// import { RiFlag2Fill } from "react-icons/ri";
import CircularProgress from "@mui/material/CircularProgress";

const Summary = ({
  data,
  setShowModal,

  handleSetPaymentModal,
  isGroup,
  setIsGroup,
  activeOrderDetails,
  completeOrder,
  setRatingMode,
  loading,
}) => {
  const handleIsGroup = () => {
    setIsGroup(!isGroup);
  };
  return (
    <div className="ClassSummary">
      <div className="headerBtns">
        <button onClick={handleIsGroup} className="b1" disabled={isGroup}>
          standard
        </button>
        <button onClick={handleIsGroup} className="b2" disabled={!isGroup}>
          Premium
        </button>
      </div>
      <div className="summaryContent">
        {isGroup ? (
          <div className="content">
            <div className="heading">{data?.standard?.name}</div>
            <div className="detailCon">
              <div className="val">STANDARD</div>
              <div className="val">
                {data?.standard?.price} pkr / <span>Hour</span>
              </div>
            </div>
            <div className="Div">
              <div className="detailDiv">
                <div className="con1 con2">
                  <BsClock className="icon" />
                  <div className="label">
                    {data?.premium?.delivery} Day Deliver
                  </div>
                </div>
                <div className="con1">
                  <BsCheck2 className="icon" />
                  <div className="label">
                    {data?.noOfClasses} Number of lessons
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <button
                onClick={() => completeOrder(data?.standard?.price)}
                className="priceBtn"
              >
                <CircularProgress />
              </button>
            ) : !activeOrderDetails?.orderExist ? (
              <button
                onClick={() =>
                  handleSetPaymentModal(true, data?.standard?.price)
                }
                className="priceBtn"
              >
                Continue ({data?.standard?.price} pkr)
              </button>
            ) : activeOrderDetails.is_active &&
              !activeOrderDetails.is_rated &&
              !activeOrderDetails.is_completed ? (
              <button
                onClick={() => completeOrder(data?.standard?.price)}
                className="priceBtn"
              >
                Already In progress - Click to complete
              </button>
            ) : activeOrderDetails.is_active &&
              !activeOrderDetails.is_rated &&
              activeOrderDetails.is_completed &&
              !activeOrderDetails.is_completed_teacher ? (
              <button className="priceBtn">
                Waiting for teachers approval
              </button>
            ) : activeOrderDetails.is_completed &&
              !activeOrderDetails.is_rated &&
              activeOrderDetails.is_completed_teacher ? (
              <button onClick={() => setRatingMode(true)} className="priceBtn">
                Rate
              </button>
            ) : (
              <button
                onClick={() =>
                  handleSetPaymentModal(true, data?.standard?.price)
                }
                className="priceBtn"
              >
                Continue ({data?.standard?.price} pkr)
              </button>
            )}
            <button onClick={setShowModal} className="askBtn">
              Ask the instructor
            </button>
          </div>
        ) : (
          <div className="content">
            <div className="heading">{data?.premium?.name}</div>
            <div className="detailCon">
              <div className="val">PROFESSIONAL</div>
              <div className="val">
                {data?.premium?.price} pkr / <span>Hour</span>
              </div>
            </div>
            <div className="con1 con2">
              <BsClock className="icon" />
              <div className="label">{data?.premium?.delivery} Day Deliver</div>
            </div>

            <div className="con1">
              <BsCheck2 className="icon" />
              <div className="label">{data?.noOfClasses} Number of lessons</div>
            </div>
            {loading ? (
              <button
                onClick={() => completeOrder(data?.premium?.price)}
                className="priceBtn"
                disabled
              >
                <CircularProgress />
              </button>
            ) : !activeOrderDetails?.orderExist ? (
              <button
                onClick={() =>
                  handleSetPaymentModal(true, data?.standard?.price)
                }
                className="priceBtn"
              >
                Continue ({data?.standard?.price} pkr)
              </button>
            ) : activeOrderDetails.is_active &&
              !activeOrderDetails.is_rated &&
              !activeOrderDetails.is_completed &&
              !activeOrderDetails.is_completed_teacher ? (
              <button
                onClick={() => completeOrder(data?.premium?.price)}
                className="priceBtn"
              >
                Already In progress - Click to complete
              </button>
            ) : activeOrderDetails.is_active &&
              !activeOrderDetails.is_rated &&
              activeOrderDetails.is_completed &&
              !activeOrderDetails.is_completed_teacher ? (
              <button className="priceBtn">
                Waiting for Teacher's appproval
              </button>
            ) : activeOrderDetails.is_completed &&
              !activeOrderDetails.is_rated &&
              activeOrderDetails.is_completed_teacher ? (
              <button onClick={() => setRatingMode(true)} className="priceBtn">
                Rate
              </button>
            ) : (
              <button
                onClick={() =>
                  handleSetPaymentModal(true, data?.premium?.price)
                }
                className="priceBtn"
              >
                Continue ({data?.premium?.price} pkr)
              </button>
            )}

            <button onClick={setShowModal} className="askBtn">
              Ask the instructor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
