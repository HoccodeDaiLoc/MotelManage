import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import {
  fetchAllHoadon,
  fetchAllstatusHd,
  fetchAllTro,
} from "../../service/ManageService";
import ModalAddHoadon from "./modalAddHoadon"; // Sửa tên thành component viết hoa
import ModalAddDiennuoc from "./modalAddDiennuoc";
import ModalConfirmHoadon from "./modalConfirmHoadon";
import { debounce } from "lodash";
import _ from "lodash";
import ModalDetailHoadon from "./modalDetailHoadon";
import ModalEditHoadon from "./modalEditHoadon";
import { CSVLink, CSVDownload } from "react-csv";
import axios from "axios";import { FaCloudDownloadAlt } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import style from "../../styles/Managerment.modules.scss";
import { IoIosWater } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

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
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.user.account);
  const isAdmin = useSelector((state) => state.user.account.isAdmin);
  const id = useSelector((state) => state.user.account.id);


  let socket = io("http://localhost:8080", { query: { id } });
  const [noti, setNoti] = useState();
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     socket.emit("hello", "hellosserfsf"); // Send "hello" message to the server
  //     console.log("Connected to server");
  //     console.log(socket);
  //   });
  // }, [user]);

  // useEffect(() => {
  //   socket.on("notification", (data) => {
  //     console.log("Welcome message from server:", data);
  //   });
  // });

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
    let index = listHoadon.findIndex((item) => item.billId === hoadon.billId);
    cloneListHoadon[index].status = hoadon.status;
    setListHoadon(cloneListHoadon);
  };
  const roomMapping = {
    1: 100,
    2: 101,
    3: 102,
    4: 103,
    5: 104,
    6: 105,
    7: 106,
    8: 107,
    9: 108,
    10: 109,
    11: 110,
    12: 111,
    13: 112,
    14: 113,
    15: 118,
    16: 119,
    17: 130,
    18: 131,
    20: 132,
    21: 133,
    22: 134,
    23: 135,
    24: 136,
    25: 137,
    26: 138,
    27: 139,
  };
  
  useEffect(() => {
    // Call API
    getHoadon(1);
  }, []);
  const getHoadon = async (page) => {
    try {
      const resTb = await fetchAllHoadon(page); // Lấy thông tin các hóa đơn
      if (resTb && resTb.data) {
        const { data, total_pages } = resTb.data;
        setTotalHoadon(resTb.total);
        setTotalPageHoadon(resTb.total_page);
        // Update the roomNumber using the mapping
        const updatedHoadonList = resTb.data.map(hoadon => ({
          ...hoadon,
          roomNumber: roomMapping[hoadon.roomId] || hoadon.roomId, // Fallback to roomId if no mapping is found
        }));
        setListHoadon(updatedHoadonList); // Cập nhật danh sách hóa đơn với thông tin roomNumber
      }
    } catch (error) {
      console.error("Error fetching hóa đơn data:", error);
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

  // const handleGetHoadonByStatus = async (status) => {
  //   try {
  //     let res;
  //     if (status === "all") {
  //       res = await fetchAllHoadon(1);
  //     } else {
  //       res = await getHoadonByStatus(status);
  //     }
  //     setListHoadon(res.data);
  //   } catch (error) {
  //     console.error("Error handling bill data by status:", error);
  //   }
  // };
  const handleGetHoadonByStatus = async (status) => {
    try {
      let res;
      if (status === "all") {
        res = await fetchAllHoadon(1);
      } else {
        res = await getHoadonByStatus(status);
      }
      // Update the roomNumber using the mapping
      const updatedHoadonList = res.data.map(hoadon => ({
        ...hoadon,
        roomNumber: roomMapping[hoadon.roomId] || hoadon.roomId, // Fallback to roomId if no mapping is found
      }));
      setListHoadon(updatedHoadonList);
    } catch (error) {
      console.error("Error handling bill data by status:", error);
    }
  };
  




  const handDetailHoadon = (hoadon) => {
    setIsShowModalDetailHoadon(true);

    setDataDetailHoadon(hoadon);
  };

  return (
    <div
      className="UserInfo_Manager"
      style={{ width: "80%", margin: "0px 0px 0px auto" }}
    >
      {" "}
      <div
        className="my-3 add-new"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span style={{ whiteSpace: "nowrap", padding: "0px 10px" }}>
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
        <div className="group-btns"
        style={{  marginLeft: "-300px" }}>
          <CSVLink
            filename={"Hoadon.csv"}
            className="btn btn-success  mx-1" 
            data={dataExport}
            asyncOnClick={true}
            onClick={getHoadonExport}
          >
           <FaCloudDownloadAlt 
            className="mr-2 mx-1"
            style={{ fontSize: "1.5em", marginTop: "-5px" }}
          /> Download
          </CSVLink>
          <button
            className="btn btn-primary mx-1"
            onClick={() => setIsShowModalAddDiennuoc(true)}
          >
          <IoIosWater
            className="mr-2 mx-1"
            style={{ fontSize: "1.5em", marginTop: "-5px" }}
          /> Ghi điện nước
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setIsShowModalAddHoadon(true)}
          >
           <FaMoneyBillTrendUp  
            className="mr-2 mx-1"
            style={{ fontSize: "1.5em", marginTop: "-5px" }}
          /> Thêm Hoá Đơn
          </button>
        </div>
      </div>
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Số Phòng</th>
            <th>Ngày bắt đầu </th>
            <th>Ngày lập hóa đơn</th>
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
                <td>{item.roomNumber}</td>
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
    </div>
  );
};

export default TableManageHoadon;
