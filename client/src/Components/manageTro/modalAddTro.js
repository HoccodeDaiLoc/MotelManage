import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateTro } from "../../service/ManageService";
import { toast } from "react-toastify";
import style from "../../Components/ManagerApp.modules.scss";

const ModalAddTro = (props) => {
  const { show, handleCloseTro, handUpdateTableTro } = props; // Trích xuất giá trị từ props
  const [roomNumber, setroomNumber] = useState("");
  const [description, setdescription] = useState("Đầy đủ");
  const [price, setprice] = useState("");
  const [roomStatus, setroomStatus] = useState("Phòng trống");
  const [roomArea, setroomArea] = useState("");
  // const [max_occupancy, setmax_occupancy] = useState("");

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
      setPreviewImage("");
    }
    // console.log('upload file', event.target.files[0]);
  };

  const handUpdateTro = async () => {
    let res = await postCreateTro(
      roomNumber,
      description,
      price,
      roomStatus,
      roomArea
    );
    console.log("check", res);
    if (res && res) {
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
              type="text"
              className="form-control"
              value={roomNumber}
              onChange={(event) => setroomNumber(event.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">
              Giá Thuê
            </label>
            <input
              type="text"
              className="form-control"
              value={price}
              onChange={(event) => setprice(event.target.value)}
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
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="inputType" className="form-label">
              Loại phòng
            </label>
            <select
              className="form-select"
              value={description}
              onChange={(event) => setdescription(event.target.value)}
            >
              <option value="Đầy đủ">Đầy đủ</option>
              <option value="Chưa đầy đủ">Chưa đầy đủ</option>
            </select>
          </div>

          {/* <div className="col-md-4">
      <label className="form-label">Tinh trang</label>
      <select className="form-select" value={status} onChange={(event) => setstatus(event.target.value)}>
   <option value="Đang cho thuê">Đang cho thuê</option>
    < option value="Phòng trống">Phòng trống</option>
   </select>  

     </div> */}

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
