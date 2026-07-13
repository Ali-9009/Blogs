"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage("Thanks for subscribing!");
                setEmail("");
            } else {
                setMessage(data.message);
            }
        } catch {
            setMessage("Something went wrong.");
        }

        setLoading(false);
    }

    return (
        <div>
            {/* <h3 className="text-xl font-bold text-white">
                Subscribe to our Newsletter
            </h3>

            <p className="mt-2 text-sm text-gray-400">
                Get our latest articles delivered straight to your inbox.
            </p> */}

            <form
                onSubmit={handleSubmit}
                className="mt-4 flex flex-col gap-3"
            >
                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-md border border-gray-700 bg-[#1c1c1c] px-4 text-white outline-none focus:border-white"
                />

                <button
                    disabled={loading}
                    className="flex h-12 items-center justify-center gap-2 rounded-md bg-white font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60"
                >
                    {loading ? "Subscribing..." : "Subscribe"}

                    <Send size={18} />
                </button>
            </form>

            {message && (
                <p className="mt-4 text-sm text-green-400">
                    {message}
                </p>
            )}
        </div>
    );
}