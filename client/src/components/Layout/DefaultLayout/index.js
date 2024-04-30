import Header from "./Header"
import SideBar from "./SideBar"
import Content from './Content';
function DefaultLayout({children}) {
    return ( <div>
        <Header></Header>
        <div className="container">
            <SideBar></SideBar>
            <div className="content">
                {children}
                <Content>
                </Content>
                </div>
        </div>
    </div> );
}

export default DefaultLayout;