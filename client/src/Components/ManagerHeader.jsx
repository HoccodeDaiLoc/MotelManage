import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logoApp from '../asset/image/imagethuetro.png';
import "./ManagerHeader.modules.scss"; 
const Header=()=> {
  const location = useLocation();
  const getLinkClass = (path) => (location.pathname === path ? 'active-link' : '');

  const [showSidebar, setShowSidebar] = useState(false); // Set initial value to false
  const [currentPage, setCurrentPage] = useState('Danh Sách Mục Quản lý'); // Initialize with default label

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const updateCurrentPage = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="d-flex justify-content-between align-items-center">

          {/* <button  className="toggle-sidebar-btn my-3"  onClick={toggleSidebar}>
            {currentPage}
          </button> */}

        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col xs={2} className={`bg-light p-3 sidebar ${showSidebar ? 'show' : 'hide'}`}>
            <Nav className={`flex-column ${showSidebar ? 'show' : 'hide'}`}>
              <Nav.Link
                as={Link}
                to="/Home"
                className={`my-2 ${getLinkClass('/Home')}`}
                onClick={() => {
                  updateCurrentPage('Quản lý khách hàng');
                  toggleSidebar();
                }}
              >
                Quản lý khách hàng
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLPT"
                className={`my-2  ${getLinkClass('/pageQLPT')}`}
                onClick={() => {
                  updateCurrentPage('Quản lý phòng trọ');
                  toggleSidebar();
                }}
              >
                Quản lý phòng trọ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLTB"
                className={`update my-2 ${getLinkClass('/pageQLTB')}`}
                onClick={() => {
                  updateCurrentPage('Quản lý thiết bị');
                  toggleSidebar();
                }}
              >
                Quản lý thiết bị
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLHD"
                className={`my-2 ${getLinkClass('/pageQLHD')}`}
                onClick={() => {
                  updateCurrentPage('Quản lý hóa đơn');
                  toggleSidebar();
                }}
              >
                Quản lý hóa đơn
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageQLDN"
                className={`update my-2 ${getLinkClass('/pageQLDN')}`}
                onClick={() => {
                  updateCurrentPage('Quản lý điện nước');
                  toggleSidebar();
                }}
              >
                Quản lý điện nước
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/pageHD"
                className={`update my-2 ${getLinkClass('/pageHD')}`}
                onClick={() => {
                  updateCurrentPage('Quản lý hợp đồng');
                  toggleSidebar();
                }}
              >
                Quản lý hợp đồng
              </Nav.Link>
            </Nav>
          </Col>
          <Col xs={showSidebar ? 10 : 12} className="p-3">
            {/* Main content goes here */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;