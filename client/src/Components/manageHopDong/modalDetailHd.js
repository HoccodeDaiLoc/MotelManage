import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';


const ModalDetailHd = (props) => {
  const { show, handleCloseHd, dataDetailHd } = props;
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);

  const handleImageClick = (images) => {
    setSelectedRoomImages(images || []);
    setShowImageModal(true);
  };

  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleCloseHd}
        backdrop="static"
        keyboard={false}
        dialogClassName="large-modal"
        size='xl'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết phòng trọ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body_add_new">
          <div className="row g-3">
          <div className="col-md-6">
  <label htmlFor="inputRoomId" className="form-label ">Số  phòng</label>
  <input
    type="text"
    className="form-control"
    id="inputRoomId"
    value={dataDetailHd?.roomNumber || ''}
    readOnly
  />
</div>
<div className="col-md-6">
  <label htmlFor="inputStartDay" className="form-label ">Ngày bắt đầu</label>
  <input
    type="text"
    className="form-control"
    id="inputStartDay"
    value={new Date(dataDetailHd?.startDay).toLocaleDateString('vi-VN') || ''}
    readOnly
  />
</div>
<div className="col-md-6">
  <label htmlFor="inputEndDate" className="form-label my-3 ">Ngày kết thúc</label>
  <input
    type="text"
    className="form-control"
    id="inputEndDate"
    value={new Date(dataDetailHd?.endDate).toLocaleDateString('vi-VN') || ''}
    readOnly
  />
</div>
<div className="col-md-6">
  <label htmlFor="inputRentAmount" className="form-label my-3">Số tiền thuê (VND)</label>
  <input
    type="text"
    className="form-control"
    id="inputRentAmount"
    value={formatPrice(dataDetailHd?.rentAmount)}
    readOnly
  />
</div>
<div className="col-md-6">
  <label htmlFor="inputDepositAmount" className="form-label my-3">Số tiền đặt cọc (VND)</label>
  <input
    type="text"
    className="form-control"
    id="inputDepositAmount"
    value={formatPrice(dataDetailHd?.depositAmount)}
    readOnly
  />
</div>

<div className="col-md-6">
  <label htmlFor="inputRenterId" className="form-label my-3">Mã hợp đồng</label>
  <input
    type="text"
    className="form-control"
    id="inputRenterId"
    value={dataDetailHd?.renterId || ''}
    readOnly
  />
</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHd}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal 
        show={showImageModal} 
        onHide={() => setShowImageModal(false)} 
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ảnh chi tiết phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoomImages.length > 0 ? (
            <Carousel interval={null}>
              {selectedRoomImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image.image.imageUrl}
                    alt={`Slide ${index + 1}`}
                    style={{ maxHeight: '600px', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Không có hình ảnh để hiển thị</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalDetailHd;
