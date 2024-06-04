<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import { fetchAllHd,fetchAllTro,fetchAllUser } from "../../service/ManageService";
import ModalEditHd from './modalEditHd'
import ModalAddHd from './modalAddHd';
import ModalConfirmHd from'./modalConfirmHd'
import {debounce} from "lodash";
=======
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllHd } from "../../service/ManageService";
import ModalEditHd from "./modalEditHd";
import ModalAddHd from "./modalAddHd";
import ModalConfirmHd from "./modalConfirmHd";
import { debounce } from "lodash";
>>>>>>> 0f2a363c8acadf1b818392838bad10543b92bd5c
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
 console.log('checkuserroom',listHd)
  useEffect(() => {
    // Call API
    getHd(1);
  }, []);

  // const getHd = async (page) => {
  //   try {
  //     const res = await fetchAllHd(page);
  //     console.log("checkhd", res);
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
      const res = await fetchAllHd(page); // Lấy thông tin các hóa đơn
      if (res && res.data) {
        const { data, total_pages } = res.data;
        setTotalHd(res.data.total);
        setListHd(res.data);
        setTotalPageHd(res.total_pages);
        const hdPromises = res.data.map(async (hd) => {
          try {
            const resTro = await fetchAllTro(hd.roomId);
            const roomNumber = resTro.data[0].roomNumber; // Lấy roomNumber từ kết quả trả về
            const resUser = await fetchAllUser(hd.renterId); // Lấy thông tin người thuê từ renterId
            const name = resUser.renterList[0].name; 
            // Gộp thông tin phòng sử dụng và người thuê vào một đối tượng mới
            const updatedHd = { 
              ...hd,
              roomNumber,
              name
            };
            return updatedHd; // Trả về thông tin hóa đơn sau khi gộp
          } catch (error) {
            console.error("Error fetching Tro or User data:", error);
            return hd; // Trả về hóa đơn ban đầu nếu có lỗi
          }
        });
        Promise.all(hdPromises).then(updatedHoadonList => {
          setListHd(updatedHoadonList); // Cập nhật danh sách hóa đơn với thông tin phòng sử dụng và người thuê
        });
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Error fetching hóa đơn data:", error);
=======
      console.error("Error fetching hd data:", error);
>>>>>>> 0f2a363c8acadf1b818392838bad10543b92bd5c
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
    <>
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
            <th>Người thuê</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày hết hạn</th>
            <th>Khác</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
          {listHd && listHd.map((item, index) => (
            <tr key={`hd-${index}`}>
              <td>{item.roomNumber}</td>
              <td>{item.name}</td>
              <td>{formatDate(item.startDay)}</td> 
              <td>{formatDate(item.endDate)}</td>
              
              <td>
                <button className='btn btn-warning mx-3' onClick={() => handleEditHd(item)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handDeleteHd(item)}>Delete</button>
                <button className='btn btn-success mx-3' onClick={() => handDetailHd(item)}>Chi tiết</button>
              </td>
            </tr>
          ))}
=======
          {listHd &&
            listHd.map((item, index) => (
              <tr key={`hd-${index}`}>
                <td>{item.roomId}</td>
                <td>{item.renterId}</td>
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
>>>>>>> 0f2a363c8acadf1b818392838bad10543b92bd5c
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
    </>
  );
};

export default TableManageHd;
