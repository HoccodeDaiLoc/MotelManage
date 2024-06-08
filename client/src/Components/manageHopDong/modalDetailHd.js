import React, { useState ,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { fetchAllContractRenter } from "../../service/ManageService";

const ModalDetailHd = (props) => {
  const { show, handleCloseHd, dataDetailHd, roomNumbers } = props;
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);
  const [renterDetail, setRenterDetail] = useState([]);

  const formatPrice = (price) => {
    if (!price) return '';
    return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
  };

  useEffect(() => {
    if (dataDetailHd) {
      getDetailTro(dataDetailHd?.contractId);
    }
  }, [dataDetailHd]);

  const getDetailTro = async (contractId) => {
    try {
      const res = await fetchAllContractRenter(contractId);
      if (res && res.contract) {
        setRenterDetail(res.contract);
      }
    } catch (error) {
      console.error("Error fetching tro data:", error);
    }
  };

  const handleShowDetail = async (contractId) => {
    try {
      const res = await fetchAllContractRenter(contractId);
      if (res && res.contract) {
        setRenterDetail(res.contract);
      }
    } catch (error) {
      console.error("Error fetching tro data:", error);
    }
  };

  console.log('fetchalldetail', renterDetail);

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleCloseHd}
        backdrop="static"
        keyboard={false}
        dialogClassName="large-modal"
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Bản hợp đồng đại diện bên thuê</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body_add_new">
          <div className="row g-3">
          <div className="col-md-6">
              <label htmlFor="inputRenterId" className="form-label my-3">Tên khách hàng:(Ông/bà..)</label>
              <input
            type="text"
         className="form-control"
          id="inputRenterId"
         value={renterDetail?.renter?.name || ""}
         readOnly
                />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRenterId" className="form-label my-3">Có số căn cước công dân :</label>
              <input
            type="text"
          className="form-control"
          id="inputRenterId"
           value={renterDetail?.renter?.cccd || ""}
         readOnly
                />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputRenterId" className="form-label my-3">Số điện thoại liên hệ :</label>
              <input
            type="text"
           className="form-control"
           id="inputRenterId"
           value={renterDetail?.renter?.phone || ""}
           readOnly
                />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRenterId" className="form-label my-3">Thường trú tại địa chỉ :</label>
              <input
            type="text"
           className="form-control"
           id="inputRenterId"
           value={renterDetail?.renter?.address || ""}
           readOnly
                />
            </div>
           
            <div className="col-md-6">
              <label htmlFor="inputRoomId" className="form-label my-3 ">Số phòng bên khách thuê :</label>
              <input
                type="text"
                className="form-control"
                id="inputRoomId"
                value={roomNumbers.find(room => room.roomId === dataDetailHd?.roomId)?.roomNumber || ""}
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
              <label htmlFor="inputStartDay" className="form-label my-3 ">Ngày lập hợp đồng</label>
              <input
                type="text"
                className="form-control"
                id="inputStartDay"
                value={new Date(dataDetailHd?.startDay).toLocaleDateString('vi-VN') || ''}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEndDate" className="form-label my-3 ">Ngày hết hạn hợp đồng</label>
              <input
                type="text"
                className="form-control"
                id="inputEndDate"
                value={new Date(dataDetailHd?.endDate).toLocaleDateString('vi-VN') || ''}
                readOnly
              />
            </div>
            
            <div className="col-md-12">
              <label htmlFor="inputDepositAmount" className="form-label my-3">Số tiền đặt cọc cho bên A (VND)</label>
              <input
                type="text"
                className="form-control"
                id="inputDepositAmount"
                value={formatPrice(dataDetailHd?.depositAmount)}
                readOnly
                
              />
                <p className=' mx-1 my-2'>Đại diên bên trọ đã xác nhận lập hợp đồng : **</p> 
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
