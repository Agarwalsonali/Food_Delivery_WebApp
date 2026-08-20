"use client"

import CustomerHeader from "../_components/CustomerHeader"
import RestaurantFooter from "../_components/Footer"
import UserLogin from "../_components/UserLogin"
import UserSignUp from "../_components/UserSignUp"
import { use, useState } from "react"

const UserAuth=(props)=>{
    const [login, setLogin] = useState(true);
    const searchParams = use(props.searchParams);
    const redirect = searchParams?.order;

    return(
        <div>
            <CustomerHeader />
            <div className="container">
                <h1>{login ? "User Login" : "User Sign Up"}</h1>
                {
                    login ? <UserLogin redirect={redirect} /> : <UserSignUp redirect={redirect} />
                }
                <button onClick={()=>setLogin(!login)} className="button-link">{login ? "Don't have an account? Sign Up" : "Already have an account? Login"}</button>
            </div>
            <RestaurantFooter />
        </div>
    )
}

export default UserAuth