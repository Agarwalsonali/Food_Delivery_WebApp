import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
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