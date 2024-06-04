import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateTb } from "../../service/ManageService";

import { toast } from "react-toastify";

const ModalEditTb = (props) => {
  const { show, handleCloseTb, dataTbedit, handleEditTbfrommodal } = props; // Trích xuất giá trị từ props
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [roomId,setRoomId] =useState("");
  const handleEditTb = async () => {
    // Kiểm tra xem roomId và devicePrice có phải là số không
    if (isNaN(roomId) || isNaN(devicePrice)) {
      toast.error("Số phòng và giá phải là số!");
      return;
    }
    if (deviceName) {
      console.log("Starting updateTb with:", {
        deviceName,
        devicePrice,
        roomId
      });
      let res = await updateTb(
        dataTbedit.deviceId,
        deviceName,
        devicePrice,
        roomId
      );
      console.log("check res:", res);
      if (res) {
        handleEditTbfrommodal({
          deviceId: dataTbedit.deviceId,
          deviceName: deviceName,
          devicePrice: devicePrice,
          roomId: roomId,
        });
        handleCloseTb();
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
      setDevicePrice(dataTbedit.devicePrice); 
      setDeviceName(dataTbedit.deviceName);
    
      setRoomId(dataTbedit.roomId); 

  
    }
  }, [dataTbedit]);

  return (
    <Modal
      show={show}
      onHide={handleCloseTb}
      size="xl"
      className="modal-add-tro"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa danh sách thiết bị</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">
              Số Phòng
            </label>
            <input
              type="text"
              className="form-control"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Thiết bị
            </label>
            <input
              type="text"
              className="form-control"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Giá
            </label>
            <input
              type="text"
              className="form-control"
              value={devicePrice}
              onChange={(event) => setDevicePrice(event.target.value)}
            />
          </div>
          
         
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={(dataTbedit)=> {
          handleCloseTb(dataTbedit)}}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditTb}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditTb;
