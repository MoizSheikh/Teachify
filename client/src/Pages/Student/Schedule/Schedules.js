import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { BsClock } from "react-icons/bs";
import { BsCalendar4Week } from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import axios from "axios";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useNavigate } from "react-router-dom";
import LoggedInNavStudent from "./../../Shared/Navs/LoggedInNavStudent";

export default function Schedules() {
  const [value, setValue] = useState(moment().format());
  const [selectedDate, setSelectedDate] = useState([]);
  const [selectedSch, setSelectedSch] = useState([]);
  const [allSch, setAllSch] = useState([]);

  const navigate = useNavigate();
  const handleRedirectMeeting = (e, link) => {
    e.preventDefault();
    window.open(`https://${link}`, "_blank");
  };

  const userDetails = useSelector(({ user }) => user.userDetails);
  const userId = userDetails.userData._id;

  useEffect(() => {
    axios.get(`/schedule/getbyStudent/${userId}`).then((data) => {
      if (data.data.success) {
        console.log(data.data);
        setAllSch(data.data.data);
        setSelectedSch([]);
      }
    });
  }, [userId]);
  useEffect(() => {
    console.log(moment(value).format("MMM Do YY"));
    if (allSch) {
      const _selectedDate = allSch.filter((obj) =>
        obj.timing.some(
          (time) => time.date === moment(value).format("MMM Do YY"),
        ),
      );
      console.log(_selectedDate);
      setSelectedDate(_selectedDate);
    }
  }, [value, allSch]);

  return (
    <div>
      {<LoggedInNavStudent status="schedule" />}
      <div className="schedules">
        <div className="LeftCon">
          <div className="heading">Schedules</div>
          <div className="DateContent">
            <div className="D1">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  showDaysOutsideCurrentMonth={true}
                  openTo="day"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="D2">
              <div className="innerCon">
                {selectedDate.length > 0 ? (
                  <>
                    {selectedDate?.map((el) => {
                      return (
                        <div
                          className="card1"
                          onClick={() => setSelectedSch(el)}
                        >
                          <div className="time">{el.start_time}</div>
                          <div className="realCon">
                            <div className="dotCon">
                              <div className="deatilCon">
                                <Avatar
                                  alt="Remy Sharp"
                                  src={el?.teacher_id?.img}
                                  className="avatar"
                                  sx={{ width: 50, height: 50 }}
                                />
                                <div className="nameCon">
                                  <div className="sideText">
                                    {el?.class_id?.title}
                                  </div>
                                </div>
                              </div>
                              <div className="innerDot">
                                <VscCircleFilled className="dotIcon" />
                                <VscCircleFilled className="dotIcon" />
                              </div>
                            </div>
                            <div className="TimeCon">
                              <BsClock className="icon" />
                              <div>
                                {
                                  el.timing?.find(
                                    (el) =>
                                      el.date ===
                                      moment(value).format("MMM Do YY"),
                                  )?.time
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="RightCon">
          <div className="RightContent">
            {selectedSch.length === 0 ? (
              <div className="noCardCon">
                <div className="conHeader">Choose a Schedule</div>
                <div className="conDetail">No schedule for class Today</div>
              </div>
            ) : (
              <>
                <div className="deatilCon">
                  <Avatar
                    alt="Remy Sharp"
                    src=""
                    className="avatar"
                    sx={{ width: 70, height: 70 }}
                  />
                  <div className="nameCon">
                    <div>{selectedSch?.teacher_id?.first_name ?? "name"}</div>
                  </div>
                </div>
                <div className="course">{selectedSch?.class_id?.title}</div>

                <div className="ExtraContent">
                  <div className="extraCon">
                    <BsCalendar4Week className="Eicon" />
                    <div className="detail">
                      <div className="Edate">
                        {
                          selectedSch?.timing?.find(
                            (el) =>
                              el.date === moment(value).format("MMM Do YY"),
                          )?.date
                        }
                      </div>
                      <div className="Edetail">Date</div>
                    </div>
                  </div>
                  <div className="extraCon">
                    <BsClock className="Eicon" />
                    <div className="detail">
                      <div className="Edate">
                        {
                          selectedSch?.timing?.find(
                            (el) =>
                              el.date === moment(value).format("MMM Do YY"),
                          )?.time
                        }
                      </div>
                      <div className="Edetail">Time</div>
                    </div>
                  </div>
                </div>
                <hr className="line" />
                <div className="ExtraBtn">
                  <Button
                    variant="contained"
                    className="joinBtn"
                    onClick={(e) =>
                      handleRedirectMeeting(e, selectedSch?.meeting_link)
                    }
                  >
                    Join The meeting
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
