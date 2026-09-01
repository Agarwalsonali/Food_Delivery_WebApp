import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { city: cityFromParams } = await params;
    const cityFromQuery = request.nextUrl.searchParams.get("city");
    const city = (cityFromParams || cityFromQuery || "").trim();

    if (!city) {
        return NextResponse.json({ success: false, result: [] }, { status: 400 });
    }

    await mongoose.connect(connectionStr);
    const result = await deliveryPartnersSchema.find({
        city: { $regex: new RegExp(`^${city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") }
    });

    return NextResponse.json({ success: true, result });
}