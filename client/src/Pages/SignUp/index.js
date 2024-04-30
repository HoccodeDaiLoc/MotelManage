import {useState} from 'react';


function SignUp() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [userName,setUserName] = useState("");
    const [DateOfBirth,setDateOfBirth] = useState("");
    const [Address,setAddress] = useState("");
    const [Telephone,setTelephone] = useState("");

    return ( 
        <div>
            <label htmlFor='input_name'>Your UserName</label>
            <input
            className='input_name'
            value={name}
            onChange={e=>setName(e.target.value)}>
            </input>
            <input
            value={email}
            onChange={e=>setEmail(e.target.value)}>
            </input>
            <input
            value={pass}
            onChange={e=>setPass(e.target.value)}>
            </input>
            <input
            value={userName}
            onChange={e=>setUserName(e.target.value)}>
            </input>
            <input
            value={DateOfBirth}
            onChange={e=>setDateOfBirth(e.target.value)}>
            </input>
            <input
            value={Address}
            onChange={e=>setAddress(e.target.value)}>
            </input>
            <input
            value={Telephone}
            onChange={e=>setTelephone(e.target.value)}>
            </input>


        </div>
     );
}

export default SignUp;