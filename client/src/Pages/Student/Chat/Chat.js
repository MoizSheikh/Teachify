/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { RiSearchLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import LoggedInNavStudent from "./../../Shared/Navs/LoggedInNavStudent";
import Pusher from "pusher-js";

export default function Chat() {
  const userDetails = useSelector(({ user }) => user.userDetails);
  const student = userDetails.userData;
  const studentId = student._id;
  const [Input, setInput] = useState(false);
  const [msg, setMsg] = useState("");
  const [contacts, setContacts] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: "ap2",
    encrypted: true,
  });

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    // initialize Pusher with your app key and options

    // subscribe to the chat channel
    const channel = pusher.subscribe(
      `chat-${selectedContact?._id}-${studentId}`,
    );

    // bind to the new-message event
    channel.bind("new-message", (data) => {
      setMsgs([...msgs, data]);
      var objDiv = document.getElementById("parentDiv");
      objDiv.scrollTop = objDiv.scrollHeight;
      console.log(data);
    });

    // cleanup function to unsubscribe from the channel when the component unmounts
    return () => {
      channel.unbind("new-message");
      pusher.unsubscribe("chat");
    };
  }, [msgs]);

  const handleClickContact = (student) => {
    setSelectedContact(student);
    handleSelectedContact(student._id);
  };
  const handleSelectedContact = (id) => {
    axios.get(`/chat/getChats/${id}/${studentId}`).then((data) => {
      setMsgs(data.data.data);
    });
  };

  const getContacts = () => {
    axios.get(`/chat/getStudentContacts/${studentId}`).then((data) => {
      console.log(data.data.data);
      const _data = data.data.data;

      console.log(_data);
      setContacts(_data);
    });
  };

  const handleAddMsg = () => {
    setMsg("");
    const _data = {
      teacher_id: selectedContact?._id,
      student_id: studentId,
      sender: "student",
      msg,
    };
    axios({
      url: `/chat/addchat`,
      method: "POST",
      data: _data,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
      }
    });
  };

  const enterPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter");
      handleAddMsg();
    }
  };

  return (
    <div>
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>

      <LoggedInNavStudent status="inbox" />

      <div className="chats">
        <div className="content">
          <div className="UpperRightCon">
            <div className="heading">About</div>
            <div className="picCon">
              <Avatar
                alt="Remy Sharp"
                className="avatar"
                sx={{ width: 100, height: 100 }}
                src={selectedContact?.img}
              />
              <div className="name">{selectedContact?.first_name}</div>
            </div>
          </div>
          <div className="LeftCon">
            <div className="innerLeft">
              <div className="header">
                <div className="Lcon">
                  <button
                    className="searchBtn"
                    onClick={(e) => setInput(!Input)}
                  >
                    <RiSearchLine className="icon" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search Name"
                  className="input"
                  style={{ display: Input ? "unset" : "none" }}
                />
              </div>
              <div className="ProfileCon">
                {contacts.length > 0
                  ? contacts.map((el) => {
                      return (
                        <div
                          className="con"
                          onClick={() => handleClickContact(el?.teacher)}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src={el?.teacher?.img}
                            className="avatar"
                          />
                          <div className="DetailCon">
                            <div className="name">
                              {el?.teacher?.first_name}
                              {el?.teacher?.last_name}
                            </div>
                            <div className="msg">{el?.chat?.msg}</div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="innerRight">
              <div className="Rheader">
                <div className="headerContent">
                  <div className="name">
                    {selectedContact?.first_name ?? "name"}
                  </div>
                </div>
              </div>
              <div className="body">
                <div className="Msgcon" id="parentDiv">
                  {msgs.length > 0 ? (
                    msgs.map((el) => {
                      return (
                        <div className="eachMsg">
                          <Avatar
                            alt="Remy Sharp"
                            src={
                              el.sender === "teacher"
                                ? selectedContact?.img
                                : student?.img
                            }
                            className="avatar"
                          />
                          <div className="DetailCon">
                            <div className="name">
                              {el.sender === "teacher"
                                ? selectedContact?.first_name
                                : student?.first_name}
                              {el.sender === "teacher"
                                ? selectedContact?.last_name
                                : student?.last_name}
                            </div>
                            <div className="msg">{el?.msg}</div>
                            <div className="msg">
                              {moment(el?.createdAt).format(
                                "MMM Do YYYY, h:mm a",
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="eachMsg">No msg yet</div>
                  )}
                </div>
                <div className="sendCon">
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="textarea"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => enterPress(e)}
                  />
                  <button className="sendBtn" onClick={handleAddMsg}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="RightCon">
            <div className="heading">About</div>
            <div className="picCon">
              <Avatar
                alt="Remy Sharp"
                className="avatar"
                src={selectedContact?.img ?? ""}
                sx={{ width: 100, height: 100 }}
              />
              <div className="name">
                {selectedContact?.first_name ?? "name"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
