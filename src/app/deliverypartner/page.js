"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../DeliveryHeader";

const Page = ()=>{

    const [login, setLogin] = useState(true);
    const [loginMobile, setLoginMobile] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const router = useRouter();

    useEffect(() => {
        const deliveryStorage = JSON.parse(localStorage.getItem("delivery"));
        if (deliveryStorage) {
            router.push("/deliverydashboard");
        }
    }, []);

    const handleSignup = async () => {
        if(!name || !email || !password || !confirmPassword || !city || !address || !mobile){
            alert("Please fill all fields")
            return
        }

        let response = await fetch('/api/deliverypartners/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password, city, address, mobile})
        })
        let data = await response.json()
        if(data.success){
            const {result} = data
            delete result.password
            localStorage.setItem("delivery", JSON.stringify(result))
            alert("User created successfully")
            router.push("/deliverydashboard")
        }else{
            alert("Failed to create user")
        }
    }

    const loginHandle=async()=>{
        if(!loginMobile || !loginPassword){
            alert("Please fill all fields")
            return
        }

        let response = await fetch('/api/deliverypartners/login',{
            method: 'POST',
            body: JSON.stringify({mobile: loginMobile, password: loginPassword})
        })
        let data = await response.json()
        if(data.success){
            const {result} = data
            delete result.password
            localStorage.setItem("delivery", JSON.stringify(result))
            alert("User logged in successfully")
            router.push("/deliverydashboard")
        }else{
            alert("Failed to login. Please try again with valid mobile and password")
        }
    };


    return(
        <div>
            <DeliveryHeader />
            <div className="container">
                <h1>Delivery Partner</h1>
                {
                    login ? (
                        <div className="auth-wrapper">
                            <h3>Login</h3>
                            <div className='input-wrapper'>
                                <input type="text" placeholder="enter mobile" className='input-field'value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} />
                            </div>
                            <div className='input-wrapper'>
                                <input type="password" placeholder="enter password" className='input-field' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            </div>
                            <div className='input-wrapper'>
                                <button onClick={loginHandle} className="button">Login</button>
                            </div>
                            <button onClick={()=>setLogin(!login)} className="button-link">Don't have an account? Sign Up</button>
                        </div>
                    ) : (
                        <div className="auth-wrapper">
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
                                    type="email" 
                                    placeholder="Enter Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="input-wrapper">
                                <input 
                                    className="input-field"
                                    type="password" 
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
                                <button onClick={handleSignup} className="button">Signup</button>
                            </div>
                            <button onClick={()=>setLogin(!login)} className="button-link">Already have an account? Login</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Page;