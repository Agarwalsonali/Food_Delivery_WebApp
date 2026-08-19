"use client"

import CustomerHeader from "../_components/CustomerHeader"
import RestaurantFooter from "../_components/Footer"
import UserLogin from "../_components/UserLogin"
import UserSignUp from "../_components/UserSignUp"
import { useState } from "react"

const UserAuth=()=>{
    const [login, setLogin] = useState(true);

    return(
        <div>
            <CustomerHeader />
            <div className="container">
                <h1>{login ? "User Login" : "User Sign Up"}</h1>
                {
                    login ? <UserLogin /> : <UserSignUp />
                }
                <button onClick={()=>setLogin(!login)} className="button-link">{login ? "Don't have an account? Sign Up" : "Already have an account? Login"}</button>
            </div>
            <RestaurantFooter />
        </div>
    )
}

export default UserAuth