import { NextResponse, type NextRequest } from "next/server";
import { createDocument, getDocuments } from "../../../../lib/firestore";


export async function GET() {
    const orders = await getDocuments("orders");
    return NextResponse.json({orders: orders});
}

export async function POST(request: NextRequest) {
    const { order } = await request.json();
    const response = createDocument("orders", order);
    return NextResponse.json(response);
}