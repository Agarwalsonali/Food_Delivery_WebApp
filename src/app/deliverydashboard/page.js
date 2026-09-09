"use client"
import DeliveryHeader from "../DeliveryHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page=()=>{
    
    const router = useRouter();

    const [availableOrders, setAvailableOrders] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAvailable, setShowAvailable] = useState(true);
    const [isClient, setIsClient] = useState(false);
    
    const deliveryData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("delivery")) : null;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const getOrders = async () => {
            try {
                const deliveryData = JSON.parse(localStorage.getItem("delivery"));
                if (!deliveryData?._id || !deliveryData?.city) return;

                const [availableRes, assignedRes] = await Promise.all([
                    fetch(`/api/deliverypartners/orders/available/${encodeURIComponent(deliveryData.city)}`),
                    fetch(`/api/deliverypartners/orders/${deliveryData._id}`)
                ]);

                const availableData = await availableRes.json();
                const assignedData = await assignedRes.json();

                if (availableData.success) {
                    setAvailableOrders(availableData.result || []);
                }
                if (assignedData.success) {
                    setMyOrders(assignedData.result || []);
                }
            } catch (error) {
                console.error("Failed to load orders", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        getOrders();
    }, [isClient]);

    useEffect(() => {
        if (!isClient) return;
        const deliveryData = JSON.parse(localStorage.getItem("delivery"));
        if (!deliveryData) {
            router.push("/deliverypartner");
        }
    }, [isClient, router]);

    const handleAcceptOrder = async (orderId) => {
        try {
            const deliveryData = JSON.parse(localStorage.getItem("delivery"));
            const response = await fetch('/api/deliverypartners/orders/accept', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    deliveryBoy_id: deliveryData._id
                })
            });

            const data = await response.json();
            if (data.success) {
                alert("Order accepted successfully");
                window.location.reload();
            } else {
                alert(data.message || "Failed to accept order");
            }
        } catch (error) {
            console.error("Failed to accept order", error);
            alert("Something went wrong while accepting the order");
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const deliveryData = JSON.parse(localStorage.getItem("delivery"));
            const response = await fetch(`/api/deliverypartners/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deliveryBoy_id: deliveryData._id,
                    status: newStatus
                })
            });

            const data = await response.json();
            if (data.success) {
                alert("Status updated successfully");
                window.location.reload();
            } else {
                alert(data.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Something went wrong while updating status");
        }
    };

    const getStatusOptions = (currentStatus) => {
        const options = {
            'confirm': ['ready_for_pickup', 'cancelled'],
            'ready_for_pickup': ['picked_up', 'cancelled'],
            'picked_up': ['out_for_delivery', 'cancelled'],
            'out_for_delivery': ['delivered', 'cancelled'],
            'delivered': [],
            'cancelled': []
        };
        return options[currentStatus] || [];
    };

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


    return(
        <div>
            <DeliveryHeader />
            <div style={{ padding: '20px' }}>
                <h1>Delivery Dashboard</h1>
                <div style={{ marginBottom: '20px' }}>
                    <button 
                        onClick={() => setShowAvailable(true)}
                        className="button"
                        style={{ 
                            marginRight: '10px',
                            backgroundColor: showAvailable ? '#007bff' : '#6c757d'
                        }}
                    >
                        Available Orders
                    </button>
                    <button 
                        onClick={() => setShowAvailable(false)}
                        className="button"
                        style={{ 
                            backgroundColor: !showAvailable ? '#007bff' : '#6c757d'
                        }}
                    >
                        My Assigned Orders
                    </button>
                </div>

                {isLoading ? (
                    <p>Loading orders...</p>
                ) : showAvailable ? (
                    availableOrders.length === 0 ? (
                        <p>No available orders in your city.</p>
                    ) : (
                        availableOrders.map((item)=>(
                            <div className='restaurant-wrapper' key={item._id}>
                                <h4>Restaurant: {item.restaurant?.name || "Restaurant unavailable"}</h4>
                                <div>Customer: {item.customer_name || "N/A"}</div>
                                <div>Customer Address: {item.customer_address || "N/A"}</div>
                                <div>Customer Mobile: {item.customer_mobile || "N/A"}</div>
                                <div>Amount: {item.amount}</div>
                                <div>Status: {getStatusLabel(item.status)}</div>
                                <div style={{ marginTop: '10px' }}>
                                    <button 
                                        onClick={() => handleAcceptOrder(item._id)}
                                        className="button"
                                        style={{ width: 'auto', padding: '5px 20px' }}
                                    >
                                        Accept Order
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    myOrders.length === 0 ? (
                        <p>No assigned orders yet.</p>
                    ) : (
                        myOrders.map((item)=>(
                            <div className='restaurant-wrapper' key={item._id}>
                                <h4>Restaurant: {item.data?.name || "Restaurant unavailable"}</h4>
                                <div>Customer: {item.customer_name || "N/A"}</div>
                                <div>Customer Address: {item.customer_address || "N/A"}</div>
                                <div>Customer Mobile: {item.customer_mobile || "N/A"}</div>
                                <div>Amount: {item.amount}</div>
                                <div>Current Status: {getStatusLabel(item.status)}</div>
                                {getStatusOptions(item.status).length > 0 && (
                                    <div style={{ marginTop: '10px' }}>
                                        <label>Update Status: </label>
                                        <select 
                                            onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                                            style={{ padding: '5px', marginLeft: '10px' }}
                                        >
                                            <option value="">Select status</option>
                                            {getStatusOptions(item.status).map(status => (
                                                <option key={status} value={status}>
                                                    {getStatusLabel(status)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    )
}

export default Page;