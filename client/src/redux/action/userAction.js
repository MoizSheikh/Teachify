import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  UPDATE_USER,
  UPDATE_CURRENT_USER,
} from "./userType";
import setAuthenticationToken from "./setAuthenticationToken";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";
//import 'react-toastify/dist/ReactToastify.css';
const axios = require("axios");

// signup function
export const signupUser = (obj, e) => {
  e.preventDefault();

  // {toast.error("Please Specify all input fields") }
  return function (dispatch) {
    if (
      obj.username === "" ||
      obj.email === "" ||
      obj.password === "" ||
      obj.password2 === "" ||
      obj.mobile_no === "" ||
      obj.company_name === ""
    ) {
      toast.error("Please Specify all input fields");
      return;
    }

    var OPTIONS = {
      url: "/user/signup",
      method: "POST",
      data: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        //const message=res.data.message;
        if (res.data.success) {
          toast((t) => (
            <span>
              Acount created Successfully. Please login to continue &nbsp;
              &nbsp;
              <button onClick={() => toast.dismiss(t.id)}>OK</button>
            </span>
          ));
          //   toast.success(res.data.message);
          dispatch({
            type: SIGNUP_USER,
            payload: res.data.user,
          });

          window.location.href = "/login";
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
};

// login function
export const LoginUser = (obj, e) => {
  e.preventDefault();
  //const { addToast } = useToasts();
  return function (dispatch) {
    if (obj.username === "" || obj.password === "") {
      toast.error("Please Specify all input fields");
      return;
    }

    //addToast("Loading....", { appearance: 'info' });
    var OPTIONS = {
      url: "/user/login",
      method: "POST",
      data: {
        username: obj.username,
        password: obj.password,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const message = res.data.msg;

        if (res.data.success === true) {
          toast.success(res.data.message);
          const token = res.data.token;
          localStorage.setItem("token", token);
          setAuthenticationToken(token);
          // console.log(jwt.decode(token));
          dispatch(setCurrentUser(jwt.decode(token)));
          if (res.data.userData.is_admin) {
            dispatch({
              type: LOGIN_USER,
              payload: message,
              isLoggedIn: true,
              isAdmin: true,
            });
            window.location.href = "/dashboard";
          } else {
            dispatch({
              type: LOGIN_USER,
              payload: message,
              isLoggedIn: true,
            });
            window.location.href = "/";
          }

          //useToasts(res.data.message, { appearance: 'success' });
        } else {
          toast.error(res.data.message);

          //useToasts(res.data.message, { appearance: 'error' });
          dispatch({
            type: LOGIN_USER,
            payload: message,
            isLoggedIn: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        //toast.error("hello");
      });
  };
};

// setting the user type
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};
export const UpdateCurrentUser = (user) => {
  return {
    type: UPDATE_CURRENT_USER,
    payload: user,
  };
};

//logout function
export const logout = () => {
  return {
    type: LOGOUT_USER,
    payload: {},
  };
};
// //logout function
// export const logout = () => {
//   return function (dispatch) {
//     localStorage.removeItem("token");
//     setAuthenticationToken(false);
//     localStorage.clear();
//     // dispatch(setCurrentUser({}));

//     dispatch({
//       type: LOGOUT_USER,
//     });
//     // window.location.href = "/login";
//   };
// };

// function to update user profile
export const profileUpdate = (obj, e) => {
  e.preventDefault();
  return function (dispatch) {
    var OPTIONS = {
      url: `/user/edit/${obj.id}`,
      method: "PUT",
      data: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          toast.succces(res.data.message);
          //toast.error(res.data.message);
          dispatch({
            type: UPDATE_USER,
            payload: res.data.user,
          });

          window.location.href = "/profile";
        } else {
          toast.error(res.data.message);
          // toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err);
      });
  };
};

/*
function validate(obj){
  
}


*/
