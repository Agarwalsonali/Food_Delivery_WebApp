import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";  

export async function GET(request, {params}){
    const {id} = await params;
    let success=false;
    await mongoose.connect(connectionStr)
    const result=await foodSchema.find({resto_id:id})
    if(result){
        success=true;
    }
    return NextResponse.json({result, success}) 
}

export async function DELETE(request, {params}){
    const {id} = await params;
    let success=false;
    await mongoose.connect(connectionStr)
    const result=await foodSchema.deleteOne({_id:id})
    if(result.deletedCount>0){
        success=true;
    }   
    return NextResponse.json({result, success})
}