import axios from "./customize-axios";

const fetchAllRoom = (page) => {
  return axios.get(`/api/room`);
};
const fetchRoom = (index) => {
  return axios.get(`/api/room/${index}`);
};
const fetchRoomByDevice = (index) => {
  return axios.get(`/api/room/device?category_id=${index}`);
};
const fetchRoomByFeature = (index) => {
  return axios.get(`/api/room/device?category_id=${index}`);
};
export { fetchAllRoom, fetchRoom, fetchRoomByDevice, fetchRoomByFeature };
