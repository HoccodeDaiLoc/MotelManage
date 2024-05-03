import React, { useState } from "react";
import style from "../styles/Header.modules.scss";
import { Form, Link } from "react-router-dom";
function Header() {
  return (
    <div className="header_container">
      <div className="header">
        <div className="nav_left">
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Veolia-energy-logo.svg"
              alt="logo"
            ></img>
          </Link>
        </div>

        <form className="search_form">
          <div className="search_container">
            <input
              className="search_input"
              type="text"
              placeholder="Tìm kiếm..."
            />
            <img
              className="search_icon"
              src="https://www.svgrepo.com/show/522443/search.svg"
            ></img>
          </div>
        </form>

        <div className="nav_right">
          <Link to={"Notification"} className="nav_right_item">
            <span className="icon_text">Thông báo</span>
            <span className="icon_container">
              <img
                className="icon"
                src="https://www.svgrepo.com/show/513140/bell.svg"
                alt="help me nick"
              ></img>
            </span>
          </Link>

          <Link className="nav_right_item" to="Support">
            <span className="icon_text">Hỗ trợ</span>
            <span className="icon_container">
              <img
                className="icon"
                src="https://www.svgrepo.com/show/325523/question-mark-circle.svg"
                alt="?"
              ></img>
            </span>
          </Link>

          <Link to={"/Sign"} className="nav_right_item">
            <span className="icon_text"> Đăng nhập</span>
            <span className="icon_container">
              <img
                className="icon"
                src="https://www.svgrepo.com/show/325523/question-mark-circle.svg"
                alt="?"
              ></img>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
// https://www.svgrepo.com/show/355933/user-circle.svg
export default Header;
