import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink
            to={"/user/Profile"}
            onClick={() => {
              handleClick("indexpage");
            }}
            className={`UserSideBar_Detail `}
          >
            <img
              src="https://www.svgrepo.com/show/452030/avatar-default.svg"
              className="icon"
              alt=""
            />

            <div className={`UserSideBar_text `}>Thông tin cá nhân</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Room"}
            onClick={() => {
              handleClick("Room");
            }}
            className={`UserSideBar_Detail`}
          >
            <img
              src="https://www.svgrepo.com/show/254763/room-key-hotel.svg"
              className="icon"
              alt=""
            />
            <div className={`UserSideBar_text `}>Phòng của tôi</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/ChangePassword"}
            onClick={() => {
              handleClick("ChangePassword");
            }}
            className={`UserSideBar_Detail `}
          >
            <img
              src="https://www.svgrepo.com/show/445942/password-lock.svg"
              className="icon"
              alt=""
            />
            <div className={`UserSideBar_text`}>Thay đổi mật khẩu</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
            to={"/user/Complain"}
            onClick={() => {
              handleClick("Complain");
            }}
            className={`UserSideBar_Detail `}
          >
            <img
              src="https://www.svgrepo.com/show/485961/system-customer-service-line.svg"
              className="icon"
              alt=""
            />
            <div className={`UserSideBar_text`}>Phản ánh</div>
          </NavLink>
        </div>
        <div className="UserSideBar_Item">
          <NavLink
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
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
