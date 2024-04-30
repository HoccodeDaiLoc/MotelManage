import { useState, useEffect } from "react";
import moduleName from "./SideBar.modules.scss";
function SideBar() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lượng item mỗi trang
  const totalItems = 30; // Tổng số lượng item

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => setItems(data));
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

  

  const renderItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex).map((item) => (
      <div className="sidebar_container"  key={item.id}>
        <span className="icon_container">
          <img
            className="side_icon"
            src={item.url}
            alt="tang 1"
          ></img>
        </span>
        <span className="text">{item.id}</span>
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
