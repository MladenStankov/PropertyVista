import { useEffect, useState } from "react";

interface IUser {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string;
}

export default function useProfile() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch("http://localhost:3000/auth/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data: IUser = await response.json();

        setUser(data);
      } catch (error) {
        console.log("Profile image error:" + error);
      }
    }
    fetchImage();
  }, []);
  return user;
}
