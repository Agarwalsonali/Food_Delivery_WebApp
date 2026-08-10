"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      const response = await fetch("/api/customer/locations");
      const data = await response.json();
      if(data.success) {
        setLocations(data.result);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }

  const loadRestaurants = async (params) => {
    let url = "/api/customer";
    if(params?.location){
      url += `?location=${params.location}`;
    }else if(params?.restaurant){
      url += `?restaurant=${params.restaurant}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if(data.success) {
        setRestaurants(data.result);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }


  const handleListItem = (location) => {
    setSelectedLocation(location);
    setShowLocation(false);
    loadRestaurants({ location: location });
  }

  return (
      <main>
        <CustomerHeader/>
        <div className="main-page-banner">
            <h1>Food Delivery App</h1>
            <div className="input-wrapper">
                <div className="select-wrapper">
                    <input type="text" value={selectedLocation} onClick={() => setShowLocation(true)} onChange={(e) => setSelectedLocation(e.target.value)} className="select-input" placeholder="Select Place" />
                   <ul className="location-list">
                     {
                      showLocation && locations.map((location) => (
                        <li key={location} onClick={() => handleListItem(location)}>
                          {location}
                        </li>
                      ))
                      }
                   </ul>
                </div>
                <input type="text" className="search-input" onChange={(event)=>loadRestaurants({ restaurant: event.target.value })} placeholder="Enter food or restaurant name" />
            </div>
        </div>
        <div className="restaurant-list-container">
          {
            restaurants.map((restaurant) => (
              <div onClick={()=>router.push('explore/'+restaurant.name)} key={restaurant._id} className="restaurant-wrapper">
                <div className="heading-wrapper">
                  <h3>{restaurant.name}</h3>
                  <h5>Contact: {restaurant.contact}</h5>
                </div>
                <div className="address-wrapper">
                  <div>{restaurant.city},</div>
                  <div className="address">{restaurant.address}, Email: {restaurant.email}</div>
                </div>
              </div>
            ))
          }
        </div>
        <RestaurantFooter />
      </main>
  );
}
