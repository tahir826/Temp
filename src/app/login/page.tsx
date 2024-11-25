"use client";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function isTokenExpired(token: string) {
  try {
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = tokenPayload.exp ? tokenPayload.exp * 1000 : 0;
    return expiryTime && Date.now() > expiryTime;
  } catch {
    return true;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const accessToken = localStorage.getItem("access_token");

    if (storedEmail && accessToken && !isTokenExpired(accessToken)) {
      router.push("/chat");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(
        "https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", email);

        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          setSuccessMessage(null);
          window.location.href = "/onbording_qustion";
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Invalid login credentials.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            {error && (
              <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? "bg-gray-400" : "bg-blue-600 hover:bg-black"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black`}
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="mt-4 p-2 bg-green-200 text-green-800 rounded text-center">
              {successMessage}
            </div>
          )}

          <div className="text-center mt-6">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup">
                <p className="font-medium text-xl text-black hover:text-gray-700">
                  Sign up
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
