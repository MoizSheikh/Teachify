import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import Homepage from "./Shared/Homepage";
// import MainDashboard from "./Teacher/Dashboard/MainDashboard";
// import MainDashboardStudent from "./Student/Dashboard/MainDashboardStudent";
// import SignupTeacher from "./Auth/SignupTeacher/SignupWizardContainer";
// import StudentSignupContainer from "./Auth/SignupStudent/StudentSignupContainer";

// import LoginPage from "./Auth/LoginPage";
// import SignupPage from "./Auth/SignupTeacher/WizardJoinNow";
// import TeacherClasses from "./Teacher/ViewClass/TeacherClasses";
// import CreateClassContainer from "./Class/CreateClass/CreateClassContainer";
// import ClassView from "./Class/ViewClass/ClassView";
// import SearchedResults from "./Shared/search/SearchedResults";
// import Chat from "./Shared/Chat";
// import ChatStudent from "./Student/Chat/Chat";
// import Schedules from "./Teacher/Schedule/Schedules";
// import StudentSchedules from "./Student/Schedule/Schedules";

//All the routes for frontend have written here
const Container = (props) => {
  // const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);
  // const role = useSelector(({ user }) => user.userDetails?.role);
  // console.log(isLoggedIn);
  // console.log(role);

  return (
    <>
      <Routes>
        {/* All */}
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/home" element={<Homepage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signupstudent" element={<StudentSignupContainer />} />
        <Route path="/signupteacher" element={<SignupTeacher />} />

        <Route
          path="/teacherdashboard"
          element={
            isLoggedIn && role === "teacher" ? (
              <MainDashboard />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/teacherClasses"
          element={
            isLoggedIn && role === "teacher" ? (
              <TeacherClasses />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/addclass"
          element={
            isLoggedIn && role === "teacher" ? (
              <CreateClassContainer />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/chats"
          element={
            isLoggedIn && role === "teacher" ? (
              <Chat />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/schedules"
          element={
            isLoggedIn && role === "teacher" ? (
              <Schedules />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        /> */}

        {/* Student */}
        {/* <Route
          path="/studentdashboard"
          element={
            isLoggedIn && role === "student" ? (
              <MainDashboardStudent />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/searchResults/:searchVal"
          element={
            isLoggedIn && role === "student" ? (
              <SearchedResults />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/classview/:classId"
          element={
            isLoggedIn && role === "student" ? (
              <ClassView />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/studentChat"
          element={
            isLoggedIn && role === "student" ? (
              <ChatStudent />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/studentSchedules"
          element={
            isLoggedIn && role === "student" ? (
              <StudentSchedules />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        /> */}
      </Routes>
    </>
  );
};

export default Container;
