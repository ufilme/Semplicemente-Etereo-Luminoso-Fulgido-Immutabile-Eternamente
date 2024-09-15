import connectDB from "@/lib/db";
import userModel from "@/models/User";
import noteModel from "@/models/Note";
import { NextResponse } from 'next/server';

export async function POST(req: NextResponse) {
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

        if (user !== null){
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        const newUser = new userModel({
            username: creds.username,
            password: creds.password
        })

        const newNote = new noteModel({
            userid: newUser._id
        })

        await newUser.save()
        await newNote.save()
    
        return NextResponse.json(creds, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}