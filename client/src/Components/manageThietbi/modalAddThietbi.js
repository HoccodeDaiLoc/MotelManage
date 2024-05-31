import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateTb } from '../../service/ManageService';
import { toast } from 'react-toastify';


const ModalAddTb = (props) => {
    const { show, handleCloseTb, handUpdateTableTb } = props; // Trích xuất giá trị từ props
    const [deviceName ,  setDeviceName] = useState("");
    const [devicePrice, setDevicePrice] = useState("");

    const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isReportBrokenVisible, setIsReportBrokenVisible] = useState("");

  const handUpdateImageTb = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
       setImage(event.target.files)
      } else {
        // setPreviewImage('');
    }
    // console.log('upload file', event.target.files[0]);
};

const toggleReportBrokenVisibility = () => {
  setIsReportBrokenVisible(!isReportBrokenVisible);
};

  
    const handUpdateTb = async () => {
      let res = await postCreateTb(deviceName,devicePrice);
      if (res && res) {
        handleCloseTb();
        setDeviceName('');
        setDevicePrice('');
        toast.success("Đã lưu thành công");
        handUpdateTableTb({ 
          deviceName: deviceName,
          devicePrice : devicePrice});
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
        <Modal.Body
        className="body_add_new"
         >
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
    
            <div className="col-md-12">
              <label className="label-upload-anhtro" htmlFor='labelUploadTro'>
                Thêm Ảnh
                <i className="fa-solid fa-circle-plus"></i>
              </label>
              <input type="file"
                hidden id='labelUploadTro'
                onChange={(event) => handUpdateImageTb(event) }
              />
            </div>
            <div className="img_tro">
              {previewImage ?
                <img src={previewImage} alt="Preview" />
                :
                <span>Ảnh chi tiết </span>
              }
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