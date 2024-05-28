import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ListGroup from "react-bootstrap/ListGroup";
import style from "../styles/DropDown.modules.scss";
import { useEffect, useState } from "react";
import { fetchRoomByPrice } from "../service/RoomService";
import { useNavigate, useParams } from "react-router-dom";
function DropDownBoostrap({ items }) {
  const [buttonvalue, setButtonvalue] = useState("Giá phòng");
  const [lowerPrice, setLowerPrice] = useState("");
  const [higherPrice, setHigherPrice] = useState("");
  const navigate = useNavigate();
  const [konoState, setKonoState] = useState("");
  useEffect(() => {
    if (
      (lowerPrice !== null && higherPrice !== null) ||
      (lowerPrice !== undefined && higherPrice !== undefined) ||
      (lowerPrice !== "" && higherPrice !== "")
    ) {
      console.log(lowerPrice);
      console.log(higherPrice);
      setKonoState({ lowerPrice, higherPrice });
      console.log("now");
    }
    // {
    //   navigate(
    //     `/room/price?lp=${lowerPrice}&rp=${higherPrice}&limit=12&page=1`,
    //     { state: { lowerPrice, higherPrice } }
    //   );
    // }
  }, [lowerPrice, higherPrice]);
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
              setLowerPrice(0);
              setHigherPrice(1000000);

              // Conditional navigation based on state values
              if (lowerPrice === 0 && higherPrice === 1000000) {
                navigate(
                  `/room/price?lp=${lowerPrice}&rp=${higherPrice}&limit=12&page=1`,
                  { state: konoState }
                );
              }
            }}
          >
            Dưới 1 triệu
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem "
            onClick={() => {
              setLowerPrice(1000000);
              setHigherPrice(1200000);
            }}
          >
            1-1,2 triệu
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              setLowerPrice(1200000);
              setHigherPrice(1500000);
            }}
          >
            1,2-1,5 triệu
          </ListGroup.Item>
          <ListGroup.Item
            className="DropdownItem"
            onClick={() => {
              setLowerPrice(1500000);
              setHigherPrice(8000000);
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
