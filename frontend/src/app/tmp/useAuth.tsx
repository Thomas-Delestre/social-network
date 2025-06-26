"use client";
import { useEffect, useState } from 'react';

export const useAuth = () => {
    //const [isLogged, setIsLogged] = useState(true); 
    const [isLogged, setIsLogged] = useState(false); // use this line by default the other is for force login
    const [user, setUser] = useState({
      aboutMe: "",
      avatar : "",
      dateOfBirth : "",
      email : "",
      firstName : "",
      followers : [],
      uuid : "",
      lastName : "",
      password : "",
      username : "",
      group: ""
    });
  
    useEffect(() => {
  
      const localStorageUser = localStorage.getItem('user');

      if (localStorageUser) {
        const localUser = JSON.parse(localStorageUser);
        setUser(localUser.userData);
        setIsLogged(true);
      }
      
    }, []);
  
    return { isLogged, user };
  };
  