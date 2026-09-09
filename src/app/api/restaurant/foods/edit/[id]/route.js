import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";

export async function GET(request, {params}) {
    try {
        const {id} = await params;
        let success=false;
        await mongoose.connect(connectionStr)
        const result=await foodSchema.find({_id:id})
        if(result){
            success=true;
        }
        return NextResponse.json({result, success}) 
    } catch (error) {
        console.error("Error fetching food item:", error);
        return NextResponse.json({result: null, success: false, error: error.message}, {status: 500})
    }
}

export async function PUT(request, {params}) {
    try {
        const {id} = await params;
        const body = await request.json();
        let success=false;
        await mongoose.connect(connectionStr)
        const result=await foodSchema.findByIdAndUpdate(id, body)
        if(result){
            success=true;
        }
        return NextResponse.json({result, success}) 
    } catch (error) {
        console.error("Error updating food item:", error);
        return NextResponse.json({result: null, success: false, error: error.message}, {status: 500})
    }
}