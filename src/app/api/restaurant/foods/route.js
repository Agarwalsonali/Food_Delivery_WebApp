import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload=await request.json()
    await mongoose.connect(connectionStr, { useNewUrlParser: true})
    const food = new foodSchema(payload)
    const result=await food.save()
    return NextResponse.json({result, success:true}) 
}