"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/Footer";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const name = params?.name ? decodeURIComponent(params.name) : "Restaurant";
    const restaurantId = searchParams?.get("id") || params?.id || "";
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData] = useState(null);

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

    const addToCart = (item) => {
        setCartData(item);
    }

    return (
        <div>
            <CustomerHeader cartData={cartData} />
            <div className="restaurant-page-banner">
                <h1>{name}</h1>
            </div>
            <div className="detail-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className="food-item-wrapper">
                {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                        <div key={item._id} className="list-item">
                            <div><img style={{ width: 100 }} src={item.img_path} alt={item.name} /></div>

                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                <button onClick={() => addToCart(item)}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No food items available.</h1>
                )}
            </div>
            <RestaurantFooter />
        </div>
    );
};

export default Page;