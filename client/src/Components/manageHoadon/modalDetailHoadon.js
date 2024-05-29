// import React from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import style from "../../Components/ManagerApp.modules.scss";
// const ModalDetailHoadon = (props) => {
//   const { show, handleCloseHoadon, dataDetailHoadon } = props;

//   return (
//     <Modal
//       show={show}
//       onHide={handleCloseHoadon}
//       backdrop="static"
//       keyboard={false}
//       dialogClassName="large-modal" // Sử dụng lớp CSS để thiết lập kích thước modal
//       size="xl"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Chi tiết thiết bị</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="body_add_new">
//         <form className="row g-3">
//           <div className="col-md-6">
//             <label htmlFor="inputID" className="form-label">
//               Số Phòng{" "}
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputID"
//               value={dataDetailHoadon.id || ""}
//               readOnly
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputEmail4" className="form-label">
//               Loại Phòng
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="inputEmail4"
//               value={dataDetailHoadon.email || ""}
//               readOnly
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputID" className="form-label">
//               Giá Thuê{" "}
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputID"
//               value={dataDetailHoadon.id || ""}
//               readOnly
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputFirstName" className="form-label">
//               Tình Trạng
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputFirstName"
//               value={dataDetailHoadon.first_name || ""}
//               readOnly
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="inputLastName" className="form-label">
//               Thiết bị
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="inputLastName"
//               value={dataDetailHoadon.last_name || ""}
//               readOnly
//             />
//           </div>
//           <div className="col-12 avatar-container">
//             <label htmlFor="inputAvatar" className="form-label">
//               Ảnh chi tiết phòng
//             </label>
//             <img
//               src={dataDetailHoadon.avatar}
//               alt={`${dataDetailHoadon.first_name} ${dataDetailHoadon.last_name}`}
//               className="img-fluid avatar"
//               id="inputAvatar"
//             />
//           </div>
//         </form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleCloseHoadon}>
//           Đóng
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ModalDetailHoadon;
