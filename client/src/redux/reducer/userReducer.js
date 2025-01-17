import {
  SIGNUP_USER,
  LOGIN_USER,
  SET_CURRENT_USER,
  UPDATE_CURRENT_USER,
  LOGOUT_USER,
  UPDATE_USER,
} from "../action/userType";
import { getUserData, getUserLoggedIn } from "./../../Pages/Utils/Storage";

const initialState = {
  isLoggedIn: getUserLoggedIn() ?? false,
  user_id: "",
  role: getUserData()?.role ?? null,
  userDetails: getUserData(),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        msg: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        msg: action.payload,
        isLoggedIn: action.isLoggedIn,
        // isAdmin: action.isAdmin,
      };
    case SET_CURRENT_USER:
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return {
        ...state,
        userDetails: action.payload,
        isLoggedIn: true,
        user_id: action.payload?.userData?._id,
        role: action.payload.role,
      };
    case UPDATE_CURRENT_USER:
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      return {
        ...state,
        userDetails: action.payload,
        // user_id: action.payload.userData._id,
      };
    case LOGOUT_USER:
      localStorage.setItem("userData", JSON.stringify({}));
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      return {
        ...state,
        isLoggedIn: false,
        userDetails: {},
        user_id: "",
      };
    case UPDATE_USER:
      return {
        ...state,
        isLoggedIn: true,
        msg: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
