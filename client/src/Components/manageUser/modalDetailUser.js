import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import style from "../../Components/ManagerApp.modules.scss";

const ModalDetailUser = (props) => {
  const { show, handleClose, dataDetailUser } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      dialogClassName="large-modal" // Sử dụng lớp CSS để thiết lập kích thước modal
    >
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body_add_new">
          <p>
            <strong>ID:</strong> {dataDetailUser.id}
          </p>
          <p>
            <strong>Email:</strong> {dataDetailUser.email}
          </p>
          <p>
            <strong>First Name:</strong> {dataDetailUser.first_name}
          </p>
          <p>
            <strong>Last Name:</strong> {dataDetailUser.last_name}
          </p>
          <img
            src={dataDetailUser.avatar}
            alt={`${dataDetailUser.first_name} ${dataDetailUser.last_name}`}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetailUser;
