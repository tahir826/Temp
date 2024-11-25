"use client";
// src/app/signup/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import token utilities
import { isTokenExpired } from '@/utils/tokenUtils';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('student'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('access_token');

    if (email && accessToken && !isTokenExpired(accessToken)) {
      router.push('/dashboard'); // Redirect if logged in
    }
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://examinieai.kindsky-c4c0142e.eastus.azurecontainerapps.io/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password, role }),
        }
      );

      if (response.ok) {
        setSuccessMessage('Signup successful! Redirecting to login...');
        setTimeout(() => {
          setSuccessMessage(null);
          router.push('/login'); // Redirect after success
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Signup page for Examine AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md border border-green-300">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-green-700">
              Create Your Account
            </h2>
            {error && (
              <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
                {error}
              </p>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-green-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-green-500 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="block text-green-700">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-green-500 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-green-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm placeholder-green-500 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          {successMessage && (
            <div className="mt-4 p-2 bg-green-200 text-green-800 rounded text-center">
              {successMessage}
            </div>
          )}

          <div className="text-center mt-6">
            <div className="text-sm text-green-600">
              Already have an account?{' '}
              <Link href="/login">
                <p className="font-medium text-green-700 hover:text-green-900">
                  Sign in
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
