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
      return fetch(API_ENDPOINT + url, { credentials: "include" });
    }

    return response;
  };

  const refreshTokens = async () => {
    await fetch(API_ENDPOINT + "/auth/refresh-tokens", {
      method: "POST",
      credentials: "include",
    });
  };

  const fetchProfile = async () => {
    const response = await authFetch("/auth/profile");

    if (!response.ok) {
      setUser(null);
    }

    const userData: IUser = await response.json();
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
      await fetchProfile();
      setIsLoading(false);
    };

    auth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, fetchProfile, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
