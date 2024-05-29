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
  const [email, setEmail] = useState("");
  const [cccd, setCccd] = useState("");

  const handleSaveUser = async () => {
    if (!dateOfBirth) {
      toast.error("Please select a date of birth");
      return;
    }
    const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0]; // Format date as yyyy-MM-dd
    let res = await postCreateUser(
      name,
      formattedDateOfBirth,
      address,
      phone,
      email,
      cccd
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
      toast.success("Đã lưu thành công");
      handUpdateTable({
        name: name,
        dateOfBirth: formattedDateOfBirth,
        address: address,
        phone: phone,
        email: email,
        cccd: cccd,
      });
    } else {
      // Xử lý khi thất bại, nếu cần
      toast.error("An error occurred");
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
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Số điện thoại
            </label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
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
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Số căn cước công dân :
            </label>
            <input
              type="text"
              className="form-control"
              value={cccd}
              onChange={(event) => setCccd(event.target.value)}
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
