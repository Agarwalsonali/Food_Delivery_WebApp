"use client";

import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer";
import { useState, useEffect } from "react";
import { TAX, DELIVERY_CHARGES } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [isHydrated, setIsHydrated] = useState(false);
    const total = cartStorage.reduce((sum, item) => sum + Number(item?.price || 0), 0);
    const router = useRouter();

    const orderNow = () => {
        if(JSON.parse(localStorage.getItem("user"))){
            router.push('/order')
        }else{
            router.push('/user-auth?order=true')
        }
    };

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
            <div className="food-item-wrapper">
                {!isHydrated ? (
                    <h1>Loading cart...</h1>
                ) : cartStorage.length > 0 ? (
                    cartStorage.map((item) => (
                        <div key={item._id} className="list-item">
                            <div className="list-item-block-1"><img style={{ width: 100 }} src={item.img_path} alt={item.name} /></div>

                            <div className="list-item-block-2">
                                <div>{item.name}</div>
                                <div className="description">{item.description}</div>
                                {
                                    <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                                }
                            </div>
                            <div className="list-item-block-3">Price: {item.price}</div>

                        </div>
                    ))
                ) : (
                    <h1>No food items available.</h1>
                )}
            </div>
            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                    <span>Food Charges : </span>
                    <span>{total}</span>
                    </div>
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
                </div>
                <div className="block-2">
                 <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    );
}

export default Page;