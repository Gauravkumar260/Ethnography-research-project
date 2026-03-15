"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Shield } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth/store";

function MagicLinkContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid magic link.");
      router.push("/auth/login");
      return;
    }

    const verifyLink = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const csrfRes = await fetch(`${apiUrl}/api/csrf-token`);
        const { csrfToken } = await csrfRes.json();

        const res = await fetch(`${apiUrl}/api/auth/magic-link/verify`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify({ token })
        });
        
        if (res.ok) {
          const result = await res.json();
          setAuth(result.user, result.accessToken);
          toast.success("Successfully authenticated.");
          router.push("/dashboard");
        } else {
          toast.error("Magic link expired or invalid.");
          router.push("/auth/login");
        }
      } catch (err) {
        toast.error("An error occurred.");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    verifyLink();
  }, [token, router, setAuth]);

  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
          Secure Authentication
        </h1>
        <p className="text-[#1a1a1a]/70 text-base font-sans leading-relaxed">
          Please wait while we securely authenticate your session.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {loading ? (
          <>
            <Loader2 className="animate-spin text-[#99302A] w-12 h-12" />
            <p className="text-[#1a1a1a] font-sans font-medium uppercase tracking-widest text-sm">Authenticating via Magic Link...</p>
          </>
        ) : (
          <p className="text-[#99302A] font-sans font-bold">Redirecting...</p>
        )}
      </div>
    </div>
  );
}

export default function MagicLinkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#Eae9e5] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#99302A]" />
      </div>
    }>
      <MagicLinkContent />
    </Suspense>
  );
}
