import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuth from "./app/api/auth";

const allowedOrigins = [process.env.NEXT_PUBLIC_API_URL];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    const response = NextResponse.next();
    response.headers.set(
      "Access-Control-Allow-Origin",
      allowedOrigins.join(", ")
    );

    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  const res = await isAuth();

  const protectedRoutes = [
    "/profile",
    "/sell",
    "/profile/listings",
    "/profile/listings/edit/",
    "/profile/favourite-listings",
    "/profile/chats",
  ];
  const authRoutes = ["/login", "/register", "/register/verify"];

  const { pathname } = request.nextUrl;

  let response: NextResponse;

  if (res && authRoutes.includes(pathname)) {
    response = NextResponse.redirect(new URL("/", request.url));
  } else if (
    !res &&
    (protectedRoutes.includes(pathname) ||
      protectedRoutes.some((route) => pathname.startsWith(route)))
  ) {
    response = NextResponse.redirect(new URL("/login", request.url));
  } else {
    response = NextResponse.next({
      request: {
        headers: new Headers(request.headers),
      },
    });
  }

  response.headers.set(
    "Access-Control-Allow-Origin",
    allowedOrigins.join(", ")
  );

  return response;
}
