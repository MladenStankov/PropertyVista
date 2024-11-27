import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getUser from "./app/utils/getUser";

export async function middleware(request: NextRequest) {
  const user = await getUser();
  const requestHeaders = new Headers(request.headers);

  if (user) {
    requestHeaders.set(
      String(process.env.NEXT_PUBLIC_USER_HEADER),
      JSON.stringify(user)
    );
  }

  const protectedRoutes = ["/profile", "/sell"];
  const authRoutes = ["/login", "/register", "/register/verify"];

  const { pathname } = request.nextUrl;

  let response: NextResponse;

  if (user && authRoutes.includes(pathname)) {
    response = NextResponse.redirect(new URL("/", request.url));
  } else if (!user && protectedRoutes.includes(pathname)) {
    response = NextResponse.redirect(new URL("/login", request.url));
  } else {
    response = NextResponse.next();
  }

  if (user) {
    response.headers.set(
      String(process.env.NEXT_PUBLIC_USER_HEADER),
      JSON.stringify(user)
    );
  }

  return response;
}
