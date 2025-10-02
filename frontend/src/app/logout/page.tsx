"use client";

import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      window.location.href = "/login";
    });
  }, []);

  return <p>Déconnexion en cours...</p>;
}