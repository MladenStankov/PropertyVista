import { NextRequest } from "next/server";

export async function isUserAuthenticated(
  request: NextRequest
): Promise<boolean> {
  const baseUrl = "http://localhost:3000";
  let response;

  try {
    response = await fetch(`${baseUrl}/auth/profile`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(`${baseUrl}/auth/refresh-tokens`, {
        method: "POST",
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      });

      if (refreshResponse.status !== 201) {
        return false;
      }

      response = await fetch(`${baseUrl}/auth/profile`, {
        headers: {
          Cookie: request.headers.get("cookie") || "",
        },
      });
    }

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Middleware error" + error);
    return false;
  }
}

export default isUserAuthenticated;
