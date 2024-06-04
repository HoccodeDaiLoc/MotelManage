import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateTb } from '../../service/ManageService';
import { toast } from 'react-toastify';
const ModalAddTb = (props) => {
  const { show, handleCloseTb, handUpdateTableTb } = props;
  const [deviceName, setDeviceName] = useState("");
  const [devicePrice, setDevicePrice] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isReportBrokenVisible, setIsReportBrokenVisible] = useState("");
  const mapRoomNumberToRoomId = (roomNumber) => {
    // Thực hiện ánh xạ số phòng thành roomId theo quy ước của bạn
    return parseInt(roomNumber); // Ví dụ: Trả về số phòng chính là roomId
  };
  const handUpdateTb = async () => {
    const roomId = mapRoomNumberToRoomId(roomNumber); // Chuyển đổi số phòng thành roomId
    let res = await postCreateTb(deviceName, devicePrice, roomId); // Gửi roomId vào postCreateTb
    console.log("Đã gửi lên server thông tin: ", { deviceName, devicePrice, roomId });
    if (res) {
      handleCloseTb();
      setDeviceName('');
      setDevicePrice('');
      setRoomNumber('');
      toast.success("Đã lưu thành công");
      handUpdateTableTb({ 
        deviceName: deviceName, 
        devicePrice: devicePrice,
        roomNumber: roomId }); // Gửi roomNumber chứ không phải roomId
    } else {
      toast.error("Đã xảy ra lỗi");
    }
  };
  
  return (
    <Modal
      show={show}
      onHide={handleCloseTb}
      size='xl'
      className='modal-add-tro'
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm vào danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">Loại Thiết Bị</label>
            <input
              type="text"
              className="form-control"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Giá thiết bị</label>
            <input
              type="text"
              className="form-control"
              value={devicePrice}
              onChange={(event) => setDevicePrice(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Số Phòng</label>
            <input
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(event) => setRoomNumber(event.target.value)}
            />
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
