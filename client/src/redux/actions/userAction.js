import { toast } from "react-toastify";
import { loginApi, postCreateUser } from "../../service/UserService";
import { useDispatch } from "react-redux";

export const FETCH_USER_lOGIN = "FETCH_USER_lOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const POST_USER_REGISTER = "POST_USER_REGISTER";
export const POST_USER_ERROR = "POST_USER_ERROR";
export const POST_USER_SUCCESS = "POST_USER_SUCCESS";

export const USER_LOGOUT = "USER_LOGOUT";

export const handleLoginRedux = (username, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_USER_lOGIN });
    let res = await loginApi(username.trim(), password);
    if (res && res.accessToken && res.refeshToken) {
      console.log("ress cheking:", res);
      console.log("user: ", res.user);
      console.log("user name: ", res.user.username.trim());
      console.log("accesstokjen: ", res.accessToken);
      console.log("refreshtoken: ", res.refeshToken);
      console.log("id: ", res.user.id);
      localStorage.setItem("id", res.user.id);
      localStorage.setItem("user", res.user);
      localStorage.setItem("username", res.user.username.trim());
      localStorage.setItem("password", res.user.password);
      localStorage.setItem("accesstoken", res.accessToken);
      localStorage.setItem("refreshtoken", res.refeshToken);
      localStorage.setItem("isAdmin", res.user.isAdmin);
      dispatch({
        type: FETCH_USER_SUCCESS,
        data: {
          username: username.trim(),
          id: res.user.id,
          isAdmin: res.user.isAdmin,
          accessToken: res.accessToken,
          refreshToken: res.refeshToken,
          password: res.user.password,
        },
      });
      toast.success(FETCH_USER_SUCCESS, {
        position: "top-center",
      });
    } else {
      if (res && res.status === 400) {
        toast.error("không tìm thấy username và mật khẩu", {
          position: "top-center",
        });
      }
    }
  };
};

export const handleSignInRedux = (
  username,
  email,
  password
  // , dob
) => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_USER_REGISTER });
    let res = await postCreateUser(
      username,
      email,
      password
      // , dob
    );
    if (res) {
      console.log("ress cheking:", res);
      dispatch({
        type: POST_USER_SUCCESS,
        data: {
          username: username,
          // isAdmin: res.user.isAdmin,
          password: password,
          email: email,
          // dob: res.user.dob,
        },
      });
      toast.success(POST_USER_SUCCESS, {
        position: "top-center",
      });
    } else {
      if (res && res.status === 400) {
        toast.error("không tìm thấy username và mật khẩu", {
          position: "top-center",
        });
      }
    }
  };
};

export const handleLogoutRedux = () => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT,
    });
  };
};
