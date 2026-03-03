"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
    <div className="w-full max-w-md mx-auto space-y-6 pt-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "Playfair Display, serif" }}>
          Email Verification
        </h1>
      </div>

      {status === "loading" && (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#0a192f]" />
          <p className="text-slate-600">Verifying your email address...</p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-6">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </Alert>
          <Button asChild className="w-full bg-[#0a192f] hover:bg-[#112240]">
            <Link href="/auth/login">Proceed to Login</Link>
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/login">Back to Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-[#0a192f]" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
