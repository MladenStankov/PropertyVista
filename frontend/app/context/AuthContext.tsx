"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  fullName: string;
  email: string;
  imageUrl: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: async () => {},
  refreshAuth: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchProfile = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          credentials: "include",
        }
      );

      if (response.status === 401) {
        return false;
      }

      const userData = await response.json();
      setUser(userData);
      return true;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return false;
    }
  }, []);

  const fetchRefresh = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      return false;
    }
  }, []);

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      let profile = await fetchProfile();

      if (!profile) {
        const refreshed = await fetchRefresh();
        if (!refreshed) {
          setIsAuthenticated(false);
          setUser(null);
          setIsLoading(false);
          return;
        }

        profile = await fetchProfile();
        setIsAuthenticated(profile);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error refreshing auth:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  }, [fetchProfile, fetchRefresh]);

  const logout = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router]);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
