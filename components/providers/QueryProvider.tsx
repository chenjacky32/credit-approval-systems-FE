"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

export interface UserProfile {
  id?: number | string;
  email?: string;
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

function parseJwt(token: string): UserProfile | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
            retry: false,
          },
        },
      })
  );

  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");

    if (savedToken) {
      setToken(savedToken);
      setUser(parseJwt(savedToken));
    }
    setIsLoading(false);
  }, []);

  // Routing Guard / Middleware
  React.useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ["/", "/register", "/login"];
    const isPublic = publicRoutes.includes(pathname);

    if (token) {
      if (isPublic) {
        router.push("/submissions/list");
      }
    } else {
      if (!isPublic) {
        router.push("/login");
      }
    }
  }, [pathname, token, isLoading, router]);

  const login = async (token: string) => {
    localStorage.setItem("accessToken", token);
    setToken(token);
    setUser(parseJwt(token));
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ token, user, isLoading, login, logout }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
