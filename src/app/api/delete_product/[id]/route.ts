import { NextResponse } from "next/server";

import Product from "@/lib/models/product";
import { connectMongoDB } from "@/lib/mongoConnect";

export async function DELETE(URLParams: any) {
  try {
    const id = URLParams.params.id;
    console.log(id)
    
    // await connectMongoDB();
    
    // await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ msg: "Product Deleted Successfully" });
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
