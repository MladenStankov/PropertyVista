import { useEffect, useState } from "react";

interface FetchJson {
  id: number;
  fullName: string;
  email: string;
  imageUrl: string;
}

export default function useProfileImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch("http://localhost:3000/auth/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          setImageUrl(null);
          return;
        }

        const data: FetchJson = await response.json();

        setImageUrl(data.imageUrl);
      } catch (error) {
        console.log("Profile image error:" + error);
      }
    }
    fetchImage();
  }, []);
  return imageUrl;
}
