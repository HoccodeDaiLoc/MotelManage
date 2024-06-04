import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateHoadon } from "../../service/ManageService";
import { toast } from 'react-toastify';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
const ModalAddHoadon = (props) => {
    const { show, handleCloseHoadon, handUpdateTableHoadon } = props;
    const [billStartDate, setBillStartDate] = useState("");
    const [billEndDate, setBillEndDate] = useState("");
    const [payMethod, setPayMethod] = useState("Tiền mặt");
    const [billStatus, setBillStatus] = useState("Chưa thanh toán");
    const [waterPrice, setWaterPrice] = useState("7000");
    const [electricPrice, setElectricPrice] = useState("3000");
    const [roomId, setRoomId] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const handUpdateHoadon = async () => {
        // Định dạng ngày tháng trước khi gửi lên server
        const formattedStartDate = moment(billStartDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const formattedEndDate = moment(billEndDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        let res = await postCreateHoadon(formattedStartDate, formattedEndDate, payMethod, billStatus, waterPrice, electricPrice, roomId);
        console.log("hoadon", res);
        if (res && res) {
            handleCloseHoadon();
            setBillStartDate('');
            setBillEndDate('');
            setPayMethod('');
            setBillStatus('');
            setWaterPrice('');
            setElectricPrice('');
            setRoomId('');
            toast.success("Đã lưu thành công");
            handUpdateTableHoadon({
                billStartDate: formattedStartDate,
                billEndDate: formattedEndDate,
                paymentMethod: payMethod,
                status: billStatus,
                roomId: roomId
            });
        } else {
            toast.error("Đã xảy ra lỗi");
        }
    }
    return (
        <Modal show={show} onHide={handleCloseHoadon} size='lg' className='modal-add-tro'>
            <Modal.Header closeButton>
                <Modal.Title>Thêm vào danh sách</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body_add_new">
                <form className="row g-3">
                  
                    <div className="col-md-6">
                     <label htmlFor="inputID" className="form-label">Ngày bắt đầu :</label>
                      <DatePicker className="form-control" 
                 selected={billStartDate}
                 onChange={date => setBillStartDate(date)}
                 dateFormat="dd-MM-yyyy"
                 />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Ngày lập hóa đơn :</label>
                        <DatePicker className="form-control" 
                   selected={billEndDate}
                   onChange={date => setBillEndDate(date)}
                   dateFormat="dd-MM-yyyy"
                  />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputStatus" className="form-label">Số phòng</label>
                        <input type="text" className="form-control" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
                    </div>
                    <div className="col-md-6">
            <label htmlFor="inputType" className="form-label">Phương thức thanh toán</label>
       <select
      className="form-select"
      value={payMethod}
      onChange={(event) => setPayMethod(event.target.value)}
      >
        <option value="Chuyển khoản">Chuyển khoản</option>
      <option value="Tiền mặt">Tiền mặt</option>

       </select>
            </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Tình trạng</label>
                        <input type="text" className="form-control" value={billStatus} onChange={(event) => setBillStatus(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputStatus" className="form-label">Giá điện</label>
                        <input type="text" className="form-control" value={electricPrice} onChange={(event) => setElectricPrice(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputStatus" className="form-label">Giá nước</label>
                        <input type="text" className="form-control" value={waterPrice} onChange={(event) => setWaterPrice(event.target.value)} />
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
