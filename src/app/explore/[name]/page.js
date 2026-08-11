"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const name = params?.name ? decodeURIComponent(params.name) : "Restaurant";
    const restaurantId = searchParams?.get("id") || params?.id || "";
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        if (!restaurantId) return;
        loadRestaurantDetails();
    }, [restaurantId]);

    const loadRestaurantDetails = async () => {
        try {
            const response = await fetch(`/api/customer/${restaurantId}`);
            const data = await response.json();
            if (data?.success) {
                setRestaurantDetails(data.details);
                setFoodItems(data.foodItems || []);
            }
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    return (
        <div>
            <CustomerHeader />
            <div className="restaurant-page-banner">
                <h1>{name}</h1>
            </div>
            <div>
                <h3>{restaurantDetails?.name || "Restaurant details unavailable"}</h3>
                <h3>{restaurantDetails?.city}</h3>
                <h3>{restaurantDetails?.address}</h3>
                <h3>{restaurantDetails?.email}</h3>
            </div>
            <div>
                {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                        <div key={item._id}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div>{item.description}</div>
                            <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
                        </div>
                    ))
                ) : (
                    <p>No food items available.</p>
                )}
            </div>
        </div>
    );
};

export default Page;