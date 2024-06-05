import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postCreateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';


const ModalAddHd = (props) => {
  const { show, handleCloseHd, handUpdateTableHd } = props; // Extract props values
  const [startDay, setStartDay] = useState(null); // Changed initial state to null
  const [endDate, setEndDate] = useState(null); 
  const [rentAmount, setRentAmount] = useState("");
  const [roomId, setRoomId] = useState("");
  const [renterId, setRenterId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  const handUpdateHd = async () => {
    if (!startDay) {
      toast.error("Please select a start date");
      return;
    }
    const formattedStartDay = startDay.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    const formattedEndDay = endDate.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    console.log("Data to be sent to server:");
  console.log("formattedStartDay:", formattedStartDay);
  console.log("rentAmount:", rentAmount);
  console.log("roomId:", roomId);
  console.log("renterId:", renterId);
  console.log("formattedEndDay:", formattedEndDay);
  console.log("depositAmount:", depositAmount);
    let res = await postCreateHd(formattedStartDay, rentAmount, roomId, renterId,formattedEndDay,depositAmount);
    if (res) {
      setStartDay(null); // Reset startDay to null
      setRentAmount('');
      setRoomId('');
      setRenterId('');
      setDepositAmount('')
      setEndDate(null)
      handleCloseHd('');
      toast.success("Saved successfully");

      handUpdateTableHd({ 
        startDay: formattedStartDay,
        rentAmount: rentAmount,
        roomId: roomId,
        renterId: renterId,
        depositAmount:depositAmount,
        endDate:formattedEndDay
      });
      console.log(res.data);
    } else {
      toast.error("An error occurred");
    }
  };

  return (
    <Modal show={show} 
      onHide={handleCloseHd}
      backdrop="static"
      keyboard={false}
      dialogClassName="large-modal"
      size='lg'
      className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Thêm hợp đồng </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
         

          <div className="col-md-12">
            <label htmlFor="inputRentAmount" className="form-label">Số lượng người </label>
            <input
              type="text"
              className="form-control"
              value={rentAmount}
              onChange={(event) => setRentAmount(event.target.value)}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputRoomId" className="form-label">Room ID</label>
            <input
              type="text"
              className="form-control"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputRoomId" className="form-label">Số tiền đặt cọc</label>
            <input
              type="text"
              className="form-control"
              value={depositAmount}
              onChange={(event) => setDepositAmount(event.target.value)}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputRenterId" className="form-label">Renter ID</label>
            <input
              type="text"
              className="form-control"
              value={renterId}
              onChange={(event) => setRenterId(event.target.value)}
            />
          </div>
          
           <div className="col-md-6">
            <label htmlFor="inputStartDay" className="form-label">Ngày bắt đầu </label>
            <div className="date-picker-container">
              <DatePicker
                selected={startDay}
                onChange={(date) => setStartDay(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Chọn ngày bắt đầu"
              />
              
            </div>

            <div className="col-md-6">
            <label htmlFor="inputStartDay" className="form-label">Ngày hết hạn </label>
            <div className="date-picker-container">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Chọn kết thúc"
              />
            </div> 
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseHd}>
          Close
        </Button>
        <Button variant="primary" onClick={handUpdateHd}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddHd;
