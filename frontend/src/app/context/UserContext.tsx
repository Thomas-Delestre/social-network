"use client"

import { create } from "domain";
import { createContext, useContext, useEffect, useState } from "react"

import { useAuth } from "@/app/hook/useAuth"; 

type User = {
    Id: string;
    Firstname: string;
    Lastname: string;
    Email: string;
    ProfilPicture: string;
    AboutMe: string;
    Private: boolean;
    friends_list: Array<string>;
    groups_list: Array<string>;
}

type AuthContextType = {
    user:User;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    setLoading(true);
    try {
      const u = await useAuth(); // doit renvoyer user ou null
      setUser(u ?? null);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const refresh = async () => load();

  const logout = async () => {
    // appeler ton endpoint logout si besoin pour effacer cookie côté serveur
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
};