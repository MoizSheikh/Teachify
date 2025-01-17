/* eslint-disable default-case */
import React, { useState, useEffect } from "react";
import Wizard1 from "./Wizard1";
import Wizard2 from "./Wizard2";
import Wizard3 from "./Wizard3";
import Wizard4 from "./Wizard4";
import Wizard5 from "./Wizard5";
import Wizard6 from "./Wizard6";
import CreateClassNav from "../../Shared/Navs/CreateClassNav";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const classContext = React.createContext();
const steps = [
  "Overview",
  "Pricing",
  "Description & FAQ",
  "Requirments",
  "Gallery",
  "Publish",
];

const innerData = {
  name: "",
  description: "",
  delivery: "",
  price: "",
};
const initialData = {
  teacher_id: "",
  title: "",
  category: "",
  subCategory: "",
  searchTags: [],
  description: "",
  noOfClasses: "",
  standard: { ...innerData },
  premium: {
    ...innerData,
  },
  imgs: [],
};
const CreateClassContainer = () => {
  const userDetails = useSelector(({ user }) => user.userDetails);
  const userData = userDetails.userData;
  const { state } = useLocation();
  const _initialData = { ...initialData, teacher_id: userData._id };

  const [_isEdit, setIdEdit] = useState(false);
  const [classInfo, setClassInfo] = useState(_initialData);
  const [tab, setTab] = useState(0);
  const [classId, setClassId] = useState("");

  useEffect(() => {
    if (state) {
      const { editData, isEdit } = state;
      if (isEdit && editData) {
        setClassInfo({ ...editData });
        setIdEdit(isEdit);
      }
    }
  }, [state]);

  useEffect(() => {
    console.log(classInfo);
  }, [classInfo]);

  const handleData = (e) => {
    setClassInfo({ ...classInfo, [e.target.name]: e.target.value });
  };

  const ClassContextValue = {
    handleData,
    setTab,
    tab,
    steps,
    classInfo,
    setClassInfo,
    innerData,
    classId,
    setClassId,
    _isEdit,
  };

  const classPageContent = (tab) => {
    switch (tab) {
      case 0:
        return <Wizard1 />;
      case 1:
        return <Wizard2 />;
      case 2:
        return <Wizard3 />;
      case 4:
        return <Wizard5 />;
      case 5:
        return <Wizard6 />;
    }
  };
  return (
    <div className="createClassCon">
      <CreateClassNav tab={tab} />
      <classContext.Provider value={ClassContextValue}>
        {classPageContent(tab)}
      </classContext.Provider>
    </div>
  );
};

export default CreateClassContainer;
