import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const ModalAddDiennuoc = (props) => {
    const { show, handleCloseHoadon } = props;
    const [roomId, setRoomId] = useState('');
    const [waterNumber, setWaterNumber] = useState('');
    const [waterRecordDate, setWaterRecordDate] = useState(new Date()); 
    const [electricNumber, setElectricNumber] = useState('');
    const [electricRecordDate, setElectricRecordDate] = useState(new Date());

    const addWaterReading = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8080/api/waterReading/room/${roomId}`, {
                waterNumber: waterNumber,
                waterRecordDate: waterRecordDate.toISOString().split('T')[0] // Chuyển đổi ngày thành chuỗi YYYY-MM-DD
            });
            console.log(response.data);
            toast.success("Đã thêm dữ liệu nước thành công");
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi thêm dữ liệu nước");
        }
    };

    const addElectricReading = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8080/api/electricReading/room/${roomId}`, {
                electricNumber: electricNumber,
                electricRecordDate: electricRecordDate.toISOString().split('T')[0] // Chuyển đổi ngày thành chuỗi YYYY-MM-DD
            });
            console.log(response.data);
            toast.success("Đã thêm dữ liệu điện thành công");
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi khi thêm dữ liệu điện");
        }
    };

    const handUpdateHoadon = async () => {
        try {
            handleCloseHoadon();
            await addWaterReading();
            await addElectricReading();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleCloseHoadon}
           
            className="modal-add-tro"
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm vào danh sách</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body_add_new">
                <div className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="inputID" className="form-label">Phòng</label>
                        <input type="text" className="form-control" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputWaterNumber" className="form-label">Số nước</label>
                        <input type="text" className="form-control" value={waterNumber} onChange={(event) => setWaterNumber(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputWaterRecordDate" className="form-label">Ngày ghi nước</label>
                        <DatePicker className="form-control" selected={waterRecordDate} onChange={date => setWaterRecordDate(date)} dateFormat="dd/MM/yyyy" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputElectricNumber" className="form-label">Số điện</label>
                        <input type="text" className="form-control" value={electricNumber} onChange={(event) => setElectricNumber(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputElectricRecordDate" className="form-label">Ngày ghi điện</label>
                        <DatePicker className="form-control" selected={electricRecordDate} onChange={date => setElectricRecordDate(date)} dateFormat="dd/MM/yyyy" />
                    </div>
                </div>
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

export default ModalAddDiennuoc;
