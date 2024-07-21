import { NextResponse } from "next/server";

import Product from "@/lib/models/product";
import { connectMongoDB } from "@/lib/mongoConnect";

export async function GET() {
  try {
    await connectMongoDB();
    const data = await Product.find();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "Something Went Wrong",
      },
      { status: 400 }
    );
  }
}
