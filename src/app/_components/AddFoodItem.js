import { useState } from "react"

const AddFoodItem = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)

    const handleAddFoodItem = async () => {
        if(!name || !price || !path || !description){
            setError(true)
            return false;
        }else{
            setError(false)
        }   

        let resto_id;
        const restoData = JSON.parse(localStorage.getItem("restaurantUser"))
        if(!restoData){
            setError(true)
            return false;
        }else{
            resto_id = restoData._id
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, price, img_path: path, description, resto_id})
        })

        let data = await response.json()
        if(data.success){
            alert("Food item added successfully")
            setError(false)
            setName("")
            setPrice("")
            setPath("")
            setDescription("")
        }else{
            setError(true)
            alert("Error while adding food item")
        }
    }

    return (
        <div className="container"> 
            <h1>Add New Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
                {error && !name && <span className="input-error">Please enter valid food name</span>}
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            </div>
                {error && !price && <span className="input-error">Please enter valid food price</span>}
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter path" value={path} onChange={(e)=>setPath(e.target.value)} />
            </div>
                {error && !path && <span className="input-error">Please enter valid image path</span>}
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
                {error && !description && <span className="input-error">Please enter valid food description</span>}
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    )
}

export default AddFoodItem;