import React, { useState, useContext, useEffect } from "react";
import style from "../styles/Header.modules.scss";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleLogout = () => {
    // document.cookie = `userData=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    dispatch(handleLogoutRedux());
    navigate("/");
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
      <div className="header">
        <div className="nav_left">
          {isAdmin ? (
            <Link to="/Home">
              <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg"
                alt="logo"
              ></img>
            </Link>
          ) : (
            <Link to="/">
              <img
                className="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg"
                alt="logo"
              ></img>
            </Link>
          )}
        </div>
        <div className="nav_right">
          <div className="nav_right_item">
            <NavLink className="icon_container" to={"Notification"}>
              <img
                className="icon"
                src="https://www.svgrepo.com/show/513140/bell.svg"
                alt="help me nick"
              ></img>
            </NavLink>{" "}
          </div>
          <div className="nav_right_item">
            <NavLink className="icon_container" to="Support">
              <img
                className="icon"
                src="https://www.svgrepo.com/show/325523/question-mark-circle.svg"
                alt="?"
              ></img>
            </NavLink>{" "}
          </div>

          <div className="nav_right_item">
            <span className="icon_container">
              <img
                className="icon user"
                src=""
                srcSet="https://www.svgrepo.com/show/325523/question-mark-circle.svg"
                alt="?"
                onClick={() => {
                  setShow(!show);
                }}
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
                          <img
                            src="https://www.svgrepo.com/show/493875/personal-center.svg"
                            alt=""
                            className="modal_icon"
                          />
                        </div>
                        <Link to={"/user/Profile"}>Trang cá nhân</Link>
                      </span>
                    ) : (
                      <Link
                        to={"/Loggin"}
                        className="modal_part"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        <div className="modal_icon_container">
                          <img
                            src="https://www.svgrepo.com/show/477710/login-3.svg"
                            alt=""
                            className="modal_icon"
                          />
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
                          <img
                            src="https://www.svgrepo.com/show/454179/logout-multimedia-ui.svg"
                            alt=""
                            className="modal_icon"
                          />
                        </div>
                        <span>Đăng xuất</span>
                      </Link>
                    ) : (
                      <Link
                        to={"/SignIn"}
                        className="modal_part"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        {" "}
                        <div className="modal_icon_container">
                          <img
                            src="https://www.svgrepo.com/show/83758/add-people-interface-symbol-of-black-person-close-up-with-plus-sign-in-small-circle.svg
                        "
                            alt=""
                            className="modal_icon"
                          />
                        </div>
                        <span>Đăng Ký</span>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                console.log("didshow")
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
