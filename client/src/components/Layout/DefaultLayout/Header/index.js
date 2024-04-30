import React, { useEffect, useRef, useState } from "react";
import style from "../Header/HeaderStyle.modules.scss";
import { Form, Link } from "react-router-dom";
import SideBar from "../SideBar";

function Header() {
  const [Noti, setNoti] = useState(false);
  const [Sign, setSign] = useState(false);

  const Notification = () => {
    return (
      <div className="noti_info">
        <p>BLANNKLKKKKKKK</p>
      </div>
    );
  };
  const SignIn = () => {
    return (
      <div className="signIn_info">
        <p>BLANNKLKKKKKKK</p>
      </div>
    );
  };

  // let handle_noti=()=>{
  //     console.log("handle is working")
  //     setNoti(true);
  // }
  // const notiRef = useRef(null);
  // const clickOutside=(notiRef)=>{
  //     useEffect(()=>{
  //         const handleClickOutside=(event)=>{
  //             if(notiRef.current&& !notiRef.current.contains(event.target)){
  //                 setNoti(false)
  //             }
  //         }
  //         document.addEventListener("mousedown",handleClickOutside)
  //         return()=>{
  //             document.addEventListener("mousedown",handleClickOutside)
  //         }
  //     },[notiRef]);
  // }

  return (
    <div className="header">
      <div className="nav_left">
        <Link to="/">
          <img
            className="logo"
            src="https://moewalls.com/wp-content/uploads/2023/10/cat-swimming-in-the-water-thumb.jpg"
            alt="logo"
          ></img>
        </Link>
        <form>
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
      </div>
      <div className="nav_right">
        <button className="noti">
          {/* onclick                     */}
          <span className="icon_text">Thông báo</span>
          <img
            className="icon_header"
            src="https://www.svgrepo.com/show/513140/bell.svg"
            alt="help me nick"
          ></img>
          {Noti && <Notification></Notification>}
        </button>
        <Link className="support" to="Support">
          <span className="icon_text">Hỗ trợ</span>
          <img
            className="icon_header"
            src="https://www.svgrepo.com/show/325523/question-mark-circle.svg"
            alt="?"
          ></img>
        </Link>
        <button className="sign">
          {/* onclick                     */}
          <span className="icon_text"></span>
          <img
            className="icon_header"
            src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg"
            alt="help me nick"
          ></img>
          {Sign && <SignIn></SignIn>}
        </button>
      </div>
    </div>
  );
}
// https://www.svgrepo.com/show/355933/user-circle.svg
export default Header;
