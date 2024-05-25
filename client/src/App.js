import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rooms from "./Pages/Rooms";
import RoomDetail from "./Pages/RoomDetail";
import Sign from "./Pages/Sign";
import Loggin from "./Pages/Loggin";
import Notification from "./Pages/Notification";
import UserHomePage from "./Pages/UserHomePage";
import UserComplain from "./Pages/UserComplain";
import UserContract from "./Pages/UserContract";

import { useSelector } from "react-redux";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Category from "./Pages/Category";
import UserRoom from "./Pages/UserRoom";
import RequireAuth from "./feature/auth/RequireAuth";
function App() {
  const dataUserRedux = useSelector((state) => state.user.account);
  console.log("check redux ", dataUserRedux);

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route index path="/" element={<Rooms />} />
          {/* <Route element={<RequireAuth />}> */}
          <Route path="/user/Room" element={<UserRoom />}></Route>
          <Route path="/user/Contract" element={<UserContract />}></Route>
          <Route path="/user/Profile" element={<UserHomePage />}></Route>
          <Route path="/user/Complain" element={<UserComplain />}></Route>
          {/* </Route> */}

          {/* <Route path='/Rooms/:page' element={<Rooms/>}/> */}
          <Route path="/Notification" element={<Notification />}></Route>
          <Route path="/SignIn" element={<Sign></Sign>}></Route>
          <Route path="/Loggin" element={<Loggin></Loggin>}></Route>
          <Route path="Rooms/:RoomId" element={<RoomDetail />} />
          <Route path="/category/:categories" element={<Category />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
