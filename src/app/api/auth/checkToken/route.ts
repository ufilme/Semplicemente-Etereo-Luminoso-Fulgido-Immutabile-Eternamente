import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function POST(req: NextResponse) {
    try {
        const creds = await req.json();

        if (!creds) {
          return NextResponse.json("Token required", { status: 400 });
        }

        if (creds.token.value.length != 24){
            return NextResponse.json("Token required", { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("selfie");
        const user = await db
            .collection("user")
            .find(
                new ObjectId(creds.token.value)
            )
            .toArray()
        
        console.log("backend token:", user)

        if (user.length === 0){
            return NextResponse.json("Unauthorized", { status: 401 });
        }
    
        return NextResponse.json(user[0]._id.toString(), { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}