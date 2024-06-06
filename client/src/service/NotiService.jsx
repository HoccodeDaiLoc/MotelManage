import axios from "./customize-axios";
const accessToken = localStorage.getItem("accesstoken");

const getNotification = (id) => {
  return axios.get(
    `/api/notifications/${id}`,

    {
      headers: {
        Authorization: `Bearer${accessToken}`,
      },
    }
  );
};
export { getNotification };
