import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isUserAuthenticated from "./app/components/auth/isUserAuthenticated";

export async function middleware(request: NextRequest) {
  const isAuth = await isUserAuthenticated(request);

  const protectedRoutes = ["/profile"];
  const authRoutes = ["/login", "/register", "/register/verify"];

  const { pathname } = request.nextUrl;

  if (isAuth && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuth && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
