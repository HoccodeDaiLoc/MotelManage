import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import style from "../styles/DropDown.modules.scss";
import { useEffect, useState } from "react";
import { fetchRoomByPrice } from "../service/RoomService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RoomFilter from "./RoomFilter";
import RoomPriceFilter from "./RoomPriceFilter";

function DropDownBoostrap({ items }) {
  const [searchParams, setSearchParams] = useSearchParams();
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
              navigate(`/room/price?lp=0&rp=1000000&limit=12&page=1`, {
                state: { lp: 0, hp: 120000 },
              });
            }}
          >
             120.000VNĐ/người
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem "
            onClick={() => {
              navigate(`/room/price?lp=121000&rp=140000&limit=12&page=1`, {
                state: { lp: 120000, hp: 140000 },
              });
            }}
          >
            140.000VNĐ/người
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              navigate(`/room/price?lp=141000&rp=150000&limit=12&page=1`, {
                state: { lp: 140000, hp: 150000 },
              });
            }}
          >
            150.000VNĐ/người
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              navigate(`/room/price?lp=1000000&rp=10000000&limit=12&page=1`, {
                state: { lp: 1000000, hp: 10000000 },
              });
            }}
          >
            1.000.000VNĐ/người 
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
