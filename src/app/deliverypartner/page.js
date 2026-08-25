"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = ()=>{

    const [loginMobile, setLoginMobile] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const router = useRouter();

    return(
        <div>
            <h1>Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <div className='input-wrapper'>
                        <input type="text" placeholder="enter mobile" className='input-field'value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} />
                    </div>
                    <div className='input-wrapper'>
                        <input type="password" placeholder="enter password" className='input-field' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <div className='input-wrapper'>
                        <button className="button">Login</button>
                    </div>
                </div>
                <div className="signup-wrapper">
                    <h3>Signup</h3>
                    <div className="input-wrapper">
                        <input 
                            className="input-field"
                            type="text" 
                            placeholder="Enter Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input 
                            className="input-field"
                            type="text" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input 
                            className="input-field"
                            type="text" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input 
                            className="input-field"
                            type="text" 
                            placeholder="Enter City" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input 
                            className="input-field"
                            type="text" 
                            placeholder="Enter Address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input 
                            className="input-field"
                            type="text" 
                            placeholder="Enter Mobile" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>

                    <div className="input-wrapper">
                        <button className="button">Signup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;