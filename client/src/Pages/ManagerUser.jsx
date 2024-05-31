import Header from "../Components/ManagerHeader";

import TableUser from "../Components/manageUser/TableUser";
import { useSelector } from "react-redux";

function manageUser() {
  // let isadmin = useSelector((state) => state.account.user.isAdmin);
  // const isadmin = useSelector((state) => state.user.account.isAdmin);
  // console.log("check admin", isadmin);
  return (
    <div className="wrapper">
      <div className="main_container">
        <Header></Header>
        <TableUser></TableUser>
      </div>
    </div>
  );
}

export default manageUser;
