"use client";
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export default function LoginForm() {
  const [login_formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Debug : afficher les valeurs du state
    for (const [key, value] of Object.entries(login_formData)) {
      console.log(key, ": ", value);
    }

    // ⚠️ Ici il y a un piège : fetch() ne comprend pas les objets JS bruts (login_formData)
    // Il faut convertir en JSON
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      body: JSON.stringify(login_formData),  // ← conversion en JSON
    });

    if (!response.ok) {
      console.error("Login failed");
      return;
    }

    const data = await response.json();
    console.log("✅ Login success:", data);

    // tu pourrais ensuite rediriger
    router.push('/home');
  };
  
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={login_formData.email}
              onChange={handleChange}
              className="block border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={login_formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
        Not a member ?
        <a
          href="/signup"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
        >
          Sign up now!
        </a>
      </p>
    </div>
  );
}
