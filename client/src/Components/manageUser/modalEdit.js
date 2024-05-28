import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateUser } from "../../service/ManageService";
import { toast } from "react-toastify";
const ModalEdit = (props) => {
  const { show, handleClose, dataUseredit, handleEditUserfrommodal } = props; // Trích xuất giá trị từ props
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await updateUser(name, job);
    if (res && res.updatedAt) {
      handleEditUserfrommodal({
        first_name: name,
        id: dataUseredit.id,
      });
      handleClose();
      toast.success("Update thanh cong");
    }
    console.log(res);
  };

  useEffect(() => {
    if (show) {
      setName(dataUseredit.first_name);
    }
  }, [dataUseredit]);

  //   console.log(">>>check props : ",dataUseredit)
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Chinh sua danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body_add_new">
          <form>
            <div className="form-group">
              <label>Tên khách hàng</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Công việc</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </form>
        </div>
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
