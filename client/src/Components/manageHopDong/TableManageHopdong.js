import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllHopdong } from "../../service/ManageService";

import ModalEditHd from "./modalEditHopdong"; // Sửa tên thành component viết hoa
import ModalAddHd from "./modalAddHopdong"; // Sửa tên thành component viết hoa
import ModalConfirmHd from "./modalConfirmHopdong";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailHd from "./modalDetailHopdong";
import style from "../../styles/UserHomePage.modules.scss";

const TableManageHopdong = (props) => {
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
    let index = listHd.findIndex((item) => item.id === hd.id);
    cloneListHd[index].first_name = hd.first_name;
    setListHd(cloneListHd);
  };

  useEffect(() => {
    // Call API
    getHd(1);
  }, []);

  const getHd = async (page) => {
    try {
      const res = await fetchAllHopdong(page);

      if (res && res) {
        const { data, total_pages } = res.data;
        setTotalHd(res.total);
        setListHd(res.data);
        setTotalPageHd(res.total_pages);
      }
    } catch (error) {
      console.error("Error fetching hd data:", error);
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
    cloneListHd = cloneListHd.filter((item) => item.id !== hd.id);
    setListHd(cloneListHd);
  };

  const handleDetailHdfrommodal = (hd) => {
    let cloneListhd = _.cloneDeep(listHd);
    let index = listHd.findIndex((item) => item.id == hd.id);
    cloneListhd[index].first_name = hd.first_name;
    setListHd(cloneListhd);
  };

  const handleSearchHd = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneListHd = _.cloneDeep(listHd);
      cloneListHd = cloneListHd.filter((item) =>
        item.first_name.includes(term)
      );
      setListHd(cloneListHd);
    } else {
      getHd(1);
    }
  }, 100);

  const handDetailHd = (hd) => {
    setIsShowModalDetailHd(true);
    setDataDetailHd(hd);
  };
  const truncateName = (name) => {
    if (name.length <= 50) {
      return name;
    }
    return name.slice(0, 50) + "...";
  };
  return (
    <div className="UserInfo_Manager" style={{ width: "80%" }}>
      <div className="my-3 add-new">
        <span>
          <b>Danh sách thiết bị:</b>
        </span>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddHd(true)}
        >
          <i class="fa-solid fa-plug-circle-plus"></i> Thêm Thiết Bị
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm thiết bị "
          onChange={(event) => handleSearchHd(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ whiteSpace: "nowrap" }}>Tên thiết bị</th>
            <th style={{ whiteSpace: "nowrap" }}>Giá thiết bị</th>
            <th style={{ whiteSpace: "nowrap" }}>Phòng sử dụng</th>
            <th style={{ whiteSpace: "nowrap" }}>Khác</th>
          </tr>
        </thead>
        <hdody>
          {listHd &&
            listHd.map((item, index) => (
              <tr key={`hd-${index}`}>
                <td>{truncateName(item.deviceName)}</td>
                <td>{item.devicePrice}</td>
                <td>{item.roomId}</td>
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
                    Chi tiet
                  </button>
                </td>
              </tr>
            ))}
        </hdody>
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

export default TableManageHopdong;
