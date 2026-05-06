"use client";

import { useState, useEffect } from "react";

interface PreOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreOrderModal({ isOpen, onClose }: PreOrderModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Er is iets misgegaan. Probeer het later opnieuw.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Netwerkfout. Controleer je verbinding.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-darker/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md border border-line bg-dark p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-mute hover:text-cream transition-colors"
          aria-label="Sluiten"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-8 animate-reveal-up">
            <h2 className="font-bebas text-4xl text-cream mb-4">Bedankt!</h2>
            <p className="text-mute tracking-wide">
              We hebben je e-mailadres ontvangen. We nemen contact met je op zodra de kratten beschikbaar zijn.
            </p>
            <button 
              onClick={onClose}
              className="mt-8 font-sans border border-cream px-8 py-3 text-[0.7rem] tracking-[0.2em] text-cream uppercase hover:bg-cream hover:text-darker transition-colors"
            >
              Sluiten
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-bebas text-4xl text-cream mb-2 uppercase tracking-tight">Pre-order een Krat</h2>
            <p className="text-mute text-sm tracking-wide mb-8">
              Laat je e-mailadres achter en wees als eerste op de hoogte wanneer de nieuwe voorraad binnen is.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-[0.65rem] uppercase tracking-[0.2em] text-mute-dim mb-2">
                  E-mailadres
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.com"
                  className="w-full bg-line/20 border border-line px-4 py-3 text-cream placeholder:text-mute-dim focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-red text-xs tracking-wide">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full font-sans bg-cream py-4 text-[0.75rem] tracking-[0.3em] text-darker uppercase font-bold hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Verzenden..." : "Bevestig Pre-order"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
