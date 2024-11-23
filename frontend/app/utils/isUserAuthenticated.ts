import { cookies } from "next/headers";

export default async function isUserAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const API_URL: string = String(process.env.NEXT_PUBLIC_API_URL);
  let response: Response;

  try {
    response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh-tokens`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });

      const { access_token, refresh_token } = await refreshResponse.json();

      if (access_token) {
        cookieStore.set("access_token", access_token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
          path: "/",
          domain: "localhost",
        });
      }
      if (refresh_token) {
        cookieStore.set("refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
          path: "/",
          domain: "localhost",
        });
      }

      if (refreshResponse.status !== 201) {
        return false;
      }

      response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });
    }

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Middleware error:" + error);
    return false;
  }
}
