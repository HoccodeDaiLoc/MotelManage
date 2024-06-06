import React, { useState, useContext, useEffect } from "react";
import style from "../styles/Header.modules.scss";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";
import { io, Socket } from "socket.io-client";
import ava from "../asset/image/ava.svg";
import bell from "../asset/image/bell.svg";
import imagethuetro from "../asset/image/imagethuetro.png";
import login from "../asset/image/login.svg";
import logout from "../asset/image/logout.svg";
import person from "../asset/image/person.svg";
import SignIn from "../asset/image/SignIn.svg";
import { getNotification } from "../service/NotiService";
import { fetchCurrentUser } from "../service/UserService";

function Header({ socket }) {
  const [notifications, setNotification] = useState([]);
  console.log("here:", socket);
  const user = useSelector((state) => state.user.account);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  const id = useSelector((state) => state.user.account.id);
  const [avatarLink, setAvatarLink] = useState("");

  useEffect(() => {
    const getCurrentUser = async (id) => {
      let res = await fetchCurrentUser(id);
      let data = res?.renter;
      setAvatarLink(data?.account.avatar);
    };
    getCurrentUser(id);
  }, [avatarLink]);

  useEffect(() => {
    console.log(socket);
    // lấy api thông báo chỗ này
    const getNoti = async (id) => {
      let res = await getNotification(id);
      console.log("check get noti from db:", res);
    };
    getNoti(id);
  }, [id]);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.on("notification", (data) => {
        setNotification((prev) => [...prev, data]);
      });
    }
    console.log("check get noti from websocket:", notifications);
  }, [socket]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    navigate("/");
  };
  const DisplayNotification = () => {
    return <span className="Notification">{notifications}</span>;
  };
  useEffect(() => {
    if (user && user.auth === false) {
      navigate("/Loggin");
      toast.success("Đăng xuất thành công", {
        position: "top-center",
      });
    }
  }, [user]);
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
                  className="modal_user_container"
                  tabindex="-1"
                  role="dialog"
                >
                  <div className="modal_user">
                    <span className="modal_part">
                      {notifications.length === 0
                        ? "Bạn chưa có thông báo mới"
                        : notifications.map((noti) => {
                            DisplayNotification(noti);
                          })}
                    </span>
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
                  tabindex="-1"
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
                          handleLogout();
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
// https://www.svgrepo.com/show/355933/user-circle.svg
export default Header;
