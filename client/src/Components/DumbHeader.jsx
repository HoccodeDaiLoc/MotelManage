import {Link} from 'react-router-dom'
import styles from '../styles/DumbHeader.scss'
function DumbHeader() {
    return ( 
    <div className="Dumbwrapper">
        <div className='right'>
        <Link to={"/"}>
        <div >
            <img className="logo" src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/youtube-512.png"></img>
        </div>
        </Link>

        <div className="text">
Đăng nhập        
</div>

<Link to={"/Support"} className="support">
            Bạn cần giúp đỡ gì không ?
        </Link>
        </div>

        </div>
     );
}

export default DumbHeader;