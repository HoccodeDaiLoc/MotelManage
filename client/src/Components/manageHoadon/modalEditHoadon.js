import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateHoadon } from "../../service/ManageService";
import { toast } from "react-toastify";

const ModalEditHoadon = (props) => {
  const { show, handleCloseHoadon, dataHoadonedit, handleEditHoadonfrommodal } =
    props; // Trích xuất giá trị từ props
  const [name, setNameHoadon] = useState("");
  const [job, setJobHoadon] = useState("");
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
  const handleEditHoadon = async () => {
    if (name) {
      let res = await updateHoadon(name, job);
      if (res && res.updatedAt) {
        handleEditHoadonfrommodal({
          first_name: name,
          id: dataHoadonedit.id,
        });
        handleCloseHoadon();
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
      setNameHoadon(dataHoadonedit.first_name);
      setJobHoadon(dataHoadonedit.job);
    }
  }, [dataHoadonedit]);

  return (
    <Modal
      show={show}
      onHide={handleCloseHoadon}
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
              value={name}
              onChange={(event) => setNameHoadon(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Loại Phòng
            </label>
            <input
              type="text"
              className="form-control"
              value={job}
              onChange={(event) => setJobHoadon(event.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">
              Giá Thuê
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setNameHoadon(event.target.value)}
            />
          </div>
          {/* //List chon */}
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
            <label htmlFor="inputEquipment" className="form-label">
              Thiết bị
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
        <Button variant="secondary" onClick={handleCloseHoadon}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditHoadon}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditHoadon;
