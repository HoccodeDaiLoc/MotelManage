import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import style from "../styles/Header.modules.scss";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  const handleLogout = () => {
    // document.cookie = `userData=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    dispatch(handleLogoutRedux());
    navigate("/");
  };

  useEffect(() => {
    if (user && user.auth === false) {
      navigate("/SignIn");
      toast.success("Đăng xuất thành công", {
        position: "top-center",
      });
    }
  }, [user]);
  return (
    <div className="header_container">
      <div className="header">
        <div className="nav_left">
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg"
              alt="logo"
            ></img>
          </Link>
        </div>
        {/* 
        <nav
          id="white_background"
          class="search_form navbar navbar-light  justify-content-between"
        >
          <form class="search_container form-inline ">
            <input
              class="search_input form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav> */}

        <div className="nav_right">
          <div className="nav_right_item">
            <NavLink to={"Notification"}>
              <span className="icon_container">
                <img
                  className="icon"
                  src="https://www.svgrepo.com/show/513140/bell.svg"
                  alt="help me nick"
                ></img>
              </span>
            </NavLink>{" "}
          </div>

          <div className="nav_right_item">
            <NavLink to="Support">
              <span className="icon_container">
                <img
                  className="icon"
                  src="https://www.svgrepo.com/show/325523/question-mark-circle.svg"
                  alt="?"
                ></img>
              </span>
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
                        <NavLink to={"/user/Profile"}>Trang cá nhân</NavLink>
                      </span>
                    ) : (
                      <Link
                        to={"/Loggin"}
                        className="modal_part"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
                        <span>Đăng nhập</span>
                      </Link>
                    )}
                    {user.auth === true ? (
                      <span
                        className="modal_part"
                        onClick={() => {
                          handleLogout();
                          navigate("/");
                        }}
                      >
                        Đăng xuất
                      </span>
                    ) : (
                      <Link
                        to={"/SignIn"}
                        className="modal_part"
                        onClick={() => {
                          setShow(!show);
                        }}
                      >
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
