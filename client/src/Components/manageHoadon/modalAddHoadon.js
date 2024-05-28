import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateHoadon } from "../../service/ManageService";
import { toast } from "react-toastify";

const ModalAddHoadon = (props) => {
  const { show, handleCloseHoadon, handUpdateTableHoadon } = props; // Trích xuất giá trị từ props
  const [name, setNameHoadon] = useState("");
  const [job, setJobHoadon] = useState("");

  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const [isReportBrokenVisible, setIsReportBrokenVisible] = useState("");

  const handUpdateImageHoadon = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files);
    } else {
      // setPreviewImage('');
    }
    // console.log('upload file', event.target.files[0]);
  };

  const toggleReportBrokenVisibility = () => {
    setIsReportBrokenVisible(!isReportBrokenVisible);
  };

  const handUpdateHoadon = async () => {
    let res = await postCreateHoadon(name, job);
    if (res && res.id) {
      handleCloseHoadon();
      setNameHoadon("");
      setJobHoadon("");
      toast.success("Đã lưu thành công");
      handUpdateTableHoadon({ first_name: name, id: res.id });
    } else {
      toast.error("Đã xảy ra lỗi");
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseHoadon}
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
              Loại Thiết Bị
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setNameHoadon(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Tên Khách Thuê
            </label>
            <input
              type="text"
              className="form-control"
              value={job}
              onChange={(event) => setJobHoadon(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label
              htmlFor="inputPrice"
              className="form-label"
              onClick={toggleReportBrokenVisibility}
            >
              Báo Hỏng
            </label>
            {isReportBrokenVisible && (
              <select
                className="form-select"
                onChange={(event) => setNameHoadon(event.target.value)}
              >
                <option value="">Có</option>
                <option value="">Không</option>
              </select>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="inputStatus" className="form-label">
              Phòng sử dụng
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setNameHoadon(event.target.value)}
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
              onChange={(event) => handUpdateImageHoadon(event)}
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
        <Button variant="secondary" onClick={handleCloseHoadon}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handUpdateHoadon}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddHoadon;
