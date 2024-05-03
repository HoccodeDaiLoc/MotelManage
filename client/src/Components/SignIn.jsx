import {useState} from 'react';
import style from '../styles/SignIn.modules.scss'

function Login() {
    const [name,setName] = useState("");
    const [pass,setPass] = useState("");
    return ( 
        <div className='SignWrapper'>
        <div className='logo_container'> 
            <img className='logo_banner' src='https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/youtube-512.png'></img>
        </div>

        <div className='SignRight'>

        <div className='title'>
            Đăng nhập
        </div>
        <form className='SignForm'>

        <input
            className='user_name inputbox'
            value={name}
            placeholder='Tên đăng nhập'
            onChange={e=>setName(e.target.value)}>
            </input>
            <input
            className='pass inputbox'
            value={pass}
            placeholder='Mật khẩu'
            onChange={e=>setPass(e.target.value)}>
            </input>
        </form>
        </div>
        
        </div>
     );
}

export default Login;