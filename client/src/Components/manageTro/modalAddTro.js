import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateTro } from "../../service/ManageService";
import { toast } from "react-toastify";
import style from "../../Components/ManagerApp.modules.scss";

const ModalAddTro = (props) => {
  const { show, handleCloseTro, handUpdateTableTro } = props; // Trích xuất giá trị từ props
  const [roomNumber, setroomNumber] = useState("");
  const [description, setdescription] = useState(" ");
  const [price, setprice] = useState("");
  const [roomStatus, setroomStatus] = useState("Phòng trống");
  const [roomArea, setroomArea] = useState("");
  // const [max_occupancy, setmax_occupancy] = useState("");

  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isReportBrokenVisible, setIsReportBrokenVisible] = useState("");


  const handUpdateImageTro = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files);
    } else {
      setPreviewImage("");
    }
    // console.log('upload file', event.target.files[0]);
  };

  const handUpdateTro = async () => {
    // Kiểm tra xem giá phòng, số phòng và diện tích có phải là số không
    if (isNaN(price) || isNaN(roomNumber) || isNaN(roomArea)) {
      // Nếu không phải số, báo lỗi và không thực hiện lưu
      toast.error("Giá phòng, số phòng và diện tích phải là số");
    } else {
      // Nếu là số, tiếp tục thực hiện lưu
      let res = await postCreateTro(
        roomNumber,
        description,
        price,
        roomStatus,
        roomArea
      );
      console.log("check", res);
      if (res) {
        setroomNumber("");
        setdescription("");
        setprice("");
        setroomStatus("");
        setroomArea("");
        handleCloseTro();
        toast.success("Đã lưu thành công");
        handUpdateTableTro({
          roomNumber: roomNumber,
          description: description,
          price: price,
          roomStatus: roomStatus,
          roomArea: roomArea,
        });
        console.log(res.data);
      } else {
        toast.error("Đã xảy ra lỗi");
      }
    }
  };
  

  return (
    <Modal
      show={show}
      onHide={handleCloseTro}
      backdrop="static"
      keyboard={false}
      dialogClassName="large-modal"
      size="xl"
      className="modal-add-tro"
    >
      <Modal.Header closeButton>
        <Modal.Title>Thêm vào danh sách</Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">

          
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">
              Số Phòng
            </label>
            <input
         
              className="form-control"
              value={roomNumber}
              onChange={(event) => setroomNumber(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label" >
              Giá Thuê
              
            </label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={(event) => setprice(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
              Diện tích
            </label>
            <input
              type="text"
              className="form-control"
              value={roomArea}
              onChange={(event) => setroomArea(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Tình trạng
            </label>
            <input
              type="text"
              className="form-control"
              value={roomStatus}
              onChange={(event) => setroomStatus(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          
          <div className="col-md-6">
            <label htmlFor="inputArea" className="form-label">
             Mô tả
            </label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(event) => setdescription(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
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
        <Button variant="secondary" onClick={handleCloseTro}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handUpdateTro} closeButton>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddTro;
