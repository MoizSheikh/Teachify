import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../redux/slices/UserSlice"

function LoginPage(props) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [isStudent, setisStudent] = useState(true);

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  const handleLogin = () => {
  //   const loginThunk = isStudent ? loginUser : loginTeache;
  //   dispatch(loginThunk(credentials))
  //     .unwrap()
  //     .then((response) => {
  //       alert(response.message);
  //       if (response.success) {
  //         const role = isStudent ? "student" : "teacher";
  //         navigate(isStudent ? "/studentdashboard" : "/teacherdashboard");
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="SignupTeacher SignIn">
      <div className="patch1"></div>
      <div className="patch2"></div>
      <div className="patch3"></div>
      <div className="patch4"></div>
      <div className="mainHeading" onClick={() => navigate("/")}>
        <img
          style={{ width: "100px" }}
          className="Logoimage"
          src={"/ItsEasyLogo.png"}
          alt="logo"
        />
      </div>
      <hr className="line" />
      <div className="BackgroundCon">
        <div className="Form SignInForm">
          <h1>Sign In</h1>
          <div className="BtnCon">
            <button
              className="btn Lbtn"
              disabled={isStudent}
              onClick={() => setisStudent(true)}
            >
              Student
            </button>
            <button
              className="btn Tbtn"
              disabled={!isStudent}
              onClick={() => setisStudent(false)}
            >
              Teacher
            </button>
          </div>
          <TextField
            variant="outlined"
            placeholder="Email address or Phone"
            className="email"
            name="email"
            onChange={onChange}
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            className="password"
            type="password"
            onChange={onChange}
            name="password"
          />
          <Button variant="contained" className="btn1" onClick={handleLogin}>
            SignIn
          </Button>
          {/* <a href="/" className="Fpassword">
            Forgot Password?
          </a> */}

          <hr className="line2" />
          <button className="btn2" onClick={navigateToSignUp}>
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
