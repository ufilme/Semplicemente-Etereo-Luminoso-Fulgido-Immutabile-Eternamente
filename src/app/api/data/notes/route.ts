import connectDB from "@/lib/db";
import userModel from "@/models/User";
import noteModel from "@/models/Note";
import { NextResponse } from 'next/server';

export async function GET(req: NextResponse) {
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

        const notes = await noteModel
            .findOne({
                userid: user._id
            })
    
        return NextResponse.json({ data: notes.notes }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: NextResponse) {
    try {
        const reqData = await req.json();
        const token = req.cookies.get("token");

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        await noteModel
            .findOneAndUpdate({
                userid: token.value
            },
            { 
                "$push": {
                    "notes": reqData
                }
            }
            )
    
        return NextResponse.json({ data: reqData }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: NextResponse) {
    try {
        const reqData = await req.json();
        const token = req.cookies.get("token");

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        await noteModel
            .findOneAndUpdate({
                userid: token.value, "notes.id": reqData.id
            },
            { 
                "$set": {
                    "notes.$": reqData
                }
            }
            )
    
        return NextResponse.json({ data: reqData }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: NextResponse) {
    try {
        const token = req.cookies.get("token");
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        console.log(id)

        if (!token) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        await connectDB();
        await noteModel
            .findOneAndUpdate({
                userid: token.value
            },
            { 
                "$pull": {
                    "notes": {"id": id}
                }
            }
            )
    
        return NextResponse.json({ data: id }, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}