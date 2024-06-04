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
  const [rentAmount, setRentAmount] = useState("");
  const [roomId, setRoomId] = useState("");
  const [renterId, setRenterId] = useState("");

  const handUpdateHd = async () => {
    if (!startDay) {
      toast.error("Please select a start date");
      return;
    }
    const formattedStartDay = startDay.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    let res = await postCreateHd(formattedStartDay, rentAmount, roomId, renterId);
    if (res) {
      setStartDay(null); // Reset startDay to null
      setRentAmount('');
      setRoomId('');
      setRenterId('');
      handleCloseHd('');
      toast.success("Saved successfully");

      handUpdateTableHd({ 
        startDay: formattedStartDay,
        rentAmount: rentAmount,
        roomId: roomId,
        renterId: renterId,
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
      size='l'
      className='modal-add-tro'>
      <Modal.Header closeButton>
        <Modal.Title>Thêm hợp đồng </Modal.Title>
      </Modal.Header>
      <Modal.Body className="body_add_new">
        <form className="row g-3">
         
        <div className="col-md-12">
            <label htmlFor="inputRoomId" className="form-label">Số phòng</label>
            <input
              type="text"
              className="form-control"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputRentAmount" className="form-label">Số lượng người thuê</label>
            <input
              type="text"
              className="form-control"
              value={rentAmount}
              onChange={(event) => setRentAmount(event.target.value)}
            />
          </div>

          

          <div className="col-md-12">
            <label htmlFor="inputRenterId" className="form-label">Tên khách hàng</label>
            <input
              type="text"
              className="form-control"
              value={renterId}
              onChange={(event) => setRenterId(event.target.value)}
            />
          </div>
           <div className="col-md-12">
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
