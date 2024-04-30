import {useState} from 'react';

function LoginForm() {
    
  const [name,setName] =useState("");
  const [email,setEmail] =useState("");
  const handleSubmit=()=>{
    console.log({
      name,
      email,
    });
  }
  return(
    <div>
      <input
      value={name}
      onChange={e=>setName(e.target.value)}>
      </input>
      <input
      value={email}
      onChange={e=>setEmail(e.target.value)}>
      </input>
      <button onClick={handleSubmit}>Login</button>
    </div>)
}

export default LoginForm;