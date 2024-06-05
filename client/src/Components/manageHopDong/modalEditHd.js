import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateHd } from "../../service/ManageService";
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'; // Import moment.js for date formatting

const ModalEditHd = (props) => {
    const { show, handleCloseHd, dataHdedit, handleEditHdfrommodal } = props; // Trích xuất giá trị từ props
    const [startDay, setStartDay] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rentAmount, setRentAmount] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [roomId, setRoomId] = useState("");
    const [renterId, setRenterId] = useState("");

    const handleEditHd = async () => {
        if (renterId) {
            // Format dates to 'yyyy-mm-dd'
            const formattedStartDay = startDay ? moment(startDay).format('YYYY-MM-DD') : null;
            const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD') : null;

            console.log('Starting updateHd with:', {
                formattedStartDay, formattedEndDate, rentAmount, depositAmount, roomId, renterId
            });
            
            let res = await updateHd(dataHdedit.contractId, formattedStartDay, formattedEndDate, rentAmount, depositAmount, roomId, renterId);
            console.log('check res:', res);

            if (res) {
                handleEditHdfrommodal({
                    contractId: dataHdedit.contractId,
                    startDay: formattedStartDay,
                    endDate: formattedEndDate,
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

    useEffect(() => {
        if (show) {
            setStartDay(new Date(dataHdedit.startDay));
            setEndDate(new Date(dataHdedit.endDate));
            setRentAmount(dataHdedit.rentAmount);
            setDepositAmount(dataHdedit.depositAmount);
            setRoomId(dataHdedit.roomId);
            setRenterId(dataHdedit.renterId);
        }
    }, [dataHdedit, show]);

    return (
        <Modal show={show} onHide={handleCloseHd} size='xl' className='modal-add-tro'>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa danh sách</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body_add_new">
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="startDay" className="form-label">Ngày bắt đầu</label>
                        <DatePicker
                            className="form-control"
                            selected={startDay}
                            onChange={(date) => setStartDay(date)}
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">Ngày kết thúc</label>
                        <DatePicker
                            className="form-control"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="rentAmount" className="form-label">Số người ở</label>
                        <input type="text" className="form-control" value={rentAmount} onChange={(event) => setRentAmount(event.target.value)} />
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="depositAmount" className="form-label">Tiền cọc</label>
                        <input type="text" className="form-control" value={depositAmount} onChange={(event) => setDepositAmount(event.target.value)} />
                    </div>
                    
                    <div className="col-md-6">
                        <label htmlFor="roomId" className="form-label">Phòng thuê</label>
                        <input type="text" className="form-control" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="renterId" className="form-label">Tên người thuê</label>
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
