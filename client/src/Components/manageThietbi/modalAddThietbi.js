import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateTb } from '../../service/ManageService';
import { toast } from 'react-toastify';

const ModalAddTb = (props) => {
  const { show, handleCloseTb, handUpdateTableTb } = props;
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [roomId, setRoomId] = useState("");
  const handUpdateTb = async () => {
    // Kiểm tra nếu giá thiết bị và số phòng không phải là số
    if (isNaN(parseFloat(devicePrice)) || isNaN(parseInt(roomId))) {
      toast.error("Giá thiết bị và phòng phải là số");
      return;
    }
    let res = await postCreateTb(deviceName, devicePrice, roomId); 
    if (res) {
      handleCloseTb();
      setDeviceName('');
      setDevicePrice('');
      setRoomId('');
      toast.success("Đã lưu thành công");
      handUpdateTableTb({
        deviceName: deviceName,
        devicePrice: devicePrice,
        roomId: roomId,
      });
    } else {
      toast.error("Đã xảy ra lỗi");
    }
  }
  

  return (
    <Modal show={show}
      onHide={handleCloseTb}
      size='xl'
      className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Thêm vào danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">Loại Thiết Bị</label>
            <input
              type="text" className="form-control" value={deviceName} onChange={(event) => setDeviceName(event.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Giá thiết bị</label>
            <input type="text" className="form-control" value={devicePrice} onChange={(event) => setDevicePrice(event.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Phòng đang sử dụng</label>
            <input type="text" className="form-control" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
          </div>
        
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseTb}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handUpdateTb}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddTb;
