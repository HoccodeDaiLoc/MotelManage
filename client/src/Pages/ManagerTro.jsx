import Header from "../Components/ManagerHeader";
import style from "../styles/UserHomePage.modules.scss";

import TableManageTro from "../Components/manageTro/TableManageTro";
function manageTro() {
  return (
        <div className="wrapper">
      <div className="main_container">
    <Header className="UserSide Bar" ></Header>
      <TableManageTro className="UserInfo"></TableManageTro>    
        </div>
    </div>
  );
}

export default manageTro;
