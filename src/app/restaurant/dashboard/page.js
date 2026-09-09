"use client"
import RestaurantHeader from "@/app/_components/Header"
import './../style.css'
import AddFoodItem from "@/app/_components/AddFoodItem"
import { useState } from "react"
import FoodItemList from "@/app/_components/FoodItemList"

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)

  return (
    <div className="restaurant-dashboard">
        <RestaurantHeader />
        <div className="dashboard-buttons">
            <button onClick={() => setAddItem(true)} className="button">Add Food</button>
            <button onClick={() => setAddItem(false)} className="button">Dashboard</button>
        </div>
        {
            addItem ? <AddFoodItem setAddItem={setAddItem}/> : <FoodItemList />
        }
    </div>
  )
}

export default Dashboard
