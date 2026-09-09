import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";  

export async function GET(request, {params}){
    try {
        const {id} = await params;
        let success=false;
        await mongoose.connect(connectionStr)
        const result=await foodSchema.find({resto_id:id})
        if(result){
            success=true;
        }
        return NextResponse.json({result, success}) 
    } catch (error) {
        console.error("Error fetching food items:", error);
        return NextResponse.json({result: null, success: false, error: error.message}, {status: 500})
    }
}

export async function DELETE(request, {params}){
    try {
        const {id} = await params;
        let success=false;
        await mongoose.connect(connectionStr)
        const result=await foodSchema.deleteOne({_id:id})
        if(result.deletedCount>0){
            success=true;
        }   
        return NextResponse.json({result, success})
    } catch (error) {
        console.error("Error deleting food item:", error);
        return NextResponse.json({result: null, success: false, error: error.message}, {status: 500})
    }
}