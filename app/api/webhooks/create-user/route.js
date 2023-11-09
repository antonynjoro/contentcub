import { headers } from "next/headers";
import { NextResponse } from "next/server";

const webhookSecret = process.env.WEBHOOK_SECRET;


async function handler(request) {
    const payload  =  await request.json();
    const headersList = headers()

    const heads = {
        "svix-id": headersList.get("svix-id"),
        "svix-timestamp": headersList.get("svix-timestamp"),
        "svix-signature": headersList.get("svix-signature"),
    }

    const wh = new Webhook(webhookSecret);

    let evt;

    try {
        evt = wh.verify(payload, heads);
        
    } catch (_) {
        return new NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (evt.type === "user.created") {
        // Create a new user in the database
        await createUser(evt.payload);
    } else if (evt.type === "user.deleted") {
        // Delete the user from the database
        await deleteUser(evt.payload);
    } else {
        // Ignore other events

        // Return a 200 OK
        return new NextResponse.json({ success: true });
    }





}

export const GET = handler;
export const POST = handler;
export const PUT = handler;