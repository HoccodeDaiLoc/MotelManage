import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/SignIn.modules.scss";
import { loginApi } from "../service/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Import the spinner icon
import { toast } from "react-toastify";
<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Use a more descriptive name
  const [showPassword, setShowPassword] = useState(false); // Corrected casing
  const [callLoginApi, SetCallLoginApi] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    let token=localStorage.getItem("token");
    if(token){
      navigate("/");
    }
  },[])
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Xin hãy nhập đầy đủ thông tin", {
        position: "top-center",
      });
      return;
    }
    SetCallLoginApi(true);
    let res = await loginApi(email, password);
    console.log("check login", res);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    }
    if (res && res.status === 400) {
      toast.error("không tìm thấy email và mật khẩu", {
        position: "top-center",
      });
    }
    SetCallLoginApi(false);
  };

  return (
    <div className="SignWrapper">
      <div className="logo_container">
        <img
          className="logo_banner"
          src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/youtube-512.png"
        />
      </div>

      <div className="SignRight">
        <div className="title">Thuê trọ ngay eve.holt@reqres.in</div>
        <div className="SignForm">
          <input
            className="user_email inputbox"
            value={email}
            placeholder="Tên đăng nhập"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="pass_container">
            <input
              className="pass inputbox"
              type={showPassword ? "text" : "password"}
              value={password} // Use password instead of pass for clarity
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              onClick={() => setShowPassword(!showPassword)}
              className="icon1"
              icon={showPassword ? faEye : faEyeSlash}
            ></FontAwesomeIcon>
          </div>

          <button
            className={
              email && password ? "submit_loggin active" : "submit_loggin"
            }
            disabled={!email || !password||callLoginApi===true}
            onClick={() => {
              handleLogin();
            }}
          >
            <FontAwesomeIcon
              disabled={callLoginApi === true ? false : true}

              icon={callLoginApi === true ? faSpinner : ""}
              className="spinner"
            />
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
