import Header from "../Components/ManagerHeader";
import style from "../styles/UserHomePage.modules.scss";

import TableManageHd from "../Components/manageHopDong/TableManageHopdong";
function manageHopDong() {
  return (
        <div className="wrapper">
      <div className="main_container">
    <Header className="UserSide Bar" ></Header>
      <TableManageHd className="UserInfo"></TableManageHd>    
        </div>
    </div>
  );
}

export default manageHopDong;
