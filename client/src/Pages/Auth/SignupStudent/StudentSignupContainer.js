/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VerificationWizard from "./VerificationWizard";
import SignupStudentModal from "./SignupStudentModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "redux/action/userAction";
import axios from "axios";

export const signupContext = React.createContext();

const initialData = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  language: "",
  university: "",
  start_date: "",
  end_date: "",
  email: "",
  password: "",
  password2: "",
  is_password: true,
};

function StudentSignupContainer(props) {
  const { data } = useParams();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState(initialData);
  //   const [tab, setTab] = useState(0);
  const [showModal, setShowModal] = useState(false); // change it back to false
  const navigate = useNavigate();
  const navigateToStudentDashboard = () => {
    navigate("/studentdashboard");
  };
  useEffect(() => {
    if (data) {
      const d = JSON.parse(decodeURIComponent(data));
      console.log(d);
      setCredentials({
        ...credentials,
        first_name: d.first_name,
        last_name: d.last_name,
        img: d?.img,
        email: d.email,
        _id: d._id,
        is_password: false,
      });
      if (!d.is_profile_completed) {
        setShowModal(true);
      } else {
        axios.get(`user/get/${d?._id}`).then((data) => {
          const res = data.data.data;

          const _data = {
            userData: {
              ...res,
            },
          };
          dispatch(setCurrentUser(_data));
          navigateToStudentDashboard();
        });
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  const signupContextValue = {
    credentials,
    setCredentials,
  };

  return (
    <>
      <signupContext.Provider value={signupContextValue}>
        {/* {signupPageContent()} */}
        <VerificationWizard />
      </signupContext.Provider>
      <SignupStudentModal _credentials={credentials} showModal={showModal} />
      {/* <VerificationWizard /> */}
    </>
  );
}

export default StudentSignupContainer;
