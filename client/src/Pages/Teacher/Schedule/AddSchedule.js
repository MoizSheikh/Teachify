/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import Switch from "@mui/material/Switch";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const AddSchedule = ({ setIsAdd }) => {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState("");
  const [link, setLink] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersArray, setOrdersArray] = useState([]);
  const [timingArray, setTimingArray] = useState([]);
  const [weekdays, setWeekDays] = useState([]);
  const [weeklyTime, setWeeklyTime] = useState(moment());
  const [autoTimings, setAutoTimings] = useState([]);
  const [isManual, setIsManual] = useState(true);
  const [numberOfOrders, setNumberOfOrders] = useState(5);
  const userDetails = useSelector(({ user }) => user.userDetails);
  const userId = userDetails.userData._id;

  const handleWeekDay = (checked, num) => {
    console.log(checked);
    console.log(num);
    const _date = moment()
      .startOf("isoWeek")
      .add(1, "week")
      .add(num, "day")
      .format("MMM Do YY");

    const _arr = weekdays;
    if (checked) {
      _arr.push(_date);
      setWeekDays(_arr);
      handleAutomaticDates();
    } else {
      const index = _arr.indexOf(_date);
      if (index > -1) {
        _arr.splice(index, 1);
      }

      console.log(_arr);
      setWeekDays(_arr);
      handleAutomaticDates();
      // }
    }
  };

  const handleAutomaticDates = () => {
    const repetition = (numberOfOrders / weekdays.length).toFixed(0);
    const reminder = numberOfOrders % weekdays.length;
    console.log(repetition);
    console.log(reminder);

    let _timings = [...weekdays];

    for (let i = 0; i < weekdays.length; i++) {
      for (let j = 1; j <= repetition; j++) {
        const _date = moment(weekdays[i], "MMM Do YY")
          .add(j, "week")
          .format("MMM Do YY");

        _timings.push(_date);
      }
    }
    _timings.sort((a, b) => {
      const dateA = moment(a, "MMM Do YY");
      const dateB = moment(b, "MMM Do YY");
      return dateA - dateB;
    });
    console.log(_timings);
    _timings = _timings.slice(0, numberOfOrders);
    console.log(_timings);
    setAutoTimings(_timings);
  };
  const handleDateChange = (newValue, index) => {
    const _date = moment(newValue).format("MMM Do YY");
    const _time = moment(newValue).format("h:mm a");
    const obj = {
      date: _date,
      time: _time,
    };
    const arr = ordersArray;
    arr[index] = obj;
    setOrdersArray(arr);
    const arr1 = timingArray;
    const ans = moment(newValue).format();
    console.log(ans);
    arr1[index] = moment(newValue).format();
    setTimingArray(arr1);
  };

  const handleOrder = (id) => {
    console.log(id);
    if (orders) {
      const _selectedOrder = orders.find((el) => el._id === id);
      console.log(_selectedOrder);
      setOrder(id);
      setSelectedOrder(_selectedOrder);
      setNumberOfOrders(_selectedOrder.noOfClasses);
    }
  };

  const handleAdd = () => {
    let _timings = ordersArray;
    if (!isManual) {
      _timings = autoTimings.map((el) => {
        return {
          date: el,
          time: weeklyTime.format("h:mm a"),
        };
      });
    }
    let schData = {
      teacher_id: userId,
      student_id: selectedOrder?.student_id,
      class_id: selectedOrder?.class_id?._id,
      order_id: selectedOrder?._id,
      timing: _timings,
      meeting_link: link,
    };

    axios({
      url: "/schedule/addschedule",
      method: "POST",
      data: schData,
      headers: {
        "content-type": "application/json",
      },
    }).then((data) => {
      console.log(data);
      axios({
        url: `/order/updateOrder/${selectedOrder._id}`,
        method: "PUT",
        data: { isScheduled: true },
        headers: {
          "content-type": "application/json",
        },
      }).then((data) => {
        console.log(data);

        setIsAdd(false);
      });
    });
  };

  useEffect(() => {
    axios.get(`/order/getbyteacher/${userId}`).then((data) => {
      console.log(data);
      const _data = data.data.data.filter(
        (el) => el.is_active && !el.isScheduled,
      );
      setOrders(_data);
      if (_data.length) handleOrder(_data[0]._id);
    });
  }, [userId]);

  useEffect(() => {
    if (selectedOrder) {
      const ordersArray = [];
      const _timingsArray = [];
      for (let i = 0; i < selectedOrder.noOfClasses; i++) {
        ordersArray.push({
          date: moment().format("MMM Do YY"),
          time: moment().format("h:mm a"),
        });
        _timingsArray.push(moment().format());
      }
      setOrdersArray(ordersArray);
      setTimingArray(_timingsArray);
    }
  }, [selectedOrder]);
  return (
    <div className="addSchedule">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="patch5"></div>
      <div className="ScheduleContent">
        <div className="heading">Add Schedule</div>
        <div className="formContent">
          <div className="classData">
            <div className="selectCon">
              <div className="label">Choose Order</div>
              <select
                name="order"
                id="order"
                className="select"
                value={order}
                onChange={(e) => handleOrder(e.target.value)}
              >
                <option value="">{"Choose Order"}</option>
                {orders?.length > 0 &&
                  orders?.map((el) => {
                    return (
                      <>
                        <option value={el?._id}>{el?.class_id?.title}</option>
                      </>
                    );
                  })}
              </select>
            </div>
            <div className="linkCon">
              <div className="label">Meeting Link</div>
              <input
                type="text"
                name="meetinglink"
                placeholder="Meeting Link"
                className="input"
                id=""
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
          </div>
          {selectedOrder ? (
            <>
              <label htmlFor="manual">
                {isManual ? "Manual" : "Automatic"}
              </label>
              <Switch
                checked={isManual}
                onChange={() => setIsManual((prev) => !prev)}
                inputProps={{ "aria-label": "controlled" }}
              />

              {!isManual ? (
                <>
                  <div className="daysBoxes">
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <TimePicker
                        label="Time picker"
                        value={weeklyTime}
                        onChange={(newValue) => setWeeklyTime(newValue)}
                        className="input"
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {days.map((el, index) => (
                      <div className="innerDay">
                        <label htmlFor={el}>{el}</label>
                        <input
                          type="checkbox"
                          disabled={weekdays === numberOfOrders}
                          name={el}
                          id={el}
                          onClick={(e) =>
                            handleWeekDay(e.target.checked, index)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                selectedOrder &&
                ordersArray.map((el, index) => (
                  <>
                    <h3>Class No {index + 1}</h3>
                    <div className="TimeCon">
                      <div className="label"> Date and time</div>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                          label="Date&Time picker"
                          value={timingArray[index]}
                          onChange={(newValue) =>
                            handleDateChange(newValue, index)
                          }
                          className="input"
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </>
                ))
              )}
            </>
          ) : (
            <></>
          )}

          <Button variant="contained" onClick={handleAdd} className="addBtn">
            add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
