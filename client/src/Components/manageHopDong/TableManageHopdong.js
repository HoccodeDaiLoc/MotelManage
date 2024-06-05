import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import {
  fetchAllHd,
  fetchAllTro,
  fetchAllUser,
} from "../../service/ManageService";
import ModalEditHd from "./modalEditHd";
import ModalAddHd from "./modalAddHd";
import ModalConfirmHd from "./modalConfirmHd";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailHd from "./modalDetailHd";
import { BiSolidBookAdd } from "react-icons/bi";
const TableManageHd = (props) => {
  const [listHd, setListHd] = useState([]);
  const [totalHd, setTotalHd] = useState(0);
  const [totalPageHd, setTotalPageHd] = useState(0);

  const [isShowModalAddHd, setIsShowModalAddHd] = useState(false);
  const [isShowModalEditHd, setIsShowModalEditHd] = useState(false);
  const [dataHdedit, setDataHdEdit] = useState({});

  const [isShowModalDeleteHd, setIsShowModalDeleteHd] = useState(false);
  const [dataHdDelete, setDataHdDelete] = useState({});

  const [keyword, setKeyWord] = useState("");

  const [updatedHoadonList, setUpdatedHoadonList] = useState([]);

  const [isShowModalDetailHd, setIsShowModalDetailHd] = useState(false);
  const [dataDetailHd, setDataDetailHd] = useState({});
  const formatDate = (date) => {
    if (!date) return "";

    const formattedDate = new Date(date).toLocaleDateString("vi-VN");

    return formattedDate;
  };
  
  const handleCloseHd = () => {
    setIsShowModalAddHd(false);
    setIsShowModalEditHd(false);
    setIsShowModalDeleteHd(false);
    setIsShowModalDetailHd(false);
  };

  const handUpdateTableHd = (hd) => {
    setListHd([hd, ...listHd]);
  };

  const handleEditHdfrommodal = (hd) => {
    let cloneListHd = _.cloneDeep(listHd);
    let index = listHd.findIndex((item) => item.contractId === hd.contractId);
    cloneListHd[index].startDay = hd.startDay;
    cloneListHd[index].endDate = hd.endDate;
    cloneListHd[index].rentAmount = hd.rentAmount;
    cloneListHd[index].depositAmount = hd.depositAmount;
    cloneListHd[index].roomId = hd.roomId;
    cloneListHd[index].renterId = hd.roomId;

    setListHd(cloneListHd);
  };
 
  useEffect(() => {
    // Call API
    getHd(1);
  }, []);

  // const getHd = async (page) => {
  //   try {
  //     const res = await fetchAllHd(page);
  
  //     if (res && res) {
  //       const { data, total_pages } = res.data;
  //       setTotalHd(res.data.total);
  //       setListHd(res.data);
  //       setTotalPageHd(res.total_pages);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching hd data:', error);
  //   }
  // };
  const getHd = async (page) => {
    try {
      const res = await fetchAllHd(page);
      if (res && res.data) {
        const { data, total_pages } = res.data;
        setTotalHd(res.data.total);
        setTotalPageHd(res.total_pages);
        const roomNumberPromises = res.data.map(async (hd) => {
          try {
        
            const resTro = await fetchAllTro(hd.roomId);
            const roomNumber = resTro.data[0].roomNumber;
            return { ...hd, roomNumber };
          } catch (error) {
            console.error("Error fetching Tro data for roomNumber:", error);
            return hd;
          }
        });
        Promise.all([...roomNumberPromises]).then((updatedHoadonList) => {
          setListHd(updatedHoadonList); 
        });
      }
    } catch (error) {
      console.error("Error fetching hóa đơn data:", error);
    }
  };
  

  const handlePageClick = (event) => {
    getHd(+event.selected + 1);
  };

  const handleEditHd = (hd) => {
    setDataHdEdit(hd);
    setIsShowModalEditHd(true);
  };

  const handDeleteHd = (hd) => {
    setIsShowModalDeleteHd(true);
    setDataHdDelete(hd);
  };

  const handDeleteHdFromModal = (hd) => {
    let cloneListHd = _.cloneDeep(listHd);
    cloneListHd = cloneListHd.filter(
      (item) => item.contractId !== hd.contractId
    );
    setListHd(cloneListHd);
  };

  const handleDetailHdfrommodal = (hd) => {
    let cloneListHd = _.cloneDeep(listHd);
    let index = listHd.findIndex((item) => item.id == hd.id);
    cloneListHd[index].first_name = hd.first_name;
    setListHd(cloneListHd);
  };

  const handleSearchHd = debounce((event) => {
    let term = event.target.value;
    if (term) {
      fetch(`http://127.0.0.1:8080/api/contract/room/${term}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.contract) {
            setListHd([data.contract]); // Cập nhật danh sách hợp đồng với dữ liệu mới từ API
          } else {
            // Xử lý trường hợp 'contract' không được trả về từ API
          }
        })
        .catch((error) => console.error("Error:", error));
    } else {
      getHd(1); // Nếu không có term thì reset danh sách hợp đồng
    }
  }, 300);

  const handDetailHd = (hd) => {
    setIsShowModalDetailHd(true);
    setDataDetailHd(hd);
  };

  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("vi-VN").format(price) + " VND";
  };

  return (
    <div
      className="UserInfo_Manager"
      style={{ width: "80%", margin: "0px 0px 0px auto" }}
    >
      {" "}
      <div className="my-3 add-new">
        <span>
          <b>Danh sách phòng trọ:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddHd(true)}
        >
          <BiSolidBookAdd
            className="mr-2 mx-1"
            style={{ fontSize: "1.5em", marginTop: "-5px" }}
          />
          Thêm Hợp Đồng
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm hợp đồng"
          onChange={(event) => handleSearchHd(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Phòng thuê</th>
            <th>Số lượng thuê</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày hết hạn</th>
            <th>Khác</th>
          </tr>
        </thead>
        <tbody>
          {listHd &&
            listHd.map((item, index) => (
              <tr key={`hd-${index}`}>
                <td>{item.roomNumber}</td>
                <td>{item.rentAmount} người</td>
                <td>{formatDate(item.startDay)}</td>
                <td>{formatDate(item.endDate)}</td>

                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleEditHd(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handDeleteHd(item)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={() => handDetailHd(item)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageHd}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddHd
        show={isShowModalAddHd}
        handleCloseHd={handleCloseHd}
        handUpdateTableHd={handUpdateTableHd}
      />
      <ModalEditHd
        show={isShowModalEditHd}
        dataHdedit={dataHdedit}
        handleCloseHd={handleCloseHd}
        handleEditHdfrommodal={handleEditHdfrommodal}
      />
      <ModalConfirmHd
        show={isShowModalDeleteHd}
        handleCloseHd={handleCloseHd}
        dataHdDelete={dataHdDelete}
        handDeleteHdFromModal={handDeleteHdFromModal}
      />
      <ModalDetailHd
        show={isShowModalDetailHd}
        dataDetailHd={dataDetailHd}
        handleCloseHd={handleCloseHd}
        handleDetailHdfrommodal={handleDetailHdfrommodal}
      />
    </div>
  );
};

export default TableManageHd;
