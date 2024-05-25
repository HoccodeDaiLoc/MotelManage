import React, { useState } from "react";
import { Link } from "react-router-dom";
import TableUsers from "./TableUsers";
import style from "../styles/UserSideBar.modules.scss";
const UserSideBar = () => {
  const [activeItem, setActiveItem] = useState("indexpage");
  const handleClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="UserSideBar_wrapper">
      <div className="UserSideBar_container">
        <div className="UserSideBar_Item">
          <Link
            to={"/user/Profile"}
            onClick={() => {
              handleClick("indexpage");
            }}
            className={`UserSideBar_Detail ${activeItem === "indexpage" ? "active" : ""}`}
          >
            <img
              src="https://www.svgrepo.com/show/452030/avatar-default.svg"
              className="icon"
              alt=""
            />

            <div
              className={`UserSideBar_text ${activeItem === "indexpage" ? "active" : ""}`}
            >
              Thông tin cá nhân
            </div>
          </Link>
        </div>
        <div className="UserSideBar_Item">
          <Link
            to={"/user/Room"}
            onClick={() => {
              handleClick("Room");
            }}
            className={`UserSideBar_Detail ${activeItem === "Room" ? "active" : ""}`}
          >
            <img
              src="https://www.svgrepo.com/show/254763/room-key-hotel.svg"
              className="icon"
              alt=""
            />
            <div
              className={`UserSideBar_text ${activeItem === "Room" ? "active" : ""}`}
            >
              Phòng của tôi
            </div>
          </Link>
        </div>
        <div className="UserSideBar_Item">
          <Link
            to={"/user/Complain"}
            onClick={() => {
              handleClick("Complain");
            }}
            className={`UserSideBar_Detail ${activeItem === "Complain" ? "active" : ""}`}
          >
            <img
              src="https://www.svgrepo.com/show/485961/system-customer-service-line.svg"
              className="icon"
              alt=""
            />
            <div
              className={`UserSideBar_text ${activeItem === "Complain" ? "active" : ""}`}
            >
              Phản ánh
            </div>
          </Link>
        </div>
        <div className="UserSideBar_Item">
          <Link
            to={"/user/Contract"}
            onClick={() => {
              handleClick("Contract");
            }}
            className={`UserSideBar_Detail ${activeItem === "Contract" ? "active" : ""}`}
          >
            <img
              src="https://www.svgrepo.com/show/486134/contract-view-line.svg"
              className="icon"
              alt=""
            />
            <div
              className={`UserSideBar_text ${activeItem === "Contract" ? "active" : ""}`}
            >
              Thông tin hợp đồng
            </div>
          </Link>
        </div>
        <div className="UserSideBar_Item">
          <div className="UserSideBar"></div>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
