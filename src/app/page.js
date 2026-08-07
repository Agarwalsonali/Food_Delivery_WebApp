"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/Footer";
import { useEffect, useState } from "react";

export default function Home() {

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);

  useEffect(() => {
    loadLocations();
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

  const handleListItem = (location) => {
    setSelectedLocation(location);
    setShowLocation(false);
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
                <input type="text" className="search-input" placeholder="Enter food or restaurant name" />
            </div>
        </div>
        <RestaurantFooter />
      </main>
  );
}
