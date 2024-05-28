import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import logoApp from "../asset/image/imagethuetro.png";
import "./ManagerHeader.modules.scss"; // Import custom styles

function Header() {
  const location = useLocation();
  const getLinkClass = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#Home">
          <img
            src={logoApp}
            width="200"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/Home"
              className={`mx-2 ${getLinkClass("/Home")}`}
            >
              Quản lý khách hàng
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pageQLPT"
              className={`mx-2 ${getLinkClass("/pageQLPT")}`}
            >
              Quản lý phòng trọ
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pageQLHD"
              className={`mx-2 ${getLinkClass("/pageQLHD")}`}
            >
              Quản lý hóa đơn
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pageQLTB"
              className={`update mx-2 ${getLinkClass("/pageQLTB")}`}
            >
              Quản lý thiết bị
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pageHD"
              className={`update mx-2 ${getLinkClass("/pageHD")}`}
            >
              Quản lý hợp đồng
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/pageQLDN"
              className={`update mx-2 ${getLinkClass("/pageQLDN")}`}
            >
              Quản lý điện nước
            </Nav.Link>
            <button className={`bell-icon ${getLinkClass("/pageTb")}`}>
              <i className="fa-solid fa-bell fa-lg"></i>
            </button>
            <NavDropdown
              title={<i className="  fa-solid fa-circle-user"> User</i>}
              className={`tk`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Báo cáo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Hỗ trợ</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
