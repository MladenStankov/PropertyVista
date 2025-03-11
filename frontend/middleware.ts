import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import isAuth from "./app/api/auth";

// const allowedOrigins = [process.env.NEXT_PUBLIC_API_URL];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  let response: NextResponse;

  if (request.method === "OPTIONS") {
    response = new NextResponse(null, {
      status: 200,
      headers: corsOptions,
    });
  } else {
    response = NextResponse.next();
  }
  return response;
}
