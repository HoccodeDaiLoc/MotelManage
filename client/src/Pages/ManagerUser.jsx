import Header from "../Components/ManagerHeader";
import style from "../styles/UserHomePage.modules.scss";

import TableUser from "../Components/manageUser/TableUser";
function manageUser() {
  return (
        <div className="wrapper">
      <div className="main_container">
    <Header className="UserSide Bar" ></Header>
      <TableUser className="UserInfo"></TableUser>    
        </div>
    </div>
  );
}

export default manageUser;
