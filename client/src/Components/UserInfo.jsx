import style from "../styles/UserInfo.modules.scss";
import DatePicker from "react-datepicker";

import { useEffect, useState } from "react";
// import {
//   selectCurrentUser,
//   selectCurrentToken,
// } from "../feature/auth/authSlice";
import UploadImage from "./UploadImage";
import { useSelector } from "react-redux";
import { fetchCurrentUser, putUpdateUser } from "../service/UserService";
import { toast } from "react-toastify";

function UserInfo() {
  // const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);
  // const tokenAbbr = `${token.slice(0, 9)}...`; //check token
  const id = useSelector((state) => state.user.account.id);
  console.log(id);
  const username = useSelector((state) => state.user.account.username);
  const token = useSelector((state) => state.user.account.token);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [CCCD, setCCCD] = useState("");

  useEffect(() => {
    const getCurrentUser = async (id) => {
      let res = await fetchCurrentUser(id);
      console.log(res);
      let data = res.renter;
      setEmail(data.email);
      setName(data.name);
      setDateOfBirth(data.dateOfBirth);
      setAddress(data.address);
      setPhoneNumber(data.phone);
      setCCCD(data.cccd);
      // setUserName(res.username);
      // console.log(res);
      // console.log(username);
    };
    getCurrentUser(id);
  }, []);
  const [active, setActive] = useState();
  return (
    <div className="UserInfo_Wrapper">
      <form className="UserInfo_Container">
        <h4 className="UserInfo_Item_Heading">Thông tin cá nhân</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Tên đăng nhập</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={username}
            disabled
            className={"UserInfo_Item_Input"}
          />
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Họ tên</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={name}
            className={"UserInfo_Item_Input"}
            onChange={(e) => setName(e.target.value)}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Email</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Email của bạn"
            defaultValue={email}
            className={"UserInfo_Item_Input"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">CCCD</h6>
          <input
            type="text"
            maxLength={12}
            placeholder="CCCD của bạn"
            defaultValue={CCCD}
            className={"UserInfo_Item_Input"}
            onChange={(e) => setCCCD(e.target.value)}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <div className="sub_dob_container">
            <h6 className="UserInfo_Item_Text">Ngày sinh</h6>
            <DatePicker
              className="UserInfo_Item_Input"
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Địa chỉ</h6>
          <input
            type="text"
            maxLength={100}
            defaultValue={address}
            placeholder="Địa chỉ của bạn"
            className={"UserInfo_Item_Input"}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số điện thoại</h6>
          <input
            type="text"
            maxLength={10}
            defaultValue={phone}
            placeholder="Số điện thoại của bạn"
            className={"UserInfo_Item_Input"}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Ảnh hồ sơ</h6>
          <input
            type="file"
            name="user_ava"
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <div
          onClick={() => {
            putUpdateUser(id, name, dateOfBirth, address, phone, email, CCCD)
              .then(() => {
                setName(name);
                setDateOfBirth(dateOfBirth);
                setAddress(address);
                setPhoneNumber(phone);
                setEmail(email);
                setCCCD(CCCD);
                toast.success("đã thay đổi thông tin thành công", {
                  position: "top-center",
                });
                window.scrollBy({ top: -10000, behavior: "smooth" });
              })
              .catch((error) => {
                console.error("Error updating user:", error);
              });
          }}
          className="UserInfo_Edit_Button"
        >
          Lưu
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
