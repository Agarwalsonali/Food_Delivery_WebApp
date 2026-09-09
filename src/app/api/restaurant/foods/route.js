import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const payload=await request.json()
        let success=false;
        await mongoose.connect(connectionStr)
        const food = new foodSchema(payload)
        const result=await food.save()
        if(result){
            success=true;
        }
        return NextResponse.json({result, success:true}) 
    } catch (error) {
        console.error("Error adding food item:", error);
        return NextResponse.json({result: null, success: false, error: error.message}, {status: 500})
    }
}