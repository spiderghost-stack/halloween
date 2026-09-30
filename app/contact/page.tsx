"use client";

import { useState } from "react";
import { Send, Mail, User, MessageSquare, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const fields = [
    { key: "name", label: "Name", icon: User, type: "text", placeholder: "Roesnay" },
    { key: "email", label: "Email", icon: Mail, type: "email", placeholder: "Roesnay@example.com" },
    { key: "subject", label: "Subject", icon: FileText, type: "text", placeholder: "I have a question about my order..." },
  ] as const;

  return (
    <main className="min-h-screen bg-deep-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-inter text-[11px] uppercase tracking-[0.35em] text-magic-gold/70 mb-3">
            Get in Touch
          </p>
          <h1 className="font-cinzel text-4xl md:text-5xl text-ivory">Contact Us</h1>
          <p className="mt-4 font-inter text-parchment-brown">
            Something on your mind? We read every message and aim to respond
            within 2 business days.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-16 bg-haunted-dark/50 border border-magic-gold/20 rounded-sm">
            <Send size={32} className="text-magic-gold mx-auto mb-4" />
            <h2 className="font-cinzel text-ivory text-xl mb-2">Message Sent</h2>
            <p className="font-inter text-parchment-brown text-sm">
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 font-inter text-magic-gold text-sm hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-haunted-dark/50 border border-magic-gold/10 rounded-sm p-6 md:p-8 space-y-5"
          >
            {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-magic-gold/40" />
                  <input
                    type={type}
                    required
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm pl-10 pr-4 py-3 font-inter text-sm text-ivory placeholder-parchment-brown/30 focus:outline-none focus:border-magic-gold/60 transition-colors"
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="block font-inter text-xs uppercase tracking-widest text-parchment-brown/70 mb-2">
                Message
              </label>
              <div className="relative">
                <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-magic-gold/40" />
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us how we can help..."
                  className="w-full bg-deep-black/60 border border-magic-gold/20 rounded-sm pl-10 pr-4 py-3 font-inter text-sm text-ivory placeholder-parchment-brown/30 focus:outline-none focus:border-magic-gold/60 transition-colors resize-none"
                />
              </div>
            </div>

            {status === "error" && (
              <p className="font-inter text-red-400 text-sm">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-6 py-3 bg-halloween-orange text-warm-white font-inter font-medium uppercase text-sm tracking-widest rounded-sm transition-colors",
                status === "loading"
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-orange-700"
              )}
            >
              {status === "loading" ? (
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
