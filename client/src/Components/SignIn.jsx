import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/SignIn.modules.scss";
import { handleSignInRedux } from "../redux/actions/userAction";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function SignIn() {
  // const { values, handleBlur, handleChange } = useFormik({
  //   initialValues: {
  //     email: "",
  //     account: "",
  //     password: "",
  //   },
  // });
  // console.log(values);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async () => {
    dispatch(handleSignInRedux(username, email, password));
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
          <div className="SignForm">
            <div className="name_container">
              <input
                type="text "
                className="inputbox"
                placeholder="Tên tài khoản"
                onChange={(e) => setUserName(e.target.value)}
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
            <button
              className={"submit_Sign active"}
              onClick={() => {
                handleSignIn();
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
