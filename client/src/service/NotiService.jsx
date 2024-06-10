import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");
const userid = localStorage.getItem("id");

const getNotification = (id) => {
  return axios.get(`/api/notification/user/${id}`, {
    headers: {
      Authorization: `Bearer${accessToken}`,
    },
  });
};

const postNotification = (id) => {
  return axios.post(
    `api/notification/changeread/${id}`,
    {
      userId: userid,
    },
    {
      headers: {
        Authorization: `Bearer${accessToken}`,
      },
    }
  );
};

export { getNotification, postNotification };
