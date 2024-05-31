import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/SignIn.modules.scss";
import { handleSignInRedux } from "../redux/actions/userAction";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function SignIn() {
  const [username, setUserName] = useState("");

  const [dateofbirth, setDateOfBirth] = useState(new Date());
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const handleSignIn = async () => {
    if (
      !username ||
      !password ||
      !email
      // || !dateofbirth
    ) {
      toast.error("Xin hãy nhập đầy đủ thông tin", {
        position: "top-center",
      });
      return;
    }
    dispatch(
      handleSignInRedux(
        username,
        email,
        password
        // , dateofbirth
      )
    );
    navigate("/Loggin");
  };

  return (
    <section className="SignWrapper">
      <Link to={"/"} className="logo_container">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg"
          alt=""
          srcSet=""
        />
      </Link>
      <div className="SignContainer">
        <div className="SubSignContainer">
          <div className="text_container">
            <h3 className="title">Tạo tài khoản mới</h3>
            <h6 className="desc">Nhanh chóng và dễ dàng</h6>
          </div>
          {/* <form //onSubmit={handleSubmit} */}
          <div className="SignForm">
            <div className="name_container">
              <input
                type="text "
                className="inputbox"
                placeholder="Tên tài khoản"
                onChange={
                  (e) => setUserName(e.target.value)
                  //  setName(e.target.value)
                }
              />
            </div>

            <div className="email_container">
              <input
                type="email"
                className="inputbox"
                placeholder="Email"
                name=""
                id=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="pass_container">
              <input
                className="pass inputbox"
                type={"text"}
                value={password}
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <div className="dob_container">
              <div className="sub_dob_container">
                <h6>Ngày sinh</h6>
                <DatePicker
                  className="dob"
                  selected={dateofbirth}
                  onChange={(date) => setDateOfBirth(date)}
                />
              </div>
            </div> */}
            <button
              className={"submit_Sign active"}
              onClick={() => {
                handleSignIn();
              }}
            >
              Đăng ký
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
