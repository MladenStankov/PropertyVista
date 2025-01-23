export interface IUser {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string;
}

export default async function getProfileData(): Promise<IUser | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
    cache: "no-cache",
    credentials: "include",
  });

  if (res.status === 401) return null;
  return (await res.json()) as IUser;
}
