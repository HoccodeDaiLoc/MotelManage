import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateTb } from '../../service/ManageService';
import { toast } from 'react-toastify';
import FormSelect from 'react-bootstrap/FormSelect';

const roomMapping = {
  100: 1, 101: 2, 102: 3, 103: 4, 104: 5, 105: 6, 106: 7, 107: 8, 108: 9, 109: 10, 
  110: 11, 111: 12, 112: 13, 113: 14, 118: 15, 119: 16, 130: 17, 131: 18, 
  132: 20, 133: 21, 134: 22, 135: 23, 136: 24, 137: 25, 138: 26, 139: 27
};

const roomNumbers = Object.keys(roomMapping);

const ModalAddTb = (props) => {
  const { show, handleCloseTb, handUpdateTableTb } = props;
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handUpdateTb = async () => {
    if (isNaN(parseFloat(devicePrice)) || isNaN(parseInt(roomNumber))) {
      toast.error("Giá thiết bị và phòng phải là số");
      return;
    }
    const roomId = roomMapping[parseInt(roomNumber)];
    if (!roomId) {
      toast.error("Số phòng không hợp lệ");
      return;
    }
    let res = await postCreateTb(deviceName, devicePrice, roomId, categoryId);

    console.log("Dữ liệu tổng cảm gửi lên: ", { 
      deviceName: deviceName,
      devicePrice: devicePrice,
      categoryId: categoryId,
      roomId: roomId,
      roomNumber: parseInt(roomNumber),
    });
    
    if (res) {
      handleCloseTb();
      setDeviceName('');
      setDevicePrice('');
      setRoomNumber('');
      setCategoryId('');
      toast.success("Đã lưu thành công");
      handUpdateTableTb({
        deviceName: deviceName,
        devicePrice: devicePrice,
        categoryId: categoryId,
        roomId: roomId,
        roomNumber: parseInt(roomNumber),
      });
    } else {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <Modal show={show} onHide={handleCloseTb} size='lg' className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Thêm vào danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-12">
            <label htmlFor="inputCategoryId" className="form-label">Loại Thiết Bị</label>
            <FormSelect 
              className="form-select" 
              value={categoryId} 
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value="">Chọn loại thiết bị</option>
              <option value="1">Máy lạnh</option>
              <option value="2">Tủ lạnh</option>
              <option value="3">Giường</option>
              <option value="4">Ti vi</option>
            </FormSelect>
          </div>

          <div className="col-md-12">
            <label htmlFor="inputDeviceName" className="form-label">Tên Thiết Bị</label>
            <input
              type="text" 
              className="form-control" 
              placeholder="Mời bạn nhập thông tin..." 
              value={deviceName} 
              onChange={(event) => setDeviceName(event.target.value)} 
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputDevicePrice" className="form-label">Giá thiết bị</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Mời bạn nhập thông tin..." 
              value={devicePrice} 
              onChange={(event) => setDevicePrice(event.target.value)} 
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputRoomNumber" className="form-label">Phòng đang sử dụng</label>
            <FormSelect 
              className="form-select" 
              value={roomNumber} 
              onChange={(event) => setRoomNumber(event.target.value)}
            >
              <option value="">Chọn phòng....</option>
              {roomNumbers.map((room) => (
                <option key={room} value={room}>Phòng {room}</option>
              ))}
            </FormSelect>
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
