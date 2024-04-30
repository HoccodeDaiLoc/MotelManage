import RoomsContent from '../Components/RoomsContent';
import Header from '../Components/Header';
import SideBar from '../Components/Sidebar';
import Pagination from '../Components/Pagination';
import Footer from '../Components/Footer';
function Home() {
    return ( 
        <>
        <Header></Header>
        <SideBar></SideBar>    

        <RoomsContent></RoomsContent>
        <Footer></Footer>
        </>
     );
}

export default Home;