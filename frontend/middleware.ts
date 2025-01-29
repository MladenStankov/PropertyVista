import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuth from "./app/api/auth";

export async function middleware(request: NextRequest) {
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

  console.log("Authenticated:", res);

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
    response = NextResponse.next();
  }

  return response;
}
