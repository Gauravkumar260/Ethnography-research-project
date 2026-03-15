"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Shield, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found. Please check your email link.");
      return;
    }

    const verify = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/auth/verify-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(result.message || "Email verified successfully!");
        } else {
          setStatus("error");
          setMessage(result.message || "Failed to verify email.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("A connection error occurred. Please try again.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#Eae9e5] flex flex-col justify-center items-center py-20 px-4">
      
      {/* BRANDING SECTION */}
      <div className="text-center mb-10 max-w-lg">
        <div className="mx-auto w-16 h-16 bg-[#99302A] rounded-full flex items-center justify-center shadow-lg mb-6 ring-4 ring-[#99302A]/10">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-4">
          Email Verification
        </h1>
        <p className="text-[#1a1a1a]/70 text-base font-sans leading-relaxed">
          Verifying your institutional email address.
        </p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-[#1a1a1a]/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a1a1a] p-6 text-center">
          <h2 className="text-[#E3E1DB] text-lg font-serif tracking-widest uppercase">Verification Status</h2>
        </div>
        
        {/* Content */}
        <div className="p-8 sm:p-10">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              <Loader2 className="h-10 w-10 animate-spin text-[#99302A]" />
              <p className="text-[#1a1a1a]/70 font-medium">Verifying your email address...</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-6 py-4">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1a1a1a] mb-2">Success</h3>
                <p className="text-[#1a1a1a]/70 font-sans text-sm leading-relaxed">{message}</p>
              </div>
              <Link 
                href="/auth/login"
                className="w-full mt-4 bg-[#99302A] hover:bg-[#7a2621] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center justify-center gap-2"
              >
                Proceed to Login <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-6">
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 rounded-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">Verification Failed</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <Link 
                href="/auth/login"
                className="w-full bg-[#1a1a1a] hover:bg-[#333] text-white py-4 text-sm font-bold tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center justify-center gap-2"
              >
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#Eae9e5] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#99302A]" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
