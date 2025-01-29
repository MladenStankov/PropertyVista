import { cookies } from "next/headers";
import { fetchProfile, fetchRefresh } from "../api/auth";
// import { NextRequest } from "next/server";

export default async function isAuth(/*request: NextRequest*/): Promise<boolean> {
  const cookieStore = await cookies();
  // let response: Response;

  // const fetchProfile = async (): Promise<boolean> => {
  //   response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
  //     headers: {
  //       Cookie: cookieStore.toString(),
  //     },
  //     credentials: "include",
  //   });
  //   if (response.status !== 401) {
  //     return true;
  //   } else return false;
  // };

  // const fetchRefresh = async () => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Cookie: cookieStore.toString(),
  //       },
  //       credentials: "include",
  //     }
  //   );
  //   if (response.status !== 401) {
  //     const { access_token, refresh_token } = await response.json();

  //     cookieStore.set("access_token", access_token, {
  //       httpOnly: true,
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //       sameSite: "none",
  //       secure: true,
  //       path: "/",
  //     });

  //     cookieStore.set("refresh_token", refresh_token, {
  //       httpOnly: true,
  //       maxAge: 30 * 24 * 60 * 60 * 1000,
  //       sameSite: "none",
  //       secure: true,
  //       path: "/",
  //     });
  //     return true;
  //   } else return false;
  // };

  try {
    let profile = await fetchProfile();

    if (!profile) {
      const tokens = await fetchRefresh();
      if (!tokens) return false;
      else {
        cookieStore.set("access_token", tokens.access_token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
          path: "/",
        });
        cookieStore.set("access_token", tokens.refresh_token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
          path: "/",
        });
      }

      profile = await fetchProfile();
      return profile !== null;
    }
    return profile !== null;
  } catch (error) {
    console.log("Middleware error:" + error);
    return false;
  }
}
