import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    customer_name: String,
    customer_address: String,
    customer_mobile: String,
    foodItemIds: [mongoose.Schema.Types.ObjectId],
    resto_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status: String,
    amount:String,
})

export const ordersSchema = mongoose.models.orders || mongoose.model("orders", ordersModel)