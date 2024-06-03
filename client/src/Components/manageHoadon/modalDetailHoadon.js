import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTypography,
} from 'mdb-react-ui-kit';

const ModalDetailHoadon = (props) => {
  const { show, handleCloseHoadon, dataDetailHoadon } = props;
  
  

  return (
    <Modal show={show} onHide={handleCloseHoadon} backdrop="static" keyboard={false} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết hóa đơn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MDBContainer className="py-5">
          <MDBCard className="p-4">
            <MDBCardBody>
              <MDBContainer className="mb-2 mt-3">
                <MDBRow className="d-flex align-items-baseline">
                  <MDBCol xl="9">
                    <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                    <strong>Ngày lập hóa đơn:{dataDetailHoadon?.billEndDate || ''}</strong>
        
                    </p>
                  </MDBCol>
                  <MDBCol xl="3" className="float-end">
                    <MDBBtn
                      color="light"
                      ripple="dark"
                      className="text-capitalize border-0"
                    >
                      <MDBIcon fas icon="print" color="primary" className="me-1" />
                      Print
                    </MDBBtn>
                    <MDBBtn
                      color="light"
                      ripple="dark"
                      className="text-capitalize border-0 ms-2"
                    >
                      <MDBIcon
                        far
                        icon="file-pdf"
                        color="danger"
                        className="me-1"
                      />
                      Export
                    </MDBBtn>
                    <hr />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
              <MDBContainer>
                <MDBCol md="12" className="text-center">
                <span className="ms-0"
                 style={{ color: "#5d9fc5", fontSize: "4rem" }}>
                 HÓA ĐƠN 
                  </span>
                  <p className="pt-0">Thuê trọ xin chào !</p>

                  <p className="pt-0"></p>
                </MDBCol>
              </MDBContainer>
              <MDBRow>
                <MDBCol xl="8">
                  <MDBTypography listUnStyled>
                    <li className="text-muted">
                      To: <span style={{ color: "#5d9fc5" }}>Phòng số {dataDetailHoadon?.roomId || ''}</span>
                    </li>
                
                    <li className="text-muted">Thành phố Đà Nẵng</li>
                    <li className="text-muted">
                      <MDBIcon fas icon="phone-alt" /> 0348944811
                    </li>
                  </MDBTypography>
                </MDBCol>
                <MDBCol xl="4">
                  <p className="text-muted">Hóa đơn tiền trọ</p>
                  <MDBTypography listUnStyled>
                    <li className="text-muted">
                      <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                      <span className="fw-bold ms-1">Phương thức thanh toán: {dataDetailHoadon?.paymentMethod || ''}</span>
                    </li>
                    <li className="text-muted">
                      <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                      <span className="fw-bold ms-1">Ngày lập : Ngày </span> {dataDetailHoadon?.billEndDate || ''}
                      -2021
                    </li>
                    <li className="text-muted">
                      <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                      <span className="fw-bold ms-1">Tình trạng:</span>
                      <span className="badge bg-warning text-black fw-bold ms-1">
                      {dataDetailHoadon?.status || ''}
                      </span>
                    </li>
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-2 mx-1 justify-content-center">
                <MDBTable striped borderless>
                  <MDBTableHead
                    className="text-white"
                    style={{ backgroundColor: "#84B0CA" }}
                  >
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Dịch vụ</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Đơn giá</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <th scope="row">1</th>
                      <td> {dataDetailHoadon?.itemName || ''}</td>
                      <td> {dataDetailHoadon?.quantity || ''}</td>
                      <td> {dataDetailHoadon?.unitPrice || ''}</td>
                      <td>{dataDetailHoadon?.totalAmont || ''}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Tiền điện</td>
                      <td>50 kwh</td>
                      <td>3.000 đ</td>
                      <td>150.000 đ</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Tiền nước</td>
                      <td>10 khối</td>
                      <td>7.000 đ</td>
                      <td>70.000 đ</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBRow>
              <MDBRow>
                <MDBCol xl="8">
                  <p className="ms-3">
                    Add additional notes and payment information
                  </p>
                </MDBCol>
                <MDBCol xl="3">
                  <MDBTypography listUnStyled>
                    <li className="text-muted ms-3">
                      <span class="text-black me-4">Tạm tính</span> 1.720.000 đ
                    </li>
                    <li className="text-muted ms-3 mt-2">
                      <span class="text-black me-4">Giảm giá(0%)</span>0 đ
                    </li>
                  </MDBTypography>
                  <p className="text-black float-start">
                    <span className="text-black me-3"> Tổng tiền cần thanh toán   </span>
                    <span style={{ fontSize: "25px" }}>1.720.000 đ</span>
                  </p>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol xl="10">
                  <p>Cảm ơn đã đọc !!</p>
                </MDBCol>
                <MDBCol xl="2">
                  <MDBBtn
                    className="text-capitalize"
                    style={{ backgroundColor: "#60bdf3" }}
                  >
                    Thanh toán
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            <MDBCardFooter className="bg-dark">
              <Button variant="secondary" onClick={handleCloseHoadon}>Đóng</Button>
            </MDBCardFooter>
          </MDBCard>
        </MDBContainer>
        </Modal.Body>
    </Modal>
  );
};

export default ModalDetailHoadon;