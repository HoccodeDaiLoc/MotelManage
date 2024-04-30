import { useState, useRef, useEffect } from "react";
 import SideBar from "../SideBar";
import moduleName from "./ContentStyle.modules.scss";

function Content() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Số lượng item mỗi trang
  const totalItems = items.length; // Tổng số lượng item
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Total number of pages

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(pageNumber, 1), totalPages)); // Ensure valid page numbers
  };
  const handleBegin = () => handlePageChange(1);
  const handleLast = () => handlePageChange(totalPages);


  
  const Render = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex).map((item) => (
      <div className="room_container" key={item.id}>
        <img className="room_img" src={item.image} alt="anh" />{" "}
        <div className="word_contain">
          <div className="room_number bold">Phòng {item.id}</div>
          <div className="room_area">Diện tích phòng{item.id}</div>
          <div className="room_max">Số người ở {item.rating.rate}</div>
          <div className="room_cost bold"> Giá phòng {item.price}</div>
        </div>
      </div>
    ));
  };
  const generatePageButtons = () => {
    const buttonCount = 5; // Number of buttons to display
    const midButtonIndex = Math.floor(buttonCount / 2); // Index of the middle button
    let startPage =0;
     startPage = Math.max(1, currentPage - midButtonIndex + 1); // Starting page number
     let endPage = totalPages; // Ending page number

    // Adjust starting page to ensure at least two buttons on the left for the first half
    if (startPage === 1 && buttonCount > 2) {
      startPage = Math.max(1, endPage - buttonCount + 2);
    }

    // Adjust ending page to ensure at least two buttons on the right for the second half
    if (endPage === totalPages && buttonCount > 2) {
      endPage = Math.min(totalPages, startPage + buttonCount - 3);
    }

    return Array(buttonCount)
      .fill(null)
      .map((_, index) => {
        const pageNumber = startPage + index;
        return (
          <span key={index} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber === currentPage ? (
              <b>{pageNumber}</b> // Bold the current page
            ) : (
              pageNumber
            )}
          </span>
        );
      });
  };
  return (    <div>
    <span onClick={handleBegin}>
      <button>Đầu</button>
    </span>

    {generatePageButtons()}

    <span onClick={handleLast}>
      <button>Cuối</button>
    </span>

    <div id="Content_wrapper">{Render()}</div>
  </div>
  );
}

export default Content;
