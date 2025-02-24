// app/pageLogin.tsx
"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { login, apiPostNoAuth } from "./apiService/apiService";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // Limpiar errores previos
    await apiPostNoAuth('/auth/login',{email, password}, true).then(res => {
      localStorage.setItem("authToken", res.data.token);
      router.push("clients/notifications");
    }).catch (err => {setError(err.message)});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 bg-yellow-100  px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-blue-800">
        MEMBER LOGIN</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="appearance-none relative block w-full px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white sm:text-sm shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="appearance-none relative block w-full px-3 py-2 bg-gray-100 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white sm:text-sm shadow-sm"
                required
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}