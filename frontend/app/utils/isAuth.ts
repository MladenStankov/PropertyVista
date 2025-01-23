import { cookies } from "next/headers";

export default async function isAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const API_URL: string = String(process.env.NEXT_PUBLIC_API_URL);
  let response: Response;

  const fetchProfile = async (): Promise<boolean> => {
    response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    if (response.status !== 401) {
      return true;
    } else return false;
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
      if (!refreshed) return false;

      profile = await fetchProfile();
      return profile;
    }
    return profile;
  } catch (error) {
    console.log("Middleware error:" + error);
    return false;
  }
}
