import { connectionStr } from "@/app/lib/db";
import { ordersSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const validStatusTransitions = {
    'confirm': ['ready_for_pickup', 'cancelled'],
    'ready_for_pickup': ['picked_up', 'cancelled'],
    'picked_up': ['out_for_delivery', 'cancelled'],
    'out_for_delivery': ['delivered', 'cancelled'],
    'delivered': [],
    'cancelled': []
};

export async function GET(request, { params }) {
    const { id: routeId } = await params;
    const id = routeId || request.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ success: false, result: [] }, { status: 400 });
    }

    await mongoose.connect(connectionStr);
    let result;
    let success = false;

    result = await ordersSchema.find({ deliveryBoy_id: id });
    if (result) {
        let restoData = await Promise.all(result.map(async (item) => {
            let restoInfo = {};
            restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id });
            restoInfo.amount = item.amount;
            restoInfo.status = item.status;
            restoInfo._id = item._id;
            restoInfo.customer_name = item.customer_name;
            restoInfo.customer_address = item.customer_address;
            restoInfo.customer_mobile = item.customer_mobile;
            return restoInfo;
        }));
        result = restoData;
        success = true;
    }

    return NextResponse.json({ success, result });
}

export async function PUT(request, { params }) {
    const { id: orderId } = await params;
    const payload = await request.json();
    const { deliveryBoy_id, status } = payload;

    if (!orderId || !deliveryBoy_id || !status) {
        return NextResponse.json({ 
            success: false, 
            message: "Missing required fields: orderId, deliveryBoy_id, or status" 
        }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(orderId) || !mongoose.Types.ObjectId.isValid(deliveryBoy_id)) {
        return NextResponse.json({ 
            success: false, 
            message: "Invalid orderId or deliveryBoy_id format" 
        }, { status: 400 });
    }

    await mongoose.connect(connectionStr);

    const order = await ordersSchema.findById(orderId);
    if (!order) {
        return NextResponse.json({ 
            success: false, 
            message: "Order not found" 
        }, { status: 404 });
    }

    if (order.deliveryBoy_id && order.deliveryBoy_id.toString() !== deliveryBoy_id.toString()) {
        return NextResponse.json({ 
            success: false, 
            message: "Unauthorized: This order is assigned to another delivery partner" 
        }, { status: 403 });
    }

    const currentStatus = order.status;
    if (!validStatusTransitions[currentStatus] || !validStatusTransitions[currentStatus].includes(status)) {
        return NextResponse.json({ 
            success: false, 
            message: `Invalid status transition from ${currentStatus} to ${status}` 
        }, { status: 400 });
    }

    try {
        const updatedOrder = await ordersSchema.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        return NextResponse.json({ 
            success: true, 
            result: updatedOrder,
            message: "Order status updated successfully" 
        });
    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            message: "Failed to update order status",
            error: error.message 
        }, { status: 500 });
    }
}