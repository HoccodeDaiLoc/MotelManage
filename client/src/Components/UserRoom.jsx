import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

function UserRoom() {
  const user = useSelector((state) => state.user.account);
  const token = useSelector((state) => state.user.account.token);
  useEffect(() => {});
  const [active, setActive] = useState();
  return (
    <div className="UserInfo_Wrapper">
      <form className="UserInfo_Container">
        <h4 className="UserInfo_Item_Heading">Phòng của tôi</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số phòng</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Số phòng"
            // value={"Username"}
            className={"UserInfo_Item_Input"}
            disabled
          />
          {/* chưa có value, đang hard code */}
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Họ tên</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Tên của bạn"
            // value={"Username"}
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Email</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Tên của bạn"
            // value={"Username"}
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">CCCD</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Tên của bạn"
            // value={"Username"}
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số điện thoại</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Tên của bạn"
            // value={"Username"}
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Ảnh hồ sơ</h6>
          <input
            type="text"
            maxLength={50}
            placeholder="Giúp tạo nét rất là ác"
            // value={"Username"}
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>
        <button type="submit" className="UserInfo_Edit_Button">
          Lưu
        </button>
      </form>
    </div>
  );
}

export default UserRoom;
