import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuth from "./app/utils/isAuth";

export async function middleware(request: NextRequest) {
  const res = await isAuth(/*request*/);

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
    response = NextResponse.next();
  }

  return response;
}
