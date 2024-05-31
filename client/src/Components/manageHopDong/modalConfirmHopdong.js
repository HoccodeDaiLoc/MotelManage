// import React from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { deleteHd } from "../../service/ManageService";
// import { toast } from "react-toastify";

// const ModalConfirmHd = (props) => {
//   const { show, handleCloseHd, handDeleteHdFromModal, dataHdDelete } = props;

//   const confirmDelete = async () => {
//     let res = await deleteHd(dataHdDelete.id);
//     if (res && +res.statusCode === 204) {
//       toast.success("Xóa thành công");
//       handleCloseHd();
//       handDeleteHdFromModal(dataHdDelete);
//     } else {
//       toast.error("Xóa không thành công");
//     }
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={handleCloseHd}
//       backdrop="static"
//       keyboard={false}
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Xóa thiết bị</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="body_add_new">
//           Xác nhận xóa!
//           <br />
//           <b>Tên thiết bị: {dataHdDelete.first_name}</b>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleCloseHd}>
//           Đóng
//         </Button>
//         <Button variant="primary" onClick={confirmDelete}>
//           Xác nhận
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ModalConfirmHd;
