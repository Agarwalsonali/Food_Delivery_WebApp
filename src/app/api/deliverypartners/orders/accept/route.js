import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const payload = await request.json();
    const { orderId, deliveryBoy_id } = payload;

    if (!orderId || !deliveryBoy_id) {
        return NextResponse.json({ 
            success: false, 
            message: "Missing required fields: orderId or deliveryBoy_id" 
        }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(deliveryBoy_id)) {
        return NextResponse.json({ 
            success: false, 
            message: "Invalid orderId or deliveryBoy_id format" 
        }, { status: 400 });
    }

    await mongoose.connect(connectionStr);

    try {
        const order = await ordersSchema.findById(orderId);
        if (!order) {
            return NextResponse.json({ 
                success: false, 
                message: "Order not found" 
            }, { status: 404 });
        }

        if (order.deliveryBoy_id) {
            return NextResponse.json({ 
                success: false, 
                message: "Order is already assigned to a delivery partner" 
            }, { status: 400 });
        }

        if (order.status === 'cancelled' || order.status === 'delivered') {
            return NextResponse.json({ 
                success: false, 
                message: `Cannot accept order with status: ${order.status}` 
            }, { status: 400 });
        }

        const updatedOrder = await ordersSchema.findByIdAndUpdate(
            orderId,
            { 
                deliveryBoy_id: deliveryBoy_id,
                status: 'ready_for_pickup'
            },
            { new: true }
        );

        return NextResponse.json({ 
            success: true, 
            result: updatedOrder,
            message: "Order accepted successfully" 
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Failed to accept order",
            error: error.message 
        }, { status: 500 });
    }
}
