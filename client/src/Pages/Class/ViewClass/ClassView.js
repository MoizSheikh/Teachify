/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Summary from "./Summary";
import Overview from "./Overview";
import Description from "./Description";
import Review from "./Review";
import About from "./About";
import { useParams } from "react-router-dom";
import MessageDialogue from "./MessageDialogue";
import { useSelector } from "react-redux";
import StudentNavbar from "Pages/Shared/Navs/LoggedInNavStudent";
import AddReview from "./AddReview";

const selectedTabPage = (
  tab,
  data,
  classId,
  teacherReviews,
  teacherAvgRating,
) => {
  switch (tab) {
    case 0:
      return (
        <Overview
          data={data}
          teacherReviewsLength={teacherReviews?.length}
          teacherAvgRating={teacherAvgRating}
        />
      );
    case 1:
      return <Description description={data?.description} />;
    case 2:
      return (
        <About
          data={data}
          teacherReviewsLength={teacherReviews?.length}
          teacherAvgRating={teacherAvgRating}
        />
      );
    case 3:
      return <Review data={data} classId={classId} />;
    default:
      <></>;
  }
};

const ClassView = () => {
  const { classId } = useParams();
  const userDetails = useSelector(({ user }) => user.userDetails);

  const [ratingMode, setRatingMode] = useState(false);
  const [tabValue, setTablValue] = useState(0);
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isGroup, setIsGroup] = useState(true);
  const [activeOrderDetails, setActiveOrderDetails] = useState({
    orderExist: false,
  });
  const [teacherReviews, setReviews] = useState([]);
  const [teacherAvgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const userId = userDetails?.userData?._id;

  useEffect(() => {
    // updateClicks();
    handleData();
    getStudentOrder();
  }, []);

  useEffect(() => {
    console.log(data);
    if (data?.teacher_id) {
      axios
        .get(`/review/getbyteacher/${data?.teacher_id?._id}`)
        .then((data) => {
          console.log(data);
          setReviews(data.data.data);
          const _data = data.data.data;
          const sum = _data.reduce(
            (partialSum, a) => partialSum + a.ratingStar,
            0,
          );
          console.log(sum);
          const _avg = _data.length > 0 ? (sum / _data.length).toFixed(1) : 0;
          console.log(_avg);
          setAvgRating(_avg);
        });
    }
  }, [data]);

  const handleData = async () => {
    axios.get(`/class/get/${classId}`).then((data) => {
      console.log(data);
      setData(data.data.data);
    });
  };
  const loginDetail = useSelector(({ user }) => user);

  const isLoggedIn = loginDetail.isLoggedIn;
  const getStudentOrder = () => {
    axios.get(`/order/getEachStudent/${userId}/${classId}`).then((data) => {
      console.log(data.data.data);
      const _data = data.data.data;
      setActiveOrderDetails({ ..._data, orderExist: true });
      setLoading(false);
    });
  };

  const completeOrder = (price) => {
    const _data = {
      id: activeOrderDetails._id,
    };

    console.log(_data);
    axios({
      url: "/order/completeOrder",
      method: "PUT",
      data: _data,
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      getStudentOrder();
      console.log(data);
    });
  };
  const startOrder = (_data) => {
    console.log(_data);
    axios({
      url: "/order/addorder",
      method: "POST",
      data: _data,
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      console.log(data);
      const notif = {
        msg: "Order has Created",
      };
      const _data = {
        user_id: userId,
        class_id: classId,
        order_id: data.data.data._id,
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
        handleData();
        getStudentOrder();
      });
    });
  };

  const handleSetPaymentModal = (check, price) => {
    if (!isLoggedIn) {
      alert("Please login to continue");
    } else {
      setLoading(true);
      const _data = {
        teacher_id: data?.teacher_id._id,
        student_id: userId,
        class_id: classId,
        class_subtype: isGroup ? "premium" : "standard",
        status: isGroup ? "premium" : "standard",
        total_price: Number(price),
        noOfClasses: data?.noOfClasses ?? 1,
      };

      startOrder(_data);
    }
  };

  const handleChange = (_, newValue) => {
    setTablValue(newValue);
  };

  if (ratingMode) {
    return (
      <AddReview
        teacher_id={data?.teacher_id._id}
        student_id={userId}
        class_id={classId}
        order_id={activeOrderDetails._id}
      />
    );
  }
  return (
    <div style={{ width: "100vw" }}>
      {<StudentNavbar />}

      <div className="ClassView">
        <div className="eachClassNav">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="disabled tabs example"
            className="tabs"
          >
            <Tab label="Overview" className="tab" />
            <Tab label="Description" className="tab" />
            <Tab label="About" className="tab" />
            <Tab label="Review" className="tab" />
          </Tabs>
        </div>
        <div className="mainContent">
          <div className="changingTab">
            {selectedTabPage(
              tabValue,
              data,
              classId,
              teacherReviews,
              teacherAvgRating,
            )}
          </div>
          <div className="sideSummary">
            <Summary
              data={data}
              setShowModal={setShowModal}
              startOrder={startOrder}
              handleSetPaymentModal={handleSetPaymentModal}
              setIsGroup={setIsGroup}
              isGroup={isGroup}
              activeOrderDetails={activeOrderDetails}
              completeOrder={completeOrder}
              setRatingMode={setRatingMode}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <MessageDialogue
        showModal={showModal}
        data={data}
        userId={userId}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default ClassView;
