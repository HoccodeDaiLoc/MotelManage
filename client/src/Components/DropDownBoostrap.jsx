import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import style from "../styles/DropDown.modules.scss";
import { useState } from "react";
function DropDownBoostrap({ props }) {
  const [buttonvalue, setButtonvalue] = useState("Giá phòng");
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
          <ListGroup.Item>This</ListGroup.Item>
          <ListGroup.Item>ListGroup</ListGroup.Item>
          <ListGroup.Item>renders</ListGroup.Item>
          <ListGroup.Item>horizontally!</ListGroup.Item>
        </ListGroup>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setButtonvalue("Giá phòng");
            }}
          >
            Giá phòng
          </Dropdown.Item>
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
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownBoostrap;
