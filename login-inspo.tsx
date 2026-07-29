"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { PublicRoute } from "@/components/auth/public-route";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, password });
        } catch (err: any) {
            console.log(err)
            setError(err?.response?.data?.message || "Login failed. Check your credentials.");
        }
    };

    return (
        <PublicRoute>
            <div className="flex min-h-screen w-full bg-background text-white font-sans">
                <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 border-r border-background">
                    <img
                        src="/placements.jpg"
                        alt="placements illustration"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
                    <div className="w-full max-w-md mx-auto flex flex-col">
                        <div className="mb-8 text-center sm:text-left">
                            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">Welcome back</h1>
                            <p className="text-zinc-400 text-sm sm:text-base">
                                Enter your email below to sign in or Create an account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded text-sm">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email here"
                                    className="w-full px-4 py-3 bg-transparent border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-500 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-transparent border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-500 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 mt-6 bg-zinc-100 text-black font-medium rounded-lg hover:bg-white transition-colors text-sm"
                            >
                                Sign in with email
                            </button>
                            <div className="mt-8 pt-6 border-t border-zinc-800">
                                <p className="text-center text-zinc-400 text-sm">
                                    Just want to check the demo?{" "}
                                    <Link href="/" className="text-white hover:underline transition-colors ml-1">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PublicRoute>
    );
}

