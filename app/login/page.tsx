"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password. The spirits deny you.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-950/50 border border-red-500/50 text-red-200 text-sm p-3 rounded-sm mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-magic-gold/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="witch@coven.com"
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm pl-10 pr-4 py-3 font-inter text-sm text-ivory placeholder-parchment-brown/30 focus:outline-none focus:border-magic-gold/60 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-magic-gold/40" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm pl-10 pr-4 py-3 font-inter text-sm text-ivory placeholder-parchment-brown/30 focus:outline-none focus:border-magic-gold/60 transition-colors"
            />
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading} className="mt-4">
          {loading ? "Summoning..." : "Sign In"}
        </Button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-deep-black flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-8">
        <SectionHeader
          title="Enter the Coven"
          subtitle="Sign in to your account"
          className="mb-8"
        />
        <Suspense fallback={<div className="text-center text-parchment-brown">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
