import { faL } from "@fortawesome/free-solid-svg-icons";
import {
  USER_LOGIN,
  USER_LOGOUT,
  FETCH_USER_lOGIN,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: {
    id: localStorage.getItem("id"),
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password"),
    isAdmin: localStorage.getItem("isAdmin"),
    auth: localStorage.getItem("accesstoken") === null ? null : true,
    accessToken: localStorage.getItem("accesstoken"),
    refreshToken: localStorage.getItem("refreshtoken"),
  },
  isLoading: false,
  isError: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_lOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        account: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    case FETCH_USER_SUCCESS:
      console.log("check action: ", action);
      return {
        ...state,
        account: {
          id: action.data.id,
          username: action.data.username,
          password: action.data.password,
          isAdmin: action.data.isAdmin,
          accessToken: action.data.accessToken,
          refreshToken: action.data.refreshToken,
          auth: true,
        },
        isLoading: false,
        isError: false,
      };
    case USER_LOGOUT:
      localStorage.removeItem("id");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("username");
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("password");
      localStorage.removeItem("isAdmin");
      return {
        ...state,
        account: {
          username: "",
          token: "",
          auth: false,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
