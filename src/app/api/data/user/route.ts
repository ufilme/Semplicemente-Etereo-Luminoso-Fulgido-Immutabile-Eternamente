import connectDB from "@/lib/db";
import userModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json("Creds required", { status: 400 });
    }

    await connectDB();

    const user = await userModel.findById(token.value);

    if (user === null) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    return NextResponse.json({ notifications: user.notifications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json("Creds required", { status: 400 });
    }

    const reqData = await req.json();
    const { notifications } = reqData;

    await connectDB();

    const user = await userModel.findByIdAndUpdate(
      token.value,
      { notifications },
      { new: true }
    );

    if (user === null) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    return NextResponse.json({ notifications: user.notifications }, { status: 200 });
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}