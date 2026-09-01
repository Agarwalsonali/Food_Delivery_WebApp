import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { city } = params;
    let success = false;
    await mongoose.connect(connectionStr);
    let filter={city:{$regex: new RegExp(`^${city}$`, 'i')}};
    const response = await deliveryPartnersSchema.find({filter});
    const data = await response.json();
    return NextResponse.json(data);
}