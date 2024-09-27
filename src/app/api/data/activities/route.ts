import connectDB from "@/lib/db";
import userModel from "@/models/User";
import eventModel from "@/models/Event";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token");

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        const user = await userModel
            .findById(
                token.value
            )

        if (user === null){
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const activities = await eventModel
            .findOne({
                userid: user._id
            })
    
        return NextResponse.json({ data: activities.activities }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const reqData = await req.json();
        const token = req.cookies.get("token");

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        await eventModel
            .findOneAndUpdate({
                userid: token.value
            },
            { 
                "$push": {
                    "activities": reqData
                }
            }
            )
    
        return NextResponse.json({ data: reqData }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const reqData = await req.json();
        const token = req.cookies.get("token");

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        await eventModel
            .findOneAndUpdate({
                userid: token.value, "activities.id": reqData.id
            },
            { 
                "$set": {
                    "activities.$": reqData
                }
            }
            )
    
        return NextResponse.json({ data: reqData }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = req.cookies.get("token");
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        console.log(id)

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        await eventModel
            .findOneAndUpdate({
                userid: token.value
            },
            { 
                "$pull": {
                    "activities": {"id": id}
                }
            }
            )
    
        return NextResponse.json({ data: id }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}