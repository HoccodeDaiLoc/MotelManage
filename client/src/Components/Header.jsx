import React, { useState, useEffect } from "react";
import style from "../styles/Header.modules.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";
import ava from "../asset/image/ava.svg";
import bell from "../asset/image/bell.svg";
import imagethuetro from "../asset/image/imagethuetro.png";
import login from "../asset/image/login.svg";
import logout from "../asset/image/logout.svg";
import person from "../asset/image/person.svg";
import taolaadminne from "../asset/image/dog.jpg";
import { getNotification } from "../service/NotiService";
import { fetchCurrentUser } from "../service/UserService";
import LazyLoad from "react-lazy-load";

function Header({ socket }) {
  const [notifications, setNotification] = useState([]);
  const user = useSelector((state) => state.user.account);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  const id = useSelector((state) => state.user.account.renterId);
  const [avatarLink, setAvatarLink] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  useEffect(() => {
    const getCurrentUser = async (id) => {
      let res = await fetchCurrentUser(id);
      setAvatarLink(localStorage.getItem("avatar"));
    };
    getCurrentUser(id);
  }, [localStorage.getItem("avatar")]);

  useEffect(() => {
    const getNoti = async (id) => {
      let res = await getNotification(id);
      setNotification(res.data);
    };
    getNoti(id);
    if (socket) {
      socket.on("notification", (data) => {
        setNotification((prev) => [...prev, data]);
      });
    }
  }, [id, socket]);

  function truncateString(text) {
    if (text.length > 60) {
      return text.slice(0, 60) + "...";
    } else {
      return text;
    }
  }
  return (
    <div className="header_container">
      <div
        className="header"
        onClick={() => {
          // handleclick();
        }}
      >
        <div className="nav_left">
          {isAdmin === true ? (
            <Link to="/Home">
              <img className="logo" src={imagethuetro} alt="logo"></img>
            </Link>
          ) : (
            <Link to="/">
              <img className="logo" src={imagethuetro} alt="logo"></img>
            </Link>
          )}
        </div>
        <div className="nav_right">
          <div className="nav_right_item">
            <span
              className="icon_container"
              onClick={() => {
                setShow1(!show1);
                setShow(false);
              }}
            >
              <img className="icon" src={bell} alt="help me nick"></img>
              {show1 ? (
                <div
                  className="modal_user_container_noti"
                  tabIndex={-1}
                  role="dialog"
                >
                  <div className="modal_noti">
                    {console.log("mynoti", notifications)}
                    {notifications.length === 0 ||
                    notifications.status === "error" ||
                    notifications.status === "fail" ||
                    notifications === undefined ||
                    notifications === null
                      ? "Bạn chưa có thông báo mới"
                      : notifications.reverse().map((noti) => (
                          <LazyLoad
                            key={noti.notificationId}
                            offset={5}
                            threshold={0.5}
                          >
                            <div
                              key={noti.notificationId}
                              className="modal_part_noti"
                            >
                              <div className="modal_icon_container">
                                <img
                                  srcSet={taolaadminne}
                                  style={{ borderRadius: "50%" }}
                                  alt=""
                                  className="modal_icon"
                                />
                              </div>
                              <div className="Notification">
                                <h6>{noti.title}</h6>
                                <p style={{ margin: "0px" }}>
                                  {truncateString(noti.content)}
                                </p>
                                <span>
                                  Ngày tạo: {noti.dateCreated.slice(0, 10)}
                                </span>
                              </div>
                            </div>
                          </LazyLoad>
                        ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </span>
          </div>

          <div className="nav_right_item">
            <span
              className="icon_container"
              onClick={() => {
                setShow(!show);
                setShow1(false);
              }}
            >
              <img
                style={{ borderRadius: "50%" }}
                className="icon user"
                src={
                  id === undefined || id === null || id === ""
                    ? ava
                    : avatarLink
                }
                srcSet={
                  avatarLink === null ||
                  avatarLink === null ||
                  avatarLink === ""
                    ? ava
                    : avatarLink
                }
                alt="?"
              ></img>
              {show ? (
                <div
                  className="modal_user_container"
                  tabIndex={-1}
                  role="dialog"
                >
                  <div className="modal_user">
                    {user.auth === true ? (
                      <span className="modal_part">
                        <div className="modal_icon_container">
                          <img srcSet={person} alt="" className="modal_icon" />
                        </div>
                        <Link to={"/user/Profile"}>Trang cá nhân</Link>
                      </span>
                    ) : (
                      <Link
                        to={"/Loggin"}
                        className="modal_part"
                        onClick={() => {
                          setShow1(false);
                          setShow(!show);
                        }}
                      >
                        <div className="modal_icon_container">
                          <img src={login} alt="" className="modal_icon" />
                        </div>
                        <span>Đăng nhập</span>
                      </Link>
                    )}
                    {user.auth === true ? (
                      <Link
                        className="modal_part"
                        onClick={() => {
                          dispatch(handleLogoutRedux());
                          navigate("/Loggin");
                        }}
                      >
                        <div className="modal_icon_container">
                          <img src={logout} alt="" className="modal_icon" />
                        </div>
                        <span>Đăng xuất</span>
                      </Link>
                    ) : (
                      <Link
                        to={"/SignIn"}
                        className="modal_part"
                        onClick={() => {
                          setShow1(false);
                          setShow(!show);
                        }}
                      >
                        <div className="modal_icon_container">
                          <img src={person} alt="" className="modal_icon" />
                        </div>
                        <span>Đăng Ký</span>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
