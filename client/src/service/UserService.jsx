import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const fetchCurrentUser = (id) => {
  return axios.get(`/api/renter/${id}`);
};
const postForgetPassWord = (email) => {
  return axios.post(`/api/user/forgotpassword`, {
    email,
  });
};
const postResetPassWord = (email, token, newPassword) => {
  return axios.post(`/api/user/resetpassword`, {
    email,
    token,
    newPassword,
  });
};
const postCreateUser = (
  username,
  email,
  password
  //,  dob
) => {
  return axios.post(`/api/user/register`, {
    username: username,
    email: email,
    password: password,
    // date_of_birth: dob,
  });
};

const postchecktoken = (email, tokenpass) => {
  return axios.post("/api/user/checkresetpasswordtoken", {
    token: tokenpass,
    email: email,
  });
};

const putChangePass = (passwordCurrent, password) => {
  const accessToken = localStorage.getItem("accesstoken");
  console.log(accessToken);
  return axios.put(
    `/api/user/updatePassword`,
    {
      passwordCurrent,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const putUpdateUser = (id, name, dateOfBirth, address, phone, email, cccd) => {
  return axios.put(`api/renter/${id}`, {
    name,
    dateOfBirth,
    address,
    phone,
    email,
    cccd,
  });
};
const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`);
};
const loginApi = (username, password) => {
  // return axios.post(`/api/login`,{email,password});
  return axios.post(`/api/user/login`, { username, password });
};
export {
  fetchAllUser,
  postForgetPassWord,
  fetchCurrentUser,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  loginApi,
  postResetPassWord,
  putChangePass,
  postchecktoken,
};
