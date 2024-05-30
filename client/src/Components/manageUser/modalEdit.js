import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../../service/ManageService";
import { toast } from "react-toastify";
const ModalEdit = (props) => {
  const { show, handleClose, dataUseredit, handleEditUserfrommodal } = props; // Trích xuất giá trị từ props
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null); // Changed initial state to null
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cccd, setCccd] = useState("");


  const handleEditUser = async () => {
    if (name) {
      console.log("Starting updateTro with:", {  name,  dateOfBirth ,   address,   phone,  email,   cccd,
      });
      
      let res = await updateUser(
        name,
        dateOfBirth,
        address,
        phone,
        email,
        cccd,
      );
      console.log("check res:", res);

      if (res ) {
        handleEditUserfrommodal({
          name:name,
          dateOfBirth:dateOfBirth,
          address:address,
          phone :phone,
          email:email,
          cccd:cccd,
        });
        handleClose();
        toast.success("Update thành công");
      } else {
        toast.error("Update thất bại");
      }
    } else {
      toast.error("Vui lòng nhập tên trước khi lưu");
    }
  };
  useEffect(() => {
    if (show) {
      setName(dataUseredit.name);
      setAddress(dataUseredit.address);
      setEmail(dataUseredit.email);
      setDateOfBirth(dataUseredit.dateOfBirth);
      setPhone(dataUseredit.phone);
      setCccd(dataUseredit.cccd);
    }
  }, [dataUseredit]);
  

  //   console.log(">>>check props : ",dataUseredit)
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Chinh sua danh sách</Modal.Title>
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
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Ngày sinh :
            </label>
            <input
              type="text"
              className="form-control"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
            />
          </div>
         
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdit;
