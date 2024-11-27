"use client";

import { useEffect, useState } from "react";

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string;
}

export default function useProfile(): IUser | null {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, []);

  return user;
}
