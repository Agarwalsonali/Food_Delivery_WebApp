import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    name: mongoose.Schema.Types.ObjectId,
    foodItemIds: String,
    resto_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status: String,
    amount:String,
})

export const ordersSchema = mongoose.models.orders || mongoose.model("orders", ordersModel)