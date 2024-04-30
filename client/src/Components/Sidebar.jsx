import { useState, useEffect } from "react";
import styles from "../styles/SideBar.modules.scss";
function SideBar() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng item mỗi trang
  const totalItems = 30; // Tổng số lượng item  
  const [currentKind,SetCurrentKind] = ("");
  useEffect(() => {
    fetch("https://noneedtoaskthereasonswhy.onrender.com/api/v1/plants")
      .then((response) => response.json())
      .then((data) => setItems(data.plants));
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };  
  const ReturnKind=(kind)=>{
    SetCurrentKind(kind);
  }
  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex).map((item) => (
      <div className="sidebar_container"  key={item.id} onClick={()=>{ReturnKind(item.id)}}>
        <span className="icon_container">
          <img
            className="side_icon"
            src={item.thumb_img_url}
            alt="tang 1"
          ></img>
        </span>
        <span className="text">{item.common_name}</span>
      </div>
    ));
  };

  return (
    <div id="SideBar_wrapper">
      <span onClick={handlePrevious}>
        <img
          className="side_button"
          src="https://www.svgrepo.com/show/408765/left-arrow-direction.svg"
        ></img>
      </span>

      {renderItems()}

      <span onClick={handleNext}>
        <img
          className="side_button rotate"
          src="https://www.svgrepo.com/show/408765/left-arrow-direction.svg"
        ></img>
      </span>
    </div>
  );
}

export default SideBar;
