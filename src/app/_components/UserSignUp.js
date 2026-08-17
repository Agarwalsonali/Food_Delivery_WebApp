import React, { useState } from "react"


const UserSignUp=()=>{
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")

    const handleSignup = async () => {
        if(!name || !email || !password || !confirmPassword || !city || !address || !mobile){
            alert("Please fill all fields")
            return
        }

        let response = await fetch('http://localhost:3000/api/user',{
            method: 'POST',
            body: JSON.stringify({name, email, password, city, address, mobile})
        })
        let data = await response.json()
        if(data.success){
            alert("User created successfully")
        }else{
            alert("Failed to create user")
        }
    }

    return(
        <div>
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
                    placeholder="Enter Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <button onClick={handleSignup} className="button">Signup</button>
            </div>
        </div>
    )
}

export default UserSignUp