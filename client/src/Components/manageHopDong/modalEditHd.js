import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';




const ModalEditHd = (props) => {
  const { show, handleCloseHd ,dataHdedit ,handleEditHdfrommodal } = props; // Trích xuất giá trị từ props
  const [startDay, setStartDay] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [roomId, setRoomId] = useState("");
  const [renterId, setRenterId] = useState("");

 const handleEditHd = async () => {
    if (renterId) {
      console.log('Starting updateHd with:', {
        startDay, endDate, rentAmount, depositAmount, roomId ,renterId});
        const formattedstartDay = startDay.toISOString().split("T")[0];
        const formattedendDate = endDate.toISOString().split("T")[0];
      let res = await updateHd( dataHdedit.contractId,
        startDay, endDate, rentAmount, depositAmount, roomId ,renterId);
      console.log('check res:', res);

      if (res) {
        handleEditHdfrommodal({
          contractId: dataHdedit.contractId,
          formattedstartDay,
          formattedendDate,
          rentAmount,
          depositAmount,
          roomId,
          renterId
        });
        handleCloseHd();
        toast.success("Update thành công");
      } else {
        toast.error("Update thất bại");
      }
    } else {
      toast.error("Vui lòng nhập tên trước khi lưu");
    }
  };
  useEffect(()=>{
   if (show){
    setStartDay(dataHdedit.startDay)
    setEndDate(dataHdedit.endDate)
    setRentAmount(dataHdedit.rentAmount)
    setDepositAmount(dataHdedit.depositAmount)
    setRoomId(dataHdedit.roomId)
    setRenterId(dataHdedit.renterId)
   }
  },[dataHdedit])
  
//   console.log(">>>check props : ",dataHdedit)
  return (
    <Modal show={show}
     onHide={handleCloseHd}
     size ='xl'
     className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Chinh sua danh sách</Modal.Title>
      </Modal.Header>
       <Modal.Body className="body_add_new"   >
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputID" className="form-label">Ngày bắt đầu</label>
            <input
              type="text" className="form-control" value={startDay} onChange={(event) => setStartDay(event.target.value)} />
          </div>


          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">Ngày kết thúc</label>
            <input type="text" className="form-control" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">Số người ở</label>
            <input type="text" className="form-control" value={rentAmount} onChange={(event) => setRentAmount(event.target.value)} />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">Tiền cọc</label>
            <input type="text" className="form-control" value={depositAmount} onChange={(event) => setDepositAmount(event.target.value)} />
          </div>
          
          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">Phòng thuê</label>
            <input type="text" className="form-control" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPrice" className="form-label">Tên người thuê</label>
            <input type="text" className="form-control" value={renterId} onChange={(event) => setRenterId(event.target.value)} />
          </div>


        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseHd}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleEditHd}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditHd;