import { cookies } from "next/headers";

export default async function isAuth(): Promise<boolean> {
  const cookieStore = await cookies();

  const fetchProfile = async (): Promise<boolean> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      }
    );
    return response.status !== 401;
  };

  const fetchRefresh = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
      {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      }
    );

    if (response.status !== 401) {
      return true;
    }
    return false;
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
