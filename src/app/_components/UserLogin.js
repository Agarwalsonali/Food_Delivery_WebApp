import { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserLogin=(props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const loginHandle=async()=>{
        if(!email || !password){
            alert("Please fill all fields")
            return
        }

        let response = await fetch('http://localhost:3000/api/user/login',{
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        let data = await response.json()
        if(data.success){
            const {result} = data
            delete result.password
            localStorage.setItem("user", JSON.stringify(result))
            if(props.redirect){
                router.push("/order")
            }else{
                router.push("/")
            }
            alert("User logged in successfully")
        }else{
            alert("Failed to login. Please try again with valid email and password")
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