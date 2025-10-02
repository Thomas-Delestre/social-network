"use client";
import LoginForm from "../components/form/loginForm";
import { useAuth } from "../tmp/useAuth";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Login() {
const { isLogged } = useAuth();

  const router = useRouter();

  if (isLogged) {
    toast.error('You are already Login!' , {
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
  
  return (
    <div className="h-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">
            Social Network
          </h1>
          <p className="text-white mt-1">A Network of sociable people</p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <div className="bg-white">
          <h1 className="text-gray-800 font-bold text-3xl mb-3 text-center">
            Long time no see, welcome back !
          </h1>
          <div className="flex justify-center">
            <div className="flex items-center py-2 px-3 mb-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
