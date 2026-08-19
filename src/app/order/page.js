"use client";

import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer";
import { useState, useEffect } from "react";
import { TAX, DELIVERY_CHARGES } from "../lib/constant";

const Page = () => {

    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")) || undefined);
    const [cartStorage, setCartStorage] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const total = cartStorage.reduce((sum, item) => sum + Number(item?.price || 0), 0);

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

    return (
        <div>
            <CustomerHeader/>

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
                 <button>Place Order</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    );
}

export default Page;