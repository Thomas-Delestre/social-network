"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { users } from '@/app/object/user';

export default function LoginForm() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e : any) => {
    e.preventDefault();

    let userFound = false;

    users.forEach((user, i) => {
      if (formData.email === user.email && formData.password === user.password) {
        userFound = true;
        localStorage.setItem('user', JSON.stringify({ isLogged: true, userData: user }));
        console.log('Login successful!')
        toast.success('Login successful!' , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        
        }); 
        router.push('/home'); 
      }

      if (!userFound && i === users.length - 1) {
        toast.error('Invalid email or password!' , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        
        }); 
      }
    });

  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
              value={formData.email}
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
              value={formData.password}
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
