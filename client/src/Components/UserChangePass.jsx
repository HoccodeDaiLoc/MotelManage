import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { putChangePass } from "../service/UserService";
import { toast } from "react-toastify";

function UserChangePassComponent() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const mk = useSelector((state) => state.user.account.password);
  console.log(mk);
  return (
    <div className="UserInfo_Wrapper">
      <form className="UserInfo_Container">
        <h4 className="UserInfo_Item_Heading">Thay đổi mật khẩu</h4>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Nhập mật khẩu cũ</h6>
          <input
            type="text"
            maxLength={50}
            className={"UserInfo_Item_Input"}
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
          />
        </div>
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Mật khẩu mới</h6>
          <input
            type="text"
            maxLength={50}
            className={"UserInfo_Item_Input"}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
        </div>{" "}
        <div className="UserInfo_Item">
          <h6 className="UserInfo_Item_Text">Nhập lại mật khẩu mới</h6>
          <input
            type="text"
            maxLength={50}
            className={"UserInfo_Item_Input"}
            onChange={(e) => {
              setCheckPass(e.target.value);
            }}
          />
        </div>
        <div
          className="UserInfo_Edit_Button"
          onClick={async () => {
            console.log(newPass);
            if (newPass === null || oldPass === null || checkPass === null) {
              toast.error("Nhập đầy đủ thông tin", {
                position: "top-center",
              });
            }
            if (newPass === "" || oldPass === "" || checkPass === "") {
              toast.error("Nhập đầy đủ thông tin", {
                position: "top-center",
              });
            }
            if (
              newPass === undefined ||
              oldPass === undefined ||
              checkPass === undefined
            ) {
              toast.error("Nhập đầy đủ thông tin", {
                position: "top-center",
              });
            } else if (
              newPass === checkPass &&
              newPass != null &&
              newPass != "" &&
              newPass != undefined
            ) {
              try {
                putChangePass(oldPass, newPass).then(() =>
                  toast.success("Đã đổi mật khẩu thành công", {
                    position: "top-center",
                  })
                );
              } catch (err) {
                console.error("Error response:");
                console.error(err.response.data);
                console.error(err.response.status);
                console.error(err.response.headers);
              } finally {
                console.log("what de heo");
              }
              window.scrollBy({ top: -10000, behavior: "smooth" });
            } else if (oldPass === newPass || oldPass === checkPass) {
              toast.error(
                "Mật khẩu mới không không được trùng với mật khẩu cũ!",
                {
                  position: "top-center",
                }
              );
            } else {
              toast.error("Mật khẩu mới không khớp!", {
                position: "top-center",
              });
            }
          }}
        >
          Lưu
        </div>
      </form>
    </div>
  );
}

export default UserChangePassComponent;
