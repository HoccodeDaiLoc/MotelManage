import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/Rooms.modules.scss";
import Pagination from "../Components/Pagination";
import { useNavigate } from "react-router-dom";

function RoomsContent() {
  const [SetItem, setSetItem] = useState([]);
  const [totalpage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    // fetch(`https://noneedtoaskthereasonswhy.onrender.com/api/v1/plants/2/image?page=${currentPage}`)
    fetch(`https://noneedtoaskthereasonswhy.onrender.com/api/v1/plants/2/image?page=${currentPage}`)
    .then((response)=>response.json())
    .then((data)=>{
      const images = data.plant_imgs;
      setTotalPage(data.total_pages);
      setSetItem(images)})  
  },[currentPage])

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage < totalpage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const Navigate = useNavigate();
  return (
    <>
      <div id="Content_wrapper">
        <div className="Content">
        {console.log(totalpage)}
        {SetItem.map((item,index) => (
          <div
            className="container"
            key={index} //key giúp định danh => dễ xóa sửa
            //khi cập nhật, nó sẽ so sánh phần tử cũ mới, nếu key giữ nguyên pt = > khỏi cn
            onClick={() => {
              Navigate(`/Rooms/${index}`, { state: item });
            }}
          >
            <div className="img_container">
            <img className="room_img" src={item.img_url} alt="anh" />

            </div>
            <div className="info">
              <div className="bold">Phòng {item.organ}</div>
              <div className="area">Diện tích phòng {item.organ}</div>
              <div className="max">Số người ở {item.organ}</div>
              <div className="cost bold">Giá phòng {item.organ}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Trang trước
      </button>
      <span>
        {currentPage} / {totalpage}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalpage}>
        Trang sau
      </button>
      </div>


    </>
  );
}

export default RoomsContent;
