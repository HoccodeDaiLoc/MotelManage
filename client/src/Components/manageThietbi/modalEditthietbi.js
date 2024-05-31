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

  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isReportBrokenVisible, setIsReportBrokenVisible] = useState("");

  const toggleReportBrokenVisibility = () => {
    setIsReportBrokenVisible(!isReportBrokenVisible);
  };

  const handUpdateImageTro = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files);
    } else {
      // setPreviewImage('');
    }
    // console.log('upload file', event.target.files[0]);
  };
  const handleEditTb = async () => {
    if (deviceName) {
      console.log("Starting updateTro with:", {

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
          roomId:roomId,
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
      setDeviceName(dataTbedit.deviceName);
      setDevicePrice(dataTbedit.devicePrice); 
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
        <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
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
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Loại Phòng
            </label>
            <input
              type="text"
              className="form-control"
              value={devicePrice}
              onChange={(event) => setDevicePrice(event.target.value)}
            />
          </div>
          
          <div className="col-md-12">
            <label className="label-upload-anhtro" htmlFor="labelUploadTro">
              Thêm Ảnh
              <i className="fa-solid fa-circle-plus"></i>
            </label>
            <input
              type="file"
              hidden
              id="labelUploadTro"
              onChange={(event) => handUpdateImageTro(event)}
            />
          </div>
          <div className="img_tro">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <span>Ảnh chi tiết phòng</span>
            )}
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
