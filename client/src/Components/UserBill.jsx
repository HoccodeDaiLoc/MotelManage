import Dropdown from "react-bootstrap/Dropdown";
import style from "../styles/UserInfo.modules.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchBillByRenter } from "../service/UserService";

function UserBill() {
  const [billData, setBillData] = useState([]); // Use an array for multiple bills
  const [currentPage, setCurrentPage] = useState(1);
  const id = useSelector((state) => state.user.account.id);

  useEffect(() => {
    const fetchBill = async (id) => {
      try {
        const res = await fetchBillByRenter(id);
        setBillData(res.data); // Assuming the API response is an array of bills
      } catch (error) {
        console.error("Error fetching bills:", error);
        // Handle error gracefully, e.g., display an error message to the user
      }
    };

    fetchBill(id);
  }, [currentPage]);

  const [active, setActive] = useState(false); // Assume dropdown starts closed

  return (
    <div className="UserInfo_Wrapper">
      <div className="UserInfo_Container">
        {billData.length > 0 ? (
          <>
            <h4 className="UserInfo_Item_Heading">Hóa đơn của bạn</h4>
            <table className="UserInfo_Table">
              <thead>
                <tr>
                  <th>Mã số hóa đơn</th>
                  <th>Ngày tạo hóa đơn</th>
                  <th>Hạn thanh toán</th>
                  <th>Phương thức thanh toán</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Số tiền phải thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {billData.map((bill) => (
                  <tr key={bill.billId}>
                    <td>{bill.billId}</td>
                    <td>{bill.billStartDate.slice(0, 10)}</td>
                    <td>{bill.billEndDate.slice(0, 10)}</td>
                    <td>{bill.status}</td>
                    <td>{bill.status}</td>
                    <td>{bill.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          "Bạn chưa tạo hóa đơn nào"
        )}
      </div>
    </div>
  );
}
export default UserBill;
