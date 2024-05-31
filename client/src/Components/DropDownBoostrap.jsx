import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import style from "../styles/DropDown.modules.scss";
import { useEffect, useState } from "react";
import { fetchRoomByPrice } from "../service/RoomService";
import { useNavigate, useParams } from "react-router-dom";
function DropDownBoostrap({ items }) {
  const [buttonvalue, setButtonvalue] = useState("Giá phòng");
  const navigate = useNavigate();
  return (
    <div className="Dropdown_container">
      <Dropdown className="Dropdown">
        <Dropdown.Toggle
          className="DropdownButton"
          variant="success"
          id="dropdown-basic"
        >
          {buttonvalue}
        </Dropdown.Toggle>
        <ListGroup className="DropdownListGroup" horizontal>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              navigate(`/room/price?lp=0&rp=1000000&limit=12&page=1`);
            }}
          >
            Dưới 1 triệu
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem "
            onClick={() => {
              navigate(`/room/price?lp=1000000&rp=1200000&limit=12&page=1`);
            }}
          >
            1-1,2 triệu
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              navigate(`/room/price?lp=1200000&rp=1500000&limit=12&page=1`);
            }}
          >
            1,2-1,5 triệu
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              navigate(`/room/price?lp=1500000&rp=15000000&limit=12&page=1`);
            }}
          >
            Hơn 1,5 triệu
          </ListGroup.Item>
        </ListGroup>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setButtonvalue("Giá phòng");
            }}
          >
            Giá phòng
          </Dropdown.Item>
          {/* 
          <Dropdown.Item
            onClick={() => {
              setButtonvalue("Diện tích");
            }}
          >
            Diện tích
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setButtonvalue("Số người ở");
            }}
          >
            Số người ở
          </Dropdown.Item>
          */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownBoostrap;
