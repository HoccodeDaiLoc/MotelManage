import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postCreateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';
import FormSelect from 'react-bootstrap/FormSelect';


const ModalAddHd = (props) => {
  const { show, handleCloseHd, handUpdateTableHd } = props; // Extract props values
  const [startDay, setStartDay] = useState(null); // Changed initial state to null
  const [endDate, setEndDate] = useState(null); 
  const [rentAmount, setRentAmount] = useState("");
  const [renterId, setRenterId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const roomMapping = {
    100: 1, 101: 2, 102: 3,  103: 4,104: 5, 105: 6, 106: 7, 107: 8, 108: 9, 109: 10, 
    110: 11, 111: 12, 112: 13, 113: 14, 118: 15, 119: 16, 130: 17, 131: 18, 
    132: 20, 133: 21, 134: 22, 135: 23, 136: 24, 137: 25, 138: 26, 139: 27
  };

  const roomNumbers = Object.keys(roomMapping);
 
  const handUpdateHd = async () => {
    if (!startDay) {
      toast.error("Please select a start date");
      return;
    }
    const roomId = roomMapping[parseInt(roomNumber)];
    if (!roomId) {
      toast.error("Số phòng không hợp lệ");
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
      setRoomNumber ('');
      setRenterId('');
      setDepositAmount('')
      setEndDate(null)
      handleCloseHd('');
      toast.success("Saved successfully");

      handUpdateTableHd({ 
        startDay: formattedStartDay,
        rentAmount: rentAmount,
        renterId: renterId,
        depositAmount:depositAmount,
        endDate:formattedEndDay,
        roomId: roomId,
        roomNumber: parseInt(roomNumber),
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
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputRoomNumber" className="form-label">Thuê phòng số</label>
            <FormSelect 
              className="form-select" 
              value={roomNumber} 
              onChange={(event) => setRoomNumber(event.target.value)}
            >
              <option value="">Chọn phòng....</option>
              {roomNumbers.map((room) => (
                <option key={room} value={room}>Phòng {room}</option>
              ))}
            </FormSelect>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputRoomId" className="form-label">Số tiền đặt cọc</label>
            <input
              type="text"
              className="form-control"
              value={depositAmount}
              onChange={(event) => setDepositAmount(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputRenterId" className="form-label"> ID khách </label>
            <input
              type="text"
              className="form-control"
              value={renterId}
              onChange={(event) => setRenterId(event.target.value)}
              placeholder="Mời bạn nhập thông tin..."
            />
          </div>
          <div className="row">
    <div className="col-md-6 my-3">
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

    <div className="col-md-6 my-3">
        <label htmlFor="inputStartDay" className="form-label">Ngày hết hạn </label>
        <div className="date-picker-container">
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                placeholderText="Chọn ngày kết thúc"
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
