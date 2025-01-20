import { cookies } from "next/headers";
import { IUser } from "./useProfile";

export default async function getUser(): Promise<IUser | null> {
  const cookieStore = await cookies();
  const API_URL: string = String(process.env.NEXT_PUBLIC_API_URL);
  let response: Response;

  const fetchProfile = async (): Promise<IUser | null> => {
    response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (response.status !== 401) {
      return response.json();
    } else return null;
  };

  const fetchRefresh = async () => {
    const response = await fetch(`${API_URL}/auth/refresh-tokens`, {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    });
    if (response.status !== 401) {
      const { access_token, refresh_token } = await response.json();

      cookieStore.set("access_token", access_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        path: "/",
      });

      cookieStore.set("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
        path: "/",
      });
      return true;
    } else return false;
  };

  try {
    let profile = await fetchProfile();

    if (!profile) {
      const refreshed = await fetchRefresh();
      if (!refreshed) return null;

      profile = await fetchProfile();
      return profile;
    }
    return profile;
  } catch (error) {
    console.log("Middleware error:" + error);
    return null;
  }
}
