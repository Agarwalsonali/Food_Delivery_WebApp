import { useState } from 'react';

const UserLogin=()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandle=()=>{
        if(email && password){
            const userStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;
        }
    };

    return(
        <div>
            <div className='input-wrapper'>
                <input type="text" placeholder="enter email" className='input-field'value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='input-wrapper'>
                <input type="password" placeholder="enter password" className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='input-wrapper'>
                <button onClick={loginHandle} className="button">Login</button>
            </div>
        </div>
    )
}

export default UserLogin;