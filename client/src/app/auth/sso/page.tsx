"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SSOPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("SSO login successful (Mock)");
      router.push("/dashboard");
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background">
      <Loader2 className="animate-spin text-secondary w-16 h-16 mb-6" />
      <h2 className="text-2xl font-serif font-bold text-primary">Authenticating via Institution SSO</h2>
      <p className="text-muted-foreground mt-2 font-sans">Please wait while we securely connect your account.</p>
    </div>
  );
}
