import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { foodSchema } from "@/app/lib/foodsModel";

export async function GET(request, { params }) {
    const { id } = await params;
    await mongoose.connect(connectionStr);
    const details = await restaurantSchema.findById(id);
    const foodItems = await foodSchema.find({ resto_id: id });
    return NextResponse.json({ success: true, details, foodItems });
}