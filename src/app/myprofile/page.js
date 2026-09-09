"use client";

import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/Footer";
import { useState, useEffect } from "react";

const Page = ()=>{

    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getStatusLabel = (status) => {
        const labels = {
            'confirm': 'Confirmed',
            'ready_for_pickup': 'Ready for Pickup',
            'picked_up': 'Picked Up',
            'out_for_delivery': 'Out for Delivery',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return labels[status] || status;
    };

    useEffect(() => {
        const getMyOrders = async () => {
            try {
                const userStorage = JSON.parse(localStorage.getItem("user"));
                if (!userStorage?._id) return;

                const res = await fetch(`/api/order?id=${userStorage._id}`);
                const data = await res.json();
                if (data.success) {
                    setMyOrders(data.result || []);
                }
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setIsLoading(false);
            }
        };

        getMyOrders();
    }, []);

    return (
        <div className="myprofile">
            <CustomerHeader />
            {isLoading ? (
                <p>Loading orders...</p>
            ) : myOrders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                myOrders.map((item)=>(
                    <div className = 'restaurant-wrapper' style={{marginLeft: 'auto', marginRight: 'auto'}} key={item.data?._id || item._id}>
                        <h4>Restaurant: {item.data?.name || "Restaurant unavailable"}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Restaurant Address: {item.data?.address || "Address unavailable"}</div>
                        <div>Status: {getStatusLabel(item.status)}</div>
                    </div>
                ))
            )}
            <RestaurantFooter />
        </div>
    )
}

export default Page;