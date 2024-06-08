import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { fetchBillByRenter } from "../service/UserService";
import ReactPaginate from "react-paginate";
import { PaymentByMomo } from "../service/PaymentService";
import momo from "../asset/image/momo.png";
import MyModal from "./ModalBillDetail";
import { io } from "socket.io-client";
import { getNotification } from "../service/NotiService";

function UserBill() {
  const [billData, setBillData] = useState([]);
  const id = useSelector((state) => state.user.account.renterId);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState(null);
  const [notifications, setNotification] = useState([]);

  let currentUrl = window.location.href;
  const [socket, setSocket] = useState("");

  useEffect(() => {
    if (id !== null || id !== undefined) {
      setSocket(io("http://localhost:8080", { query: { userId: id } }));
      console.log("socket", socket);
    }
  }, []);

  useEffect(() => {
    const getNoti = async (id) => {
      let res = await getNotification(id);
      setNotification(res.data);
    };
    getNoti(id);
    if (socket) {
      socket.on("notification", (data) => {
        setNotification((prev) => [...prev, data]);
      });
    }
  }, [id, socket]);

  useEffect(() => {
    if (id !== null || id !== undefined) {
      const fetchBill = async (id, currentPage) => {
        try {
          const res = await fetchBillByRenter(id, currentPage);
          console.log(res);
          setBillData(res.data);
          setTotalPages(res.total_page);
        } catch (error) {
          console.error("Error fetching bills:", error);
        }
      };
      fetchBill(id, currentPage);
    }
  }, [currentPage]);

  const handlePayment = async (billId, rederedirectUrl) => {
    const res = await PaymentByMomo(billId, rederedirectUrl);
    console.log("check momo", res);
    if (res && socket) window.open(res.result.payUrl, "_blank");
  };

  const handlePageClick = (event) => {
    const newCurrentPage = event.selected + 1;
    setCurrentPage(newCurrentPage);
  };

  const handleRowClick = (billItem) => {
    setSelectedBill(billItem);
  };

  return (
    <div className="UserInfo_Wrapper">
      <div className="UserInfo_Container">
        {billData.length > 0 ? (
          <>
            <h4 className="UserInfo_Item_Heading">Hóa đơn của bạn</h4>
            <table className="UserInfo_Table">
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Ngày tạo hóa đơn</th>
                  <th>Hạn thanh toán</th>
                  <th>Phương thức thanh toán</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Số tiền thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {billData.map((bill) => (
                  <tr key={bill.billId}>
                    <td
                      onClick={() => {
                        handleRowClick(bill.billItem);
                      }}
                    ></td>
                    <td>{bill.billStartDate.slice(0, 10)}</td>
                    <td>{bill.billEndDate.slice(0, 10)}</td>
                    <td>{bill.paymentMethod}</td>
                    <td>
                      {bill.status}
                      {bill.status === "chưa thanh toán" && (
                        <div className="icon_payment_container">
                          <div className="icon_payment_sub hover-text">
                            <img
                              onClick={() =>
                                handlePayment(bill.billId, currentUrl)
                              }
                              className="icon_payment"
                              src={momo}
                              alt=""
                              srcSet="https://cdn6.aptoide.com/imgs/1/c/6/1c6ee4ebc681cf5f4ac98f3d6175a655_icon.png"
                            />
                            <span
                              tabIndex={1000}
                              className="hover-text-content"
                            >
                              Thanh toán online với momo
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>{bill.total} VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="paginate_container" tabIndex={-1000}>
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
                activeClassName="active" // forcePage={pageOffset}
              />
            </div>
          </>
        ) : (
          "Bạn chưa có hóa đơn nào"
        )}
      </div>
      {selectedBill && (
        <MyModal
          className="modal_me"
          bill={selectedBill} // Pass the selected bill to the modal
          onClose={() => {
            setSelectedBill(null);
          }}
        />
      )}
    </div>
  );
}
export default UserBill;
