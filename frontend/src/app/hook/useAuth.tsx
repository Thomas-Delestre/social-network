import { useEffect, useState } from "react";

export const useAuth = () => {
  console.log("useAuth called");
  const [isLogged, setIsLogged] = useState<boolean | null>(null); // null = en cours de chargement
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log("Checking authentication status...");
    
    fetch("http://localhost:8080/checkConnection", {
      credentials: "include", // 🔑 obligatoire pour envoyer le cookie
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not logged");
        const data = await res.json();
        setUser(data.userData);
        setIsLogged(true);
      })
      .catch(() => {
        setUser(null);
        setIsLogged(false);
      });
  }, []);
  console.log("isLogged:", isLogged, "user:", user);
  return { isLogged, user };
};



