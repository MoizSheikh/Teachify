/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState } from "react";
import Wizard1 from "./Wizard1";
import Wizard4 from "./Wizard4";
import Wizard5 from "./Wizard5";
import VerificationWizard from "./VerificationWizard";

import { useSelector } from "react-redux";
export const signupContext = React.createContext();

const initialData = {
  first_name: "",
  last_name: "",
  img: "",
  description: "",
  occupation: [],
  skills: [{ skillname: "", experience: "" }],
  education: [
    {
      edu_country: "",
      edu_college: "",
      edu_title: "",
      edu_year: "",
      edu_major: "",
    },
  ],
  certification: [{ cert_name: "", cert_from: "", cert_year: "" }],
  personalLink: "",
  email: "",
  password: "",
  password2: "",
};

function SignupPage(props) {
  const userDetails = useSelector(({ user }) => user?.userDetails);
  console.log(userDetails?.userData);

  const _initialData = {
    ...initialData,
    ...userDetails?.userData,
  };

  const [credentials, setCredentials] = useState(_initialData);
  const [tab, setTab] = useState(1);

  const handleCreds = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const steps = ["Personal info", "Professional"];

  const signupContextValue = {
    handleCreds,
    setTab,
    tab,
    steps,
    credentials,
    setCredentials,
  };

  const signupPageContent = (tab) => {
    switch (tab) {
      case 0:
        return <Wizard1 />;
      case 1:
        return <VerificationWizard />;
      case 3:
        return <Wizard4 />;
      case 4:
        return <Wizard5 />;
    }
  };

  return (
    <div className="SignupTeacherCon">
      <signupContext.Provider value={signupContextValue}>
        {signupPageContent(tab)}
      </signupContext.Provider>
    </div>
  );
}

export default SignupPage;
