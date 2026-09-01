"use client"
import DeliveryHeader from "../DeliveryHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page=()=>{
    
    const router = useRouter();

    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getMyOrders = async () => {
            try {
                const deliveryData = JSON.parse(localStorage.getItem("delivery"));
                if (!deliveryData?._id) return;

                const res = await fetch(`/api/deliverypartners/orders/${deliveryData._id}`);
                if (!res.ok) {
                    throw new Error(`Failed to load orders: ${res.status}`);
                }

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

    useEffect(() => {
        const deliveryStorage = JSON.parse(localStorage.getItem("delivery"));
        if (!deliveryStorage) {
            router.push("/deliverypartner");
        }
    }, []);


    return(
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            {isLoading ? (
                <p>Loading orders...</p>
            ) : myOrders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                myOrders.map((item)=>(
                    <div className = 'restaurant-wrapper' key={item.data?._id || item._id}>
                        <h4>Name: {item.data?.name || "Restaurant unavailable"}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data?.address || "Address unavailable"}</div>
                        <div>Update Status: 
                            <select>
                                <option>Confirmed</option>
                                <option>On the way</option>
                                <option>Delivered</option>
                                <option>Failed to Deliver</option>
                            </select>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Page;