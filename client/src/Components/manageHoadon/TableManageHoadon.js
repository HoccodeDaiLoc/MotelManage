import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllHoadon, fetchAllstatusHd } from "../../service/ManageService";
import ModalAddHoadon from "./modalAddHoadon"; // Sửa tên thành component viết hoa
import ModalAddDiennuoc from "./modalAddDiennuoc";
import ModalConfirmHoadon from "./modalConfirmHoadon";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailHoadon from "./modalDetailHoadon";
import ModalEditHoadon from "./modalEditHoadon";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";

const TableManageHoadon = (props) => {
  const [listHoadon, setListHoadon] = useState([]);
  const [totalHoadon, setTotalHoadon] = useState(0);
  const [totalPageHoadon, setTotalPageHoadon] = useState(0);
  const [isShowModalAddHoadon, setIsShowModalAddHoadon] = useState(false);
  const [isShowModalEditHoadon, setIsShowModalEditHoadon] = useState(false);
  const [isShowModalAddDiennuoc, setIsShowModalAddDiennuoc] = useState(false);
  const [dataHoadonedit, setDataHoadonEdit] = useState({});
  const [isShowModalDeleteHoadon, setIsShowModalDeleteHoadon] = useState(false);
  const [dataHoadonDelete, setDataHoadonDelete] = useState({});
  const [keyword, setKeyWord] = useState("");
  const [isShowModalDetailHoadon, setIsShowModalDetailHoadon] = useState(false);
  const [dataDetailHoadon, setDataDetailHoadon] = useState({});
  const [dataExport, serDataExport] = useState([]);
  const [status, setStatus] = useState("all");

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toLocaleDateString("vi-VN");
    return formattedDate;
  };
  const formatCurrency = (amount) => {
    if (amount) {
      return amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
    return null; // hoặc trả về một giá trị mặc định khác nếu cần thiết
  };

  const getHoadonByStatus = (status) => {
    return axios
      .get(`http://127.0.0.1:8080/api/bill?status=${status}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching bill data by status:", error);
      });
  };

  const handleCloseHoadon = () => {
    setIsShowModalAddHoadon(false);
    setIsShowModalEditHoadon(false);
    setIsShowModalDeleteHoadon(false);
    setIsShowModalDetailHoadon(false);
    setIsShowModalAddDiennuoc(false);
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
      console.log("checkhoadon", res);
      if (res) {
        const { data, total_pages } = res.data;
        setTotalHoadon(res.data.total);
        setListHoadon(res.data && res.data);
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
    cloneListHoadon = cloneListHoadon.filter(
      (item) => item.billId !== hoadon.billId
    );
    setListHoadon(cloneListHoadon);
  };

  const handleDetailHoadonfrommodal = (hoadon) => {
    let cloneListhoadon = _.cloneDeep(listHoadon);
    let index = listHoadon.findIndex((item) => item.id == hoadon.id);
    cloneListhoadon[index].first_name = hoadon.first_name;
    setListHoadon(cloneListhoadon);
  };

  const getHoadonExport = (event, done) => {
    let result = [];
    if (listHoadon && listHoadon.length > 0) {
      result.push([
        "Phòng số",
        ["Ngày lập"],
        ["Hạn thanh toán"],
        ["Tổng hóa đơn"],
        ["Phương thức"],
        ["Tình trạng"],
      ]);
      listHoadon.map((item) => {
        let arr = [];
        arr[0] = item.roomId;
        arr[1] = item.billStartDate;
        arr[2] = item.billEndDate;
        arr[3] = item.total;
        arr[4] = item.paymentMethod;
        arr[5] = item.status;
        result.push(arr);
      });
      serDataExport(result);
      done();
    }
  };

  const handleGetHoadonByStatus = async (status) => {
    console.log("status", status);
    try {
      let res;
      if (status === "all") {
        res = await fetchAllHoadon(1);
      } else {
        res = await getHoadonByStatus(status);
      }
      setListHoadon(res.data);
    } catch (error) {
      console.error("Error handling bill data by status:", error);
    }
  };

  const handleSearchHoadon = _.debounce((term) => {
    if (term) {
      let cloneListHoadon = _.cloneDeep(listHoadon);

      cloneListHoadon = cloneListHoadon.filter((item) =>
        item.first_name.toLowerCase().includes(term.toLowerCase())
      );

      setListHoadon(cloneListHoadon);
    } else {
      getHoadon(1);
    }
  }, 300);

  const handDetailHoadon = (hoadon) => {
    setIsShowModalDetailHoadon(true);

    setDataDetailHoadon(hoadon);
  };

  return (
    <>
      <div
        className="my-3 add-new"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span>
          <b>Danh sách Hoá đơn: </b>
        </span>
        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            handleGetHoadonByStatus(event.target.value);
          }}
          style={{
            marginRight: "510px",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#dc3545", // Màu nền đỏ nhạt
            color: "white", // Màu chữ trắng
            fontSize: "14px",
          }}
        >
          <option
            value="all"
            style={{
              backgroundColor: "#ccc",
              color: "black",
              textAlign: "center",
            }}
          >
            Chọn tình trạng ...
          </option>
          <option
            value="đã thanh toán"
            style={{ backgroundColor: "#ccc", color: "black" }}
          >
            Đã thanh toán
          </option>
          <option
            value="chưa thanh toán"
            style={{ backgroundColor: "#ccc", color: "black" }}
          >
            Chưa thanh toán
          </option>
        </select>
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
            onClick={() => setIsShowModalAddDiennuoc(true)}
          >
            <i class="fa-solid fa-plug-circle-plus"></i> Thêm Điện Nước
          </button>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddHoadon(true)}
          >
            <i class="fa-solid fa-plug-circle-plus"></i> Thêm Hoá Đơn
          </button>
        </div>
      </div>

      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder="Tìm kiếm hóa đơn ... "
          onChange={(event) => handleSearchHoadon(event.target.value)}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Số Phòng</th>
            <th>Ngày lập hóa đơn</th>
            <th>Hạn thu tiền</th>
            <th>Tổng hóa đơn</th>
            <th>Phương thức</th>
            <th>Tình trạng</th>
            <th>Khác</th>
          </tr>
        </thead>
        <tbody>
          {listHoadon &&
            listHoadon.map((item, index) => (
              <tr key={`hoadon-${index}`}>
                <td>{item.roomId}</td>
                <td>{formatDate(item.billStartDate)}</td>
                <td>{formatDate(item.billEndDate)}</td>
                <td>{formatCurrency(item.total)}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.status}</td>
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
      <ModalAddDiennuoc
        show={isShowModalAddDiennuoc}
        handleCloseHoadon={handleCloseHoadon}
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
