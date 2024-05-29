import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/renter?page=${page}&limit=6`); // Sử dụng dấu nháy kép để bao quanh chuỗi
};

const fetchAllTro = (page) => {
  return axios.get(`/api/room?page=${page}&limit=6`); // Sử dụng dấu nháy kép để bao quanh chuỗi
};

const fetchAllTb = (page) => {
  return axios.get(`/api/device?page=${page}&limit=6`); // Sử dụng dấu nháy kép để bao quanh chuỗi
};

const fetchAllHoadon = (page) => {
  return axios.get(`/api/users?page=${page}`); // Sử dụng dấu nháy kép để bao quanh chuỗi
};
// const postCreateUser = (name, job) => {
//   return axios.post("/api/users", { name, job });
// };

const postCreateUser = (name, dateOfBirth, address, phone, email, cccd) => {
  const renterList = new FormData();
  renterList.append("name", name);
  renterList.append("dateOfBirth", dateOfBirth);
  renterList.append("address", address);
  renterList.append("phone", phone);
  renterList.append("email", email);
  renterList.append("cccd", cccd);

  return axios.post(
    `/api/renter`,
    { name, dateOfBirth, address, phone, email, cccd },
    renterList
  );
};

const postCreateTro = (
  roomNumber,
  description,
  price,
  roomStatus,
  roomArea
) => {
  const data = new FormData();
  data.append("roomNumber", roomNumber);
  data.append("descriptionr", description);
  data.append("price", price);
  data.append("roomStatus", roomStatus);
  data.append("roomArea", roomArea);
  return axios.post(
    `/api/room`,
    { roomNumber, description, price, roomStatus, roomArea },
    data
  );
};

const postCreateTb = (device_name, device_price) => {
  return axios.post("/api/users", { device_name, device_price });
};

const postCreateHoadon = (name, job) => {
  return axios.post("/api/users", { name, job });
};
const updateUser = (name, job) => {
  return axios.put(`/api/users/`, { name, job });
};
// const updateTro = ( roomNumber,description,price,roomStatus,roomArea,roomId) => {

//   console.log('check id',roomId)

//   return axios.put(`/api/room/${roomId}`, { roomId, roomNumber,description,price,roomStatus,roomArea});

// }
const updateTro = (roomId) => {
  return axios.put(`/api/room/${roomId}`);
};
const updateTb = (name, job) => {
  return axios.put(`/api/users/`, { name, job });
};

const updateHoadon = (name, job) => {
  return axios.put(`/api/users/`, { name, job });
};

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};
const deleteTro = (roomId) => {
  return axios.delete(`/api/room/${roomId}`);
};

const deleteTb = (id) => {
  return axios.delete(`/api/users/${id}`);
};

const deleteHoadon = (id) => {
  return axios.delete(`/api/users/${id}`);
};

export {
  fetchAllUser,
  postCreateUser,
  updateUser,
  fetchAllTro,
  updateTro,
  postCreateTro,
  deleteUser,
  deleteTro,
  fetchAllTb,
  postCreateTb,
  updateTb,
  deleteTb,
  fetchAllHoadon,
  updateHoadon,
  deleteHoadon,
  postCreateHoadon,
};
