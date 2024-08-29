import clientPromise from "@/lib/db";
import { NextResponse } from 'next/server';

export async function POST(req: NextResponse) {
    try {
        const creds = await req.json();

        if (!creds) {
          return NextResponse.json("Creds required", { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("selfie");
        const user = await db
            .collection("user")
            .find({
                username: creds.username
            })
            .toArray()
        
        console.log("backend:", user)

        if (user.length === 1){
            return NextResponse.json("Unauthorized", { status: 401 });
        }

        await db.collection("user").insertOne({
            username: creds.username,
            password: creds.password
        })
    
        return NextResponse.json(creds, { status: 200 });
    } catch (error) {
        console.log("Auth", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}