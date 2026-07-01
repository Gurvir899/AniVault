"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
            if (email.length === 0) {
                setError("");
            }
        }, [email]);

    async function handleRegister(e: React.SubmitEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message ?? "Something went wrong");
                return;
            }

            router.push("/login");
            router.refresh();
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-sm px-6 py-8 border border-slate-200">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Create account</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-slate-600">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-slate-600">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-slate-600">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-sky-500 text-white py-2 text-sm hover:bg-sky-400 disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>
                <p className="text-sm text-slate-500 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-sky-500 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}