import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const fetchCurrentUser = (id) => {
  return axios.get(`/api/renter/${id}`);
};
const postResetPassWord = (email) => {
  return axios.post(`/api/user/forgotpassword`, {
    email,
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
  postResetPassWord,
  fetchCurrentUser,
  postCreateUser,
  putUpdateUser,
  deleteUser,
  loginApi,
};
