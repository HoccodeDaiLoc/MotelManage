import Header from "../Components/ManagerHeader";
import TableManageHopdong from "../Components/manageHopDong/TableManageHopdong";
function manageHopDong() {
  return (
        <div className="wrapper">
      <div className="main_container">
    <Header className="UserSide Bar" ></Header>
      <TableManageHopdong className="UserInfo"></TableManageHopdong>    
        </div>
    </div>
  );
}

export default manageHopDong;
