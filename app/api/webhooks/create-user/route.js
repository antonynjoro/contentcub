import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import {createUser} from "./createUser";

const webhookSecret = process.env.WEBHOOK_SECRET;

async function handler(request) {
  const payload = await request.json();
  const headersList = headers();

  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);

  let evt;

  try {
    evt = wh.verify(JSON.stringify(payload), heads);
  } catch (error) {
    return NextResponse.json(
      {
        error: `Invalid signature Heads: ${JSON.stringify(
          heads,
        )},  Error: ${error}`,
      },
      { status: 400 },
    );
  }

  if (evt.type === "user.created") {
    // Create a new user in the database

    const{ id, first_name, last_name, ...attributes  } = evt.data;
    const email = evt.data.email_addresses[0].email_address;


    const user  = await createUser(id, email, first_name, last_name, attributes);

    return NextResponse.json({ success: true, user });

  } else if (evt.type === "user.deleted") {
    // Delete the user from the database
    await deleteUser(evt.data);
  }
  // Ignore other events

  // Return a 200 OK
  return NextResponse.json({ success: true });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;


const exampleEventData = {
    birthday: '',
    created_at: 1654012591514,
    email_addresses: [
      {
        email_address: 'example@example.org',
        id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
        linked_to: [],
        object: 'email_address',
        verification: [Object]
      }
    ],
    external_accounts: [],
    external_id: '567772',
    first_name: 'Example',
    gender: '',
    id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
    image_url: 'https://img.clerk.com/xxxxxx',
    last_name: 'Example',
    last_sign_in_at: 1654012591514,
    object: 'user',
    password_enabled: true,
    phone_numbers: [],
    primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
    public_metadata: {},
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: 1654012591835,
    username: null,
    web3_wallets: []
  }