import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const fetchCurrentUser = (id) => {
  return axios.get(`/api/renter/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const postForgetPassWord = (email) => {
  return axios.post(
    `/api/user/forgotpassword`,
    {
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const postResetPassWord = (email, token, newPassword) => {
  return axios.post(
    `/api/user/resetpassword`,
    {
      email,
      token,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const postCreateUser = (
  username,
  email,
  password
  //,  dob
) => {
  return axios.post(
    `/api/user/register`,
    {
      username: username,
      email: email,
      password: password,
      // date_of_birth: dob,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const postchecktoken = (email, tokenpass) => {
  return axios.post(
    "/api/user/checkresetpasswordtoken",
    {
      token: tokenpass,
      email: email,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const putChangePass = (passwordCurrent, password) => {
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
  return axios.put(
    `api/renter/${id}`,
    {
      name,
      dateOfBirth,
      address,
      phone,
      email,
      cccd,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
const loginApi = (username, password) => {
  // return axios.post(`/api/login`,{email,password});
  return axios.post(
    `/api/user/login`,
    { username, password },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
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
