import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload=await request.json()
    await mongoose.connect(connectionStr)
    let result;
    let success=false;
    const orderObj = new ordersSchema(payload)
    result = await orderObj.save()
    if(result){
        success=true;
    }
    return NextResponse.json({success, result})
}

export async function GET(request){
    const userId = request.nextUrl.searchParams.get("id")
    await mongoose.connect(connectionStr)
    let result;
    let success=false;
    result = await ordersSchema.find({ user_id: userId })
    if(result){
        let restoData = await Promise.all(result.map(async (item) => {
            let restoInfo={};
            restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
            restoInfo.amount = item.amount;
            restoInfo.status = item.status;
            return restoInfo;
        }));
        result = restoData;
        success=true;
    }
    return NextResponse.json({success, result})
}