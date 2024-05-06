import React, { useState, useEffect } from "react";
import styles from "../styles/Rooms.modules.scss";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

function RoomsContent() {
  const [items, setItems] = useState([]); // Use a more descriptive name
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users?page=${currentPage}`
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

  const RoomItem = ({ item }) => (
    <div className="container" key={item.id}>
      <div onClick={() => navigate(`/Rooms/${item.id}`, { state: item })}>
        <div className="img_container">
          <img className="room_img" src={item.avatar} alt="Room" />
        </div>
        <div className="info">
          <div className="bold">Phòng {item.id}</div>
          <div className="area">Diện tích phòng {item.first_name}</div>
          <div className="max">Số người ở {item.last_name}</div>
          <div className="cost bold">Giá phòng {item.email}</div>
        </div>
        {/* Add a button or visual cue for navigation */}
      </div>
    </div>
  );

  const handlePageClick = (event) => {
    const newCurrentPage = event.selected + 1; // Adjust for 0-based indexing
    setCurrentPage(newCurrentPage);
  };

  return (
    <>
      <div id="Content_wrapper">
        <div className="Content">
          {items.map((item) => (
            <RoomItem key={item.id} item={item} />
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
            pageCount={20} //tổng
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
