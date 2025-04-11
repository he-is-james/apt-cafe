import { NextResponse } from "next/server";
import { getLastDocument } from "../../../../lib/firestore";

export async function GET() {
    try {
        const lastOrder = await getLastDocument("orders", "orderNumber");
        if (!lastOrder) {
            return NextResponse.json({ error: "No orders found" }, { status: 404 });
        }

        const payment = lastOrder["totalCost"];
        return NextResponse.json({payment: payment});
    } catch (e) {
        console.error("Error getting last payment: ", e);
    }
}