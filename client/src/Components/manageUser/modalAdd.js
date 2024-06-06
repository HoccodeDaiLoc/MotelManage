import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postCreateUser } from "../../service/ManageService";
import { toast } from "react-toastify";

const ModalAdd = (props) => {
  const { show, handleClose, handUpdateTable } = props; // Trích xuất giá trị từ props
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null); // Changed initial state to null
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("@gmail.com");
  const [cccd, setCccd] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const roomMapping = {
    100: 1, 101: 2, 102: 3,  103: 4,104: 5, 105: 6, 106: 7, 107: 8, 108: 9, 109: 10, 
    110: 11, 111: 12, 112: 13, 113: 14, 118: 15, 119: 16, 130: 17, 131: 18, 
    132: 20, 133: 21, 134: 22, 135: 23, 136: 24, 137: 25, 138: 26, 139: 27
  };
  
  
  
  const handleSaveUser = async () => {
    if (!dateOfBirth) {
      toast.error("Please select a date of birth");
      return;
    }
    if (isNaN(phone)) {
      toast.error("Phải là số");
      return;
    }
    if (isNaN(cccd)) {
      toast.error("Phải là số");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Sai định dạng");
      return;
    }

    
    const roomId = roomMapping[parseInt(roomNumber)];
  if (!roomId) {
    toast.error("Số phòng không hợp lệ");
    return;
  }

    const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0]; // Format date as yyyy-MM-dd
    let res = await postCreateUser(
      name,
      formattedDateOfBirth,
      address,
      phone,
      email,
      cccd,roomId
    );


    console.log("check user", res);
    if (res && res) {
      // Thành công, đóng modal
      handleClose();
      setName("");
      setDateOfBirth(null); // Reset dateOfBirth to null
      setAddress("");
      setPhone("");
      setEmail("");
      setCccd("");
      setRoomNumber('');
      toast.success("Đã lưu thành công");
      handUpdateTable({
        name: name,
        dateOfBirth: formattedDateOfBirth,
        address: address,
        phone: phone,
        email: email,
        cccd: cccd,
        roomId: roomId,
        roomNumber: parseInt(roomNumber),
      });
    } else {
      // Xử lý khi thất bại, nếu cần
      toast.error("An error occurred");
    }
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPhone(value);
    } else {
      toast.error("Phải là số");
    }
  };

  const handleCccdChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setCccd(value);
    } else {
      toast.error("Phải nhập đúng là sô");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm danh sách khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
        <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">
              Tên khách hàng
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">
              Phòng thuê
            </label>
            <input
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              maxLength={10}
              className="form-control"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Số Điện thoại gồm: 10 Số"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              value={email}
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Số căn cước công dân :
            </label>
            <input
              type="text"
              maxLength={12}
              className="form-control"
              value={cccd}
              onChange={handleCccdChange}
              placeholder="Số căn cước công dân gồm: 12 Số"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputDateOfBirth" className="form-label">
              Ngày sinh
            </label>
            <div className="date-picker-container">
              <DatePicker
                selected={dateOfBirth}
                onChange={(date) => setDateOfBirth(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Chọn ngày sinh"
              />
            </div>
          </div>

          
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveUser}>
          Lưu thông tin
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAdd;
