import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Loggin.modules.scss";
import { handleLoginRedux } from "../redux/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.user.account.auth);

  const account = useSelector((state) => state.user.account);
  console.log("check acount", account);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Xin hãy nhập đầy đủ thông tin", {
        position: "top-center",
      });
      return;
    }
    dispatch(handleLoginRedux(username, password));
    console.log("check auth", auth);
  };

  useEffect(() => {
    console.log(account);
    if (localStorage.getItem("accessToken") != null) {
      account.auth = true;
    }

    if (account && account.auth === true) {
      console.log("access checking", account.accessToken);
      console.log("account checking", account.auth);
    }
    if (isAdmin === true) {
      navigate("/Home");
    }
    if (auth === true && isAdmin === false) {
      navigate("/");
    }
  }, [account]);

  return (
    <section className="LogginWrapper">
      <Link to={"/"} className="logo_container">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/1/17/Logitech_logo.svg"
          alt=""
          srcSet=""
        />
      </Link>
      <div className="LogginContainer">
        <div className="LogginRight">
          <div className="title">Đăng nhập</div>
          {/* <form //onSubmit={handleSubmit} */}
          <div className="LogginForm">
            <div className="username_container">
              <div className="user_text">Tài khoản</div>
              <input
                className="user_username inputbox"
                value={username}
                placeholder="user"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="pass_container">
              <div className="pass_text">Mật khẩu</div>
              <input
                className="pass inputbox"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                onClick={() => setShowPassword(!showPassword)}
                className="icon1"
                icon={showPassword ? faEye : faEyeSlash}
              />
            </div>
            <div className="forgetpass_container">
              <Link to={"/Identify"}>
                <h6 onClick={() => {}} className="forgetpass_text">
                  Bạn quên mật khẩu?
                </h6>
              </Link>
            </div>
            <button
              className={
                username && password ? "submit_loggin active" : "submit_loggin"
              }
              disabled={!username || !password}
              onClick={() => {
                handleLogin();
              }}
            >
              {/* <FontAwesomeIcon className="spinner" /> */}
              Đăng nhập
            </button>
            {/* </form> */}
          </div>
        </div>
        {/* <div className="qr_container">
          <div className="title">Đăng nhập bằng QR code</div>
          <img
            className="loginbyqr"
            src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/141295532_2923052707981681_234570447608872777_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEDJpqwDl2yiF_tHFUEaTKOgcoC_r0yBLmBygL-vTIEuZOw1oF77u9jPjY_QOIWwSgaYjfUZplsgi6HJYNNRNTM&_nc_ohc=GF8-ajYUAiQQ7kNvgFFqcwU&_nc_ht=scontent.fdad3-5.fna&oh=00_AfB3O-xlK7-dPMJCuueD1doby8W3cxVem9k7ZIx_9w4uyg&oe=66610575"
          />
        </div> */}
      </div>
    </section>
  );
}

export default Login;
