import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const userHeader = process.env.NEXT_PUBLIC_USER_HEADER;
  const user = (await headers()).get(String(userHeader));

  if (user) {
    return NextResponse.json(JSON.parse(user));
  }
  return NextResponse.json(null);
}
