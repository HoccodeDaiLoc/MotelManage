import Header from "../Components/ManagerHeader";
import style from "../styles/UserHomePage.modules.scss";

import TableManageHoadon from "../Components/manageHoadon/TableManageHoaDon";
function manageHoadon() {
  return (
        <div className="wrapper">
      <div className="main_container">
    <Header className="UserSide Bar" ></Header>
      <TableManageHoadon className="UserInfo"></TableManageHoadon>    
        </div>
    </div>
  );
}

export default manageHoadon;
