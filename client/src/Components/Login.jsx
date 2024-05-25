import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Loggin.modules.scss";
import { handleLoginRedux } from "../redux/actions/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Import the spinner icon
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../feature/auth/authApiSlice";
import { setCredentials } from "../feature/auth/authSlice";
import { postResetPassWord } from "../service/UserService";
<script
  src="https://kit.fontawesome.com/657d725d03.js"
  crossorigin="anonymous"
></script>;

function Login() {
  // const userRef = useRef();
  // const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [errMsg, setErrMsg] = useState("");

  // const [login, { isLoading }] = useLoginMutation();
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const tokenList = useSelector((state) => state.user.account.token);
  console.log("check acount", account);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [resetEmail, setResetEmail] = useState();
  // useEffect(() => {
  //   if (tokenList[0]) {
  //     // Gửi token đến máy chủ để lấy thông tin người dùng
  //     fetch("/api/user/login", {
  //       headers: {
  //         Authorization: `Bearer ${tokenList[0]}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setUser(data))
  //       .catch((error) =>
  //         console.error("Lỗi khi lấy thông tin người dùng:", error)
  //       );
  //   }
  //   console.log("check all token", tokenList);
  // }, [tokenList]);

  // useEffect(() => {
  //   console.log(userRef.current);
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, password]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); //ngăn load lại, vì form default sẽ load lại
  //   try {
  //     const userData = await login({ user, password }).unwrap();
  //     dispatch(setCredentials({ ...userData, user }));
  //     setUser("");
  //     setPassword("");
  //     navigate("/");
  //   } catch (err) {
  //     if (!err?.originalStatus) {
  //       // isLoading: true until timeout occurs
  //       setErrMsg("No Server Response");
  //     } else if (err.originalStatus === 400) {
  //       setErrMsg("Missing User or Password");
  //     } else if (err.originalStatus === 401) {
  //       setErrMsg("Unauthorized");
  //     } else {
  //       setErrMsg("Login Failed");
  //     }
  //     errRef.current.focus();
  //   }
  // };
  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Xin hãy nhập đầy đủ thông tin", {
        position: "top-center",
      });
      return;
    }
    dispatch(handleLoginRedux(username, password));
    navigate("/");
  };

  // let token=
  // const handleUserInput = (e) => {
  //   setUser(e.target.value);
  // };

  // const handlePwdInput = (e) => {
  //   setPassword(e.target.value);
  // };

  useEffect(() => {
    if (account && account.auth === true) {
      console.log("token checking", account.token);
      console.log("account checking", account);
      // document.cookie = `userData=${JSON.stringify({ ...username })}`;
      // console.log("cookie checking", document.cookie);
    }
  }, [account]);

  return (
    <section className="LogginWrapper">
      {/* <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p> */}

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
          <div className="title">Thuê trọ ngay</div>
          {/* <form //onSubmit={handleSubmit} */}
          <div className="LogginForm">
            <div className="username_container">
              <label htmlFor="user_username">Tài khoản</label>
              <input
                className="user_username inputbox"
                value={username}
                placeholder="user"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="pass_container">
              <label htmlFor="pass">Mật khẩu</label>
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
              <h6
                onClick={() => {
                  setShow(!show);
                }}
                className="forgetpass_text"
              >
                Bạn quên mật khẩu?
              </h6>

              <div
                className="hidden_wrapper"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="sub_hidden">
                  {show ? (
                    //chưa xử lý xác nhận email
                    <input
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="forgetpass_box"
                      placeholder="email"
                      type="text"
                    />
                  ) : (
                    ""
                  )}
                  {show ? (
                    <button
                      className="forgetpass_button"
                      onClick={() => {
                        console.log(resetEmail);
                        postResetPassWord(resetEmail).then(
                          toast.success("đã gửi email", {
                            position: "top-center",
                          })
                        );
                      }}
                    >
                      Gửi email
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <button
              className={
                username && password ? "submit_loggin active" : "submit_loggin"
              }
              disabled={!username || !password || isLoading === true}
              onClick={() => {
                handleLogin();
              }}
            >
              <FontAwesomeIcon
                disabled={isLoading === true ? true : false}
                icon={isLoading === true ? faSpinner : ""}
                className="spinner"
              />
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
