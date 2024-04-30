import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Rooms from './Pages/Rooms';
import RoomDetail from './Pages/RoomDetail';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Rooms/>}/>
    {/* <Route path='/Rooms/:page' element={<Rooms/>}/> */}
    <Route path="Rooms/:RoomId"  element={<RoomDetail/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
