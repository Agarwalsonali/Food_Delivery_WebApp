import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id: routeId } = await params;
    const id = routeId || request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, result: [] }, { status: 400 });
    }

    await mongoose.connect(connectionStr);
    let result;
    let success = false;

    result = await ordersSchema.find({ deliveryBoy_id: id });
    if (result) {
        let restoData = await Promise.all(result.map(async (item) => {
            let restoInfo = {};
            restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
            restoInfo.amount = item.amount;
            restoInfo.status = item.status;
            return restoInfo;
        }));
        result = restoData;
        success = true;
    }

    return NextResponse.json({ success, result });
}