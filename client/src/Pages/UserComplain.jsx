import UserSideBar from "../Components/UserSideBar";
import style from "../styles/UserHomePage.modules.scss";
import UserComplain1 from "../Components/UserComplain";

import { useState } from "react";
function UserComplain() {
  return (
    <div className="wrapper">
      <div className="main_container">
        <UserSideBar />
        <UserComplain1 className="UserInfo">123</UserComplain1>
      </div>
    </div>
  );
}

export default UserComplain;
