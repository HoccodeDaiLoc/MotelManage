import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Rooms from './Pages/Rooms';
import RoomDetail from './Pages/RoomDetail';
import Sign from './Pages/Sign';
import Notification from './Pages/Notification';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Rooms/>}/>
    {/* <Route path='/Rooms/:page' element={<Rooms/>}/> */}
    <Route path='/Notification' element={<Notification/>}></Route>
    <Route path='/Sign' element={<Sign></Sign>}></Route>
    <Route path="Rooms/:RoomId"  element={<RoomDetail/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
