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
              <label htmlFor="inputID" className="form-label">Số Phòng</label>
              <input
                type="text"
                className="form-control"
                id="inputID"
                value={dataDetailHd?.roomNumber || ''}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputArea" className="form-label">Diện tích</label>
              <input
                type="text"
                className="form-control"
                id="inputArea"
                value={dataDetailHd?.roomArea ?`${dataDetailHd.roomArea} m²` : ''}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPrice" className="form-label my-3">Giá phòng</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="inputPrice"
                  value={formatPrice(dataDetailHd?.price)}
                  readOnly
                />
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputStatus" className="form-label my-3">Tình trạng</label>
              <input
                type="text"
                className="form-control"
                id="inputStatus"
                value={dataDetailHd?.roomStatus || ''}
                readOnly
              /> 
            </div>
            <div className="col-md-12">
              <label htmlFor="inputDescription" className="form-label my-3">Mô tả</label>
              <textarea
                className="form-control"
                id="inputDescription"
                value={dataDetailHd?.description || ''}
                readOnly
                rows="5" 
              />
            </div>
            <div className="col-md-12 my-3 text-center">
              <Button 
                variant="danger" 
                onClick={() => handleImageClick(dataDetailHd?.roomImage)}
              >
                Xem ảnh chi tiết phòng
              </Button>
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
