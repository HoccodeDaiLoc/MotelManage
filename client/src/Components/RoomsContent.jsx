import React, { useState, useEffect } from "react";
import styles from "../styles/Rooms.modules.scss";
import ReactPaginate from "react-paginate";
import { fetchRoomByFeature } from "../service/RoomService";
import { useNavigate } from "react-router-dom";
import DropDownBoostrap from "./DropDownBoostrap";

function RoomsContent() {
  const [items, setItems] = useState([]); // Use a more descriptive name
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   const getFeature = async (index) => {
  //     let res = await fetchRoomByFeature(index);
  //     console.log(res);
  //   };
  //   getFeature(1);
  // }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/room?limit=12&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [currentPage]);

  const navigate = useNavigate();

  const RoomItem = ({ item, index }) => (
    <div
      className="Room_container"
      key={index}
      onClick={() => navigate(`/Rooms/${item.roomId}`, { state: item })}
    >
      <div className="Room_details_container">
        <div className="img_container">
          <img
            className="room_img"
            src={item.roomImage[0].image.imageUrl}
            alt="Room"
          />
        </div>
        <div className="info">
          <div className="bold">Phòng {item.roomNumber}</div>
          <div className="area">Diện tích phòng {item.roomArea} m²</div>
          <div className="max">Phòng {item.roomStatus}</div>
          <div className="max">Số người ở tối đa {item.maxOccupancy}</div>
          <div className="cost bold">Giá phòng {item.price} vnđ/tháng</div>
        </div>
      </div>
    </div>
  );

  const handlePageClick = (event) => {
    const newCurrentPage = event.selected + 1;
    setCurrentPage(newCurrentPage);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div id="Content_wrapper">
        <div className="dropdownbar">
          <DropDownBoostrap className="DropDownBar" />
        </div>
        <div className="Content">
          {items.map((item, index) => (
            <RoomItem key={index} item={item} />
          ))}
        </div>
        <div className="paginate_container">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={totalPages} //tổng
            marginPagesDisplayed={2} //số page đầu cuối
            pageRangeDisplayed={5} //số page ở giữa
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
            // forcePage={pageOffset}
          />
        </div>
      </div>
    </>
  );
}

export default RoomsContent;
