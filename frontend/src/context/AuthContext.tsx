import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../interfaces/user.interface";
import { API_ENDPOINT } from "../main";

interface IAuthContext {
  user: IUser | null;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  fetchProfile: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const authFetch = async (url: string) => {
    const response = await fetch(API_ENDPOINT + url, {
      credentials: "include",
    });

    if (response.status == 401) {
      await refreshTokens();
      return fetch(url, { credentials: "include" });
    }

    return response;
  };

  const refreshTokens = async () => {
    const response = await fetch(API_ENDPOINT + "/auth/refresh-tokens", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Cannot refresh tokens");
    }
  };

  const fetchProfile = async () => {
    const response = await authFetch("/auth/profile");

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const userData = await response.json();
    setUser(userData);
  };

  const logout = async () => {
    await fetch(API_ENDPOINT + "/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  useEffect(() => {
    const auth = async () => {
      try {
        await fetchProfile();
        console.log(user);
      } catch (error) {
        console.log("Auth error", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    auth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchProfile, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
