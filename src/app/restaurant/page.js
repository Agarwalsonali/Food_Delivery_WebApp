"use client"

import { useState } from "react";
import RestaurantLogin from "../_components/Login";
import RestaurantSignup from "../_components/Signup";
import RestaurantHeader from "../_components/Header";
import './style.css'
import RestaurantFooter from "../_components/Footer";

const Restaurant = ()=>{
    const [login,setLogin] = useState(true)

    return (
        <>
        <div className="container">
            <RestaurantHeader />
             <h1>Restaurant Login/Signup page</h1>
            {
                login ? <RestaurantLogin /> : <RestaurantSignup />
            }

            <div>
                <button className="button-link" onClick={()=>setLogin(!login)}>
                    {login ? "Do not have Account? SignUp" : "Already have Account? Login"}
                </button>
            </div>
        </div>
        <RestaurantFooter />
        </>
    )
}

export default Restaurant;