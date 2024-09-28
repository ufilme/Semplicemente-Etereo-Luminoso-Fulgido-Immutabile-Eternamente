import connectDB from "@/lib/db";
import userModel from "@/models/User";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const creds = await req.json();

        if (!creds) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        const user = await userModel
            .findOne({
                username: creds.username
            })

        if (user === null){
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        if (user.password !== creds.password){
            return NextResponse.json("Unauthorized", { status: 401 });
        }
    
        return NextResponse.json(user._id.toString(), { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}