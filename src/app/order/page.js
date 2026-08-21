"use client";

import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer";
import { useState, useEffect } from "react";
import { TAX, DELIVERY_CHARGES } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {

    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")) || undefined);
    const [cartStorage, setCartStorage] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const total = cartStorage.reduce((sum, item) => sum + Number(item?.price || 0), 0);

    const [removeCartData, setRemoveCartData] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartStorage(savedCart);
        } catch {
            setCartStorage([]);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    const removeFromCart = (itemId) => {
        setCartStorage((prevCart) => {
            const updatedCart = prevCart.filter((item) => item._id !== itemId);

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(updatedCart));
            }

            return updatedCart;
        });
    };

    useEffect(() =>{
        if(!total){
            router.push('/');
        }
    },[total]);

    const orderNow = async() => {
        let user_id = JSON.parse(localStorage.getItem("user"))?._id;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let foodItemIds = cart.map(item => item._id).toString();
        let deliveryBoy_id = "64a0e3f5c1b8f2d1e4a5b6c7"; // Replace with actual
        let resto_id = cart[0]?.resto_id;
        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status: "confirm",
            amount: total+DELIVERY_CHARGES+(total*TAX/100)
        }

        let response = await fetch('http://localhost:3000/api/order',{
            method: 'POST',
            body: JSON.stringify(collection)
        });
        let data = await response.json();
        if(data.success){
            alert("Order placed successfully");
            setRemoveCartData(true);
            royuter.push('/myprofile');
        }else{
            alert("Failed to place order. Please try again.");
        }
    }

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData}/>

            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name</span>
                        <span>{userStorage?.name}</span>
                    </div>
                    <div className="row">
                        <span>Address</span>
                        <span>{userStorage?.address}</span>
                    </div>
                    <div className="row">
                        <span>Mobile No.</span>
                        <span>{userStorage?.mobile}</span>
                    </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{total*TAX/100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{total+DELIVERY_CHARGES+(total*TAX/100)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash on Delivery</span>
                        <span>{total+DELIVERY_CHARGES+(total*TAX/100)}</span>
                    </div>
                </div>
                <div className="block-2">
                 <button onClick={orderNow}>Place Order</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    );
}

export default Page;