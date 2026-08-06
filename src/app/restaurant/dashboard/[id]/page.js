"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { use } from "react";

const EditFoodItems = ({ params }) => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter();
    const { id } = use(params);

    useEffect(() => {
        handleLoadFoodItem();
    },[])

    const handleLoadFoodItem = async () => {
        let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`);
        response = await response.json();
        if(response.success){
            const foodItem = response.result[0];
            setName(foodItem.name);
            setPrice(foodItem.price);
            setPath(foodItem.img_path);
            setDescription(foodItem.description);
        }
    }

    const handleEditFoodItem = async () => {
        if(!name || !price || !path || !description){
            setError(true)
            return false;
        }else{
            setError(false)
        }   

        let response = await fetch(`http://localhost:3000/api/restaurant/foods/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, img_path: path, description })
        })

        let data = await response.json()
        if(data.success){
            alert("Food item updated successfully")
            router.push("/restaurant/dashboard")
            setError(false)
            setName("")
            setPrice("")
            setPath("")
            setDescription("")
        }else{
            setError(true)
            alert("Error while updating food item")
        }
    }

    return (
        <div className="container"> 
            <h1>Update Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food name" value={name} onChange={(e)=>setName(e.target.value)} />
                {error && !name && <span className="input-error">Please enter valid food name</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food price" value={price} onChange={(e)=>setPrice(e.target.value)} />
                {error && !price && <span className="input-error">Please enter valid food price</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter path" value={path} onChange={(e)=>setPath(e.target.value)} />
                {error && !path && <span className="input-error">Please enter valid image path</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                {error && !description && <span className="input-error">Please enter valid food description</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={() => router.push("/restaurant/dashboard")}>Back to Dashboard</button>
            </div>
        </div>
    )
}

export default EditFoodItems;