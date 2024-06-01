import style from "../styles/UserInfo.modules.scss";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchCurrentUser, putUpdateUser } from "../service/UserService";
import { toast } from "react-toastify";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { storage } from "../utils/firebase";

function UserInfo() {
  const id = useSelector((state) => state.user.account.id);
  const username = useSelector((state) => state.user.account.username);
  const token = useSelector((state) => state.user.account.token);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [CCCD, setCCCD] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dobRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/; // yyyy-mm-dd format

  useEffect(() => {
    const getCurrentUser = async (id) => {
      let res = await fetchCurrentUser(id);
      let data = res.renter;
      setEmail(data.email);
      setName(data.name);
      setDateOfBirth(data.dateOfBirth);
      setAddress(data.address);
      setPhoneNumber(data.phone);
      setCCCD(data.cccd);
    };
    getCurrentUser(id);
  }, []);

  const validate = () => {
    if (
      name === "" ||
      name === null ||
      dateOfBirth === "" ||
      dateOfBirth === null ||
      address === "" ||
      address === null ||
      phone === "" ||
      phone === null ||
      CCCD === "" ||
      CCCD === null
    ) {
      setErrorMessage("Hãy nhập đầy đủ thông tin");
      return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setErrorMessage("Số điện thoại phải có 10 chữ số");
      return false;
    }

    if (CCCD.length !== 12 || isNaN(CCCD)) {
      setErrorMessage("Số CCCD phải có 12 chữ số");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log(validate());
      toast.error(errorMessage, { position: "top-center" });
      return;
    }

    try {
      await putUpdateUser(id, name, dateOfBirth, address, phone, email, CCCD);
      setName(name);
      setDateOfBirth(dateOfBirth);
      setAddress(address);
      setPhoneNumber(phone);
      setEmail(email);
      setCCCD(CCCD);
      toast.success("Đã thay đổi thông tin thành công", {
        position: "top-center",
      });
      window.scrollBy({ top: -10000, behavior: "smooth" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const [data, setData] = useState("");
  // call setfile on file input onChange
  const [file, setFile] = useState(null);
  const UploadImage = () => {
    //By creating a reference to a file, your app gains access to it.
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is" + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload paused");
            break;
          case "running":
            console.log("Upload running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
          // you keep uploaded img url
          setData((prev) => ({ ...prev, img: downloadedURL }));
        });
      }
    );
  };
  return (
    <div className="UserInfo_Wrapper">
      <form className="UserInfo_Container" onSubmit={handleSubmit}>
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
            placeholder="Họ tên của bạn"
            className={"UserInfo_Item_Input"}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <input type="file" onChange={(e) => setFile(e.target.value)} />
        </div>
        <div
          className="UserInfo_Edit_Button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Lưu
        </div>
      </form>
    </div>
  );
}

export default UserInfo;
