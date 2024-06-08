import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");

const getNotification = (id) => {
  return axios.get(`/api/notification/user/${id}`, {
    headers: {
      Authorization: `Bearer${accessToken}`,
    },
  });
};
export { getNotification };
