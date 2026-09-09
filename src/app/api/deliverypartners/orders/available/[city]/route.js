import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { city: cityFromParams } = await params;
    const city = (cityFromParams || "").trim();

    if (!city) {
        return NextResponse.json({ success: false, result: [] }, { status: 400 });
    }

    await mongoose.connect(connectionStr);
    let result;
    let success = false;

    try {
        result = await ordersSchema.find({
            deliveryBoy_id: null,
            status: { $in: ['confirm', 'ready_for_pickup'] }
        });

        if (result) {
            let orderData = await Promise.all(result.map(async (item) => {
                let orderInfo = {};
                const restaurant = await restaurantSchema.findOne({ _id: item.resto_id });
                orderInfo._id = item._id;
                orderInfo.restaurant = restaurant;
                orderInfo.amount = item.amount;
                orderInfo.status = item.status;
                orderInfo.customer_name = item.customer_name;
                orderInfo.customer_address = item.customer_address;
                orderInfo.customer_mobile = item.customer_mobile;
                return orderInfo;
            }));
            result = orderData;
            success = true;
        }
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Failed to fetch available orders",
            error: error.message 
        }, { status: 500 });
    }

    return NextResponse.json({ success, result });
}
