import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllHoadon } from "../../service/ManageService";
// Sửa tên thành component viết hoa
import ModalAddHoadon from "./modalAddHoadon"; // Sửa tên thành component viết hoa
import ModalConfirmHoadon from "./modalConfirmHoadon";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailHoadon from "./modalDetailHoadon";
import ModalEditHoadon from "./modalEditHoadon";
import { CSVLink, CSVDownload } from "react-csv";

const TableManageHoadon = (props) => {
  const [listHoadon, setListHoadon] = useState([]);
  const [totalHoadon, setTotalHoadon] = useState(0);
  const [totalPageHoadon, setTotalPageHoadon] = useState(0);
  const [isShowModalAddHoadon, setIsShowModalAddHoadon] = useState(false);
  const [isShowModalEditHoadon, setIsShowModalEditHoadon] = useState(false);
  const [dataHoadonedit, setDataHoadonEdit] = useState({});

  const [isShowModalDeleteHoadon, setIsShowModalDeleteHoadon] = useState(false);
  const [dataHoadonDelete, setDataHoadonDelete] = useState({});

  const [keyword, setKeyWord] = useState("");

  const [isShowModalDetailHoadon, setIsShowModalDetailHoadon] = useState(false);
  const [dataDetailHoadon, setDataDetailHoadon] = useState({});

  const [dataExport, serDataExport] = useState([]);

  const handleCloseHoadon = () => {
    setIsShowModalAddHoadon(false);
    setIsShowModalEditHoadon(false);
    setIsShowModalDeleteHoadon(false);
    setIsShowModalDetailHoadon(false);
  };

  const handUpdateTableHoadon = (hoadon) => {
    setListHoadon([hoadon, ...listHoadon]);
  };

  const handleEditHoadonfrommodal = (hoadon) => {
    let cloneListHoadon = _.cloneDeep(listHoadon);
    let index = listHoadon.findIndex((item) => item.id === hoadon.id);
    cloneListHoadon[index].first_name = hoadon.first_name;
    setListHoadon(cloneListHoadon);
  };

  useEffect(() => {
    // Call API
    getHoadon(1);
  }, []);

  const getHoadon = async (page) => {
    try {
      const res = await fetchAllHoadon(page);
      if (res && res.data) {
        const { data, total_pages } = res.data;
        setTotalHoadon(res.data.total);
        setListHoadon(res.data);
        setTotalPageHoadon(res.total_pages);
      }
    } catch (error) {
      console.error("Error fetching hoadon data:", error);
    }
  };

  const handlePageClick = (event) => {
    getHoadon(+event.selected + 1);
  };

  const handleEditHoadon = (hoadon) => {
    setDataHoadonEdit(hoadon);
    setIsShowModalEditHoadon(true);
  };

  const handDeleteHoadon = (hoadon) => {
    setIsShowModalDeleteHoadon(true);
    setDataHoadonDelete(hoadon);
  };

  const handDeleteHoadonFromModal = (hoadon) => {
    let cloneListHoadon = _.cloneDeep(listHoadon);
    cloneListHoadon = cloneListHoadon.filter((item) => item.id !== hoadon.id);
    setListHoadon(cloneListHoadon);
  };

  const handleDetailHoadonfrommodal = (hoadon) => {
    let cloneListhoadon = _.cloneDeep(listHoadon);
    let index = listHoadon.findIndex((item) => item.id == hoadon.id);
    cloneListhoadon[index].first_name = hoadon.first_name;
    setListHoadon(cloneListhoadon);
  };

  const handleSearchHoadon = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let cloneListHoadon = _.cloneDeep(listHoadon);
      cloneListHoadon = cloneListHoadon.filter((item) =>
        item.first_name.includes(term)
      );
      setListHoadon(cloneListHoadon);
    } else {
      getHoadon(1);
    }
  }, 100);

  const handDetailHoadon = (hoadon) => {
    setIsShowModalDetailHoadon(true);
    setDataDetailHoadon(hoadon);
  };

  const getHoadonExport = (event, done) => {
    let result = [];
    if (listHoadon && listHoadon.length > 0) {
      result.push([
        "STT",
        ["Phòng số"],
        ["Tên người thuê"],
        ["Tiền điện nước"],
        ["Tổng hóa đơn"],
      ]);
      listHoadon.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        arr[4] = item.id;
        result.push(arr);
      });
      serDataExport(result);
      done();
    }
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>Danh sách Hoa don:</b>
        </span>
        <div className="group-btns">
          <CSVLink
            filename={"Hoadon.csv"}
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getHoadonExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Download
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddHoadon(true)}
          >
            <i class="fa-solid fa-plug-circle-plus"></i> Thêm Hoa Don
          </button>
        </div>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm thiết bị "
          onChange={(event) => handleSearchHoadon(event)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Phòng sử dụng</th>
            <th>Tiền điện nước</th>
            <th>Tổng hóa đơn</th>
            <th>Khác</th>
          </tr>
        </thead>
        <tbody>
          {listHoadon &&
            listHoadon.map((item, index) => (
              <tr key={`hoadon-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
               
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleEditHoadon(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handDeleteHoadon(item)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={() => handDetailHoadon(item)}
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
        pageCount={totalPageHoadon}
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
      <ModalAddHoadon
        show={isShowModalAddHoadon}
        handleCloseHoadon={handleCloseHoadon}
        handUpdateTableHoadon={handUpdateTableHoadon}
      />
      <ModalEditHoadon
        show={isShowModalEditHoadon}
        dataHoadonedit={dataHoadonedit}
        handleCloseHoadon={handleCloseHoadon}
        handleEditHoadonfrommodal={handleEditHoadonfrommodal}
      />
      <ModalConfirmHoadon
        show={isShowModalDeleteHoadon}
        handleCloseHoadon={handleCloseHoadon}
        dataHoadonDelete={dataHoadonDelete}
        handDeleteHoadonFromModal={handDeleteHoadonFromModal}
      />
      <ModalDetailHoadon
        show={isShowModalDetailHoadon}
        dataDetailHoadon={dataDetailHoadon}
        handleCloseHoadon={handleCloseHoadon}
        handleDetailHoadonfrommodal={handleDetailHoadonfrommodal}
      />
    </>
  );
};

export default TableManageHoadon;
