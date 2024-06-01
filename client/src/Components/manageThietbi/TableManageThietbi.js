import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllTb } from "../../service/ManageService";

import ModalEditTb from "./modalEditthietbi"; // Sửa tên thành component viết hoa
import ModalAddTb from "./modalAddThietbi"; // Sửa tên thành component viết hoa
import ModalConfirmTb from "./modalConfirmThietbi";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailTb from "./modalDetailThietBi";
import style from "../../styles/UserHomePage.modules.scss";

const TableManageTb = (props) => {
  const [listTb, setListTb] = useState([]);
  const [totalTb, setTotalTb] = useState(0);
  const [totalPageTb, setTotalPageTb] = useState(0);
  const [isShowModalAddTb, setIsShowModalAddTb] = useState(false);
  const [isShowModalEditTb, setIsShowModalEditTb] = useState(false);
  const [dataTbedit, setDataTbEdit] = useState();

  const [isShowModalDeleteTb, setIsShowModalDeleteTb] = useState(false);
  const [dataTbDelete, setDataTbDelete] = useState({});

  const [keyword, setKeyWord] = useState("");

  const [isShowModalDetailTb, setIsShowModalDetailTb] = useState(false);
  const [dataDetailTb, setDataDetailTb] = useState({});

  const handleCloseTb = () => {
    setIsShowModalAddTb(false);
    setIsShowModalEditTb(false);
    setIsShowModalDeleteTb(false);
    setIsShowModalDetailTb(false);
  };

  const handUpdateTableTb = (tb) => {
    setListTb([tb, ...listTb]);
  };

  const handleEditTbfrommodal = (tb) => {
    let cloneListTb = _.cloneDeep(listTb);
    let index = listTb.findIndex((item) => item.deviceId === tb.deviceId);
    cloneListTb[index].deviceName = tb.deviceName;
    cloneListTb[index].devicePrice = tb.devicePrice;
    setListTb(cloneListTb);
  };

  useEffect(() => {
    // Call API
    getTb(1);
  }, []);

  const getTb = async (page) => {
    try {
      const res = await fetchAllTb(page);

      if (res && res) {
        const { data, total_pages } = res.data;
        setTotalTb(res.total);
        setListTb(res.data);
        setTotalPageTb(res.total_pages);
      }
    } catch (error) {
      console.error("Error fetching tb data:", error);
    }
  };

  const handlePageClick = (event) => {
    getTb(+event.selected + 1);
  };

  const handleEditTb = (tb) => {
    setDataTbEdit(tb);
    setIsShowModalEditTb(true);
  };

  const handDeleteTb = (tb) => {
    setIsShowModalDeleteTb(true);
    setDataTbDelete(tb);
  };

  const handDeleteTbFromModal = (tb) => {
    let cloneListTb = _.cloneDeep(listTb);
    cloneListTb = cloneListTb.filter((item) => item.deviceId !== tb.deviceId);
    setListTb(cloneListTb);
  };

  const handleDetailTbfrommodal = (tb) => {
    let cloneListtb = _.cloneDeep(listTb);
    let index = listTb.findIndex((item) => item.id == tb.id);
    cloneListtb[index].first_name = tb.first_name;
    setListTb(cloneListtb);
  };

  const handleSearchTb = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneListTb = _.cloneDeep(listTb);
      cloneListTb = cloneListTb.filter((item) =>
        item.first_name.includes(term)
      );
      setListTb(cloneListTb);
    } else {
      getTb(1);
    }
  }, 100);

  const handDetailTb = (tb) => {
    setIsShowModalDetailTb(true);
    setDataDetailTb(tb);
  };
  return (
    <div
      className="UserInfo_Manager"
      style={{ width: "80%", margin: "0px 0px 0px auto" }}
    >
      <div className="my-3 add-new">
        <span>
          <b>Danh sách thiết bị:</b>
        </span>
        <button
          className="them btn btn-success"
          onClick={() => setIsShowModalAddTb(true)}
        >
          <i class="fa-solid fa-plug-circle-plus"></i> Thêm Thiết Bị
        </button>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm thiết bị "
          onChange={(event) => handleSearchTb(event)}
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
        <tbody>
          {listTb &&
            listTb.map((item, index) => (
              <tr key={`tb-${index}`}>
                <td
                  style={{
                    maxWidth: "450px",
                  }}
                >
                  <p id="text_table">{item.deviceName}</p>
                </td>
                <td>{item.devicePrice}</td>
                <td>{item.roomId}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleEditTb(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handDeleteTb(item)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={() => handDetailTb(item)}
                  >
                    Chi tiet
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
        pageCount={totalPageTb}
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
      <ModalAddTb
        show={isShowModalAddTb}
        handleCloseTb={handleCloseTb}
        handUpdateTableTb={handUpdateTableTb}
      />
      <ModalEditTb
        show={isShowModalEditTb}
        dataTbedit={dataTbedit}
        handleCloseTb={handleCloseTb}
        handleEditTbfrommodal={handleEditTbfrommodal}
      />
      <ModalConfirmTb
        show={isShowModalDeleteTb}
        handleCloseTb={handleCloseTb}
        dataTbDelete={dataTbDelete}
        handDeleteTbFromModal={handDeleteTbFromModal}
      />
      <ModalDetailTb
        show={isShowModalDetailTb}
        dataDetailTb={dataDetailTb}
        handleCloseTb={handleCloseTb}
        handleDetailTbfrommodal={handleDetailTbfrommodal}
      />
    </div>
  );
};

export default TableManageTb;
