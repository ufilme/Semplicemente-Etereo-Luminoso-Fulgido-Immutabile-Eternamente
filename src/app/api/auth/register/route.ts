import connectDB from "@/lib/db";
import userModel from "@/models/User";
import noteModel from "@/models/Note";
import eventModel from "@/models/Event";
import tomatoModel from "@/models/Tomato";
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

        const newEvent = new eventModel({
            userid: newUser._id
        })

        const newTomato = new tomatoModel({
            userid: newUser._id
        })
    
        await newUser.save()
        await newNote.save()
        await newEvent.save()
        await newTomato.save()
    
        return NextResponse.json(creds, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}