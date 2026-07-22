"use client"
import RestaurantHeader from "@/app/_components/Header"
import './../style.css'
import AddFoodItem from "@/app/_components/AddFoodItem"
import { useState } from "react"
import FoodItemList from "@/app/_components/FoodItemList"

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)

  return (
    <div>
        <RestaurantHeader />
        <button onClick={() => setAddItem(true)}>Add Food</button>
        <button onClick={() => setAddItem(false)}>Dashboard</button>
        {
            addItem ? <AddFoodItem /> : <FoodItemList />
        }
    </div>
  )
}

export default Dashboard
