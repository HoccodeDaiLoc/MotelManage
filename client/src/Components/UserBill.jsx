import Dropdown from "react-bootstrap/Dropdown";
import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRoomByRenter } from "../service/RoomService";

function UserBill() {
  const [roomData, setRoomData] = useState("");
  const id = useSelector((state) => state.user.account.id);
  console.log(id);
  useEffect(() => {
    const fetchRoomByID = async (id) => {
      let res = await fetchRoomByRenter(id);
      setRoomData(res.room);
    };
    fetchRoomByID(id);
  }, []);
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
            placeholder={
              roomData.roomNumber != null
                ? roomData.roomNumber
                : "Phòng bạn đang thuê"
            }
            className={"UserInfo_Item_Input"}
            disabled
          />
          {/* chưa có value, đang hard code */}
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Giá phòng</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={roomData.price != null ? roomData.price : "Giá phòng"}
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Diện tích</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={
              roomData.roomArea != null ? roomData.roomArea : "Diện tích phòng"
            }
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số người tối đa cho phép</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={
              roomData.maxOccupancy != null
                ? roomData.maxOccupancy
                : "Số người ở tối đa mà phòng của bạn cho phép"
            }
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Số điện thoại</h6>
          <input
            type="text"
            maxLength={50}
            placeholder={
              roomData.maxOccupancy != null
                ? roomData.maxOccupancy
                : "Số người ở tối đa mà phòng của bạn cho phép"
            }
            disabled
            className={"UserInfo_Item_Input"}
          />
          {/* chưa có value, đang hard code */}
        </div>{" "}
      </form>
    </div>
  );
}

export default UserBill;
