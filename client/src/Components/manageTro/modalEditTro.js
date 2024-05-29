import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateTro } from "../../service/ManageService";
import { toast } from "react-toastify";
import style from "../../Components/ManagerApp.modules.scss";

const ModalEditTro = (props) => {
  const { show, handleCloseTro, dataTroedit, handleEditTrofrommodal } = props; // Trích xuất giá trị từ props
  const [roomNumber, setroomNumber] = useState("");
  const [description, setdescription] = useState("Đầy đủ");
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
      // setPreviewImage('');
    }
    // console.log('upload file', event.target.files[0]);
  };

  const handleEditTro = async () => {
    if (roomNumber) {
      console.log("Starting updateTro with:", {
        roomNumber,
        description,
        price,
        roomStatus,
        roomArea,
      });
      let res = await updateTro(
        roomNumber,
        description,
        price,
        roomStatus,
        roomArea
      );
      console.log("check res:", res);

      if (res) {
        handleEditTrofrommodal({
          roomId: dataTroedit.roomId,
          roomNumber,
          description,
          price,
          roomStatus,
          roomArea,
        });
        handleCloseTro();
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
      setroomNumber(dataTroedit.roomNumber);
      setprice(dataTroedit.price);
      setdescription(dataTroedit.description);
      setroomArea(dataTroedit.roomArea);
      setroomStatus(dataTroedit.roomStatus);
    }
  }, [dataTroedit]);

  //   console.log(">>>check props : ",dataTroedit)
  return (
    <Modal
      show={show}
      onHide={handleCloseTro}
      size="xl"
      className="modal-add-tro"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chinh sua danh sách</Modal.Title>
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

          {/* <div className="col-md-6">
     <label htmlFor="inputStatus" className="form-label">Tình trạng</label>
     <input
      type="text"
      className="form-control"
      value={roomStatus}
      onChange={(event) => setroomStatus(event.target.value)}
      />
     </div> */}

          <div className="col-md-6">
            <label htmlFor="inputType" className="form-label">
              {" "}
              Trình trạng{" "}
            </label>
            <select
              className="form-select"
              value={roomStatus}
              onChange={(event) => setroomStatus(event.target.value)}
            >
              <option value="Phòng trống ">Phòng trống</option>
              <option value="Đang cho thuê">Đang cho thuê</option>
            </select>
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
        <Button variant="primary" onClick={handleEditTro}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditTro;
