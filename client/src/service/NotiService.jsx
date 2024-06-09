import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");

const getNotification = (id) => {
  return axios.get(`/api/notification/user/${id}`, {
    headers: {
      Authorization: `Bearer${accessToken}`,
    },
  });
};

const postNotification = (id, notiId) => {
  return axios.post(
    `/api/notification/user/${id}`,
    {
      notificationId: notiId,
    },
    {
      headers: {
        Authorization: `Bearer${accessToken}`,
      },
    }
  );
};

export { getNotification, postNotification };
