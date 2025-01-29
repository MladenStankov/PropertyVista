import { IUser } from "../utils/getProfileData";

export async function fetchProfile(): Promise<IUser | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
    {
      credentials: "include",
    }
  );
  if (response.status !== 401) {
    return null;
  } else return (await response.json()) as IUser;
}

export async function fetchRefresh(): Promise<{
  access_token: string;
  refresh_token: string;
} | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (response.status !== 401) {
    const { access_token, refresh_token } = await response.json();
    return { access_token: access_token, refresh_token: refresh_token };
  } else return null;
}
