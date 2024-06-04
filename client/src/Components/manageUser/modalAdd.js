import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postCreateUser } from "../../service/ManageService";
import { toast } from "react-toastify";
const ModalAdd = (props) => {
  const { show, handleClose, handUpdateTable } = props;
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cccd, setCccd] = useState("");
  const handleSaveUser = async () => {
    // Kiểm tra phone và cccd có phải là số và cccd có đúng 12 số không
    if (isNaN(phone) || isNaN(cccd) || cccd.length !== 12) {
      toast.error("Số điện thoại phải là số và Số căn cước công dân phải đúng 12 số");
      return;
    }
    // Kiểm tra name không chứa ký tự số
    if (/\d/.test(name)) {
      toast.error("Tên khách hàng không được chứa ký tự số");
      return;
    }
    // Kiểm tra email có định dạng @gmail.com
    if (!email.includes("@gmail.com")) {
      toast.error("Email phải có định dạng @gmail.com");
      return;
    }
    if (!dateOfBirth) {
      toast.error("Vui lòng chọn ngày sinh");
      return;
    }
    const formattedDateOfBirth = dateOfBirth.toISOString().split("T")[0];
    let res = await postCreateUser(
      name,
      formattedDateOfBirth,
      address,
      phone,
      email,
      cccd
    );
    if (res) {
      handleClose();
      setName("");
      setDateOfBirth(null);
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
      toast.error("Đã xảy ra lỗi");
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
